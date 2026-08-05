const connection = require("../db/db");
const { hashPass, comparePass } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const registerUser = async (req, res) => {

    try {
        const { email, firstName, lastName, userName, password, status } = req.body;
        if (!email || !firstName || !lastName || !userName || !password) {
            return res.
                status(400)
                .json({
                    message: "All fields must be required..!"
                })
        }
        const hashedPassword = await hashPass(password);
        const [register] = await connection.execute(`
            INSERT INTO users (email , firstName , lastName , userName , password  , status)
            VALUES (? , ? , ? , ? , ? , ?)
            `, [email, firstName, lastName, userName, hashedPassword, status ?? "active"])

        return res.status(200).json(
            {
                success: true,
                message: "User registered successfully..!!",
                data: register
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email or username and password"
            })
        }
        const [loginUser] = await connection.execute(
            `
            SELECT * FROM users
            WHERE email = ? OR userName = ?
            `, [email || null, email || null]
        )

        if (loginUser.length === 0) {
            return res.status(404).json({
                message: "user not found..!"
            })
        }

        if(loginUser[0].status !== "active"){
            return res.status(400).json({
                message: "Your account is not active..!!"
            })
        }

        const isMatch = await comparePass(password, loginUser[0].password)

        if (!isMatch) {
            return res.status(400).json({
                message: "Something went wrong..!"
            })
        }
        const token = await generateToken({
            email: loginUser[0].email,
            id: loginUser[0].id,
            role: loginUser[0].role
        })

        return res
            .status(200)
            .cookie("token", token)
            .json({
                msg: "user loggedIn success..!",
                token: token,
                user: {
                    id: loginUser[0].id,
                    email: loginUser[0].email,
                    userName: loginUser[0].userName,
                    firstName: loginUser[0].firstName,
                    lastName: loginUser[0].lastName,
                    role: loginUser[0].role,
                    profileImage: loginUser[0].profileImage
                }
            })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [userProfile] = await connection.execute(
            `
         SELECT id , email , firstName , lastName , userName , role
         FROM users 
         WHERE id = ?
         `, [userId]
        )
        if (userProfile.length === 0) {
            return res
                .status(404)
                .json(
                    {
                        success: false,
                        msg: "user not found"
                    }
                )
        }
        return res.status(200).json(
            {
                success: true,
                msg: "user found successfully..!!",
                user: userProfile[0]
            }
        )
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const editProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { email, userName, firstName, lastName } = req.body;
        if (!email && !userName && !firstName && !lastName) {
            return res.status(400).json({
                msg: "Please provide at least one field to update."
            });
        }

        await connection.execute(
            `
            UPDATE users
            SET 
                email = COALESCE(?, email),
                userName = COALESCE(? , userName),
                firstName = COALESCE(? , firstName),
                lastName = COALESCE(? , lastName)
            WHERE id = ?
            `,
            [email ?? null, userName ?? null, firstName ?? null, lastName ?? null, userId]
        );

        const [userProfile] = await connection.execute(
            `
            SELECT email, firstName , lastName , userName
            FROM users 
            WHERE id = ?
            `,
            [userId]
        );

        return res.status(200).json({
            msg: "Profile updated successfully..!!",
            user: userProfile[0]
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        return res.clearCookie("token").json({
            msg: "user logged out successfully..!!"
        })
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}

const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!req.body) {
            return res.status(400).json({
                msg: "body is required"
            })
        }
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                msg: "current and new password are required"
            })
        }
        const [user] = await connection.execute(
            `
            SELECT password 
            FROM users
            WHERE id = ?
            `, [userId]
        );
        const isMatch = await comparePass(currentPassword, user[0].password);
        if (!isMatch) {
            return res.status(400).json({
                msg: "current password is not correct..!!"
            })
        }
        const isSame = await comparePass(newPassword, user[0].password);
        if (isSame) {
            return res.status(400).json({
                msg: "new password is same as current password..!!"
            })
        }
        const hashedPassword = await hashPass(newPassword)
        const updatePass = await connection.execute(
            `
            UPDATE users
            SET password = ?
            WHERE id = ?
            `,
            [hashedPassword, userId]
        )
        return res.status(200).json({
            success: true,
            msg: "password changed successfully..!!",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    editProfile,
    logoutUser,
    changePassword
}
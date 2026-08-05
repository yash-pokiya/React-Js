const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decode;
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const teacherMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decode;
        if (decode.role !== "teacher") {
            return res.status(403).json({
                message: "Only teachers can perform this task..!!"
            })
        }
        next()  
    } catch (error) { 
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    authMiddleware,
    teacherMiddleware
};

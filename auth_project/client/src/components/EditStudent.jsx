import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
    });

    useEffect(() => {
        fetchStudent();
    }, []);


    const fetchStudent = async () => {
        try {
            const response = await axios.get(
                `/api/teacher/student/profile/${id}`
            );
            console.log(`firstname`, response.data.data[0])
            setFormData({
                firstName: response.data.data[0].firstName,
                lastName: response.data.data[0].lastname,
                userName: response.data.data[0].userName,
                email: response.data.data[0].email,
            });
        } catch (error) {
            console.log(error);
            alert("Unable to fetch student.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.patch(
                `/api/teacher/student/update/${id}`,
                formData
            );

            alert("Student updated successfully.");

            navigate("/students");
        } catch (error) {
            console.log(error);
            alert("Failed to update student.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">

            <div className="max-w-3xl mx-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Edit Student
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Update student information.
                        </p>

                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        Back
                    </button>

                </div>

                {/* Form Card */}

                <div className="bg-white rounded-xl shadow-md p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* First & Last Name */}

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>

                                <label className="block mb-2 font-medium">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                                    required
                                />

                            </div>

                        </div>

                        {/* Username */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Username
                            </label>

                            <input
                                name="userName"
                                type="text"
                                value={formData.userName}
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100 "
                                onChange={handleChange}
                            />

                        </div>

                        {/* Email */}

                        <div>

                            <label className="block mb-2 font-medium">
                                Email
                            </label>

                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
                                onChange={handleChange}
                            />

                        </div>

                        {/* Buttons */}

                        <div className="flex justify-end gap-4 pt-4">

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-3 border rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                onClick={() => {

                                }}
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default EditStudent;
import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast from 'react-toastify'

const SignUp = () => {
    const [udata, setUdata] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const { fname, email, password, cpassword } = udata;

    const adddata = (e) => {
        const { name, value } = e.target;

        setUdata((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname,
                    email,
                    password,
                    cpassword
                })
            });

            const data = await res.json();

            if (res.status === 422 || !data) {
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setUdata({
                    fname: "",
                    email: "",
                    password: "",
                    cpassword: ""
                });
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.error("Frontend catch error:", error.message);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/4 bg-gray-100 p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        name="fname"
                        placeholder="Full Name"
                        value={fname}
                        onChange={adddata}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={adddata}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={adddata}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        name="cpassword"
                        placeholder="Confirm Password"
                        value={cpassword}
                        onChange={adddata}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button onClick={handleSignup} className="bg-blue-500 text-white py-2 px-4 rounded">
                    Signup
                </button>
            </div>
        </div>
    );
};

export default SignUp;

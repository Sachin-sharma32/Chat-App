import React, { useState } from "react";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import Link from "next/link";

const login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const request = { email, password };
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                request
            );
            localStorage.setItem(
                "currentUser",
                JSON.stringify(response.data.data.user)
            );
            dispatch(setUser(response.data.data.user));
            router.push("/");
        } catch (err) {
        }
    };

    return (
        <div className=" min-h-screen relative">
            <div className=" w-[70vw] p-10 text-center shadow-lg mx-auto z-50 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg">
                <h2 className=" text-2xl font-semibold">Welcome to WeChat</h2>
                <form
                    className=" mt-6 flex flex-col items-center"
                    onSubmit={submitHandler}
                >
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="email" className=" text-md">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className=" p-3 w-60 outline-none bg-white border-2 border-green-400 rounded-lg"
                            required
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="demo@example.com"
                        />
                    </div>
                    <div className=" flex flex-col items-start ">
                        <label htmlFor="password" className=" text-md">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className=" p-3 w-60 outline-none bg-white border-2 border-green-400 rounded-lg"
                            required
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <Button
                        className=" mt-3 w-60 bg-green-500 text-white hover:text-green-500 hover:bg-white"
                        type="submit"
                    >
                        LOGIN
                    </Button>
                </form>
                <h5 className=" mt-6">OR</h5>
                <div className=" flex flex-col justify-center items-center">
                    <Button
                        className=" bg-green-500 text-white mt-2 hover:bg-white hover:text-black"
                        onClick={() => {
                            signIn("google");
                        }}
                    >
                        <GoogleIcon className=" mr-2" /> Continue with Google
                    </Button>
                    <Button
                        className=" text-white mt-2 hover:bg-white hover:text-black bg-green-500"
                        onClick={() => {
                            signIn("github");
                        }}
                    >
                        <GitHubIcon className=" mr-2" /> Continue with GitHub
                    </Button>
                </div>
                <div className=" text-sm">
                    <div className=" mt-10 text-gray-500">
                        By continuing you agree to WeChat's <br />{" "}
                        <span className=" text-black font-semibold">
                            Terms of Service
                        </span>{" "}
                        and asknowledge you've read our{" "}
                        <span className=" text-black font-semibold">
                            Privacy Policy
                        </span>
                    </div>
                    <div className=" mt-2 flex justify-center gap-2 items-center">
                        Already on WeChat?{" "}
                        <Link href="/signup">
                            <Button className=" text-white hover:bg-green-500 hover:text-white">
                                SignUp
                            </Button>
                        </Link>
                    </div>
                    <p className=" text-gray-">
                        Are you a business? Get started here!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default login;

import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    setChatScreenVisiblity,
    setSelectedPerson,
    setUser,
} from "../redux/userSlice";
import { useSelector } from "react-redux";
import Link from "next/link";

const SideBar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        dispatch(
            setSelectedPerson(
                JSON.parse(localStorage.getItem("selectedPerson"))
            )
        );
    }, []);
    return (
        <div className=" md:w-[30%] bg-gradient-to-r from-green-300 to-green-500 rounded-lg">
            <div className="flex flex-col items-center text-xl h-[20%] justify-center cursor-pointer pt-10 mb-10">
                {user.image ? (
                    <img src={user.image} className=" rounded-full w-20 h-20" />
                ) : (
                    <div className=" bg-white w-fit p-2 rounded-full">
                        <PersonIcon />
                    </div>
                )}
                {user.name}
            </div>
            <div className=" h-[80%] flex flex-col justify-start ">
                <div
                    className="flex gap-4 p-4 w-[100%] hover:bg-green-500 cursor-pointer"
                    onClick={() => {
                        dispatch(setChatScreenVisiblity(false));
                    }}
                >
                    <AccountBoxIcon />
                    Your Account
                </div>
                <div
                    className="flex gap-4 p-4 w-[100%] hover:bg-green-500 cursor-pointer"
                    onClick={() => {
                        dispatch(setChatScreenVisiblity(true));
                    }}
                >
                    <ChatIcon />
                    Chats
                </div>
                <div
                    className=" gap-4 p-4 w-[100%] hover:bg-green-500 cursor-pointer font-bold"
                    onClick={() => {
                        dispatch(setUser(null));
                        dispatch(setSelectedPerson(null));
                    }}
                >
                    LOGOUT
                </div>
            </div>
        </div>
    );
};

export default SideBar;

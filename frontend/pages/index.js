import Head from "next/head";
import Image from "next/image";
import ChatScreen from "../components/ChatScreen";
import SideBar from "../components/SideBar";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(setUser(JSON.parse(localStorage.getItem("currentUser"))));
    }, []);

    return (
        <div className=" h-screen relative">
            {user ? (
                <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-[90vw] h-[70vh] overflow-y-scroll scrollbar  md:flex-row shadow-lg rounded-2xl md:overflow-hidden bg-gradient-to-r from-violet-500 via-green-500 to-red-500 p-2 flex-col">
                    <SideBar />
                    <ChatScreen />
                </div>
            ) : (
                <Link href="/login">
                    <Button className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white hover:bg-green-600">
                        LOGIN TO CONTINUE
                    </Button>
                </Link>
            )}
        </div>
    );
}

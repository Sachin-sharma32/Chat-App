import React from "react";
import Chat from "./Chat";
import Chats from "./Chats";
import { useSelector } from "react-redux";
import Account from "./Account";

const ChatScreen = () => {
    const visiblity = useSelector((state) => state.user.chatScreenVisiblity);
    return (
        <div className=" rounded-lg bg-gray-50 md:w-[70%] flex flex-col md:flex-row">
            {visiblity ? <Chats /> : <Account />}
            <Chat />
        </div>
    );
};

export default ChatScreen;

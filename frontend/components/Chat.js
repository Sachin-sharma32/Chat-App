import TelegramIcon from "@mui/icons-material/Telegram";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoodIcon from "@mui/icons-material/Mood";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";

const Chat = () => {
    const selectedPerson = useSelector((state) => state.user.selectedPerson);
    const user = useSelector((state) => state.user.user);
    console.log(selectedPerson, user);
    const [conversations, setConversations] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [change, setChange] = useState(false);
    const [messages, setMessages] = useState(null);
    const [text, setText] = useState(null);
    console.log(text);
    const [image, setImage] = useState(null);
    const messageRef = useRef();

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        const response = await axios.post(
            "http://localhost:8000/api/uploads",
            formData
        );
        setImage(response.data);
        console.log(response.data);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/conversations/${user._id}`
                );
                setConversations(response.data.data.conversations);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetch();
    }, [change]);

    console.log(conversations);

    useEffect(() => {
        if (conversations && selectedPerson) {
            setConversation(
                conversations.filter((item) => {
                    return item.members.includes(selectedPerson._id);
                })
            );
        }
    }, [conversations, selectedPerson]);
    console.log(conversation);

    const createConversation = async () => {
        const response = await axios.post(
            "http://localhost:8000/api/conversations",
            {
                senderId: user._id,
                receiverId: selectedPerson._id,
            }
        );
        console.log(response);
        setChange((current) => !current);
    };
    console.log(change);

    useEffect(() => {
        if (conversation && conversation.length > 0) {
            const fetch = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/messages/${conversation[0]._id}`
                    );
                    console.log(response);
                    setMessages(response.data.data.messages);
                    setImage(response.data.data.image);
                    // messageRef.current.scrollIntoView({ behaviour: "smooth" });
                } catch (err) {
                    console.log(err.message);
                }
            };
            fetch();
        }
    }, [conversation, change]);

    console.log(messages);

    const sendMessage = async () => {
        const request = {
            conversationId: conversation[0]._id,
            senderId: user._id,
            message: text,
            image,
        };
        try {
            const response = await axios.post(
                "http://localhost:8000/api/messages",
                request
            );
            console.log(response);
            setText(null);
            setChange((current) => !current);
        } catch (err) {
            console.log(err);
        }
    };1

    return (
        <div className=" md:w-[50%] p-2 flex flex-col relative h-[30rem] md:h-auto">
            {selectedPerson && conversation && conversation.length > 0 && (
                <>
                    <div className=" flex relative text-xs w-[100%] shadow-lg p-2 bg-white rounded-lg items-center gap-2 h-[15%] lg:h-[10%]">
                        <div className=" rounded-full bg-black w-10 h-10 overflow-hidden flex justify-center items-center">
                            <img
                                src={selectedPerson.image}
                                width={50}
                                height={50}
                            />
                        </div>
                        <div>
                            <p>{selectedPerson.name}</p>
                            <p>Active</p>
                        </div>
                    </div>
                    <div className=" h-[90%] bg-white shadow-lg rounded-lg p-2 ">
                        <div className=" h-[90%] relative flex flex-col gap-2 overflow-y-scroll scrollbar">
                            {messages &&
                                messages.map((message) => (
                                    <div ref={messageRef}>
                                        {message && message.message && (
                                            <div
                                                className={` flex ${
                                                    message.senderId ===
                                                    user._id
                                                        ? " justify-start"
                                                        : " justify-end"
                                                }`}
                                            >
                                                <div
                                                    className={` w-32 p-2 rounded-2xl shadow-2xl ${
                                                        message.senderId ===
                                                        user._id
                                                            ? " bg-green-500 rounded-bl-none"
                                                            : " bg-gray-300 rounded-br-none"
                                                    }`}
                                                >
                                                    {message.message}
                                                </div>
                                            </div>
                                        )}
                                        {message && message.image && (
                                            <a href={message.image} download>
                                                <img
                                                    src={message.image}
                                                    className=" w-32 rounded-xl rounded-bl-none"
                                                />
                                            </a>
                                        )}
                                    </div>
                                ))}
                        </div>
                        <div className=" flex items-center shadow-lg p-2 rounded-lg gap-1 justify-between h-[10%]">
                            <KeyboardVoiceIcon className=" text-gray-500 cursor-pointer" />
                            <input
                                type="text"
                                className=" w-[90%] bg-white outline-none"
                                onChange={(e) => {
                                    setText(e.target.value);
                                }}
                                value={text}
                            />
                            <div className="flex gap-1 w-fit">
                                <div className=" relative">
                                    <AttachFileIcon className=" self-start text-gray-500 cursor-pointer" />
                                    <input
                                        type="file"
                                        className="w-6 absolute top-0 left-0 opacity-0 cursor-pointer"
                                        onChange={handleImage}
                                    />
                                </div>
                                <button onClick={sendMessage}>
                                    <TelegramIcon className=" self-start text-green-600 cursor-pointer" />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {conversation && conversation.length < 1 && (
                <Button
                    className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white hover:bg-green-600 text-xs"
                    onClick={createConversation}
                >
                    Start a Converdation with {selectedPerson.name}
                </Button>
            )}
        </div>
    );
};

export default Chat;

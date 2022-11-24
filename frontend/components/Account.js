import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import { useRouter } from "next/router";

const Account = () => {
    const [image, setImage] = useState(null);
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    // useEffect(() => {
    //     dispatch(setUser(JSON.parse(localStorage.getItem("currentUser"))));
    // }, []);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.passwordConfirm);
        }
    }, [user]);

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/uploads",
                formData
            );
            setImage(response.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const request = { name, email, password, image };
            const response = await axios.patch(
                `http://localhost:8000/api/users/${user._id}`,
                request
            );
            dispatch(setUser(response.data.data.user));
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className=" md:w-[50%] p-2 flex flex-col gap-10 justify-center items-center overflow-y-scroll scrollbar">
            <h2 className=" lg:text-4xl font-semibold">Update Account</h2>
            <form
                className=" flex flex-col w-[80%] justify-center items-center gap-4"
                onSubmit={submitHandler}
            >
                <div className=" lg:h-52 lg:w-52 md:h-24 md:w-24 h-52 w-52 flex justify-center rounded-full overflow-hidden relative ">
                    {image ? (
                        <img src={image} width={300} height={300} />
                    ) : user.image ? (
                        <img src={user.image} />
                    ) : (
                        <img src="women-1.jpg" alt="" />
                    )}
                    <div className=" absolute bottom-0 bg-white p-2 rounded-full opacity-80">
                        <EditIcon className=" text-black" />
                    </div>
                    <input
                        type="file"
                        className=" absolute bottom-0 opacity-0 cursor-pointer"
                        onChange={handleImage}
                    />
                </div>
                <input
                    type="text"
                    className=" bg-white border-2 border-black lg:h-16 rounded-lg px-4 py-2 outline-none w-[100%]"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black  lg:h-16 rounded-lg px-4 py-2 outline-none w-[100%]"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="text"
                    className=" bg-white border-2 border-black  lg:h-16 rounded-lg px-4 py-2 outline-none w-[100%]"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button
                    className=" bg-green-400 px-10 py-2 rounded-lg hover:bg-green-200 transition-all duration-200 w-full"
                    type="submit"
                >
                    UPDATE
                </button>
            </form>
        </div>
    );
};

export default Account;

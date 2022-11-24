import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPerson } from "../redux/userSlice";

const Chats = () => {
    const [people, setPeople] = useState(null);
    const [filterPeople, setFilterPeople] = useState(null);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [name, setName] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/users`
                );
                setPeople(response.data.data.users);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetch();
    }, []);
    console.log(people)

    useEffect(() => {
        if (people) {
            setFilterPeople(
                people.filter((people) => {
                    return people._id !== user._id;
                })
            );
        }
    }, [people]);

    const getResults = async () => {
        setFilterPeople(
            people.filter((person) => {
                return person.name.toLowerCase().includes(name);
            })
        );
    };

    console.log(filterPeople);

    return (
        <div className=" md:w-[50%] p-2 flex flex-col gap-10 overflow-y-scroll scrollbar">
            <div className=" h-[15%]">
                <h2 className=" text-3xl font-bold text-green-500 mb-4">
                    Chat
                </h2>
                <div className=" mb-10 border-2 p-2 bg-white flex gap-2 rounded-lg">
                    <input
                        type="text"
                        className=" bg-white outline-none w-[90%] text-gray-700"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <div>
                        <button onClick={getResults}>
                            <SearchIcon className=" cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 overflow-y-scroll h-[75%] scrollbar w-[100%]">
                {filterPeople ? (
                    filterPeople.map((people, index) => (
                        <div
                            key={index}
                            className=" flex relative text-xs w-[100%] h-[4rem] shadow-lg p-2 bg-white rounded-lg items-center gap-2 cursor-pointer"
                            onClick={() => {
                                dispatch(setSelectedPerson(people));
                            }}
                        >
                            <div className=" rounded-full bg-black w-10 h-10 overflow-hidden flex justify-center items-center">
                                <img src={people.image} />
                            </div>
                            <div>
                                <p>{people.name}</p>
                                <p>sachin is the best person</p>
                            </div>
                            <p className=" absolute top-1 right-2">15 March</p>
                        </div>
                    ))
                ) : (
                    <div>No user found</div>
                )}
            </div>
        </div>
    );
};

export default Chats;

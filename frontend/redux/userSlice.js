import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    chatScreenVisiblity: true,
    selectedPerson: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            console.log(state.user);
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        setChatScreenVisiblity: (state, action) => {
            state.chatScreenVisiblity = action.payload;
            console.log(state.chatScreenVisiblity);
        },
        setSelectedPerson: (state, action) => {
            state.selectedPerson = action.payload;
            console.log(state.selectedPerson);
            localStorage.setItem(
                "selectedPerson",
                JSON.stringify(action.payload)
            );
        },
    },
});

export default userSlice.reducer;
export const { setUser, setChatScreenVisiblity, setSelectedPerson } =
    userSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: '0', name: 'Dude Lebowski' },
    { id: '1', name: 'Neil Young' },
    { id: '2', name: 'Anthony Gray' },
    { id: '3', name: 'Rebecca white' },
    { id: '4', name: 'Dukeworth Graham' },
    { id: '5', name: 'Kendall Roy ' },
    { id: '10', name: 'Jeff Winger' },
];

const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{

    }
})

export const users=state=>state.users

export default userSlice.reducer
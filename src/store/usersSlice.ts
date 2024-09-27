import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Users {
    users: any[]
}
const initialState : Users = {
    users: [],
}

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: initialState,
    reducers: {
        setUsers: (state, action:PayloadAction<any>)=>{
            state.users = action.payload;
        }
    }
})

export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer;
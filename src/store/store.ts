import { configureStore } from "@reduxjs/toolkit"
import usersSliceReducer from './usersSlice'

export const store = configureStore({
    reducer: {
        users: usersSliceReducer
    }
})

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch


import { createSlice } from "@reduxjs/toolkit";

interface Auth {
    isloggedIn: boolean,
    id: string,
    name:string,
}
const initialState: Auth = {
    isloggedIn: false,
    id: '',
    name:''
}

const AuthSLice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isloggedIn = true,
                state.id = action.payload.id,
                state.name = action.payload.name
        },
        logout: (state, action) => {
            state.isloggedIn = false,
                state.id = '',
                state.name= 'false'
        }
    }
    
})

export const { login, logout } = AuthSLice.actions
export default AuthSLice.reducer
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";

export type Token = string
export type Infos = {
    [index: string]: unknown
}
export type UsersState = {
    token: Token
    infos: Infos
}

export type User = {
    email: string
    pass: string
}
export const loginAction = createAsyncThunk('users/loginAction', async (payload: User) => {
    const res = await http.post('users/login', payload)
    return res
})
export const infosAction = createAsyncThunk('users/infosAction', async () => {
    const res = await http.get('users/infos')
    return res
})
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        token: '',
        infos: {}
    } as UsersState,
    reducers: {
        updateToken(state, action: PayloadAction<Token>) {//更新Token
            state.token = action.payload
        },
        clearToken(state) {//清除Token
            state.token = ''
        },
        updateInfos(state, action: PayloadAction<Infos>) {//更新信息
            state.infos = action.payload
        }
    }
})

export const { updateToken, clearToken, updateInfos } = usersSlice.actions  //统一导出方法

export default usersSlice.reducer
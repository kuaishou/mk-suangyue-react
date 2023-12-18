import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";

export type Infos = {
    [index: string]: unknown
}
export type siginsState = {
    infos: Infos
}

export type Time = {
    userid: string
}
export const getTimeAction = createAsyncThunk('signs/getTimeAction', async (payload: Time) => {
    const res = await http.get('/signs/time', payload)
    return res
})
export const putTimeAction = createAsyncThunk('sigins/putTimeAction', async (payload: Time) => {
    const res = await http.put('signs/time', payload)
    return res
})
const siginsSlice = createSlice({
    name: 'signs',
    initialState: {
        infos: {}
    } as siginsState,
    reducers: {
        updateInfos(state, action: PayloadAction<Infos>) {//更新信息
            state.infos = action.payload
        }
    }
})

export const { updateInfos } = siginsSlice.actions  //统一导出方法

export default siginsSlice.reducer
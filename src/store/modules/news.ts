import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";

export type Info = {
    _id: string
    userid: string
    applicant?: boolean
    approver?: boolean
}
export type NewsState = {
    info: Info
}

export type getRemind = {
    userid: string
}
export type putRemind = {
    userid: string
    applicant?: boolean
    approver?: boolean
}

export const getRemindAction = createAsyncThunk('news/getRemindAction', async (payload: getRemind) => {
    const res = await http.get('/news/remind', payload)
    return res
})
export const putRemindAction = createAsyncThunk('news/putRemindAction', async (payload: putRemind) => {
    const res = await http.put('/news/remind', payload)
    return res
})
const newsSlice = createSlice({
    name: 'news',
    initialState: {
        info: {}
    } as NewsState,
    reducers: {
        updateNewsInfos(state, action: PayloadAction<Info>) {//更新信息
            state.info = action.payload
        }
    }
})

export const { updateNewsInfos } = newsSlice.actions  //统一导出方法

export default newsSlice.reducer
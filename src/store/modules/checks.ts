import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";

export type Infos = {
    [index: string]: unknown
}
export type siginsState = {
    applyList: Infos[]
    chectList: Infos[]
}

export type GetApply = {
    applicantid: string;
    approverid?: string;
}
export type PostApply = {
    applicantid: string;
    applicantname: string;
    approverid: string;
    approvername: string;
    reason: string;
    note: string;
    time: [string, string]
    state: string;
}
export type PutApply = {
    _id: string;
    state: '已通过' | '未通过';
}

export const getApplyAction = createAsyncThunk('checks/getApplyAction', async (payload: GetApply) => {
    const res = await http.get('checks/apply', payload)
    return res
})
export const postApplyAction = createAsyncThunk('checks/postApplyAction', async (payload: PostApply) => {
    const res = await http.post('checks/apply', payload)
    return res
})
export const putApplyAction = createAsyncThunk('checks/putApplyAction', async (payload: PostApply) => {
    const res = await http.put('checks/apply', payload)
    return res
})

const checksSlice = createSlice({
    name: 'signs',
    initialState: {
        applyList: [],
        chectList: []
    } as siginsState,
    reducers: {
        updateApplyList(state, action: PayloadAction<Infos[]>) {//更新信息
            state.applyList = action.payload
        },
        updateChectList(state, action: PayloadAction<Infos[]>) {//更新信息
            state.applyList = action.payload
        }
    }
})

export const { updateApplyList, updateChectList } = checksSlice.actions  //统一导出方法

export default checksSlice.reducer
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../utils/http";

export type Infos = {
    [index: string]: unknown
}
export type siginsState = {
    applyList: Infos[]
    checkList: Infos[]
}

export type GetApply = {
    applicantid?: string;
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
export const putApplyAction = createAsyncThunk('checks/putApplyAction', async (payload: PutApply) => {
    const res = await http.put('checks/apply', payload)
    return res
})

const checksSlice = createSlice({
    name: 'signs',
    initialState: {
        applyList: [],
        checkList: []
    } as siginsState,
    reducers: {
        updateApplyList(state, action: PayloadAction<Infos[]>) {//更新信息
            state.applyList = action.payload
        },
        updateCheckList(state, action: PayloadAction<Infos[]>) {//更新信息
            state.checkList = action.payload
        }
    }
})

export const { updateApplyList, updateCheckList } = checksSlice.actions  //统一导出方法

export default checksSlice.reducer
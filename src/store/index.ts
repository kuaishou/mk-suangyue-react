import { AnyAction, Reducer, configureStore } from '@reduxjs/toolkit'
import usersReducer, { UsersState } from './modules/users'

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { useDispatch } from 'react-redux'
import { PersistPartial } from 'redux-persist/es/persistReducer'

const persistConfig = {//持久化配置
    key: 'root',
    version: 1,
    storage,
    whitelist: ['token']
}
const store = configureStore({
    reducer: {
        users: persistReducer(persistConfig, usersReducer) as Reducer<UsersState & PersistPartial, AnyAction>,//选择只持久化counter模块
    },
    middleware: (getDefaultMiddleware) =>//持久化配置
        getDefaultMiddleware({
            // serializableCheck: {
            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // },
            serializableCheck: false
        }),
})

persistStore(store)//数据持久化

//导出类型和dispatch方法
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispath: () => AppDispatch = useDispatch

export default store



import React from 'react'
import { Navigate, matchRoutes, useLocation } from 'react-router-dom'
import { routes } from '../../router'
import { infosAction, updateInfos } from '../../store/modules/users'
import { RootState, useAppDispath } from '../../store'
import _ from "lodash"
import { useSelector } from 'react-redux'

interface BeforeEachProps {
    children?: React.ReactNode
}
const BeforeEach: React.FC<BeforeEachProps> = (props) => {
    const { children } = props
    const token = useSelector((store: RootState) => store.users.token)
    const infos = useSelector((store: RootState) => store.users.infos)
    const dispatch = useAppDispath()
    const location = useLocation()
    const matchs = matchRoutes(routes, location)
    if (Array.isArray(matchs)) {
        const meta = matchs[matchs.length - 1].route.meta
        if (meta?.auth) {
            if (token) {
                dispatch(infosAction()).then((action) => {
                    const { errcode, token } = (action.payload as { [index: string]: unknown }).data as { [index: string]: unknown }
                    if (errcode === 0) {
                        dispatch(updateInfos(infos))
                    }
                })
            } else {
                return <Navigate to='./login' />
            }
        }
    }
    if (token && location.pathname === '/login') {
        return <Navigate to='/' />
    }

    return <>{children}</>
}

export default BeforeEach
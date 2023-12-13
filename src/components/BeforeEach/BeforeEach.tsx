import React from 'react'
import { Navigate, matchRoutes, useLocation } from 'react-router-dom'
import { routes } from '../../router'

interface BeforeEachProps {
    children?: React.ReactNode
}
const BeforeEach: React.FC<BeforeEachProps> = (props) => {
    const { children } = props

    const location = useLocation()
    const matchs = matchRoutes(routes, location)
    if (Array.isArray(matchs)) {
        // const meta = matchs[matchs.length - 1].route.meta
        // if (meta?.auth) {
        //     return <Navigate to='./login' />
        // }
    }
    return <>
        {children}
    </>
}

export default BeforeEach
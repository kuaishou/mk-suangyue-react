import React, { lazy } from "react"
import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom"
import { CalendarOutlined, CopyFilled, FileAddFilled, ScheduleFilled, ScheduleOutlined, WarningFilled } from "@ant-design/icons"

const Home = lazy(() => import('../views/Home/Home'))
const Sign = lazy(() => import('../views/Sign/Sign'))
const Check = lazy(() => import('../views/Check/Check'))
const Exception = lazy(() => import('../views/Exception/Exception'))
const Apply = lazy(() => import('../views/Apply/Apply'))
const Login = lazy(() => import('../views/Login/Login'))
const BeforeEach = lazy(() => import('../components/BeforeEach/BeforeEach'))
const NotAuth = lazy(() => import('../views/NotAuth/NotAuth'))
const NotFound = lazy(() => import('../views/NotFound/NotFound'))
const NotServer = lazy(() => import('../views/NotServer/NotServer'))

declare module 'react-router' {
    interface IndexRouteObject {
        meta?: {
            menu?: boolean
            title?: string
            icon?: React.ReactNode
            auth?: boolean
        },
        name?: string
    }
    interface NonIndexRouteObject {
        meta?: {
            menu?: boolean
            title?: string
            icon?: React.ReactNode
            auth?: boolean
        },
        name?: string
    }
}



export const routes: RouteObject[] = [
    {//重定向到二级页面sign
        path: '/',
        element: React.createElement(Navigate, { to: '/sign' }),
    },
    {
        path: '/',
        name: 'home',
        element: React.createElement(BeforeEach, null, React.createElement(Home)),
        meta: {
            menu: true,
            title: '考勤管理',
            icon: React.createElement(CopyFilled),
            auth: true,
        },
        children: [
            {
                path: 'sign',
                name: 'sign',
                meta: {
                    menu: true,
                    title: '在线打卡签到',
                    icon: React.createElement(CalendarOutlined),
                    auth: true,
                },
                element: React.createElement(Sign),
            },
            {
                path: 'exception',
                name: 'exception',
                meta: {
                    menu: true,
                    title: '异常考勤查询',
                    icon: React.createElement(WarningFilled),
                    auth: true,
                },
                element: React.createElement(Exception),
            },
            {
                path: 'apply',
                name: 'apply',
                meta: {
                    menu: true,
                    title: '添加考勤审批',
                    icon: React.createElement(FileAddFilled),
                    auth: true,
                },
                element: React.createElement(Apply),
            },
            {
                path: 'check',
                name: 'check',
                meta: {
                    menu: true,
                    title: '我的考勤审批',
                    icon: React.createElement(ScheduleOutlined),
                    auth: true,
                },
                element: React.createElement(Check),
            },
        ]
    },
    {
        path: 'login',
        element: React.createElement(BeforeEach, null, React.createElement(Login)),
    },
    {
        path: '/403',
        element: React.createElement(NotAuth)
    },
    {
        path: '/404',
        element:  React.createElement(NotFound)
    },
    {
        path: '/500',
        element: React.createElement(NotServer),
    },
    {
        path: '*',
        element: React.createElement(Navigate, { to: '/404' }),
    },
]

const router = createBrowserRouter(routes)

export default router
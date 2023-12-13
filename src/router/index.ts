import React, { lazy } from "react"
import { RouteObject, createBrowserRouter } from "react-router-dom"
import { CalendarOutlined, CopyFilled, FileAddFilled, ScheduleFilled, ScheduleOutlined, WarningFilled } from "@ant-design/icons"

const Home = lazy(() => import('../views/Home/Home'))
const Sign = lazy(() => import('../views/Sign/Sign'))
const Check = lazy(() => import('../views/Check/Check'))
const Exception = lazy(() => import('../views/Exception/Exception'))
const Apply = lazy(() => import('../views/Apply/Apply'))
const Login = lazy(() => import('../views/Login/Login'))
const NotAuth = lazy(() => import('../views/NotAuth/NotAuth'))
const NotFound = lazy(() => import('../views/NotFound/NotFound'))
const NotServer = lazy(() => import('../views/NotServer/NotServer'))
const BeforeEach = lazy(() => import('../components/BeforeEach/BeforeEach'))

declare module 'react-router' {
    interface IndexRouteObject {
        meta?: {
            menu?: boolean
            title?: string
            icon?: React.ReactNode
            auth?: boolean
        }
    }
    interface NonIndexRouteObject {
        meta?: {
            menu?: boolean
            title?: string
            icon?: React.ReactNode
            auth?: boolean
        }
    }
}



export const routes: RouteObject[] = [
    {
        path: '/',
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

]

const router = createBrowserRouter(routes)

export default router
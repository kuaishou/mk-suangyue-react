import React from "react"
import { RouteObject, createBrowserRouter } from "react-router-dom"
import Apply from "../views/Apply/Apply"
import Check from "../views/Check/Check"
import Exception from "../views/Exception/Exception"
import Home from "../views/Home/Home"
import Login from "../views/Login/Login"
// import NotAuth from "../views/NotAuth/NotAuth"
// import NotFound from "../views/NotFound/NotFound"
// import NotServer from "../views/NotServer/NotServer"
import Sign from "../views/Sign/Sign"



const routes: RouteObject[] = [
    {
        path: '/',
        element: React.createElement(Home),
        children: [
            {
                path: 'sign',
                element: React.createElement(Sign),
            },
            {
                path: 'exception',
                element: React.createElement(Exception),
            },
            {
                path: 'apply',
                element: React.createElement(Apply),
            },
            {
                path: 'check',
                element: React.createElement(Check),
            },
        ]
    },
    {
        path: 'login',
        element: React.createElement(Login),
    },

]

const router = createBrowserRouter(routes)

export default router
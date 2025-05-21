import { createBrowserRouter } from "react-router"
import Home from "./components/nav-bar/Home"
import About from "./components/nav-bar/About"
import AppLayout from "./components/nav-bar/AppLayout"
import Register from "./components/login/Register"
import Contact from "./components/nav-bar/Contact"
import Profile from "./components/login/Profile"
import AllFilesList from "./components/musicFiles/AllFilesList"
import Login from "./components/login/Login"

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/register', element: <Register /> },
            { path: '/login', element: <Login /> },
            { path: '/conect', element: <Contact /> },
            { path: '/profile', element: <Profile /> },
            { path: '/AllFilesList', element: <AllFilesList /> }


        ]
    }
])

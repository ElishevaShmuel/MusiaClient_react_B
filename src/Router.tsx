import {createBrowserRouter} from "react-router"
import Home from "./components/nav-bar/Home"
import About from "./components/nav-bar/About"
import AppLayout from "./components/nav-bar/AppLayout"

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> }
          
        ]
    }
])

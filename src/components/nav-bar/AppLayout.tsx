import { Outlet } from "react-router"
import NavBar from "../nav-bar/NavBar"

const AppLayout = () => {
    
    return (
        <>
            <div style={{ position: 'relative' }}>
    <NavBar />
            </div>
            <Outlet />
        </>
    )
}

export default AppLayout
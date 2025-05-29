import type React from "react"
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"
import Chatbot from "../chatbot/Chatbot"

const AppLayout: React.FC = () => {
  return (
    <>
      <div style={{ position: "relative" }} >
        <NavBar />
      </div>
      <Outlet />
      <Chatbot />
    </>
  )
}

export default AppLayout

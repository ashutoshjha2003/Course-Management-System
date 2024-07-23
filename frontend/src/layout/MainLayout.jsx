import { Outlet } from "react-router-dom"
import NavBar from "../Components/Headers/NavBar"
import Footer from "../Components/Headers/Footer"

const MainLayout = () => {
  return (
    <main className="dark:bg-black overflow-hidden">
        <NavBar />
        <Outlet />
        <Footer />
    </main>
  )
}

export default MainLayout
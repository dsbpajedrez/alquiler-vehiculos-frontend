import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "./MainLayout.css"

export default function MainLayout({ children }) {
    return(
        <div className="main-layout">
            <Sidebar />
            <div className="main-layout__content">
                <Navbar />
                <main className="main-layout__main">
                    {children}
                </main>
            </div>
        </div>
    )

}

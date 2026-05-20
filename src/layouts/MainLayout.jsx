import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function MainLayout({ children }) {
    return(
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <Navbar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    )

}
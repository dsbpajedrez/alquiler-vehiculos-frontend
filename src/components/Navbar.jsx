import { Link } from "react-router-dom";

export default function Navbar() {
    return (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">
        Sistema de Alquiler de Vehículos
      </h2>
      <div>
        <span className="text-gray-500">
          Bienvenido
        </span>
      </div>
    </header>
    )
}
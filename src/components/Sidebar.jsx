import {
  NavLink,
} from "react-router-dom";

export default function Sidebar() {

  return (

    <aside
      className="w-64 bg-gray-900 text-white min-h-screen p-6">

      <h1
        className="text-2xl font-bold mb-10">
        Alquiler de Vehículos
      </h1>

      <nav className="flex flex-col gap-4" >

        <NavLink to="/vehicles" className=" hover:text-blue-400">
          Vehículos
        </NavLink>

        <NavLink to="/operations" className="hover:text-blue-400">
          Operaciones
        </NavLink>

      </nav>

    </aside>
  );
}
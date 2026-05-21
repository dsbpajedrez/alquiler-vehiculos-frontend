import {
  NavLink,
} from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {

  return (

    <aside
      className="sidebar">

      <h1
        className="sidebar__title">
        Alquiler de Vehículos
      </h1>

      <nav className="sidebar__nav" >

        <NavLink to="/vehicles" className="sidebar__link">
          Vehículos
        </NavLink>

        <NavLink to="/operations" className="sidebar__link">
          Operaciones
        </NavLink>
        <NavLink to="/admin" className="sidebar__link">
          Admin
        </NavLink>

      </nav>

    </aside>
  );
}

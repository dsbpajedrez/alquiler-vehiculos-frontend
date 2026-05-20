import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      className="
        w-64
        bg-white
        shadow-md
        min-h-screen
        p-4
      "
    >
      <nav>
        <ul className="space-y-4">

          <li>
            <Link
              to="/"
              className="hover:text-blue-600"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/vehicles"
              className="hover:text-blue-600"
            >
              Vehículos
            </Link>
          </li>

          <li>
            <Link
              to="/operations"
              className="hover:text-blue-600"
            >
              Operaciones
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
}
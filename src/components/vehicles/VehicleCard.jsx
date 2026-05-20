import { Link } from "react-router-dom";

export default function VehicleCard({
  vehicle,
}) {

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-5
        transition
        hover:shadow-xl
      "
    >

      <h2
        className="
          text-2xl
          font-bold
          mb-2
        "
      >
        {vehicle.brand}
      </h2>

      <p>
        <span className="font-semibold">
          Modelo:
        </span>

        {" "}

        {vehicle.model}
      </p>

      <p>
        <span className="font-semibold">
          Año:
        </span>

        {" "}

        {vehicle.year}
      </p>

      <p
        className={`
          mt-2
          font-bold
          ${
            vehicle.available
              ? "text-green-600"
              : "text-red-600"
          }
        `}
      >

        {vehicle.available
          ? "Disponible"
          : "No disponible"}

      </p>

      <Link
        to={`/vehicles/${vehicle.id}`}

        className="
          inline-block
          mt-4
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          hover:bg-blue-700
        "
      >
        Ver detalle
      </Link>

    </div>
  );
}
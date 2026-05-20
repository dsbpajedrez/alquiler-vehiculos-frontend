import { Link } from "react-router-dom";

export default function VehicleCard({
  vehicle,
}) {

  return (
   <div
      key={vehicle.id}
      className=" bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2 ">

      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        alt={vehicle.brand}

        className="h-52 w-full object-cover"
      />

      <div className="p-6">

        <div
          className="flex justify-between items-center mb-4"
        >

          <h2
            className="text-2xl font-bold">
            {vehicle.brand}
          </h2>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold
              ${
                vehicle.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }
            `}
          >

            {
              vehicle.available
                ? "Disponible"
                : "Alquilado"
            }

          </span>

        </div>

        <p
          className="
            text-gray-600
            mb-2
          "
        >
          Modelo:
          {" "}
          {vehicle.model}
        </p>

        <p
          className="
            text-gray-600
            mb-6
          "
        >
          Año:
          {" "}
          {vehicle.year}
        </p>

        <Link to={`/vehicles/${vehicle.id}`}
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition duration-300 cursor-pointer"
        >

          Ver detalle

        </Link>

      </div>

    </div>

  );
}
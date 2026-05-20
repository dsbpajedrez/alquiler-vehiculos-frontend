import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getVehicleById
} from "../services/vehicle.service";

export default function VehicleDetail() {

  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {

    loadVehicle();

  }, [id]);

  const loadVehicle = async () => {

    try {

      setLoading(true);

      const data = await getVehicleById(id);

      setVehicle(data.data);

    } catch (err) {

      console.error(err);

      setError("Error loading vehicle")

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <h2>Loading vehicle...</h2>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!vehicle) {
    return (
      <h2>Vehicle not found</h2>
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-xl
        shadow-md
        p-8
        max-w-2xl
      "
    >

      <h1
        className="
          text-4xl
          font-bold
          mb-6
        "
      >
        {vehicle.brand}
      </h1>

      <div className="space-y-4">

        <p>
          <span className="font-bold">
            Modelo:
          </span>

          {" "}

          {vehicle.model}
        </p>

        <p>
          <span className="font-bold">
            Año:
          </span>

          {" "}

          {vehicle.year}
        </p>

        <p>
          <span className="font-bold">
            Estado:
          </span>

          {" "}

          <span
            className={
              vehicle.available
                ? "text-green-600"
                : "text-red-600"
            }
          >

            {vehicle.available
              ? "Disponible"
              : "No disponible"}

          </span>
        </p>

      </div>

      <button
        disabled={!vehicle.available}

        className={`
          mt-8
          px-6
          py-3
          rounded-lg
          text-white
          font-bold

          ${
            vehicle.available
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400"
          }
        `}
      >

        Alquilar vehículo

      </button>

    </div>
  );
}
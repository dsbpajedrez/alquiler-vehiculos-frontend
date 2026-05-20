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
import { cancelRent, registerOperation } from "../services/operations.service";

export default function VehicleDetail() {

  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [rentLoading, setRentLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


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

  const handleRent = async () => {
    
    setRentLoading(true);
    try {
      const vehicleToRegister = {
        carId: vehicle.id,
        userId: 1,
        rentalDate: new Date(),
        returnDate: new Date(),
        isActive: true
      }
      await registerOperation(vehicleToRegister);
      setSuccessMessage("Vehículo alquilado exitosamente");
      loadVehicle();
    } catch (error) {
      console.error("Error registering operation:", error);
    } finally {
      setRentLoading(false);
      setSuccessMessage("");
    }
  };

    const handelCancelRent = async () => {
      setCancelLoading(true);
      try {
        await cancelRent(vehicle.id);
        setSuccessMessage("Alquiler cancelado exitosamente");
        loadVehicle();
      }
      catch (error) {
        console.error("Error canceling rental:", error);
      }
      finally {
        setCancelLoading(false);
        setSuccessMessage("");
      }
    }

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
      <div className="flex justify-around">
        {
          successMessage && (

            <div
              className="
                mt-6
                bg-green-100
                text-green-700
                p-4
                rounded-lg
              "
            >
              {successMessage}
            </div>

          )
        }
      <button
        disabled={!vehicle.available}
        onClick={()=>handleRent()}
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

        {
          rentLoading
            ? "Procesando..."
            : "Alquilar vehículo"
        }

      </button>

      <button 
      className={`
          mt-8
          px-6
          py-3
          rounded-lg
          text-white
          font-bold

          ${
            vehicle.available
              ?  "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      disabled={vehicle.available}
      onClick={() => handelCancelRent()}
      >
        {
          cancelLoading ? "Procesando..." : "Cancelar alquiler"
        }
      </button>

      </div>

    </div>
  );
}
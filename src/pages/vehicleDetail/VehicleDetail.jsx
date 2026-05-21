import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getVehicleById
} from "../../services/vehicle.service";
import { cancelRent, registerOperation } from "../../services/operations.service";
import "./VehicleDetail.css";

export default function VehicleDetail() {

  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [rentLoading, setRentLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


  const loadVehicle = useCallback(async () => {

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
  }, [id]);

  useEffect(() => {

    loadVehicle();

  }, [loadVehicle]);

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
      className="vehicle-detail"
    >

      <h1
        className="vehicle-detail__title"
      >
        {vehicle.brand}
      </h1>

      <div className="vehicle-detail__info">

        <p>
          <span className="vehicle-detail__label">
            Modelo:
          </span>

          {" "}

          {vehicle.model}
        </p>

        <p>
          <span className="vehicle-detail__label">
            Año:
          </span>

          {" "}

          {vehicle.year}
        </p>

        <p>
          <span className="vehicle-detail__label">
            Estado:
          </span>

          {" "}

          <span
            className={
              vehicle.available
                ? "vehicle-detail__status vehicle-detail__status--available"
                : "vehicle-detail__status vehicle-detail__status--unavailable"
            }
          >

            {vehicle.available
              ? "Disponible"
              : "No disponible"}

          </span>
        </p>

      </div>
      <div className="vehicle-detail__actions">
        {
          successMessage && (

            <div
              className="vehicle-detail__message"
            >
              {successMessage}
            </div>

          )
        }
      <button
        disabled={!vehicle.available}
        onClick={()=>handleRent()}
        className={`vehicle-detail__button ${
            vehicle.available
              ? "vehicle-detail__button--primary"
              : "vehicle-detail__button--disabled"
          }`}
      >

        {
          rentLoading
            ? "Procesando..."
            : "Alquilar vehículo"
        }

      </button>

      <button 
      className={`vehicle-detail__button ${
          vehicle.available
            ?  "vehicle-detail__button--disabled"
            : "vehicle-detail__button--primary"
        }`}
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

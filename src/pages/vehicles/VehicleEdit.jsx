import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getVehicleById, updateVehicle } from "../../services/vehicle.service";
import VehicleForm from "../../components/vehicles/VehicleForm/VehicleForm";
import "./VehicleEdit.css";

const LOADING_MESSAGE = "Cargando vehículo...";
const NOT_FOUND_MESSAGE = "Vehículo no encontrado";
const ERROR_LOADING_MESSAGE = "Error al cargar el vehículo";
const ERROR_UPDATING_MESSAGE = "Error al actualizar el vehículo";
const SUCCESS_MESSAGE = "Vehículo actualizado exitosamente";

export default function VehicleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  /**
   * Carga los datos del vehículo al montar el componente
   */
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        setLoading(true);
        setError(null);
        const vehicleData = await getVehicleById(id);
        setVehicle(vehicleData.data);
      } catch (err) {
        const errorMessage = `${ERROR_LOADING_MESSAGE}: ${err.message}`;
        setError(errorMessage);
        console.error("Error al obtener vehículo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleData();
  }, [id]);

  /**
   * Maneja la actualización del vehículo
   * @param {Object} vehicleData - Datos actualizados del vehículo
   */
  const handleUpdateVehicle = async (vehicleData) => {
    try {
      setUpdateError(null);
      await updateVehicle(id, vehicleData);
      alert(SUCCESS_MESSAGE);
      navigate("/admin");
    } catch (err) {
      const errorMessage = `${ERROR_UPDATING_MESSAGE}: ${err.message}`;
      setUpdateError(errorMessage);
      console.error("Error al actualizar vehículo:", err);
    }
  };

  const handleNavigateToAdmin = () => {
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="vehicle-edit-page">
        <div className="vehicle-edit-page__loading">{LOADING_MESSAGE}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vehicle-edit-page">
        <div className="vehicle-edit-page__error">{error}</div>
        <button
          onClick={handleNavigateToAdmin}
          className="vehicle-edit-page__back-button"
        >
          Volver al panel de administración
        </button>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="vehicle-edit-page">
        <div className="vehicle-edit-page__error">{NOT_FOUND_MESSAGE}</div>
        <button
          onClick={handleNavigateToAdmin}
          className="vehicle-edit-page__back-button"
        >
          Volver al panel de administración
        </button>
      </div>
    );
  }

  return (
    <div className="vehicle-edit-page">
      <h1 className="vehicle-edit-page__title">
        Editar vehículo: {vehicle.brand} {vehicle.model}
      </h1>

      {updateError && (
        <div className="vehicle-edit-page__error">{updateError}</div>
      )}

      <VehicleForm
        initialData={vehicle}
        onSubmit={handleUpdateVehicle}
        submitText="Actualizar vehículo"
      />

      <button
        onClick={handleNavigateToAdmin}
        className="vehicle-edit-page__back-button"
      >
        Cancelar
      </button>
    </div>
  );
}

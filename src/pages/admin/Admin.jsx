import { Link } from "react-router-dom";
import { useVehicles } from "../../hooks/useVehicles";
import { deleteVehicle } from "../../services/vehicle.service";
import "./Admin.css";

const DELETION_CONFIRMATION_MESSAGE = (brand, model) =>
  `¿Está seguro de que desea eliminar el vehículo ${brand} ${model}? Esta acción no se puede deshacer.`;

const DELETION_SUCCESS_MESSAGE = "Vehículo eliminado exitosamente";
const DELETION_ERROR_MESSAGE = "Error al eliminar el vehículo";

export default function Admin() {
  const { vehicles, loading, error, setVehicles } = useVehicles();

  const handleDeleteVehicle = async (vehicleId, vehicleBrand, vehicleModel) => {
    const isConfirmed = window.confirm(
      DELETION_CONFIRMATION_MESSAGE(vehicleBrand, vehicleModel)
    );

    if (!isConfirmed) return;

    try {
      await deleteVehicle(vehicleId);
      const updatedVehicles = vehicles.filter((v) => v.id !== vehicleId);
      setVehicles(updatedVehicles);
      alert(DELETION_SUCCESS_MESSAGE);
    } catch (err) {
      console.error("Error al eliminar vehículo:", err);
      alert(`${DELETION_ERROR_MESSAGE}: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-page__loading">Cargando vehículos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-page__error">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Administración de vehículos</h1>
          <p className="admin-page__subtitle">Gestiona el inventario</p>
        </div>
        <Link
          to="/admin/vehicles/create"
          className="admin-page__create-button"
        >
          + Crear vehículo
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Año</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} className="admin-table__row">
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>
                  <span
                    className={`admin-table__badge ${
                      vehicle.available
                        ? "admin-table__badge--available"
                        : "admin-table__badge--unavailable"
                    }`}
                  >
                    {vehicle.available ? "Disponible" : "Alquilado"}
                  </span>
                </td>
                <td>
                  <div className="admin-table__actions">
                    <Link
                      to={`/admin/vehicles/edit/${vehicle.id}`}
                      className="admin-table__button admin-table__button--edit"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() =>
                        handleDeleteVehicle(
                          vehicle.id,
                          vehicle.brand,
                          vehicle.model
                        )
                      }
                      className="admin-table__button admin-table__button--delete"
                      title="Eliminar vehículo"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

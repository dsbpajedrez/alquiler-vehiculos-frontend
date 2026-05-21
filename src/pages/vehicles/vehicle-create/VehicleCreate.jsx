import { useNavigate } from "react-router-dom";
import { createVehicle } from "../../../services/vehicle.service";
import VehicleForm from "../../../components/vehicles/VehicleForm/VehicleForm";

export default function CreateVehicle() {
    const navigate = useNavigate();
    const handleCreate = async (vehicleData) => {
        try {
            await createVehicle(vehicleData);
            navigate("/vehicles");
        } catch (error) {
            console.error("Error al crear el vehículo:", error);
        }
    }

    return (
        <div className="vehicle-create-page">
            <h1 className="vehicle-create-page__title">
                Crear nuevo vehículo
            </h1>
            <VehicleForm onSubmit={handleCreate} submitText="Crear vehículo" />
        </div>
    )
}
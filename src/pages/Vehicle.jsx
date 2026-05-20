import { useCallback, useEffect, useState } from "react";
import { getVehicles } from "../services/vehicle.service";
import VehicleCard from "../components/vehicles/VehicleCard";
import "./Vehicle.css";

export default function Vehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadVehicles = useCallback(async () => {
        try {
            const response = await getVehicles()
            setVehicles(response.data);
        }catch (error) {
            console.error(error);
            setError("Error loading vehicles");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadVehicles();
    }, [loadVehicles]);

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div className="vehicle-page">
            <h1 className="vehicle-page__title">
                Listado de vehículos
            </h1>
            <div className="vehicle-page__grid">

                {vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}

            </div>
        </div>
    )
}

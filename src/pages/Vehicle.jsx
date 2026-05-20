import { useEffect, useState } from "react";
import { getVehicles } from "../services/Vehicle.service";
import VehicleCard from "../components/vehicles/VehicleCard";

export default function Vehicle() {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const response = await getVehicles()
            setVehicles(response.data);
        }catch (error) {
            console.error(error);
            setError("Error loading vehicles");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <div>
            <h1 className="text-2xl font-bold">
                Vehiculos
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}

            </div>
        </div>
    )
}
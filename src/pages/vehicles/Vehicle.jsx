import { useCallback, useEffect, useState } from "react";
import { getVehicles } from "../../services/vehicle.service";
import VehicleCard from "../../components/vehicles/VehicleCard";
import "./Vehicle.css";
import { useVehicles } from "../../hooks/useVehicles";

export default function Vehicle() {
    const {vehicles, loading, error} = useVehicles();
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

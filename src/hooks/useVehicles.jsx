import { useEffect, useState } from "react";
import { getVehicles } from "../services/vehicle.service";


export const useVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
       loadVehicles();
    }, []);

    const loadVehicles = async () => {
        setLoading(true);
        setError(null);
        try {
            const vehiclesData = await getVehicles();
            setVehicles(vehiclesData.data);
        }
        catch (err) {
            setError(err);
        }
        finally {
            setLoading(false);
        }
    }
    return { vehicles, loading, error };
};
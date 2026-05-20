import { useCallback, useEffect, useState } from "react";
import { cancelRent, getOperations } from "../services/operations.service";
import "./Operations.css";

export default function Operations() {
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadOperations = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getOperations();
            setOperations(data);
        } catch (err) {
            console.error(err);
            setError("Error loading operations")
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadOperations()
    }, [loadOperations])

    const handleCancel = async (operationId) => {
        try {
            await cancelRent(operationId);
            loadOperations();
        } catch (err) {
            console.error(err);
            setError("Error canceling rental");
        }
    }

    if(loading) {
        return <p>Loading...</p>
    }
    if(error) {
        return <p>{error}</p>
    }

    return (
        <div className="operations-page">
            <h1 className="operations-page__title">Operations</h1>
            <div className="operations-page__table-wrapper">
                <table className="operations-page__table">
                    <thead>
                        <tr className="operations-page__head-row">
                            <th className="operations-page__head-cell">Operacion ID</th>
                            <th className="operations-page__head-cell">Usuario ID</th>
                            <th className="operations-page__head-cell">Vehículo</th>
                            <th className="operations-page__head-cell">Status</th>
                            <th className="operations-page__head-cell">Fecha renta</th>
                            <th className="operations-page__head-cell">Fecha entrega</th>
                            <th className="operations-page__head-cell">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations.map((operation) => (
                            <tr key={operation.id} className="operations-page__row">
                                <td className="operations-page__cell">{operation.id}</td>
                                <td className="operations-page__cell">{operation.userId}</td>
                                <td className="operations-page__cell">{operation.carId}</td>
                                <td className="operations-page__status-cell">
                                 <span   className={operation.isActive ? "operations-page__status operations-page__status--active" : "operations-page__status operations-page__status--inactive"}>
                                        {
                                        operation.isActive
                                            ? "Activa"
                                            : "Cancelada"
                                        }
                                </span>

                                </td>
                                <td className="operations-page__cell">{operation.rentalDate}</td>
                                <td className="operations-page__cell">{operation.returnDate}</td>
                                <td className="operations-page__cell">
                                    {operation.isActive && (
                                        <button
                                            onClick={() => handleCancel(operation.carId)}
                                            className="operations-page__cancel-button"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

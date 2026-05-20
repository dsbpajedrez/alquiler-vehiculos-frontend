import { useEffect, useState } from "react";
import { cancelRent, getOperations } from "../services/operations.service";

export default function Operations() {
    const [operations, setOperations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        loadOperations()
    }, [])

    const loadOperations = async () => {
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
    }

    const handleCancel = async (operationId) => {
        try {
            await cancelRent(operationId);
            setSuccessMessage("Rental canceled successfully");
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
        <div>
            <h1 className="text-3xl font-bold mb-6">Operations</h1>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="py-2 px-4 border-b">Operacion ID</th>
                            <th className="py-2 px-4 border-b">Usuario ID</th>
                            <th className="py-2 px-4 border-b">Vehículo</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Fecha renta</th>
                            <th className="py-2 px-4 border-b">Fecha entrega</th>
                            <th className="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations.map((operation) => (
                            <tr key={operation.id} className="border-b">
                                <td className="py-2 px-4">{operation.id}</td>
                                <td className="py-2 px-4">{operation.userId}</td>
                                <td className="py-2 px-4">{operation.carId}</td>
                                <td className="p-4">
                                 <span   className={operation.isActive ? "text-green-600" : "text-red-600"}>
                                        {
                                        operation.isActive
                                            ? "Activa"
                                            : "Cancelada"
                                        }
                                </span>

                                </td>
                                <td className="py-2 px-4">{operation.rentalDate}</td>
                                <td className="py-2 px-4">{operation.returnDate}</td>
                                <td className="py-2 px-4">
                                    {operation.isActive && (
                                        <button
                                            onClick={() => handleCancel(operation.carId)}
                                            className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
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
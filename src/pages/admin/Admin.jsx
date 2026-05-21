import { Link } from "react-router-dom";
import { useVehicles } from "../../hooks/useVehicles";
import "./Admin.css";

export default function Admin() {

    const {vehicles, loading, error} = useVehicles();

    if(loading) {
        return <div>Loading...</div>
    }
    
    if(error) {
        return <div>Error: {error.message}</div>
    }
    return (
        <div>
        <div className="admin-page">
            <div>
                <h1 className="admin-page_title">
                    Administración de vehículos
                </h1>
                <p> Gestiona el inventario</p>
                </div>
                <Link to="/admin/vehicles/create" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
                    Crear vehículo
                </Link>
            </div>

            <div className="admin-table-container">
                <table className="  admin-table">
                    <thead >
                        <tr>
                            <th >Marca</th>
                            <th >Modelo</th>
                            <th >Año</th>
                            <th >Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        {vehicles.map((vehicle) => (
                            <tr key={vehicle.id} className="border-t">
                                <td >{vehicle.brand}</td>
                                <td >{vehicle.model}</td>
                                <td >{vehicle.year}</td>
                                <td >
                                    <span className={`px-3 py-1 rounded-full text-sm ${vehicle.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700' }`}>
                                        {vehicle.available ? 'Disponible' : 'Alquilado'}
                                    </span>
                                </td>   
                                 <td >
                                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>

                                        <button className="admin-table-button-rent">
                                            Editar vehículo
                                        </button>

                                        <button                                            
                                        className="admin-table-button-delete">
                                            ELiminar vehículo
                                        </button>
                                    </div>

                                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

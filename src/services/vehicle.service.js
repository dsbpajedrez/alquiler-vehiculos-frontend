import api from "../api/axios";

export const getVehicles = async() => {
    const reponse = await api.get("/vehicles/get-all");
    return reponse.data;
}

export const getVehicleById = async(id) => {
    const reponse = await api.get(`/vehicles/vehicle/${id}`);
    return reponse.data;
}
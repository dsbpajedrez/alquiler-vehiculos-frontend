import api from "../api/axios";

export const getVehicles = async() => {
    const reponse = await api.get("/vehicles/get-all");
    return reponse.data;
}

export const getVehicleById = async(id) => {
    const reponse = await api.get(`/vehicles/vehicle/${id}`);
    return reponse.data;
}

export const createVehicle = async(vehicleData) => {
    const reponse = await api.post("/vehicles", vehicleData);
    return reponse.data;
}

export const updateVehicle = async(id, vehicleData) => {
    const reponse = await api.put(`/vehicles/update/${id}`, vehicleData);
    return reponse.data;
}

export const deleteVehicle = async(id) => {
    const reponse = await api.delete(`/vehicles/delete/${id}`);
    return reponse.data;
}
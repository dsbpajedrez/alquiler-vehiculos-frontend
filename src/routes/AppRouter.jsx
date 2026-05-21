import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Vehicle from "../pages/vehicles/Vehicle";
import Admin from "../pages/admin/Admin";
import VehicleDetail from "../pages/vehicleDetail/VehicleDetail";
import Operations from "../pages/operations/Operations";
import MainLayout from "../layouts/MainLayout";
import CreateVehicle from "../pages/vehicles/vehicle-create/VehicleCreate";

export default function AppRoter() {
    return (
        <BrowserRouter>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/vehicles" element={<Vehicle />} />
                    <Route path="/vehicles/:id" element={<VehicleDetail />} />
                    <Route path="/operations" element={<Operations />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/vehicles/create" element={<CreateVehicle />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}
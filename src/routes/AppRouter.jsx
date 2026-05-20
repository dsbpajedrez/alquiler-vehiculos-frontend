import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Vehicle from "../pages/Vehicle";
import Admin from "../pages/Admin";
import VehicleDetail from "../pages/VehicleDetail";
import Operations from "../pages/Operations";
import MainLayout from "../layouts/MainLayout";

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
                </Routes>
            </MainLayout>
        </BrowserRouter>
    )
}
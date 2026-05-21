import { useState } from "react";
import "./VehicleForm.css";

export default function VehicleForm({initialData = {}, onSubmit, submitText = 'Guardar'}) {
    const [form, setForm] = useState({
        brand: initialData.brand || '',
        model: initialData.model || '',
        licensePlate: initialData.licensePlate || '',
        year: initialData.year || '',
        available: initialData.available || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }

    return (
        <form onSubmit={handleSubmit} className="vehicle-form">
            <div className="vehicle-form__group">
                <label className="vehicle-form__label" htmlFor="brand">Marca</label>
                <input
                    id="brand"
                    className="vehicle-form__input" 
                    type="text" 
                    name="brand" 
                    value={form.brand} 
                    onChange={handleChange} 
                    placeholder="Ej: Toyota"
                    required
                />
            </div>
            <div className="vehicle-form__group">
                <label className="vehicle-form__label" htmlFor="model">Modelo</label>
                <input
                    id="model"
                    className="vehicle-form__input"
                    type="text"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    placeholder="Ej: Corolla"
                    required
                />
            </div>
            <div className="vehicle-form__group">
                <label className="vehicle-form__label" htmlFor="licensePlate">Placa</label>
                <input
                    id="licensePlate"
                    className="vehicle-form__input"
                    type="text"
                    name="licensePlate"
                    value={form.licensePlate}
                    onChange={handleChange}
                    placeholder="Ej: ABC-1234"
                    required
                />
            </div>
            <div className="vehicle-form__group">
                <label className="vehicle-form__label" htmlFor="year">Año</label>
                <input
                    id="year"
                    className="vehicle-form__input"
                    type="number"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="Ej: 2023"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                />
            </div>
            <div className="vehicle-form__group">
                <label className="vehicle-form__label" htmlFor="available">
                    <input
                        id="available"
                        className="vehicle-form__input"
                        type="checkbox"
                        name="available"
                        checked={form.available}
                        onChange={handleChange}
                    />
                    Disponible para alquiler
                </label>
            </div>
            <button type="submit" className="vehicle-form__button">
                {submitText}
            </button>
        </form>
    );
}
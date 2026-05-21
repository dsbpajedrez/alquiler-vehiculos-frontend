import { useEffect, useState } from "react";
import "./VehicleForm.css";

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1900;
const MAX_YEAR = CURRENT_YEAR + 1;

export default function VehicleForm({
  initialData = {},
  onSubmit,
  submitText = "Guardar",
}) {
  const [formData, setFormData] = useState({
    brand: initialData.brand || "",
    model: initialData.model || "",
    licensePlate: initialData.licensePlate || "",
    year: initialData.year || "",
    available: initialData.available || false,
  });


  useEffect(() => {    
    setFormData({
      brand: initialData.brand || "",
      model: initialData.model || "",
      licensePlate: initialData.licensePlate || "",
      year: initialData.year || "",
      available: initialData.available || false,
    });
  }, []);


  const handleInputChange = (event) => {
    
    const { name, value, type, checked } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="vehicle-form">
      <div className="vehicle-form__group">
        <label className="vehicle-form__label" htmlFor="brand">
          Marca
        </label>
        <input
          id="brand"
          className="vehicle-form__input"
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          placeholder="Ej: Toyota"
          required
        />
      </div>

      <div className="vehicle-form__group">
        <label className="vehicle-form__label" htmlFor="model">
          Modelo
        </label>
        <input
          id="model"
          className="vehicle-form__input"
          type="text"
          name="model"
          value={formData.model}
          onChange={handleInputChange}
          placeholder="Ej: Corolla"
          required
        />
      </div>

      <div className="vehicle-form__group">
        <label className="vehicle-form__label" htmlFor="licensePlate">
          Placa
        </label>
        <input
          id="licensePlate"
          className="vehicle-form__input"
          type="text"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleInputChange}
          placeholder="Ej: ABC-1234"
          required
        />
      </div>

      <div className="vehicle-form__group">
        <label className="vehicle-form__label" htmlFor="year">
          Año
        </label>
        <input
          id="year"
          className="vehicle-form__input"
          type="number"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          placeholder="Ej: 2023"
          min={MIN_YEAR}
          max={MAX_YEAR}
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
            checked={formData.available}
            onChange={handleInputChange}
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
import { Link } from "react-router-dom";
import "./VehicleCard.css";

export default function VehicleCard({
  vehicle,
}) {

  return (
   <div
      key={vehicle.id}
      className="vehicle-card">

      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        alt={vehicle.brand}

        className="vehicle-card__image"
      />

      <div className="vehicle-card__body">

        <div
          className="vehicle-card__header"
        >

          <h2
            className="vehicle-card__title">
            {vehicle.brand}
          </h2>

          <span
            className={`vehicle-card__badge
              ${
                vehicle.available
                  ? "vehicle-card__badge--available"
                  : "vehicle-card__badge--unavailable"
              }
            `}
          >

            {
              vehicle.available
                ? "Disponible"
                : "Alquilado"
            }

          </span>

        </div>

        <p
          className="vehicle-card__description vehicle-card__description--small-gap"
        >
          Modelo:
          {" "}
          {vehicle.model}
        </p>

        <p
          className="vehicle-card__description vehicle-card__description--large-gap"
        >
          Año:
          {" "}
          {vehicle.year}
        </p>

        <Link to={`/vehicles/${vehicle.id}`}
          className="vehicle-card__link"
        >

          Ver detalle

        </Link>

      </div>

    </div>

  );
}

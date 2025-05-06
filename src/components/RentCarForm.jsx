import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "@designs-css/RentCarForm.css";

const RentalFormPage = () => {
  const location = useLocation();
  const { carro, precio, ciudad, color } = location.state;
  const { marca, modelo } = useParams();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [duracion, setDuracion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      marca,
      modelo,
      precio,
      ciudad,
      color,
      nombre,
      apellido,
      cedula: parseInt(cedula),
      direccion,
      telefono: parseInt(telefono),
      fechaInicio,
      duracion: parseInt(duracion),
    };

    try {
      const response = await fetch("http://localhost:8080/api/v1/usuarios/" + cedula);
      console.log(response.json());
      if (response.status === 200) {
        const data = await response.json();
        console.log("Success:", data);
        navigate("/rent-info", { state: { ...data.success, fechaInicio, duracion, carro} });
      } else {
        try {
          const response = await fetch(
            "http://localhost:8080/api/v1/usuarios",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }

          const data = await response.json();
          console.log("Success:", data);
          navigate("/rent-info", {
            state: { ...formData, carro },
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="rental-form-container">
      <div className="header-rectangle">
        <img
          src="https://images.gestionaweb.cat/1722/pwimg-1100/serenta.png"
          alt="Logo"
          className="header-image"
        />
      </div>
      <h1>
        Formulario renta de {marca} {modelo}
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cédula:</label>
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Inicio:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duración (días):</label>
          <input
            type="number"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            required
          />
        </div>
        <div className="my-button-container">
          <button type="submit" className="search-button">
            Aceptar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RentalFormPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@designs-css/RentCarHome.css";

const CarRentalPage = () => {
  const [carrosDisponibles, setCarrosDisponibles] = useState([]);
  const [rentas, setRentas] = useState([]);
  const ciudades = [
    "Bogotá",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Santa Marta",
  ];
  const [ubicacion, setUbicacion] = useState("");
  const [fechaInicial, setFechaInicial] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [carrosFiltrados, setCarrosFiltrados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarros = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/carros");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setCarrosDisponibles(Array.isArray(data.carros) ? data.carros : []);
      } catch (error) {
        console.error("Error fetching carros:", error);
        setCarrosDisponibles([]);
      }
    };

    fetchCarros();
  }, []);

  useEffect(() => {
    const fetchRentas = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/rentas");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        console.log(data);
        setRentas(Array.isArray(data.rentas) ? data.rentas : []);
      } catch (error) {
        console.error("Error fetching rentas:", error);
        setRentas([]);
      }
    };

    fetchRentas();
  }, []);

  const handleUbicacionChange = (e) => setUbicacion(e.target.value);

  const handleFechaInicialChange = (date) => {
    setFechaInicial(date);
    if (fechaFinal && date > fechaFinal) {
      setFechaFinal(null);
    }
  };

  const handleFechaFinalChange = (date) => {
    if (fechaInicial && date < fechaInicial) {
      alert("La fecha final no puede ser anterior a la fecha inicial.");
    } else {
      setFechaFinal(date);
    }
  };

  const handleBuscarClick = async () => {
    if (!ubicacion) {
      alert("Por favor seleccione una ubicación antes de buscar.");
      return;
    }

    if (!fechaInicial || !fechaFinal) {
      alert("Por favor seleccione una fecha inicial y una fecha final.");
      return;
    }

    const carrosFiltrados = carrosDisponibles.filter((carro) => {
      const enUbicacion = carro.ciudad === ubicacion;

      const carroRentas = rentas.filter(
        (renta) => renta.idCarro === carro.idCarro
      );

      const estaDisponible = carroRentas.every((renta) => {
        const rentaInicio = new Date(renta.fechaInicio);
        const rentaFin = new Date(renta.fechaFin);

        return fechaInicial > rentaFin || fechaFinal < rentaInicio;
      });

      return enUbicacion && estaDisponible;
    });

    setCarrosFiltrados(carrosFiltrados);
    setBusquedaRealizada(true);
  };

  const handleRentarClick = (carro) => {
    navigate(`/rent-form/${carro.marca}/${carro.modelo}`, {
      state: {
        carro,
        precio: carro.precio,
        ciudad: carro.ciudad,
        color: carro.color,
      },
    });
  };

  return (
    <div className="car-rental-container">
      <div className="header-rectangle">
        <img
          src="https://images.gestionaweb.cat/1722/pwimg-1100/serenta.png"
          alt="Logo"
          className="header-image"
        />
      </div>
      <h1 className="title">Renta tu carro en línea</h1>
      <div className="search-container">
        <div className="form-group">
          <label className="form-label">
            Ubicación:
            <select
              value={ubicacion}
              onChange={handleUbicacionChange}
              className="form-select"
            >
              <option disabled value="">
                Seleccionar ciudad
              </option>
              {ciudades.map((ciudad, index) => (
                <option key={index} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Fecha inicial:
            <DatePicker
              selected={fechaInicial}
              onChange={handleFechaInicialChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Fecha final:
            <DatePicker
              selected={fechaFinal}
              onChange={handleFechaFinalChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <button onClick={handleBuscarClick} className="search-button">
            Buscar
          </button>
        </div>
      </div>
      {busquedaRealizada && (
        <div className="results">
          {carrosFiltrados.length > 0 ? (
            <div>
              <h2>Carros disponibles</h2>
              <ul className="car-list">
                {carrosFiltrados.map((carro, index) => (
                  <li key={index} className="car-item">
                    <img
                      src={carro.imagen}
                      alt={`Imagen de ${carro.marca} ${carro.modelo}`}
                    />
                    <div>
                      <p>
                        {carro.marca} {carro.modelo}
                        <br />
                        Ciudad: {carro.ciudad}
                        <br />
                        Color: {carro.color}
                        <br />
                        Precio: ${carro.precio}
                      </p>
                      <button
                        onClick={() => handleRentarClick(carro)}
                        className="rent-button"
                      >
                        Rentar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No hay carros disponibles para esta búsqueda.</div>
          )}
        </div>
      )}
      {!busquedaRealizada && (
        <div className="results">
          <ul className="car-list">
            {carrosDisponibles.map((carro, index) => (
              <li key={index} className="car-item">
                <img
                  src={carro.imagen}
                  alt={`Imagen de ${carro.marca} ${carro.modelo}`}
                />
                <div>
                  <p>
                    {carro.marca} {carro.modelo}
                    <br />
                    Ciudad: {carro.ciudad}
                    <br />
                    Color: {carro.color}
                    <br />
                    Precio: ${carro.precio}
                  </p>
                  <button
                    onClick={() => handleRentarClick(carro)}
                    className="rent-button"
                  >
                    Rentar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CarRentalPage;

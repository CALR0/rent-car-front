import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { motion } from "framer-motion";
import { MapPinIcon, CalendarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import "@designs-css/RentCarHome.css";
import { mockCars, mockRentas } from "../mockData";
import Header from './Header';

const CarRentalPage = () => {
  const [carrosDisponibles, setCarrosDisponibles] = useState([]);
  const [rentas, setRentas] = useState([]);
  const ciudades = ["Bogotá", "Cali", "Barranquilla", "Cartagena", "Santa Marta"];
  const [ubicacion, setUbicacion] = useState("");
  const [fechaInicial, setFechaInicial] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [carrosFiltrados, setCarrosFiltrados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setCarrosDisponibles(mockCars);
      setRentas(mockRentas);
      setIsLoading(false);
    }, 1000);
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

  const handleBuscarClick = () => {
    if (!ubicacion || !fechaInicial || !fechaFinal) {
      alert("Por favor complete todos los campos de búsqueda.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const carrosFiltrados = carrosDisponibles.filter((carro) => {
        const enUbicacion = carro.ciudad === ubicacion;
        const carroRentas = rentas.filter((renta) => renta.idCarro === carro.idCarro);
        const estaDisponible = carroRentas.every((renta) => {
          const rentaInicio = new Date(renta.fechaInicio);
          const rentaFin = new Date(renta.fechaFin);
          return fechaInicial > rentaFin || fechaFinal < rentaInicio;
        });
        return enUbicacion && estaDisponible;
      });

      setCarrosFiltrados(carrosFiltrados);
      setBusquedaRealizada(true);
      setIsLoading(false);
    }, 800);
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
    <div className="page-container">
      <Header />
      <main className="main-content">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="main-title"
        >
          Alquila tu vehiculo de preferencia
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="search-box"
        >
          <div className="search-group">
            <MapPinIcon className="search-icon" />
            <select 
              value={ubicacion}
              onChange={handleUbicacionChange}
              className="search-select"
            >
              <option value="">Seleccionar ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad} value={ciudad}>{ciudad}</option>
              ))}
            </select>
          </div>

          <div className="search-group">
            <CalendarIcon className="search-icon" />
            <DatePicker
              selected={fechaInicial}
              onChange={handleFechaInicialChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha de inicio"
              className="search-input"
              minDate={new Date()}
            />
          </div>

          <div className="search-group">
            <CalendarIcon className="search-icon" />
            <DatePicker
              selected={fechaFinal}
              onChange={handleFechaFinalChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Fecha de devolución"
              className="search-input"
              minDate={fechaInicial || new Date()}
            />
          </div>

          <button 
            onClick={handleBuscarClick}
            className="search-button"
            disabled={isLoading}
          >
            <MagnifyingGlassIcon className="button-icon" />
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </motion.div>

        <section className="results-section">
          {isLoading ? (
            <div className="loading-spinner">Cargando vehículos...</div>
          ) : busquedaRealizada ? (
            carrosFiltrados.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="car-grid"
              >
                {carrosFiltrados.map((carro) => (
                  <motion.div
                    key={carro.idCarro}
                    className="car-card"
                    whileHover={{ y: -4 }}
                  >
                    <div className="car-image-container">
                      <img src={carro.imagen} alt={`${carro.marca} ${carro.modelo}`} />
                      <div className="car-badge">${carro.precio.toLocaleString()}/día</div>
                    </div>
                    <div className="car-content">
                      <h3 className="car-title">{carro.marca} {carro.modelo}</h3>
                      <div className="car-details">
                        <div className="detail-item">
                          <MapPinIcon className="icon" />
                          <span>{carro.ciudad}</span>
                        </div>
                        <div className="detail-item">
                          <span className="color-text">{carro.color}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleRentarClick(carro)}
                        className="rent-button"
                      >
                        Rentar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="no-results">
                <p>No hay vehículos disponibles para las fechas seleccionadas.</p>
                <button 
                  onClick={() => setBusquedaRealizada(false)}
                  className="reset-button"
                >
                  Ver todos los vehículos
                </button>
              </div>
            )
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="car-grid"
            >
              {carrosDisponibles.map((carro) => (
                <motion.div
                  key={carro.idCarro}
                  className="car-card"
                  whileHover={{ y: -4 }}
                >
                  <div className="car-image-container">
                    <img src={carro.imagen} alt={`${carro.marca} ${carro.modelo}`} />
                    <div className="car-badge">${carro.precio.toLocaleString()}/día</div>
                  </div>
                  <div className="car-content">
                    <h3 className="car-title">{carro.marca} {carro.modelo}</h3>
                    <div className="car-details">
                      <div className="detail-item">
                        <MapPinIcon className="icon" />
                        <span>{carro.ciudad}</span>
                      </div>
                      <div className="detail-item">
                        <span className="color-text">{carro.color}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRentarClick(carro)}
                      className="rent-button"
                    >
                      Rentar
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CarRentalPage;
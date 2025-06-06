import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import Header from './Header';
import "@designs-css/RentCarForm.css";

const SuccessDialog = ({ isOpen, onClose, isSuccess }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="dialog-overlay"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="dialog-content"
          >
            <div className={`dialog-icon ${isSuccess ? 'success' : 'error'}`}>
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="icon-symbol"
              >
                {isSuccess ? '✓' : '✕'}
              </motion.div>
            </div>
            <h2>{isSuccess ? '¡Renta realizada con éxito!' : 'Error en la renta'}</h2>
            <p>
              {isSuccess 
                ? 'Tu vehículo está reservado. Gracias por confiar en nosotros.'
                : 'Ha ocurrido un error. Por favor verifica los datos e intenta nuevamente.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`dialog-button ${isSuccess ? 'success' : 'error'}`}
            >
              {isSuccess ? 'Continuar' : 'Cerrar'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

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
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    return (
      nombre.trim() !== "" &&
      apellido.trim() !== "" &&
      cedula.trim() !== "" &&
      direccion.trim() !== "" &&
      telefono.trim() !== "" &&
      fechaInicio !== "" &&
      duracion !== "" &&
      !isNaN(parseInt(cedula)) &&
      !isNaN(parseInt(telefono)) &&
      parseInt(duracion) > 0
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      setIsSuccess(true);
      setShowDialog(true);
    } else {
      setIsSuccess(false);
      setShowDialog(true);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    if (isSuccess) {
      navigate("/");
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-container"
        >
          <h1 className="form-title">
            Renta {marca} {modelo}
          </h1>
          <div className="car-preview">
            <img src={carro.imagen} alt={`${marca} ${modelo}`} className="car-image" />
            <div className="car-details">
              <p className="price">${precio.toLocaleString()}/día</p>
              <p className="location">{ciudad}</p>
              <p className="color">{color}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="rental-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Ingresa tu apellido"
                />
              </div>
              <div className="form-group">
                <label>Cédula</label>
                <input
                  type="text"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Ingresa tu cédula"
                />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Ingresa tu dirección"
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Ingresa tu teléfono"
                />
              </div>
              <div className="form-group">
                <label>Fecha de Inicio</label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Duración (días)</label>
                <input
                  type="number"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                  required
                  className="form-input"
                  placeholder="Número de días"
                  min="1"
                />
              </div>
            </div>
            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continuar
            </motion.button>
          </form>
        </motion.div>
      </main>
      <SuccessDialog isOpen={showDialog} onClose={handleDialogClose} isSuccess={isSuccess} />
    </div>
  );
};

export default RentalFormPage;
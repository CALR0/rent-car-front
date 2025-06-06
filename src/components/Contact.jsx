import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import '@designs-css/Contact.css';

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
            <h2>{isSuccess ? '¡Mensaje enviado con éxito!' : 'Error en el envío'}</h2>
            <p>
              {isSuccess 
                ? 'Gracias por contactarnos. Te responderemos pronto.'
                : 'Por favor completa todos los campos correctamente.'}
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

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [showDialog, setShowDialog] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const { nombre, email, mensaje } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      nombre.trim() !== '' &&
      email.trim() !== '' &&
      emailRegex.test(email) &&
      mensaje.trim() !== ''
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
      navigate('/');
    }
  };

  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="contact-container"
        >
          <h1 className="contact-title">Contáctanos</h1>
          
          <div className="contact-info-section">
            <div className="info-cards">
              <motion.div 
                className="info-card"
                whileHover={{ y: -5 }}
              >
                <MapPinIcon className="info-icon" />
                <h3>Dirección</h3>
                <p>Calle Principal #123</p>
                <p>Santa Marta, Colombia</p>
              </motion.div>

              <motion.div 
                className="info-card"
                whileHover={{ y: -5 }}
              >
                <PhoneIcon className="info-icon" />
                <h3>Teléfono</h3>
                <p>+57 (5) 123-4567</p>
                <p>Lun - Vie: 8:00 - 18:00</p>
              </motion.div>

              <motion.div 
                className="info-card"
                whileHover={{ y: -5 }}
              >
                <EnvelopeIcon className="info-icon" />
                <h3>Email</h3>
                <p>info@rentacar.com</p>
                <p>soporte@rentacar.com</p>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="form-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Envíanos un mensaje</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Mensaje"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar mensaje
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </main>
      <SuccessDialog isOpen={showDialog} onClose={handleDialogClose} isSuccess={isSuccess} />
    </div>
  );
};

export default Contact;
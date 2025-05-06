import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyButton } from '../CodeTest';
import '@designs-css/RentCarInfo.css';

const RentalConfirmationPage = () => {
  const location = useLocation();
  const { carro, nombre, apellido, cedula, direccion, telefono, fechaInicio, duracion} = location.state; // Asegúrate de tener la URL de la imagen del carro en la ubicación
  const navigate = useNavigate();

  const handleConfirm = async () => {
    console.log("pulsaste el boton.");
    const formData = {
      marca: carro.marca,
      modelo: carro.modelo,
      precio: carro.precio,
      ciudad: carro.ciudad,
      color: carro.color,
      nombre,
      apellido,
      cedula,
      direccion,
      telefono,
      fechaInicio,
      duracion
    };

    console.log('Voy a entrar al try con:', formData);
    try {
      console.log('Voy a conectarme:');
      const response = await fetch('http://localhost:8080/api/v1/rentas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log('Valor de la respuesta: ', response);

      if (!response.ok) {
        console.error('Error al crear el préstamo:', response.statusText);
      }

      const data = await response.json();
      console.log('Success confirmation form:', data);
      navigate('/');
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  console.log(location.state);
  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
      <img src="https://images.gestionaweb.cat/1722/pwimg-1100/serenta.png" alt="Logo" className="header-image" />
      </div>
      <h1>Confirmación de renta</h1>
      <div className="info-container">
        <div className="car-info">
          <h2>Información del carro</h2>
          <div className="car-image-container">
            <img src={carro.imagen} alt={`Imagen de ${carro.marca} ${carro.modelo}`} />
          </div>
          <p>Marca: {carro.marca}</p>
          <p>Modelo: {carro.modelo}</p>
          <p>Ciudad: {carro.ciudad}</p>
          <p>Color: {carro.color}</p>
          <p>Precio: ${carro.precio}</p>
        </div>
        <div className="customer-info">
          <h2>Datos del cliente</h2>
          <p>Nombre: {nombre}</p>
          <p>Apellido: {apellido}</p>
          <p>Cédula: {cedula}</p>
          <p>Dirección: {direccion} </p>
          <p>Teléfono: {telefono} </p>
          <p>Fecha de Alquiler:</p>
          <p> {fechaInicio} </p>
          <p>Duración: {duracion} dias</p>
        </div>
      </div>
      <div>
        <button onClick={handleConfirm}>Confirmar renta</button>
      </div>
    </div>
  );
};

export default RentalConfirmationPage;

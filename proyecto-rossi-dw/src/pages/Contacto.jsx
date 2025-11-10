
import React, { useState } from 'react';
import '@styles/main.scss'; 
import Input from '@components/Input'; 

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    mensaje: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email' && !value.includes('@')) {
      error = 'El correo electrónico debe ser válido (incluir @)';
    } else if (name === 'email' && value.length === 0) {
      error = 'El correo electrónico es obligatorio';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFormValid = Object.values(errors).every(error => error === '') && formData.email !== '';
    if (isFormValid) {
      console.log('Formulario enviado:', formData);
      alert('Mensaje enviado. ¡Gracias por contactarnos!');
      setFormData({ nombre: '', apellido: '', telefono: '', email: '', mensaje: '' });
    } else {
      alert('Por favor, completa los campos obligatorios correctamente.');
    }
  };

  return (
    <section className="contacto">
      <h2>Contacto</h2>
      <p>¡Nos encanta saber de vos! Compartí tus consultas, comentarios o sugerencias a través del formulario y te responderemos a la brevedad.</p>

      <form onSubmit={handleSubmit}>
        <div className="fila">
          <Input 
            type="text" 
            name="nombre" 
            placeholder="Nombre" 
            value={formData.nombre} 
            onChange={handleChange}
            error={errors.nombre}
          />
          <Input 
            type="text" 
            name="apellido" 
            placeholder="Apellido" 
            value={formData.apellido} 
            onChange={handleChange}
            error={errors.apellido}
          />
        </div>
        <Input 
          type="tel" 
          name="telefono" 
          placeholder="Teléfono" 
          value={formData.telefono} 
          onChange={handleChange}
          error={errors.telefono}
        />
        <Input 
          type="email" 
          name="email" 
          placeholder="Correo electrónico *" 
          value={formData.email} 
          onChange={handleChange}
          required={true}
          error={errors.email}
        />
        <textarea 
          name="mensaje" 
          placeholder="Mensaje"
          value={formData.mensaje}
          onChange={handleChange}
        ></textarea>
        
        <button className="negro" type="submit">ENVIAR</button>
      </form>

      <div className="info-contacto">
        <div className="info-item">
          <p><strong>📧 Mail de contacto:</strong><br/>burgerhouse@gmail.com</p>
        </div>
        <div className="info-item">
          <p><strong>💳 Tarjetas:</strong><br/>Visa, Mastercard y Mercado Pago</p>
        </div>
        <div className="info-item">
          <p><strong>👤 Reservas:</strong><br/>No trabajamos con reservas, solo por orden de llegada</p>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
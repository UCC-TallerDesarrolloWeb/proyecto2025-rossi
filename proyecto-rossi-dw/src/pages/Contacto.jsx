import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/main.scss";
import Input from "@components/Input";
import { validateField, validateForm } from "@utils/funciones";

const Contacto = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors: formErrors, isValid: isFormValid } = validateForm(formData);

    if (!isFormValid) {
      setErrors(formErrors);
      alert("Por favor, completa los campos obligatorios correctamente.");
      return;
    }

    setFormData({
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      mensaje: "",
    });
    navigate("/");
  };

  return (
    <section className="contacto">
      <h2>Contacto</h2>
      <p>
        ¡Nos encanta saber de vos! Dejanos tu mensaje y te responderemos a la
        brevedad.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="fila">
          <Input
            label="Nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
          />
          <Input
            label="Apellido"
            name="apellido"
            placeholder="Tu apellido"
            value={formData.apellido}
            onChange={handleChange}
            error={errors.apellido}
          />
        </div>

        <Input
          label="Teléfono"
          name="telefono"
          type="tel"
          placeholder="Ej: 11 1234 5678"
          value={formData.telefono}
          onChange={handleChange}
          error={errors.telefono}
        />

        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required={true}
        />

        <div className="input-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="¿En qué podemos ayudarte?"
            value={formData.mensaje}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="negro" type="submit">
          ENVIAR
        </button>
      </form>
    </section>
  );
};

export default Contacto;

import { useId } from "react";

const Input = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  required,
}) => {
  const id = useId();

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && " *"}
        </label>
      )}

      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={error ? "input-error" : ""}
      />

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;

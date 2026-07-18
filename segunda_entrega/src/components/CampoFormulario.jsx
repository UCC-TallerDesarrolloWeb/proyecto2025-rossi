const CampoFormulario = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    maxLength,
    esTextarea = false
}) => {
    const propiedades = {
        id,
        name: id,
        value,
        onChange,
        placeholder,
        maxLength,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? `${id}-error` : undefined
    };

    return (
        <div className="campo-formulario">
            <label htmlFor={id}>{label}</label>
            {esTextarea ? (
                <textarea {...propiedades} />
            ) : (
                <input {...propiedades} type={type} />
            )}
            {error && (
                <p id={`${id}-error`} className="campo-error" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};

export default CampoFormulario;

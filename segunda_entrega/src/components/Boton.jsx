const Boton = ({ children, tipo = 'button', variante = '', onClick }) => {
    const clases = variante ? `boton boton--${variante}` : 'boton';

    return (
        <button className={clases} type={tipo} onClick={onClick}>
            {children}
        </button>
    );
};

export default Boton;

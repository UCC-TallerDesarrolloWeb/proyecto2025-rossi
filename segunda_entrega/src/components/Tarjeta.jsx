const Tarjeta = ({ children, clase = '' }) => {
    const clases = clase ? `tarjeta ${clase}` : 'tarjeta';

    return <article className={clases}>{children}</article>;
};

export default Tarjeta;

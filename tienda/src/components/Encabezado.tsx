interface EncabezadoProps {
    piezas: number;
}
export function Encabezado({ piezas }: EncabezadoProps) {
    return (
        <header className="encabezado">
            <div className="encabezado__marca">
               <img src="/logo.png" alt="Logo de la tienda" /> 
                Tienda
            </div>
            <span className="encabezado__carrito">
                carrito: <strong>{piezas}</strong>
            </span>
        </header>
    );
}
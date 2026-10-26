import { TarjetaProducto } from "./TarjetaProducto";
import type { Producto } from "../servicios/tienda";

interface CatalogoProps {
    productos: Producto[];
    onAgregar?: (producto: Producto) => void;
}

export function Catalogo({ productos, onAgregar }: CatalogoProps) {
    return (
        <section className="productos">
            {productos.map((producto) => (
                <TarjetaProducto
                    key={producto.id}
                    producto={producto}
                    onAgregar={onAgregar}
                />
            ))}
        </section>
    );
}
import type { Producto } from "../servicios/tienda";

interface TarjetaProductoProps {
  producto: Producto;
  onAgregar?: (producto: Producto) => void;
}

export function TarjetaProducto({ producto, onAgregar }: TarjetaProductoProps) {
  const stock = producto.stock ?? producto.existencia ?? 0;

  return (
    <article className="producto">
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p className="producto__precio">${producto.precio}</p>
      <p className="producto__stock">{stock} en stock</p>
      {onAgregar && (
        <button
          className="producto__agregar"
          onClick={() => onAgregar(producto)}
        >
          Agregar al carrito
        </button>
      )}
    </article>
  );
}

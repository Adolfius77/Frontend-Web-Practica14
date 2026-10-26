import { useState } from "react";
import { Layout } from "./components/Layout";
import { Encabezado } from "./components/Encabezado";
import { PiePagina } from "./components/PiePagina";
import { Catalogo } from "./components/Catalogo";
import { Filtros } from "./components/Filtros";
import { Cargando } from "./components/Cargando";
import { MensajeError } from "./components/MensajeError";
import { useProductos } from "./hooks/useProductos";
import { enviarPedido, type Producto } from "./servicios/tienda";
import { FormularioPago } from "./components/formularioPago";

export default function App() {
  //estados
  const { productos, cargando, error, reintentar } = useProductos();
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [categoria, setCategoria] = useState<string>("todas");
  const [folio, setFolio] = useState<string | null>(null);

  //derivados
  const productosDisponibles: Producto[] = [...(productos ?? [])];
  const categorias = [
    "todas",
    ...new Set(productosDisponibles.map((producto) => producto.categoria.trim().toLowerCase())),
  ];
  const visibles: Producto[] = categoria === "todas"
    ? productosDisponibles
    : productosDisponibles.filter(
        (producto) => producto.categoria.trim().toLowerCase() === categoria
      );
  const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);


  //evento
  function agregarAlCarrito(producto: Producto) {
    setCarrito((actual) => [...actual, producto]);
  }
  async function pagar(correo: string, telefono: string) {
    const pedido = await enviarPedido({correo, telefono, productos: carrito.map((p) => p.id.toString())});
    setFolio(pedido.folio);
    setCarrito([]);
    reintentar();
  }

  return (
    <Layout
      encabezado={<Encabezado piezas={carrito.length} />}
      pie={<PiePagina piezas={carrito.length} total={total} />}
    >
      <h1>Bienvenido a la tienda</h1>
      <p>Explora nuestros productos y agrega tus favoritos al carrito.</p>
      
      {cargando && <Cargando />}
      {error && <MensajeError mensaje={error} onReintentar={reintentar} />}
      {!cargando && !error && visibles.length === 0 && (<p>No hay productos disponibles en esta categoría.</p>
      )}
      {!cargando && !error && visibles.length > 0 && (
        <p>Mostrando {visibles.length} productos en la categoría "{categoria}".</p>
      )}
      {folio && <p>pedido: {folio} confirmado te avisaremos el detalle del pago a tu correo</p>}
      {carrito.length > 0 && (<FormularioPago total={total} onPagar={pagar} />
      )}
      
      <Filtros categoria={categorias} activa={categoria} onCambiar={setCategoria} />
      <Catalogo productos={visibles} onAgregar={agregarAlCarrito} />
    </Layout>
  );
}

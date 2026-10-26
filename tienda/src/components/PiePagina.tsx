interface PiePaginaProps {
  piezas: number;
  total: number;
}

export function PiePagina({ piezas, total }: PiePaginaProps) {
  return (
    <footer className="pie">
      <span className="pie__resumen">
        {piezas == 0
          ? "El carrito está vacío"
          : `${piezas} pieza(s) en el carrito`}
      </span>
      <span className="pie__total">Total: ${total}</span>
    </footer>
  );
}

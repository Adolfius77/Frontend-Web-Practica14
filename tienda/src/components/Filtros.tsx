interface FiltrosProps {
    categoria: string[];
    activa?: string;
    onCambiar: (categoria: string) => void;
}

export function Filtros({ categoria, activa, onCambiar }: FiltrosProps) {
    return (
        <nav className="filtros">
            {categoria.map((cat) => (
                <button
                    key={cat}
                    className={`filtros__boton ${cat === activa ? "filtros__boton--activo" : ""}`}
                    onClick={() => onCambiar(cat)}
                >
                    {cat}
                </button>
            ))}
        </nav>
    )
}

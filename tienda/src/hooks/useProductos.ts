import { useEffect, useState } from "react";
import { traerProductos, type Producto } from "../servicios/tienda";

export function useProductos() {
    const [productosState, setProductosState] = useState<Producto[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [intento, setIntento] = useState<number>(0);

    useEffect(() => {
        let vigente = true;

        traerProductos()
            .then((lista) => { if (vigente) setProductosState(lista); })
            .catch(() => { if (vigente) setError("no se pudo conectar ala tienda"); })
            .finally(() => { if (vigente) setCargando(false); });

        return () => { vigente = false; };
    }, [intento]);

    function reintentar() {
        setCargando(true);
        setError(null);
        setIntento((prev) => prev + 1);
    }

    return { productos: productosState, error, cargando, reintentar };
}
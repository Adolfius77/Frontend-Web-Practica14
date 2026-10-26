import {useState, type FormEvent} from "react";

interface FormularioPagoProps {
    total: number;
    onPagar: (correo: string, telefono: string) => Promise<void>;
}
export function FormularioPago({total, onPagar}: FormularioPagoProps) {
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function enviar(e: FormEvent) {
        e.preventDefault();
        if(!correo.includes("@")) {
            setError("El correo debe contener un '@'");
            return;
        }
        if(telefono.length < 10) {
            setError("El teléfono debe tener al menos 10 dígitos");
            return;
        }
        setError(null);
        setEnviando(true);

        try{
            await onPagar(correo, telefono);
        }catch(err){
            setError(err instanceof Error ? err.message : "Error desconocido");
        }finally{
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={enviar}>
            <h2>Formulario de pago</h2>
            <p>Total a pagar: ${total.toFixed(2)}</p>
            {error && <p style={{color: "red"}}>{error}</p>}
            <input
                type="email"
                placeholder="Correo electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
            />
            <button type="submit" disabled={enviando}>
                {enviando ? "Enviando..." : "Pagar"}
            </button>
        </form>
    );
}
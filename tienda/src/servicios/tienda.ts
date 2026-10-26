import axios from "axios";
import { api } from "./api";

interface sobre<T> {
    data: T;
}

export type Producto = {
    id: string | number;
    nombre: string;
    descripcion?: string;
    precio: number;
    categoria: string;
    imagen: string;
    stock?: number;
    existencia?: number;
};

export interface Pedido {
    correo: string;
    telefono: string;
    productos: string[];
}

export interface PedidoCreado {
    folio: string;
    total: number;
}

export async function traerProductos(): Promise<Producto[]> {
    const respuesta = await api.get<sobre<Producto[]>>("/productos");
    return respuesta.data.data;
}

export async function enviarPedido(pedido: Pedido): Promise<PedidoCreado> {
    try {
        const respuesta = await api.post<PedidoCreado>("/pedidos", pedido);
        return respuesta.data;
    } catch (error) {
        const mensaje = axios.isAxiosError(error) && error.response?.data?.mensaje ? error.response.data.mensaje : "Error desconocido";
        throw new Error(Array.isArray(mensaje) ? mensaje.join(", ") : mensaje);
    }
}
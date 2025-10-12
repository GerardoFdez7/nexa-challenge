// Servicio de API para comunicación con el backend

import axios, { type AxiosInstance, type AxiosError } from "axios";
import { API_BASE_URL } from "@/lib/constants";
import type {
  Cliente,
  CuentaSaldo,
  NuevaTransaccion,
  RespuestaTransaccion,
  Transaccion,
} from "@/lib/types";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    // Interceptor para manejo de errores
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error("API Error:", error.message);
        return Promise.reject(error);
      }
    );
  }

  // Clientes
  async getClientes(): Promise<Cliente[]> {
    const response = await this.api.get<Cliente[]>("/clientes");
    return response.data;
  }

  async getClienteById(id: string): Promise<Cliente> {
    const response = await this.api.get<Cliente>(`/clientes/${id}`);
    return response.data;
  }

  async getTransaccionesByCliente(
    clienteId: string,
    fechaInicio: string,
    fechaFin: string
  ): Promise<Transaccion[]> {
    const response = await this.api.get<Transaccion[]>(
      `/clientes/${clienteId}/transacciones`,
      {
        params: { fechaInicio, fechaFin },
      }
    );
    return response.data;
  }

  // Cuentas
  async getCuentasSaldos(): Promise<CuentaSaldo[]> {
    const response = await this.api.get<CuentaSaldo[]>("/cuentas/saldos");
    return response.data;
  }

  async getCuentaSaldo(numeroCuenta: string): Promise<CuentaSaldo> {
    const response = await this.api.get<CuentaSaldo>(
      `/cuentas/${numeroCuenta}/saldo`
    );
    return response.data;
  }

  // Transacciones
  async crearTransaccion(
    transaccion: NuevaTransaccion
  ): Promise<RespuestaTransaccion> {
    const response = await this.api.post<RespuestaTransaccion>(
      "/transacciones",
      transaccion
    );
    return response.data;
  }

  async getTransacciones(): Promise<Transaccion[]> {
    const response = await this.api.get<Transaccion[]>("/transacciones");
    return response.data;
  }
}

export const apiService = new ApiService();

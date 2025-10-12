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
    const response = await this.api.get<any[]>(
      `/clientes/${clienteId}/transacciones`,
      {
        params: { fechaInicio, fechaFin },
      }
    );
    // Mapear idTransaccion a transaccionId para compatibilidad con el frontend
    return response.data.map((transaccion: any) => ({
      ...transaccion,
      transaccionId: transaccion.idTransaccion,
    }));
  }

  // Cuentas
  async getCuentasSaldos(): Promise<CuentaSaldo[]> {
    // Datos de prueba simulados basados en el DML
    const mockData: CuentaSaldo[] = [
      {
        tipoCuenta: "AHORROS",
        saldoCuenta: 5000.00,
        estatusCuenta: "ACTIVA",
        tasaInteres: 2.5,
        numeroCuenta: "1001-2024-001",
        nombreCliente: "Juan Carlos Perez Garcia"
      },
      {
        tipoCuenta: "MONETARIO", 
        saldoCuenta: 15000.00,
        estatusCuenta: "ACTIVA",
        tasaInteres: 0.5,
        numeroCuenta: "1001-2024-002",
        nombreCliente: "Maria Elena Rodriguez Lopez"
      },
      {
        tipoCuenta: "MONETARIO",
        saldoCuenta: 25000.00,
        estatusCuenta: "ACTIVA", 
        tasaInteres: 5.0,
        numeroCuenta: "1001-2024-003",
        nombreCliente: "Carlos Alberto Martinez Gonzalez"
      },
      {
        tipoCuenta: "MONETARIO",
        saldoCuenta: 8500.00,
        estatusCuenta: "ACTIVA",
        tasaInteres: 0.5,
        numeroCuenta: "1001-2024-004", 
        nombreCliente: "Juan Carlos Perez Garcia"
      },
      {
        tipoCuenta: "AHORROS",
        saldoCuenta: 3200.00,
        estatusCuenta: "ACTIVA",
        tasaInteres: 3.0,
        numeroCuenta: "1001-2024-005",
        nombreCliente: "Ana Sofia Gutierrez Morales"
      },
      {
        tipoCuenta: "MONETARIO",
        saldoCuenta: 12750.00,
        estatusCuenta: "ACTIVA",
        tasaInteres: 1.0,
        numeroCuenta: "1001-2024-006",
        nombreCliente: "Roberto Miguel Fernandez Silva"
      }
    ];
    
    return mockData;
    
    // Código original comentado temporalmente
    /*
    const response = await this.api.get<any[]>("/cuentas/saldos");
    return response.data.map((cuenta: any) => ({
      ...cuenta,
      // Mapear campos del backend al frontend
      tipoCuenta: cuenta.tipoProducto || cuenta.tipoCuenta,
      saldoCuenta: Number(cuenta.saldo) || Number(cuenta.saldoCuenta) || 0,
      estatusCuenta: cuenta.estatus || cuenta.estatusCuenta,
      tasaInteres: cuenta.tasaInteres,
      numeroCuenta: cuenta.numeroCuenta,
      nombreCliente: cuenta.nombreCliente
    }));
    */
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
    const response = await this.api.get<any[]>("/transacciones");
    // Mapear idTransaccion a transaccionId para compatibilidad con el frontend
    return response.data.map((transaccion: any) => ({
      ...transaccion,
      transaccionId: transaccion.idTransaccion,
    }));
  }
}

export const apiService = new ApiService();

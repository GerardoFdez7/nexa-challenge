import {BindingKey} from "@loopback/core";
import {PrismaService} from "./infrastructure/database/prisma.service";
import {CuentaRepository} from "./domain/repositories/cuenta.repository";
import {CodigoOperacionRepository} from "./domain/repositories/codigo-operacion.repository";
import {TransaccionCuentaRepository} from "./domain/repositories/transaccion-cuenta.repository";
import {ClienteRepository} from "./domain/repositories/cliente.repository";
import {ConsultarSaldosCuentasUseCase} from "./application/queries/saldos-cuentas.query";
import {ConsultarTransaccionesClienteUseCase} from "./application/queries/transacciones-cliente.query";
import {RegistrarTransaccionUseCase} from "./application/commands/registrar-transaccion.create";
import {ConsultarTodosClientesUseCase} from "./application/queries/todos-clientes.query";
import {ConsultarTodasTransaccionesUseCase} from "./application/queries/todas-transacciones.query";

// Database Service
export const PRISMA_SERVICE = BindingKey.create<PrismaService>("services.PrismaService");

// Repository Bindings
export const CUENTA_REPOSITORY = BindingKey.create<CuentaRepository>(
  "repositories.CuentaRepository",
);
export const CODIGO_OPERACION_REPOSITORY = BindingKey.create<CodigoOperacionRepository>(
  "repositories.CodigoOperacionRepository",
);
export const TRANSACCION_CUENTA_REPOSITORY = BindingKey.create<TransaccionCuentaRepository>(
  "repositories.TransaccionCuentaRepository",
);
export const CLIENTE_REPOSITORY = BindingKey.create<ClienteRepository>(
  "repositories.ClienteRepository",
);

// Use Case Bindings
export const CONSULTAR_SALDOS_CUENTAS_USE_CASE = BindingKey.create<ConsultarSaldosCuentasUseCase>(
  "usecases.ConsultarSaldosCuentasUseCase",
);
export const CONSULTAR_TRANSACCIONES_CLIENTE_USE_CASE =
  BindingKey.create<ConsultarTransaccionesClienteUseCase>(
    "usecases.ConsultarTransaccionesClienteUseCase",
  );
export const REGISTRAR_TRANSACCION_USE_CASE = BindingKey.create<RegistrarTransaccionUseCase>(
  "usecases.RegistrarTransaccionUseCase",
);
export const CONSULTAR_TODOS_CLIENTES_USE_CASE = BindingKey.create<ConsultarTodosClientesUseCase>(
  "usecases.ConsultarTodosClientesUseCase",
);
export const CONSULTAR_TODAS_TRANSACCIONES_USE_CASE = BindingKey.create<ConsultarTodasTransaccionesUseCase>(
  "usecases.ConsultarTodasTransaccionesUseCase",
);

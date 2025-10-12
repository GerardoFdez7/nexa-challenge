import {BootMixin} from "@loopback/boot";
import {ApplicationConfig} from "@loopback/core";
import {RestExplorerBindings, RestExplorerComponent} from "@loopback/rest-explorer";
import {RepositoryMixin} from "@loopback/repository";
import {RestApplication} from "@loopback/rest";
import path from "path";
import {MySequence} from "./sequence";

// Importaciones para DI
import {PrismaService} from "./infrastructure/database/prisma.service";
import {PrismaCuentaRepository} from "./infrastructure/repositories/prisma-cuenta.repository";
import {PrismaCodigoOperacionRepository} from "./infrastructure/repositories/prisma-codigo-operacion.repository";
import {PrismaTransaccionCuentaRepository} from "./infrastructure/repositories/prisma-transaccion-cuenta.repository";
import {PrismaClienteRepository} from "./infrastructure/repositories/prisma-cliente.repository";
import {ConsultarSaldosCuentasUseCase} from "./application/queries/saldos-cuentas.query";
import {ConsultarTransaccionesClienteUseCase} from "./application/queries/transacciones-cliente.query";
import {RegistrarTransaccionUseCase} from "./application/commands/registrar-transaccion.create";
import {ConsultarTodosClientesUseCase} from "./application/queries/todos-clientes.query";
import {ConsultarTodasTransaccionesUseCase} from "./application/queries/todas-transacciones.query";
import {
  PRISMA_SERVICE,
  CUENTA_REPOSITORY,
  CODIGO_OPERACION_REPOSITORY,
  TRANSACCION_CUENTA_REPOSITORY,
  CLIENTE_REPOSITORY,
  CONSULTAR_SALDOS_CUENTAS_USE_CASE,
  CONSULTAR_TRANSACCIONES_CLIENTE_USE_CASE,
  REGISTRAR_TRANSACCION_USE_CASE,
  CONSULTAR_TODOS_CLIENTES_USE_CASE,
  CONSULTAR_TODAS_TRANSACCIONES_USE_CASE,
} from "./keys";

export {ApplicationConfig};

export class NexaApplication extends BootMixin(RepositoryMixin(RestApplication)) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/explorer",
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true,
      },
    };

    // Configurar inyección de dependencias
    this.setupDependencyInjection();
  }

  private setupDependencyInjection() {
    // Bind PrismaService
    this.bind(PRISMA_SERVICE).toClass(PrismaService);

    // Bind Repositories
    this.bind(CUENTA_REPOSITORY).toClass(PrismaCuentaRepository);
    this.bind(CODIGO_OPERACION_REPOSITORY).toClass(PrismaCodigoOperacionRepository);
    this.bind(TRANSACCION_CUENTA_REPOSITORY).toClass(PrismaTransaccionCuentaRepository);
    this.bind(CLIENTE_REPOSITORY).toClass(PrismaClienteRepository);

    // Bind Use Cases
    this.bind(CONSULTAR_SALDOS_CUENTAS_USE_CASE).toClass(ConsultarSaldosCuentasUseCase);
    this.bind(CONSULTAR_TRANSACCIONES_CLIENTE_USE_CASE).toClass(
      ConsultarTransaccionesClienteUseCase,
    );
    this.bind(REGISTRAR_TRANSACCION_USE_CASE).toClass(RegistrarTransaccionUseCase);
    this.bind(CONSULTAR_TODOS_CLIENTES_USE_CASE).toClass(ConsultarTodosClientesUseCase);
    this.bind(CONSULTAR_TODAS_TRANSACCIONES_USE_CASE).toClass(ConsultarTodasTransaccionesUseCase);
  }
}

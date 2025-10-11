# Sistema Bancario - Configuración y Pruebas

Este documento describe cómo configurar y probar el sistema bancario desarrollado con arquitectura hexagonal según las especificaciones del documento EvaluacionDesarrolloNodeJS020525.pdf.

## Prerrequisitos

- Node.js (versión 18 o superior)
- MySQL 8.0
- npm o yarn

## Configuración del Proyecto

### 1. Instalación de Dependencias

```bash
cd backend
npm install
```

### 2. Configuración de Base de Datos

#### Crear Base de Datos con Scripts SQL

1. Instalar MySQL 8.0 localmente
2. Ejecutar el script DDL para crear la estructura:

```powershell
Get-Content scripts/ddl.sql | docker exec -i nexa-mysql mysql -u root -proot123
```

3. Ejecutar el script DML para insertar datos de prueba:

```powershell
Get-Content scripts/dml.sql | docker exec -i nexa-mysql mysql -u root -proot123
```

### 3. Variables de Entorno

Crear un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
DATABASE_URL="mysql://root:password@localhost:3306/nexa_banking"
PORT=3000
NODE_ENV=development
```

### 4. Configuración de Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate
```

## Iniciar el Servidor

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

## APIs Disponibles

### 1. Registro de Transacciones

**POST** `/transacciones`

**Parámetros de entrada:**

```json
{
  "numeroCuenta": "1001-2024-001",
  "fechaTransaccion": "2024-01-15T10:30:00Z",
  "monto": 1000.0,
  "codigoOperacion": "DEP001"
}
```

**Respuesta exitosa:**

```json
{
  "codigo_respuesta": 0,
  "descripcion_respuesta": "OK",
  "id_transaccion": "trans-xxx"
}
```

**Respuesta con error:**

```json
{
  "codigo_respuesta": 1,
  "descripcion_respuesta": "Cuenta no encontrada",
  "id_transaccion": null
}
```

### 2. Consulta de Saldos de Cuentas

**GET** `/cuentas/saldos`

**Respuesta:**

```json
[
  {
    "numeroCuenta": "1001-2024-001",
    "nombreCliente": "Juan Carlos Pérez García",
    "tipoProducto": "AHORROS",
    "tasaInteres": 2.5,
    "saldo": 5000.0,
    "estatus": "ACTIVA"
  }
]
```

### 3. Consulta de Transacciones por Cliente

**GET** `/clientes/{clienteId}/transacciones?fechaInicio=2024-01-01&fechaFin=2024-01-31`

**Respuesta:**

```json
[
  {
    "transaccionId": "trans-001",
    "numeroCuenta": "1001-2024-001",
    "nombreCliente": "Juan Carlos Pérez García",
    "fechaTransaccion": "2024-01-15T10:30:00Z",
    "monto": 1000.0,
    "codigoOperacion": "DEP001",
    "descripcionOperacion": "Depósito en efectivo",
    "tipoOperacion": "CREDITO"
  }
]
```

## Herramientas de Desarrollo

### Documentación API (OpenAPI/Swagger)

Acceder a `http://localhost:3000/explorer` para ver la documentación interactiva de la API.

## Arquitectura Hexagonal

El proyecto implementa arquitectura hexagonal con las siguientes capas:

- **Dominio**: Entidades y reglas de negocio (Cliente, Cuenta, Transacción, etc.)
- **Aplicación**: Casos de uso (RegistrarTransaccion, ConsultarSaldos, etc.)
- **Infraestructura**: Repositorios Prisma y servicios de base de datos
- **Controladores**: Endpoints REST con validaciones

## Validaciones Implementadas

- Validación de cuenta activa antes de procesar transacciones
- Verificación de fondos suficientes para transacciones de débito
- Validación de formato de fechas
- Validación de existencia de códigos de operación
- Validación de parámetros requeridos
- Actualización automática de saldos de cuenta

## Scripts SQL Incluidos

### DDL (Data Definition Language)

- `scripts/ddl.sql`: Creación de estructura de base de datos

### DML (Data Manipulation Language)

- `scripts/dml.sql`: Inserción de datos de prueba

## Entregables Completados

1. ✅ **Modelo Entidad Relación**: Implementado en Prisma schema
2. ✅ **Scripts para creación de base de datos**: `scripts/ddl.sql`
3. ✅ **Scripts para inserción de datos de prueba**: `scripts/dml.sql`
4. ✅ **API para registro de transacciones**: Con validaciones y formato de respuesta especificado
5. ✅ **API para consulta de saldos**: Retorna información completa de cuentas
6. ✅ **API para consulta de transacciones por cliente**: Con filtros de fecha

## Solución de Problemas

### Error de conexión a MySQL

1. Verificar que MySQL esté corriendo
2. Comprobar las credenciales en `.env`
3. Asegurar que el puerto 3306 esté disponible

### Error al generar Prisma Client

```bash
rm -rf node_modules/generated
npx prisma generate
```

### Recrear base de datos

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS nexa_banking;"
mysql -u root -p < scripts/ddl.sql
mysql -u root -p < scripts/dml.sql
```

## Datos de Prueba Incluidos

### Clientes

- Juan Carlos Pérez García (DPI: 2547896321478)
- María Elena Rodríguez López (DPI: 3698521479632)
- Carlos Alberto Morales Hernández (DPI: 1472583691472)
- Ana Sofía González Martínez (DPI: 9876543210987)
- Luis Fernando Castro Díaz (DPI: 5432167890543)

### Productos

- Cuenta de Ahorro Personal (2.5% tasa de interés, AHORROS, MENSUAL)
- Cuenta Corriente Empresarial (0.5% tasa de interés, MONETARIO, MENSUAL)
- Depósito a Plazo Fijo (5.0% tasa de interés, MONETARIO, MENSUAL)
- Cuenta de Ahorro Juvenil (3.0% tasa de interés, AHORROS, MENSUAL)
- Cuenta Corriente Personal (1.0% tasa de interés, MONETARIO, DIARIO)

### Códigos de Operación

- DEP001: Depósito en efectivo (CREDITO)
- RET001: Retiro en efectivo (DEBITO)
- TRF001: Transferencia bancaria (DEBITO)
- TRF002: Recepción de transferencia (CREDITO)
- PAG001: Pago de servicios (DEBITO)
- INT001: Abono de intereses (CREDITO)
- COM001: Cobro de comisión (DEBITO)

### Cuentas

- 1001-2024-001: Juan Carlos - Cuenta de Ahorro ($5,000)
- 1001-2024-002: María Elena - Cuenta Corriente ($15,000)
- 1001-2024-003: Carlos Alberto - Plazo Fijo ($25,000)
- 1001-2024-004: Juan Carlos - Cuenta Corriente ($8,500)
- 1001-2024-005: Ana Sofía - Cuenta Juvenil ($3,200)
- 1001-2024-006: Luis Fernando - Cuenta Personal ($12,750)
- 1001-2024-007: María Elena - Cuenta Inactiva ($0)

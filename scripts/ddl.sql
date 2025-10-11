-- Script DDL para creación de base de datos 

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS nexa_banking;
USE nexa_banking;

-- Tabla de clientes
CREATE TABLE clientes (
    id VARCHAR(36) PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    dpi VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    sexo ENUM('MASCULINO', 'FEMENINO') NOT NULL,
    pais_nacimiento VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE productos (
    id VARCHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tasa_interes DECIMAL(5,4) NOT NULL,
    tipo_producto ENUM('AHORROS', 'MONETARIO') NOT NULL,
    calculo_interes ENUM('DIARIO', 'MENSUAL') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de cuentas
CREATE TABLE cuentas (
    id VARCHAR(36) PRIMARY KEY,
    numero_cuenta VARCHAR(20) UNIQUE NOT NULL,
    cliente_id VARCHAR(36) NOT NULL,
    producto_id VARCHAR(36) NOT NULL,
    estatus ENUM('ACTIVA', 'INACTIVA') DEFAULT 'ACTIVA',
    saldo DECIMAL(15,2) DEFAULT 0.00,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- Tabla de códigos de operación
CREATE TABLE codigos_operacion (
    id VARCHAR(36) PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    tipo_operacion ENUM('CREDITO', 'DEBITO') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de transacciones de cuenta
CREATE TABLE transacciones_cuenta (
    id VARCHAR(36) PRIMARY KEY,
    cuenta_id VARCHAR(36) NOT NULL,
    codigo_operacion_id VARCHAR(36) NOT NULL,
    monto DECIMAL(15,2) NOT NULL,
    fecha_transaccion TIMESTAMP NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cuenta_id) REFERENCES cuentas(id),
    FOREIGN KEY (codigo_operacion_id) REFERENCES codigos_operacion(id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_clientes_dpi ON clientes(dpi);
CREATE INDEX idx_cuentas_numero ON cuentas(numero_cuenta);
CREATE INDEX idx_cuentas_cliente ON cuentas(cliente_id);
CREATE INDEX idx_transacciones_cuenta ON transacciones_cuenta(cuenta_id);
CREATE INDEX idx_transacciones_fecha ON transacciones_cuenta(fecha_transaccion);
CREATE INDEX idx_codigos_operacion_codigo ON codigos_operacion(codigo);
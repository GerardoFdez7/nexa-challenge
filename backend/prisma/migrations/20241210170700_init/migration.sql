-- CreateTable
CREATE TABLE `clientes` (
    `id` VARCHAR(191) NOT NULL,
    `nombre_completo` VARCHAR(255) NOT NULL,
    `dpi` VARCHAR(20) NOT NULL,
    `fecha_nacimiento` DATE NOT NULL,
    `sexo` ENUM('MASCULINO', 'FEMENINO') NOT NULL,
    `pais_nacimiento` VARCHAR(100) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clientes_dpi_key`(`dpi`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `tasa_interes` DECIMAL(5, 4) NOT NULL,
    `tipo_producto` ENUM('AHORRO', 'CORRIENTE', 'PLAZO_FIJO', 'CREDITO') NOT NULL,
    `calculo_interes` ENUM('SIMPLE', 'COMPUESTO') NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cuentas` (
    `id` VARCHAR(191) NOT NULL,
    `numero_cuenta` VARCHAR(20) NOT NULL,
    `saldo` DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    `estatus` ENUM('ACTIVA', 'INACTIVA', 'BLOQUEADA', 'CERRADA') NOT NULL DEFAULT 'ACTIVA',
    `fecha_apertura` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,
    `cliente_id` VARCHAR(191) NOT NULL,
    `producto_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cuentas_numero_cuenta_key`(`numero_cuenta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transacciones` (
    `id` VARCHAR(191) NOT NULL,
    `tipo` ENUM('CREDITO', 'DEBITO') NOT NULL,
    `monto` DECIMAL(15, 2) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `fecha_transaccion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saldo_anterior` DECIMAL(15, 2) NOT NULL,
    `saldo_nuevo` DECIMAL(15, 2) NOT NULL,
    `cuenta_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cuentas` ADD CONSTRAINT `cuentas_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `clientes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cuentas` ADD CONSTRAINT `cuentas_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transacciones` ADD CONSTRAINT `transacciones_cuenta_id_fkey` FOREIGN KEY (`cuenta_id`) REFERENCES `cuentas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
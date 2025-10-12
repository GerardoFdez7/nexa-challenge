import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando el seeding de la base de datos...');

  // Limpiar datos existentes (opcional)
  await prisma.transaccionCuenta.deleteMany();
  await prisma.cuenta.deleteMany();
  await prisma.codigoOperacion.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.cliente.deleteMany();

  // Insertar clientes
  console.log('📝 Insertando clientes...');
  const clientes = await prisma.cliente.createMany({
    data: [
      {
        id: 'cm5ixhqxz0000uxqjqwqjqwqj',
        nombreCompleto: 'Juan Carlos Pérez García',
        dpi: '1234567890101',
        fechaNacimiento: new Date('1985-03-15'),
        sexo: 'MASCULINO',
        paisNacimiento: 'Guatemala',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0001uxqjqwqjqwqk',
        nombreCompleto: 'María Elena Rodríguez López',
        dpi: '2345678901012',
        fechaNacimiento: new Date('1990-07-22'),
        sexo: 'FEMENINO',
        paisNacimiento: 'Guatemala',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0002uxqjqwqjqwql',
        nombreCompleto: 'Carlos Alberto Morales Hernández',
        dpi: '3456789012123',
        fechaNacimiento: new Date('1978-11-08'),
        sexo: 'MASCULINO',
        paisNacimiento: 'Guatemala',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0003uxqjqwqjqwqm',
        nombreCompleto: 'Ana Sofía Castillo Méndez',
        dpi: '4567890123234',
        fechaNacimiento: new Date('1992-05-14'),
        sexo: 'FEMENINO',
        paisNacimiento: 'Guatemala',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0004uxqjqwqjqwqn',
        nombreCompleto: 'Roberto José Vásquez Torres',
        dpi: '5678901234345',
        fechaNacimiento: new Date('1980-09-30'),
        sexo: 'MASCULINO',
        paisNacimiento: 'Guatemala',
        activo: true,
      },
    ],
  });
  console.log(`✅ ${clientes.count} clientes insertados`);

  // Insertar productos
  console.log('💰 Insertando productos...');
  const productos = await prisma.producto.createMany({
    data: [
      {
        id: 'cm5ixhqxz0005uxqjqwqjqwqo',
        nombre: 'Cuenta de Ahorros Básica',
        tasaInteres: 2.5000,
        tipoProducto: 'AHORROS',
        calculoInteres: 'MENSUAL',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0006uxqjqwqjqwqp',
        nombre: 'Cuenta Monetaria Premium',
        tasaInteres: 3.7500,
        tipoProducto: 'MONETARIO',
        calculoInteres: 'DIARIO',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0007uxqjqwqjqwqq',
        nombre: 'Cuenta de Ahorros Joven',
        tasaInteres: 3.0000,
        tipoProducto: 'AHORROS',
        calculoInteres: 'MENSUAL',
        activo: true,
      },
    ],
  });
  console.log(`✅ ${productos.count} productos insertados`);

  // Insertar códigos de operación
  console.log('🔢 Insertando códigos de operación...');
  const codigosOperacion = await prisma.codigoOperacion.createMany({
    data: [
      {
        id: 'cm5ixhqxz0008uxqjqwqjqwqr',
        codigo: 'DEP001',
        descripcion: 'Depósito en efectivo',
        tipoOperacion: 'CREDITO',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0009uxqjqwqjqwqs',
        codigo: 'RET001',
        descripcion: 'Retiro en efectivo',
        tipoOperacion: 'DEBITO',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0010uxqjqwqjqwqt',
        codigo: 'TRF001',
        descripcion: 'Transferencia entre cuentas',
        tipoOperacion: 'DEBITO',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0011uxqjqwqjqwqu',
        codigo: 'TRF002',
        descripcion: 'Recepción de transferencia',
        tipoOperacion: 'CREDITO',
        activo: true,
      },
      {
        id: 'cm5ixhqxz0012uxqjqwqjqwqv',
        codigo: 'INT001',
        descripcion: 'Pago de intereses',
        tipoOperacion: 'CREDITO',
        activo: true,
      },
    ],
  });
  console.log(`✅ ${codigosOperacion.count} códigos de operación insertados`);

  // Insertar cuentas
  console.log('🏦 Insertando cuentas...');
  const cuentas = await prisma.cuenta.createMany({
    data: [
      {
        id: 'cm5ixhqxz0013uxqjqwqjqwqw',
        numeroCuenta: '1001000001',
        clienteId: 'cm5ixhqxz0000uxqjqwqjqwqj',
        productoId: 'cm5ixhqxz0005uxqjqwqjqwqo',
        estatus: 'ACTIVA',
        saldo: 15000.00,
      },
      {
        id: 'cm5ixhqxz0014uxqjqwqjqwqx',
        numeroCuenta: '1001000002',
        clienteId: 'cm5ixhqxz0001uxqjqwqjqwqk',
        productoId: 'cm5ixhqxz0006uxqjqwqjqwqp',
        estatus: 'ACTIVA',
        saldo: 25000.00,
      },
      {
        id: 'cm5ixhqxz0015uxqjqwqjqwqy',
        numeroCuenta: '1001000003',
        clienteId: 'cm5ixhqxz0002uxqjqwqjqwql',
        productoId: 'cm5ixhqxz0005uxqjqwqjqwqo',
        estatus: 'ACTIVA',
        saldo: 8500.00,
      },
      {
        id: 'cm5ixhqxz0016uxqjqwqjqwqz',
        numeroCuenta: '1001000004',
        clienteId: 'cm5ixhqxz0003uxqjqwqjqwqm',
        productoId: 'cm5ixhqxz0007uxqjqwqjqwqq',
        estatus: 'ACTIVA',
        saldo: 12000.00,
      },
      {
        id: 'cm5ixhqxz0017uxqjqwqjqwq0',
        numeroCuenta: '1001000005',
        clienteId: 'cm5ixhqxz0004uxqjqwqjqwqn',
        productoId: 'cm5ixhqxz0006uxqjqwqjqwqp',
        estatus: 'ACTIVA',
        saldo: 30000.00,
      },
    ],
  });
  console.log(`✅ ${cuentas.count} cuentas insertadas`);

  // Insertar transacciones
  console.log('💳 Insertando transacciones...');
  const transacciones = await prisma.transaccionCuenta.createMany({
    data: [
      // Transacciones para cuenta 1001000001
      {
        cuentaId: 'cm5ixhqxz0013uxqjqwqjqwqw',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 10000.00,
        fechaTransaccion: new Date('2024-01-15 09:30:00'),
      },
      {
        cuentaId: 'cm5ixhqxz0013uxqjqwqjqwqw',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 5000.00,
        fechaTransaccion: new Date('2024-01-20 14:15:00'),
      },
      // Transacciones para cuenta 1001000002
      {
        cuentaId: 'cm5ixhqxz0014uxqjqwqjqwqx',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 20000.00,
        fechaTransaccion: new Date('2024-01-16 10:00:00'),
      },
      {
        cuentaId: 'cm5ixhqxz0014uxqjqwqjqwqx',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 5000.00,
        fechaTransaccion: new Date('2024-01-25 16:30:00'),
      },
      // Transacciones para cuenta 1001000003
      {
        cuentaId: 'cm5ixhqxz0015uxqjqwqjqwqy',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 8000.00,
        fechaTransaccion: new Date('2024-01-17 11:45:00'),
      },
      {
        cuentaId: 'cm5ixhqxz0015uxqjqwqjqwqy',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 500.00,
        fechaTransaccion: new Date('2024-01-28 13:20:00'),
      },
      // Transacciones para cuenta 1001000004
      {
        cuentaId: 'cm5ixhqxz0016uxqjqwqjqwqz',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 12000.00,
        fechaTransaccion: new Date('2024-01-18 15:00:00'),
      },
      // Transacciones para cuenta 1001000005
      {
        cuentaId: 'cm5ixhqxz0017uxqjqwqjqwq0',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 25000.00,
        fechaTransaccion: new Date('2024-01-19 08:30:00'),
      },
      {
        cuentaId: 'cm5ixhqxz0017uxqjqwqjqwq0',
        codigoOperacionId: 'cm5ixhqxz0008uxqjqwqjqwqr',
        monto: 5000.00,
        fechaTransaccion: new Date('2024-01-30 17:45:00'),
      },
    ],
  });
  console.log(`✅ ${transacciones.count} transacciones insertadas`);

  console.log('🎉 Seeding completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
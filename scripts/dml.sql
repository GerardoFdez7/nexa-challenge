-- Script para inserción de datos de prueba 

USE nexa_bank;

-- Insertar clientes de prueba
INSERT INTO clientes (id, nombre_completo, dpi, fecha_nacimiento, sexo, pais_nacimiento, activo, fecha_creacion, fecha_actualizacion) VALUES
('cliente-001', 'Juan Carlos Perez Garcia', '2547896321478', '1985-03-15', 'MASCULINO', 'Guatemala', TRUE, NOW(), NOW()),
('cliente-002', 'Maria Elena Rodriguez Lopez', '3698521479632', '1990-07-22', 'FEMENINO', 'Guatemala', TRUE, NOW(), NOW()),
('cliente-003', 'Carlos Alberto Morales Hernandez', '1472583691472', '1978-11-08', 'MASCULINO', 'Guatemala', TRUE, NOW(), NOW()),
('cliente-004', 'Ana Sofia Gonzalez Martinez', '9876543210987', '1992-05-30', 'FEMENINO', 'Guatemala', TRUE, NOW(), NOW()),
('cliente-005', 'Luis Fernando Castro Diaz', '5432167890543', '1980-12-18', 'MASCULINO', 'Guatemala', TRUE, NOW(), NOW());

-- Insertar productos bancarios
INSERT INTO productos (id, nombre, tasa_interes, tipo_producto, calculo_interes, activo, fecha_creacion, fecha_actualizacion) VALUES
('producto-001', 'Cuenta de Ahorro Personal', 2.5000, 'AHORROS', 'MENSUAL', TRUE, NOW(), NOW()),
('producto-002', 'Cuenta Corriente Empresarial', 0.5000, 'MONETARIO', 'MENSUAL', TRUE, NOW(), NOW()),
('producto-003', 'Deposito a Plazo Fijo', 5.0000, 'MONETARIO', 'MENSUAL', TRUE, NOW(), NOW()),
('producto-004', 'Cuenta de Ahorro Juvenil', 3.0000, 'AHORROS', 'MENSUAL', TRUE, NOW(), NOW()),
('producto-005', 'Cuenta Corriente Personal', 1.0000, 'MONETARIO', 'DIARIO', TRUE, NOW(), NOW());

-- Insertar codigos de operacion
INSERT INTO codigos_operacion (id, codigo, descripcion, tipo_operacion, activo, fecha_creacion, fecha_actualizacion) VALUES
('codigo-001', 'DEP001', 'Deposito en efectivo', 'CREDITO', TRUE, NOW(), NOW()),
('codigo-002', 'RET001', 'Retiro en efectivo', 'DEBITO', TRUE, NOW(), NOW()),
('codigo-003', 'TRF001', 'Transferencia bancaria', 'DEBITO', TRUE, NOW(), NOW()),
('codigo-004', 'TRF002', 'Recepcion de transferencia', 'CREDITO', TRUE, NOW(), NOW()),
('codigo-005', 'PAG001', 'Pago de servicios', 'DEBITO', TRUE, NOW(), NOW()),
('codigo-006', 'INT001', 'Abono de intereses', 'CREDITO', TRUE, NOW(), NOW()),
('codigo-007', 'COM001', 'Cobro de comision', 'DEBITO', TRUE, NOW(), NOW());

-- Insertar cuentas de prueba
INSERT INTO cuentas (id, numero_cuenta, cliente_id, producto_id, estatus, saldo, fecha_creacion, fecha_actualizacion) VALUES
('cuenta-001', '1001-2024-001', 'cliente-001', 'producto-001', 'ACTIVA', 5000.00, NOW(), NOW()),
('cuenta-002', '1001-2024-002', 'cliente-002', 'producto-002', 'ACTIVA', 15000.00, NOW(), NOW()),
('cuenta-003', '1001-2024-003', 'cliente-003', 'producto-003', 'ACTIVA', 25000.00, NOW(), NOW()),
('cuenta-004', '1001-2024-004', 'cliente-001', 'producto-002', 'ACTIVA', 8500.00, NOW(), NOW()),
('cuenta-005', '1001-2024-005', 'cliente-004', 'producto-004', 'ACTIVA', 3200.00, NOW(), NOW()),
('cuenta-006', '1001-2024-006', 'cliente-005', 'producto-005', 'ACTIVA', 12750.00, NOW(), NOW()),
('cuenta-007', '1001-2024-007', 'cliente-002', 'producto-001', 'INACTIVA', 0.00, NOW(), NOW());

-- Insertar transacciones de prueba
-- Transacciones para Juan Carlos Perez Garcia (cuenta-001)
INSERT INTO transacciones_cuenta (id, cuenta_id, codigo_operacion_id, monto, fecha_transaccion, fecha_creacion) VALUES
('trans-001', 'cuenta-001', 'codigo-001', 1000.00, DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 7 DAY)),
('trans-002', 'cuenta-001', 'codigo-002', 500.00, DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 5 DAY)),
('trans-003', 'cuenta-001', 'codigo-001', 2000.00, DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
('trans-004', 'cuenta-001', 'codigo-006', 25.50, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Transacciones para Maria Elena Rodriguez Lopez (cuenta-002)
INSERT INTO transacciones_cuenta (id, cuenta_id, codigo_operacion_id, monto, fecha_transaccion, fecha_creacion) VALUES
('trans-005', 'cuenta-002', 'codigo-001', 2500.00, DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 10 DAY)),
('trans-006', 'cuenta-002', 'codigo-003', 1200.00, DATE_SUB(NOW(), INTERVAL 8 DAY), DATE_SUB(NOW(), INTERVAL 8 DAY)),
('trans-007', 'cuenta-002', 'codigo-004', 800.00, DATE_SUB(NOW(), INTERVAL 6 DAY), DATE_SUB(NOW(), INTERVAL 6 DAY)),
('trans-008', 'cuenta-002', 'codigo-005', 350.00, DATE_SUB(NOW(), INTERVAL 4 DAY), DATE_SUB(NOW(), INTERVAL 4 DAY));

-- Transacciones para Carlos Alberto Morales Hernandez (cuenta-003)
INSERT INTO transacciones_cuenta (id, cuenta_id, codigo_operacion_id, monto, fecha_transaccion, fecha_creacion) VALUES
('trans-009', 'cuenta-003', 'codigo-001', 10000.00, DATE_SUB(NOW(), INTERVAL 15 DAY), DATE_SUB(NOW(), INTERVAL 15 DAY)),
('trans-010', 'cuenta-003', 'codigo-006', 125.00, DATE_SUB(NOW(), INTERVAL 12 DAY), DATE_SUB(NOW(), INTERVAL 12 DAY)),
('trans-011', 'cuenta-003', 'codigo-001', 5000.00, DATE_SUB(NOW(), INTERVAL 9 DAY), DATE_SUB(NOW(), INTERVAL 9 DAY));

-- Transacciones para Juan Carlos Perez Garcia (cuenta-004 - segunda cuenta)
INSERT INTO transacciones_cuenta (id, cuenta_id, codigo_operacion_id, monto, fecha_transaccion, fecha_creacion) VALUES
('trans-012', 'cuenta-004', 'codigo-001', 5000.00, DATE_SUB(NOW(), INTERVAL 20 DAY), DATE_SUB(NOW(), INTERVAL 20 DAY)),
('trans-013', 'cuenta-004', 'codigo-003', 1500.00, DATE_SUB(NOW(), INTERVAL 18 DAY), DATE_SUB(NOW(), INTERVAL 18 DAY)),
('trans-014', 'cuenta-004', 'codigo-002', 2000.00, DATE_SUB(NOW(), INTERVAL 16 DAY), DATE_SUB(NOW(), INTERVAL 16 DAY));

-- Transacciones para Ana Sofia Gonzalez Martinez (cuenta-005)
INSERT INTO transacciones_cuenta (id, cuenta_id, codigo_operacion_id, monto, fecha_transaccion, fecha_creacion) VALUES
('trans-015', 'cuenta-005', 'codigo-001', 1500.00, DATE_SUB(NOW(), INTERVAL 14 DAY), DATE_SUB(NOW(), INTERVAL 14 DAY)),
('trans-016', 'cuenta-005', 'codigo-002', 300.00, DATE_SUB(NOW(), INTERVAL 11 DAY), DATE_SUB(NOW(), INTERVAL 11 DAY)),
('trans-017', 'cuenta-005', 'codigo-001', 800.00, DATE_SUB(NOW(), INTERVAL 7 DAY), DATE_SUB(NOW(), INTERVAL 7 DAY));

-- Transacciones para Luis Fernando Castro Diaz (cuenta-006)
INSERT INTO transacciones_cuenta (id, cuenta_id, codigo_operacion_id, monto, fecha_transaccion, fecha_creacion) VALUES
('trans-018', 'cuenta-006', 'codigo-001', 8000.00, DATE_SUB(NOW(), INTERVAL 25 DAY), DATE_SUB(NOW(), INTERVAL 25 DAY)),
('trans-019', 'cuenta-006', 'codigo-005', 450.00, DATE_SUB(NOW(), INTERVAL 22 DAY), DATE_SUB(NOW(), INTERVAL 22 DAY)),
('trans-020', 'cuenta-006', 'codigo-003', 2500.00, DATE_SUB(NOW(), INTERVAL 19 DAY), DATE_SUB(NOW(), INTERVAL 19 DAY)),
('trans-021', 'cuenta-006', 'codigo-004', 1200.00, DATE_SUB(NOW(), INTERVAL 17 DAY), DATE_SUB(NOW(), INTERVAL 17 DAY)),
('trans-022', 'cuenta-006', 'codigo-002', 1000.00, DATE_SUB(NOW(), INTERVAL 13 DAY), DATE_SUB(NOW(), INTERVAL 13 DAY));

-- Verificar los datos insertados
SELECT 'Clientes insertados:' as Tabla, COUNT(*) as Total FROM clientes
UNION ALL
SELECT 'Productos insertados:', COUNT(*) FROM productos
UNION ALL
SELECT 'Codigos de operacion insertados:', COUNT(*) FROM codigos_operacion
UNION ALL
SELECT 'Cuentas insertadas:', COUNT(*) FROM cuentas
UNION ALL
SELECT 'Transacciones insertadas:', COUNT(*) FROM transacciones_cuenta;
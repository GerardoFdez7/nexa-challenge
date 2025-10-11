<p align="center">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>
  </a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="40" alt="Nest Logo" /></a>
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/docker/docker-icon.svg" alt="docker" width="50" height="50"/>
  </a>
  <a href="https://www.mysql.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" alt="mysql" width="40" height="40"/>
  </a>
  <a href="https://www.prisma.io/" target="_blank" rel="noreferrer">
    <img src="https://cdn.worldvectorlogo.com/logos/prisma-3.svg" alt="prisma" width="40" height="40"/>
  </a>
  <a href="https://mochajs.org/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg" alt="mocha" width="40" height="40"/>
  </a>
  <a href="https://nodejs.org/en" target="_blank" rel="noreferrer">
    <img src="https://upload.vectorlogo.zone/logos/nodejs/images/eca9ff97-5734-46c4-b8a1-621819eaeaa9.svg" alt="nodejs" width="50" height="50"/>
  </a>
  <a href="https://www.npmjs.com/" target="_blank" rel="noreferrer">
    <img src="https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg" alt="npm" width="60" height="40"/>
  </a> 
</p>

# 🏦 Nexa Banking API

API REST para sistema bancario desarrollada con **LoopBack 4**, **TypeScript** y **MySQL**.

## 🚀 Inicio Rápido

### 📋 Prerrequisitos

- **Node.js** >= 18.x
- **Docker** y **Docker Compose**
- **npm** >= 8.x

### 🐳 Ejecución con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone <repository-url>
cd nexa-challenge/backend

# Levantar servicios (MySQL + phpMyAdmin + API)
docker-compose up -d

# Verificar servicios
docker-compose ps
```

**URLs disponibles:**

- 🌐 **API**: http://localhost:3000
- 📊 **phpMyAdmin**: http://localhost:8080
- 📖 **API Explorer**: http://localhost:3000/explorer

### 💻 Ejecución Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Levantar solo MySQL con Docker
docker-compose up mysql -d

# Actualizar .env para conexión local
DATABASE_URL="mysql://nexa_user:nexa_password@localhost:3307/nexa_banking"

# Ejecutar migraciones
npm run migrate

# Iniciar aplicación
npm start
```

## 🏗️ Arquitectura

### 📁 Estructura del Proyecto

```
src/
├── application/          # Capa de Aplicación (CQRS)
│   ├── commands/         # Comandos (Command handlers)
│   └── queries/          # Consultas (Query handlers)
├── domain/               # Capa de Dominio
│   ├── entities/         # Entidades de negocio y Factories
│   ├── repositories/     # Interfaces de repositorios
├── infrastructure/       # Capa de Infraestructura
│   ├── repositories/     # Implementaciones de repositorios
│   └── database/         # Conexión singleton a MySQL
└── controllers/          # Controladores REST
```

### 🎯 Patrones de Diseño Implementados

#### **CQRS (Command Query Responsibility Segregation)**

- **Commands**: Operaciones de escritura (crear, actualizar, eliminar)
- **Queries**: Operaciones de lectura optimizadas
- **Separación clara** entre lógica de comando y consulta

#### **Repository Pattern**

- **Abstracción** de la capa de datos
- **Interfaces** en el dominio, **implementaciones** en infraestructura
- **Facilita testing** y cambio de tecnologías

#### **Factory Pattern**

- **Creación controlada** de entidades complejas
- **Validaciones de negocio** centralizadas
- **Encapsulación** de lógica de construcción

## 🗄️ Base de Datos

### **Inicialización Automática**

Los scripts SQL se ejecutan automáticamente al levantar MySQL:

- `sql/ddl.sql` - Estructura de tablas
- `sql/dml.sql` - Datos de prueba

### **Diagrama ER**

```bash
# Generar diagrama entidad-relación
npx prisma generate
```

📄 Diagrama disponible en: `scripts/erd.png`

### **Comandos**

```bash
npx prisma studio            # Interfaz gráfica de BD
npx prisma db seed          # Ejecutar seeders
npx prisma generate         # Generar cliente + diagrama ER
```

## 📊 Endpoints Principales

| Método | Endpoint                       | Descripción                |
| ------ | ------------------------------ | -------------------------- |
| `GET`  | `/clientes`                    | Listar todos los clientes  |
| `GET`  | `/clientes/{id}/transacciones` | Transacciones por cliente  |
| `GET`  | `/productos`                   | Listar productos bancarios |
| `GET`  | `/cuentas`                     | Listar cuentas             |

📖 **Documentación completa**: http://localhost:3000/explorer

## 🔧 Configuración

### **Variables de Entorno**

```env
DATABASE_URL="mysql://user:password@host:port/database"
NODE_ENV=development
PORT=3000
```

### **Docker Compose Services**

- **mysql**: Base de datos MySQL 8.0
- **phpmyadmin**: Administrador web de BD
- **backend**: API LoopBack 4

## 🏛️ Tecnologías

- **Framework**: LoopBack 4
- **Lenguaje**: TypeScript
- **Base de Datos**: MySQL 8.0
- **ORM**: Prisma
- **Contenedores**: Docker & Docker Compose
- **Documentación**: OpenAPI 3.0

---

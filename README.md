# Giftcards API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green) ![NestJS](https://img.shields.io/badge/NestJS-10.x-red) ![JWT](https://img.shields.io/badge/JWT-Authentication-orange) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue) ![Jest](https://img.shields.io/badge/Jest-Testing-red)  


GiftPoint es una API REST robusta desarrollada con **Node.js** y **NestJS** que ofrece un sistema completo para la gestión de usuarios y giftcards. Con arquitectura modular, seguridad JWT y base de datos PostgreSQL.

## Características Principales
### Autenticación Segura
- Registro y login de usuarios con encriptaci贸n bcrypt  
- Tokens JWT con expiración configurable  
- Guard de verificación de token en rutas protegidas

### Gestión de Giftcards
- Creación, lectura y eliminación de tarjetas de regalo  
- Validación de datos con DTOs y Pipes  
- Arquitectura modular y escalable 

### Calidad del Código
- Pruebas unitarias con Jest  
- ESLint para consistencia de código  
- Soporte completo a TypeScript  
- Interceptores para logging y performance

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ShootDomy/giftcards.git
cd giftcard
```

2. Instala las dependencias:

```bash
npm install
```
## Configuración
Archivo `.env`:

```ini
JWT_SECRET=tu_clave_secreta_compleja
PORT=3000

# Configuración PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=tu_contrase帽a
DB_NAME=giftcard
```

---


## Uso Básico
Modo desarrollo (con hot-reload):

```bash
npm run start:dev
```

Modo producción:

```bash
npm run build
npm run start:prod
```

## Pruebas con Jest

Este proyecto utiliza **Jest** para pruebas unitarias y de integración.

```bash
npm test
```

---

## Tecnologías
- **Node.js 18.x** - Entorno de ejecución  
- **NestJS 10.x** - Framework backend modular  
- **PostgreSQL 14+** - Base de datos relacional  
- **TypeORM** - ORM para modelado de datos  
- **JWT** - Autenticación stateless  
- **bcrypt** - Hashing de contraseñas  
- **Jest** - Pruebas unitarias  
- **ESLint** - Linter de código  
- **TypeScript** - Tipado estático  

## Endpoints Disponibles

| Método   | Endpoint                      | Descripción                                  | Autenticación | Body RequergifUuido                               |
| -------- | ----------------------------  | ------------------------------------------   | ------------- | -------------------------------------------      |
| `POST`   | `/usuario/auth/registro`      | Registra un nuevo usuario                    | ❌No         | `{usuCorreo, usuContrasena}`                      |
| `POST`   | `/usuario/auth/inicio`        | Inicia sesión y obtiene JWT                  | ❌No         | `{usuCorreo, usuContrasena}`                      |
| `GET`    | `/giftcard/:gifUuid`          | Obtiene todas las gift cards del usuario     | ✅Sí (JWT)   | -                                                 |
| `GET`    | `/giftcard/:usuUuid`          | Obtiene una gift card específica del usuario | ✅Sí (JWT)   | -                                                 |
| `POST`   | `/giftcard`                   | Crea una nueva gift card                     | ✅Sí (JWT)   | `{gifNombre, gifSaldo, gifMoneda, gifExpiracion}` |
| `PATCH`  | `/giftcard`                   | Edita una gift card específica               | ✅Sí (JWT)   | `{gifSaldo, gifExpiracion}`                       |
| `DELETE` | `/giftcard/:gifUuid`          | Elimina una gift card específica             | ✅Sí (JWT)   | -                                                 |
| `POST`   | `/giftcard/transferir`          | Realiza una transferencia entre giftcard     | ✅Sí (JWT)   | `{usuUuid, gifUugifUuidOrigen, gifUugifUuidDestino, monto}`|

--- 
**Leyenda:**  
- ✅Sí = Requiere header `Authorization: Bearer <token>`  
- ❌No = No requiere autenticación  
- `:gifUuid` = UUID de la gift card  
- `:usuUuid` = UUID del usuario  

## Ejemplo de uso con Postman

**Request:**
```http
GET /giftcard/307a8404-cbff-4d55-bb96-d8c82246b704
Headers:
  Authorization: Bearer <tu_token_jwt>
  Content-Type: application/json
```

**Response:**
```json

{
  "gifUuid": "307a8404-cbff-4d55-bb96-d8c82246b704",
  "gifNombre": "Gift 1",
  "gifSaldo": 5,
  "gifMoneda": "USD",
  "gifExpiracion": "2027-08-22",
  "usuUuid": "7c1ff528-dc9a-4cd6-9e27-e4ff649dd9d8"
}

```

Información del Autor

Este proyecto fue creado por **Domenica Vintimilla**.

- **Correo**: [canizaresdomenica4@gmail.com](mailto:canizaresdomenica4@gmail.com)  
- **GitHub**: [https://github.com/ShootDomy](https://github.com/ShootDomy)  
- **LinkedIn**: [https://www.linkedin.com/in/domenica-vintimilla-24a735245/](https://www.linkedin.com/in/domenica-vintimilla-24a735245/)  


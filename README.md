# Template NestJS

Plantilla base para proyectos NestJS con autenticación, roles, integración con MySQL y Docker.

## Características

- **NestJS**: Framework robusto para Node.js.
- **Autenticación JWT** y roles de usuario.
- **TypeORM**: ORM para MySQL.
- **Swagger**: Documentación automática de la API.
- **Docker & Docker Compose**: Listo para desarrollo y producción.
- **Seeders**: Inicialización de roles y usuarios.
- **Carga de archivos**: Integración con Cloudinary.

## Requisitos

- Node.js 18+
- Yarn
- Docker y Docker Compose

## Instalación local

```bash
yarn install
cp .env.example .env
# Edita .env con tus variables
yarn build
yarn start:dev
```

Accede a la documentación en: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Uso con Docker

1. Crea y configura tu archivo `.env` (puedes copiar de `.env.example`).
2. Levanta los servicios:

```bash
docker-compose up --build
```
3. Correr seeders:
```bash
docker exec -it nestjs-app yarn run seed:run
```

Esto levantará la app NestJS y una base de datos MySQL.

## Variables de entorno principales

- `PORT`: Puerto de la aplicación (por defecto 3000)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: Configuración de MySQL
- `JWT_SECRET_KEY`: Clave secreta para JWT
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Para carga de imágenes

## Scripts útiles

- `yarn start:dev`: Desarrollo con recarga automática
- `yarn build`: Compilar la app
- `yarn start:prod`: Ejecutar compilado
- `yarn test`: Ejecutar tests

## Estructura del proyecto

```
src/
  ├── app.module.ts
  ├── main.ts
  ├── auth/
  ├── modules/
  ├── config/
  ├── database/
  └── utils/
```

## Endpoints principales

- `GET /ping`: Health check
- `POST /auth/login`: Login de usuario
- `POST /auth/register`: Registro de usuario
- `GET /users`: Listar usuarios (requiere admin)

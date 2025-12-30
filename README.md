# MEG PQRD - Sistema de Gestión de PQRD

Sistema web para la gestión de Peticiones, Quejas, Reclamos y Denuncias (PQRD) en el sector salud, desarrollado para Pharmaserv LTDA.

## 🚀 Tecnologías

- **Frontend Framework**: React 19.1 + TypeScript 5.8
- **Build Tool**: Rsbuild 1.3
- **State Management**: Zustand 5.0
- **Data Fetching**: TanStack Query 5.83
- **Routing**: Wouter 3.7
- **Forms**: React Hook Form 7.56
- **HTTP Client**: Ky 1.14
- **UI Components**: Bootstrap Icons, SweetAlert2, Sonner
- **Date Handling**: Luxon 3.7
- **PDF Generation**: React PDF 9.2

## 📋 Prerequisitos

- Node.js 21.x o superior
- pnpm 10.x (recomendado) o npm

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd meg_pqrd

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores
```

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_URI_API=<URL_de_tu_API>
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo (puerto 3075)
pnpm dev

# Ejecutar linter
pnpm lint

# Construir para producción
pnpm build

# Preview de build de producción
pnpm preview
```

## 📁 Estructura del Proyecto

```
meg_pqrd/
├── src/
│   ├── entities/              # Modelos de dominio (interfaces TypeScript)
│   ├── features/              # Características del negocio
│   │   ├── auth/             # Autenticación y autorización
│   │   ├── home/             # Dashboard principal
│   │   ├── pqrd/             # Gestión de PQRD
│   │   ├── request/          # Creación de solicitudes
│   │   ├── manage_pqrs/      # Administración de PQRS
│   │   ├── uploads/          # Carga masiva de archivos
│   │   └── shared/           # Código compartido
│   │       ├── components/   # Componentes reutilizables
│   │       ├── hooks/        # Custom hooks
│   │       ├── repositories/ # Capa de acceso a datos
│   │       └── context/      # React contexts
│   ├── presentation/          # Capa de presentación
│   │   ├── components/       # Componentes UI específicos
│   │   └── pages/            # Páginas de la aplicación
│   ├── http/                  # Cliente HTTP y manejo de errores
│   ├── services/              # Servicios de aplicación
│   ├── routes/                # Configuración de rutas
│   ├── utils/                 # Utilidades generales
│   ├── svg/                   # Componentes SVG
│   ├── App.tsx               # Componente raíz
│   └── main.tsx              # Entry point
├── public/                    # Archivos estáticos
├── config/                    # Configuraciones
├── dist/                      # Build de producción
├── azure-pipelines.frontend.yml  # CI/CD pipeline
├── rsbuild.config.ts         # Configuración de Rsbuild
├── tsconfig.json             # Configuración de TypeScript
└── package.json              # Dependencias y scripts
```

## 🏗️ Arquitectura

El proyecto sigue una arquitectura modular basada en características (feature-based):

### Entities (Modelos de Dominio)
Interfaces TypeScript que definen las estructuras de datos del dominio:
- `Affiliate`, `Request`, `Medicine`, `Ips`, `User`, etc.

### Features
Cada feature encapsula toda la lógica relacionada con una funcionalidad específica:
- **auth**: Login, gestión de sesiones, store de autenticación
- **pqrd**: CRUD de PQRD, detalle, actividades
- **request**: Creación individual y masiva de solicitudes
- **manage_pqrs**: Administración y seguimiento
- **shared**: Código compartido entre features

### Presentation
Componentes de UI y páginas que consumen las features.

### HTTP Layer
- Cliente HTTP centralizado con interceptores
- Manejo de autenticación con JWT
- Error handling global

## 🔐 Autenticación

El sistema usa JWT (JSON Web Tokens) para autenticación:
- Token almacenado en Zustand con persistencia en localStorage
- Interceptores HTTP automáticos para agregar el token
- Redirección automática a login en caso de 401

## 📊 Gestión de Estado

- **Zustand**: State global (auth, configuración)
- **TanStack Query**: Server state (cache, sincronización)
- **React Hook Form**: Estado de formularios

## 🚢 Despliegue

El proyecto usa Azure Pipelines para CI/CD:

```bash
# Build automático en push a:
- staging  → Ambiente de staging
- main     → Ambiente de producción

# El pipeline:
1. Instala dependencias con pnpm
2. Ejecuta build de Vite
3. Sube archivos a AWS S3
4. Invalida caché de CloudFront
```

Para deployment manual:

```bash
pnpm build
# Los archivos estarán en ./dist
```

## 🧪 Testing

```bash
# Ejecutar tests con Vitest
pnpm test
```

## 📝 Convenciones de Código

- **Componentes**: PascalCase (`RequestCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAffiliate.ts`)
- **Constantes**: UPPER_SNAKE_CASE
- **Interfaces**: Prefijo `i` (`iUser`, `iRequest`)
- **Strict TypeScript**: El proyecto usa `strict: true`

## 🔧 Path Aliases

El proyecto usa path aliases para imports más limpios:

```typescript
import { User } from '@/entities';
import { useAuth } from '@/features/auth';
import { Button } from '@/presentation/components';
```

Aliases configurados:
- `@/*` → `src/*`
- `@features/*` → `src/features/*`
- `@shared/*` → `src/features/shared/*`
- Y más...

## 🤝 Contribución

1. Crear feature branch: `git checkout -b feature/nueva-funcionalidad`
2. Commit cambios: `git commit -am 'feat: descripción del cambio'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Crear Pull Request

## 📄 Licencia

Propiedad de Pharmaserv LTDA - Todos los derechos reservados

## 👥 Equipo

Desarrollado por el equipo de MEG 360

---

**Última actualización**: Diciembre 2025

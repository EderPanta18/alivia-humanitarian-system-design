# Plan de implementación técnica

## 1. Estado y estrategia

Este documento define cómo construir la plataforma; no afirma que las funciones estén programadas. Se implementan incrementos verticales: capa de interfaz, contrato HTTP, caso de uso, reglas de dominio, persistencia y pruebas por capacidad. Los repositorios `frontend` y `backend` se mantienen separados y el contrato API es el vínculo técnico entre ambos.

## 2. Stack y responsabilidades

| Elemento | Tecnología | Aplicación |
|---|---|---|
| UI | Next.js, React, TypeScript | Vistas por rol, formularios, navegación, mapas. |
| Componentes | shadcn/ui compatible con la versión elegida | Controles accesibles y reutilizables, sin reglas de dominio en componentes. |
| API | NestJS, TypeScript | HTTP REST, sesiones, coordinación de casos de uso. |
| Datos | PostgreSQL con Prisma | Migraciones, repositorios, restricciones y transacciones. |
| Mapas | Leaflet + proveedor de teselas OSM | Capas, marcadores y recorridos visibles. |
| Rutas | Adaptador a openrouteservice | Cálculo y respuesta tipada sin dependencia de dominio. |
| Archivos | XLSX y PDF generados en servidor | Manifiesto/acta tras recepción validada. |
| Calidad | Biome, TypeScript, Vitest/Jest, Supertest, Playwright | Formato, lint, tipos y verificación automatizada. |

## 3. Secuencia de construcción

1. Preparar repositorios, entornos, migraciones y usuarios/catálogos de prueba.
2. Implementar Identity y middleware/guards de rol y titularidad.
3. Implementar Shelter: comunidades, solicitudes y líneas de productos.
4. Implementar Inventory: entradas, FEFO, algoritmo de matching, confirmación y autorización atómica.
5. Implementar Logistics: despachos, evaluación de rutas y retiro completo transaccional.
6. Implementar Shelter: recepción conforme/con observaciones y cálculo de faltantes.
7. Implementar generación idempotente de XLSX/PDF y acceso autorizado a archivos.
8. Implementar Territory, adaptadores de observaciones y vistas de supervisión agregada.
9. Implementar procesamiento del evento preconfigurado de cierre e informe final inmutable.
10. Ejecutar validaciones funcionales y de seguridad antes de cualquier publicación.

## 4. Organización interna de módulos

Cada módulo backend se divide conceptualmente en `entrypoints` (HTTP y tareas), `application` (casos de uso), `domain` (reglas, modelos e interfaces) e `infrastructure` (Prisma, adaptadores y almacenamiento). La ubicación física concreta de carpetas puede evolucionar sin alterar la arquitectura lógica. No se permite importación de repositorios privados de otros módulos.

## 5. Configuración del entorno

- Node.js LTS compatible con las versiones seleccionadas; gestor pnpm.
- PostgreSQL local para desarrollo y base administrada para producción propuesta.
- Configuración mediante variables `DATABASE_URL`, `SESSION_SECRET`, `MAP_PROVIDER_KEY`, `SOURCE_API_KEYS`, `APP_ORIGIN` y endpoints externos.
- Secretos fuera de Git, ejemplos `.env.example` sin credenciales y validación de configuración al iniciar servicio.
- Los datos de prueba tienen nombres ficticios y nunca se mezclan con registros de organizaciones reales.

## 6. Definición de terminado por incremento

Contrato probado, verificación de permisos de recurso, validaciones de cantidades, manejo de error/reintento, migración versionada cuando corresponda, vista accesible en móvil y comprobación de extremo a extremo del camino principal. El criterio se aplica incluso cuando el desarrollo sea incremental.

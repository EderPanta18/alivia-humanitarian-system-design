# Plan de implementación técnica

## 1. Estrategia de implementación

Alivía se desarrollará mediante incrementos verticales que integren interfaz, contrato HTTP, casos de uso, reglas de dominio, persistencia y pruebas.

Los repositorios `frontend` y `backend` permanecen separados y se coordinan mediante contratos de API versionados.

Este plan describe la construcción prevista y no implica que las funcionalidades estén implementadas.

## 2. Stack tecnológico

| Componente     | Tecnología                                            | Responsabilidad                                                  |
| -------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| Frontend       | Next.js, React, TypeScript                            | Vistas por rol, formularios, navegación y mapas.                 |
| Componentes UI | shadcn/ui compatible con la versión seleccionada      | Controles accesibles y reutilizables, sin lógica de dominio.     |
| Backend        | NestJS, TypeScript                                    | API REST, autenticación, autorización y casos de uso.            |
| Persistencia   | PostgreSQL, Prisma                                    | Repositorios, migraciones, restricciones y transacciones.        |
| Cartografía    | Leaflet y proveedor de teselas OSM                    | Capas, marcadores y representación de recorridos.                |
| Rutas          | Adaptador de openrouteservice                         | Cálculo de recorridos sin acoplar el dominio al proveedor.       |
| Documentos     | Generación de XLSX y PDF en servidor                  | Manifiestos y actas posteriores a la recepción.                  |
| Calidad        | Biome, TypeScript, Vitest/Jest, Supertest, Playwright | Formato, análisis estático, pruebas y verificación automatizada. |

## 3. Secuencia de construcción

1. **Preparación:** configurar repositorios, entornos, migraciones y datos de prueba.
2. **Identity:** implementar autenticación, sesiones y controles de rol y titularidad.
3. **Shelter — solicitudes:** implementar comunidades, solicitudes y líneas de productos.
4. **Inventory:** implementar entradas, selección FEFO, matching, confirmaciones y autorizaciones atómicas.
5. **Logistics:** implementar despachos, verificación de rutas y retiro completo con descuento transaccional.
6. **Shelter — recepciones:** registrar conformidad, observaciones y faltantes físicos.
7. **Documentos:** generar XLSX/PDF de forma idempotente y habilitar su consulta autorizada.
8. **Territory y supervisión:** implementar evaluaciones territoriales, adaptadores de observaciones y consultas agregadas.
9. **Cierre:** procesar el evento preconfigurado de finalización y generar el informe consolidado inmutable.
10. **Verificación:** ejecutar pruebas funcionales, de integración y seguridad antes de publicar.

Cada etapa debe producir capacidades verificables sin comprometer la consistencia de las operaciones existentes.

## 4. Organización del backend

El backend utiliza un monolito modular con las siguientes capas:

| Capa             | Responsabilidad                                                 |
| ---------------- | --------------------------------------------------------------- |
| `entrypoints`    | Entradas HTTP y procesamiento de tareas.                        |
| `application`    | Coordinación de casos de uso y contratos entre módulos.         |
| `domain`         | Reglas de negocio, modelos e interfaces.                        |
| `infrastructure` | Persistencia con Prisma, adaptadores externos y almacenamiento. |

La estructura física de carpetas puede evolucionar sin modificar estas responsabilidades.

Los módulos se comunican mediante contratos explícitos y no acceden directamente a repositorios ni implementaciones privadas de otros módulos.

## 5. Configuración de entornos

- **Runtime:** Node.js LTS compatible con las versiones seleccionadas y pnpm como gestor de paquetes.
- **Base de datos:** PostgreSQL local para desarrollo y servicio administrado como propuesta para producción.
- **Configuración:** variables de entorno como `DATABASE_URL`, `SESSION_SECRET`, `MAP_PROVIDER_KEY`, `SOURCE_API_KEYS`, `APP_ORIGIN` y direcciones de servicios externos.
- **Secretos:** almacenamiento fuera de Git, archivos `.env.example` sin credenciales y validación de configuración al iniciar.
- **Datos de prueba:** registros ficticios, separados de la información de organizaciones reales.

## 6. Criterios de finalización por incremento

Cada capacidad se considera terminada cuando cumple los criterios aplicables:

- Contratos de API implementados y probados.
- Autenticación, autorización y titularidad verificadas.
- Reglas de dominio y validaciones de cantidades comprobadas.
- Errores, conflictos y reintentos gestionados correctamente.
- Migraciones versionadas cuando existan cambios de persistencia.
- Interfaz accesible y funcional en dispositivos móviles.
- Flujo principal validado mediante pruebas de extremo a extremo.

Estos criterios se aplican a cada incremento, sin posponer las verificaciones esenciales hasta el final del proyecto.

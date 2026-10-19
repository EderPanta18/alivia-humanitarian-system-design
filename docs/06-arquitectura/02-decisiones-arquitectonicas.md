# Registro de decisiones arquitectónicas

## 1. Convención

Cada entrada documenta una decisión de diseño ya elegida para la arquitectura de referencia: identificador `ADR-xxx`, decisión, contexto y consecuencia técnica. `Aceptada` significa aceptada **en la especificación**, no desplegada o verificada en producción. Sustituir una decisión exige conservar su historial y registrar la nueva decisión, sin modificar retrospectivamente los motivos.

## ADR-001. Aplicación modular en capas

- **Estado:** aceptada.
- **Decisión:** backend NestJS monolítico modular en capas, con los cinco módulos funcionales separados por contratos.
- **Motivo:** reutilización de lógica de negocio, despliegue sencillo y control de complejidad.
- **Consecuencia:** ningún módulo accede directamente a tablas o implementaciones privadas de otro; la coordinación intermodular se hace con servicios/contratos.

## ADR-002. Dos repositorios de aplicación

- **Estado:** aceptada.
- **Decisión:** frontend Next.js/React/TypeScript y backend NestJS/TypeScript en repositorios Git separados, con versionado independiente.
- **Motivo:** permitir ciclos de construcción distintos sin duplicar la lógica de dominio.
- **Consecuencia:** interfaz cliente-servidor explícita mediante API REST y esquemas tipados compatibles.

## ADR-003. PostgreSQL y Prisma

- **Estado:** aceptada.
- **Decisión:** PostgreSQL administrado con schemas `identity`, `shelter`, `inventory`, `logistics` y `territory`, migraciones Prisma y restricciones SQL cuando ORM no alcance.
- **Motivo:** transacciones, claves y relaciones necesarias para integridad de existencias y recepciones.
- **Consecuencia:** referencias lógicas entre schemas se validan en comandos; las relaciones internas tienen FK físicas.

## ADR-004. REST como interfaz primaria

- **Estado:** aceptada.
- **Decisión:** API JSON vía HTTPS; no usar GraphQL ni WebSocket como requisitos iniciales.
- **Motivo:** las operaciones confirmadas son comandos discretos y consultas de estado con paginación.
- **Consecuencia:** se admite consultar cambios mediante refresco; mensajería en tiempo real se agregará únicamente si aparece una necesidad demostrable.

## ADR-005. Propuestas sin reserva; autorización atómica

- **Estado:** aceptada.
- **Decisión:** la propuesta de matching no compromete stock; la autorización revalida inventario y cobertura y registra compromiso en una transacción.
- **Motivo:** evitar doble asignación por propuestas en paralelo.
- **Consecuencia:** la disponibilidad calcula stock físico utilizable menos autorizaciones aún no retiradas.

## ADR-006. Fuentes externas como observaciones

- **Estado:** aceptada.
- **Decisión:** adaptadores almacenan fuente, fecha, identificador, estado de certeza y dato normalizado; no declaran emergencias ni envían órdenes humanitarias.
- **Motivo:** un dato observado no es automáticamente una declaración institucional.
- **Consecuencia:** los procesos operativos requieren un contexto de emergencia validado y configurado por mecanismo autorizado.

## ADR-007. Rutas con criterio conservador

- **Estado:** aceptada.
- **Decisión:** Leaflet para visualización; openrouteservice como candidato de cálculo; cerrar el paso ante vías `IMPASSABLE` o `UNKNOWN` y revalidar rutas vencidas a treinta minutos.
- **Motivo:** una ruta dibujada no prueba transitabilidad real.
- **Consecuencia:** sin evidencia vial suficientemente reciente el retiro queda bloqueado; el equipo operativo gestiona alternativas fuera de la plataforma.

## ADR-008. Despliegue administrado

- **Estado:** aceptada como topología de referencia.
- **Decisión:** Vercel para frontend, Render para servicio backend y Supabase PostgreSQL para persistencia.
- **Motivo:** despliegues separados y menor carga operativa inicial.
- **Consecuencia:** los planes de prototipo sin SLA no se considerarán apropiados para atención humanitaria de producción sin un servicio y garantías superiores.

## ADR-009. Registro inmutable de eventos críticos

- **Estado:** aceptada.
- **Decisión:** acciones de solicitud, autorización, retiro, recepción y cierre dejan evento con identidad, tiempo, objeto y clave idempotente; las correcciones son entradas nuevas.
- **Motivo:** reconstrucción comprobable de operaciones sin sobrescribir historia.
- **Consecuencia:** el registro de auditoría no sustituye el estado transaccional de cada módulo.

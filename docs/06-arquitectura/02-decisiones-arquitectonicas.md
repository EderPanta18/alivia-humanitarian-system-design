# Registro de decisiones arquitectónicas

## 1. Convenciones

Este registro documenta las decisiones arquitectónicas de Alivía, identificadas mediante códigos `ADR-xxx`. Cada entrada establece la decisión adoptada, su justificación y sus consecuencias técnicas.

El estado `Aceptada` indica que la decisión forma parte del diseño de referencia, sin implicar que esté implementada o desplegada. Las decisiones sustituidas conservan su historial y se vinculan con las nuevas entradas que las reemplazan.

## ADR-001. Monolito modular en capas

- **Estado:** Aceptada.
- **Decisión:** utilizar NestJS como backend monolítico modular, organizado en capas y con cinco módulos funcionales separados mediante contratos.
- **Motivo:** facilitar la reutilización de lógica de negocio, las pruebas y el despliegue, manteniendo límites claros entre responsabilidades.
- **Consecuencia:** los módulos se comunican mediante contratos y servicios definidos, sin acceder directamente a implementaciones o datos privados de otros módulos.

## ADR-002. Repositorios independientes

- **Estado:** Aceptada.
- **Decisión:** mantener el frontend con Next.js, React y TypeScript y el backend con NestJS y TypeScript en repositorios Git separados.
- **Motivo:** permitir ciclos de desarrollo y versionado independientes, sin duplicar reglas de negocio.
- **Consecuencia:** la comunicación entre aplicaciones utiliza una API REST con contratos y esquemas tipados compatibles.

## ADR-003. Persistencia con PostgreSQL y Prisma

- **Estado:** Aceptada.
- **Decisión:** utilizar PostgreSQL administrado y Prisma para migraciones y acceso a datos, con los esquemas `identity`, `shelter`, `inventory`, `logistics` y `territory`. Las restricciones que Prisma no pueda expresar se implementan mediante SQL.
- **Motivo:** garantizar la integridad de inventarios, autorizaciones y recepciones mediante transacciones y restricciones de persistencia.
- **Consecuencia:** las relaciones internas utilizan claves foráneas físicas, mientras que las referencias entre esquemas se coordinan mediante identificadores lógicos y validaciones de aplicación.

## ADR-004. API REST como interfaz principal

- **Estado:** Aceptada.
- **Decisión:** exponer una API JSON mediante HTTPS, sin incorporar GraphQL ni WebSocket como requisitos iniciales.
- **Motivo:** las operaciones del sistema se basan principalmente en comandos explícitos y consultas de estado paginadas.
- **Consecuencia:** las interfaces pueden actualizar información mediante consultas periódicas o refresco. La comunicación en tiempo real se incorporará únicamente si existe una necesidad justificada.

## ADR-005. Autorización atómica sin reservas por propuesta

- **Estado:** Aceptada.
- **Decisión:** las propuestas de matching no reservan inventario. La autorización revalida disponibilidad y cobertura antes de registrar el compromiso mediante una transacción atómica.
- **Motivo:** impedir sobreasignaciones cuando varias propuestas o autorizaciones compiten por las mismas existencias.
- **Consecuencia:** la disponibilidad para asignar se calcula restando del stock físico utilizable las cantidades autorizadas pendientes de retiro.

## ADR-006. Integración de fuentes externas como observaciones

- **Estado:** Aceptada.
- **Decisión:** incorporar datos externos mediante adaptadores que conserven identificador, fuente, fecha, estado de certeza y contenido normalizado, sin declarar emergencias ni ejecutar operaciones humanitarias automáticamente.
- **Motivo:** distinguir la información observada de las decisiones institucionales.
- **Consecuencia:** las operaciones requieren un escenario de emergencia previamente validado y configurado mediante un mecanismo autorizado.

## ADR-007. Verificación conservadora de rutas

- **Estado:** Aceptada.
- **Decisión:** utilizar Leaflet para visualización cartográfica y considerar openrouteservice como proveedor de cálculo de rutas. Se excluyen recorridos con tramos `IMPASSABLE` o `UNKNOWN`, y las verificaciones vencen a los treinta minutos.
- **Motivo:** un recorrido calculado no garantiza que las vías permanezcan físicamente transitables.
- **Consecuencia:** el retiro se bloquea cuando no existe una ruta válida y vigente. Las alternativas operativas se coordinan fuera de la plataforma.

## ADR-008. Despliegue mediante servicios administrados

- **Estado:** Aceptada como topología de referencia.
- **Decisión:** utilizar Vercel para el frontend, Render para el backend y Supabase PostgreSQL para la persistencia.
- **Motivo:** simplificar la administración inicial y permitir despliegues independientes de las aplicaciones.
- **Consecuencia:** los planes de prototipo sin garantías de disponibilidad no se consideran suficientes para una operación humanitaria real, que requiere infraestructura y acuerdos de servicio adecuados.

## ADR-009. Auditoría inmutable de operaciones críticas

- **Estado:** Aceptada.
- **Decisión:** registrar las operaciones críticas de solicitud, autorización, retiro, recepción y cierre mediante eventos con identidad del responsable, fecha, hora, recurso afectado y clave de idempotencia. Las correcciones generan nuevas entradas.
- **Motivo:** permitir la reconstrucción de las operaciones sin alterar ni eliminar su historial.
- **Consecuencia:** el registro de auditoría complementa el estado transaccional de cada módulo, sin sustituirlo.

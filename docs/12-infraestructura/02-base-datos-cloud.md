# Base de datos PostgreSQL en la nube

## 1. Servicio y organización

Alivía utiliza **Supabase** como proveedor administrado de PostgreSQL. El backend NestJS accede a la base de datos mediante Prisma; el frontend y el navegador no disponen de credenciales SQL ni acceso directo a las tablas operativas.

La base de datos se organiza en cinco schemas, correspondientes a los módulos propietarios de información:

- `identity`
- `shelter`
- `inventory`
- `logistics`
- `territory`

## 2. Configuración y seguridad

La configuración debe cumplir las siguientes condiciones:

- **Conexiones:** utilizar TLS mediante `sslmode=require` o la configuración segura admitida por el proveedor.
- **Credenciales:** separar usuarios de migración y ejecución, aplicando privilegios mínimos.
- **Pool de conexiones:** dimensionarlo según las instancias de NestJS y los límites del plan contratado.
- **Migraciones:** mantenerlas versionadas con Prisma en el repositorio backend, complementadas con SQL para restricciones `CHECK`, índices parciales y unicidad condicional.
- **Control de acceso:** impedir el acceso anónimo a tablas operativas. Si otros componentes utilizan la API REST nativa de Supabase, configurar RLS sin sustituir la autorización de NestJS.
- **Consultas:** utilizar paginación e índices adecuados, con fechas persistidas en UTC.

## 3. Índices operativos

| Consulta                                | Índice propuesto                                   |
| --------------------------------------- | -------------------------------------------------- |
| Solicitudes por comunidad y fecha       | `(community_id, confirmed_at DESC)`                |
| Solicitudes por emergencia y estado     | `(emergency_id, status)`                           |
| Existencias por almacén y producto      | `(warehouse_id, product_id, status, expires_on)`   |
| Propuestas por ONG y estado             | `(ong_id, status, created_at DESC)`                |
| Despachos por brigada y estado          | `(brigade_user_id, status)`                        |
| Riesgos por comunidad, desastre y fecha | `(community_id, catastrophe_id, assessed_at DESC)` |
| Movimientos por lote y fecha            | `(stock_id, created_at DESC)`                      |
| Auditoría por objeto y fecha            | `(object_kind, object_id, occurred_at DESC)`       |

Los índices constituyen decisiones de diseño sujetas a validación mediante consultas y mediciones reales. No representan optimizaciones ya implementadas o comprobadas.

## 4. Respaldo y recuperación

### Política de referencia

| Parámetro                                    | Objetivo                                       |
| -------------------------------------------- | ---------------------------------------------- |
| Frecuencia de respaldo                       | Diario                                         |
| Protección                                   | Copias cifradas fuera de la instancia primaria |
| Retención                                    | 30 días                                        |
| Ensayo de restauración                       | Mensual                                        |
| RPO — Pérdida máxima de datos prevista       | 24 horas                                       |
| RTO — Tiempo máximo de recuperación previsto | 8 horas                                        |

Estos valores son **objetivos de diseño, no SLA garantizados**. Su viabilidad depende del plan contratado, los mecanismos de respaldo y las pruebas de restauración.

### Procedimiento de verificación

1. Obtener una copia de seguridad válida.
2. Restaurarla en una instancia independiente, sin sobrescribir producción.
3. Verificar schemas y migraciones aplicadas.
4. Comparar recuentos de registros y saldos de inventario.
5. Comprobar autenticación y ejecutar una recepción de prueba.
6. Registrar resultados, incidencias y duración real de la recuperación.

Una restauración no se considera satisfactoria únicamente porque PostgreSQL haya iniciado correctamente.

## 5. Operación y monitoreo

La operación debe contemplar:

- **Migraciones:** evitar ejecuciones simultáneas de una misma migración desde distintos despliegues.
- **Monitoreo:** supervisar conexiones, almacenamiento, errores transaccionales y tiempos de consulta.
- **Continuidad:** considerar que los planes gratuitos de Supabase pueden suspender proyectos por inactividad y no garantizan disponibilidad para atención humanitaria crítica.
- **Fallos de base de datos:** no confirmar autorizaciones, retiros ni otras escrituras desde cachés del navegador cuando la persistencia no haya sido verificada.

### Referencias técnicas

- Supabase: https://supabase.com/docs/
- Prisma: https://www.prisma.io/docs/

Las capacidades y condiciones de estos servicios deben verificarse antes del despliegue. Su inclusión no demuestra que la infraestructura esté configurada o en funcionamiento.

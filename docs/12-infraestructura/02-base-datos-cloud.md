# Base de datos PostgreSQL en la nube

## 1. Servicio elegido

Supabase se utiliza como proveedor administrado de PostgreSQL. La aplicación accede mediante Prisma desde NestJS; frontend y navegador no usan credenciales SQL. La separación lógica dentro de un proyecto utiliza schemas `identity`, `shelter`, `inventory`, `logistics` y `territory`.

## 2. Configuración recomendada

- Cadena de conexión cifrada; `sslmode=require` o política TLS soportada por el proveedor.
- Usuarios separados para migración y runtime, con los menores privilegios posibles.
- Pool de conexiones acorde al número de instancias de NestJS y al límite del plan contratado.
- Migraciones Prisma versionadas en el repositorio de backend; SQL adicional para CHECK, índices parciales y unicidad condicional.
- Seguridad: no habilitar acceso anónimo a tablas operativas; si se usa REST nativa de Supabase en otros componentes, configurar RLS, pero no sustituir con ella los permisos que valida la API NestJS.
- Fechas persistidas en UTC y consultas paginadas/indexadas para listados de múltiples entidades.

## 3. Índices operativos

| Tabla o consulta | Índice lógico necesario |
|---|---|
| Solicitudes por comunidad/fecha | `(community_id, confirmed_at DESC)` |
| Solicitudes por emergencia/estado | `(emergency_id, status)` |
| Stock por almacén/producto | `(warehouse_id, product_id, status, expires_on)` |
| Propuestas por ONG/estado | `(ong_id, status, created_at DESC)` |
| Despachos por brigada/estado | `(brigade_user_id, status)` |
| Riesgo por comunidad/desastre/fecha | `(community_id, catastrophe_id, assessed_at DESC)` |
| Movimientos por lote/fecha | `(stock_id, created_at DESC)` |
| Auditoría por objeto/fecha | `(object_kind, object_id, occurred_at DESC)` |

## 4. Respaldo y recuperación

**Política de referencia:** copia diaria cifrada almacenada fuera de la instancia primaria, retención de 30 días, restauración de ensayo mensual; objetivos de diseño RPO de 24 horas y RTO de 8 horas. Estos objetivos no son SLA y requieren comprobar que el plan y el mecanismo elegido realmente permiten cumplirlos.

Procedimiento de prueba: obtener copia, restaurar en instancia separada, verificar migración/esquemas, comparar recuentos y saldos de inventario, probar autenticación y una recepción de prueba, y registrar duración observada. Nunca probar restauración sobrescribiendo producción.

## 5. Operación y riesgos

- Evitar que múltiples despliegues apliquen la misma migración simultáneamente.
- Vigilar conexiones, almacenamiento, errores de transacción y tiempos de consulta.
- El plan gratuito de Supabase puede pausarse por inactividad; es válido para evaluación técnica, no para prometer atención crítica continua.
- Ante fallo de base, las escrituras se declaran fallidas; no se confirma autorización ni retiro desde una caché del navegador.

Referencias: https://supabase.com/docs/ ; https://www.prisma.io/docs/ .

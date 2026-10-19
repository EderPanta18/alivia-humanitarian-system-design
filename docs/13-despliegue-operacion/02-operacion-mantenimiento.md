# Operación, monitoreo y mantenimiento

## 1. Principios

La operación conserva disponibilidad, integridad y trazabilidad. Los mecanismos de supervisión técnica no sustituyen la supervisión humanitaria de Defensa Civil. Toda alerta debe permitir identificar qué falló y evitar que el sistema muestre operaciones exitosas sin persistencia confirmada.

## 2. Monitoreo mínimo

| Señal | Motivo | Acción prevista |
|---|---|---|
| Errores HTTP 5xx y 409 | Falla interna o conflicto de consistencia | Diagnóstico por `requestId` y operación, sin filtrar secretos. |
| p95 de latencia | Detectar degradación | Correlacionar carga, consultas e infraestructura. |
| Errores de autenticación y 403 | Accesos fallidos o intentos indebidos | Revisar patrones, límites de intentos y permisos. |
| Conexiones y espacio de PostgreSQL | Saturación o crecimiento | Revisar pool, índices y dimensionamiento. |
| Fallos de ingesta externa | Observaciones antiguas | Marcar antigüedad y reintentar con backoff. |
| Rutas vencidas | Riesgo de usar itinerario obsoleto | Impedir retiro hasta reevaluar. |
| Tareas de documentos e informe | Archivos faltantes/duplicados | Reintentar de forma idempotente sin duplicar recepción. |
| Antigüedad de respaldos | Riesgo de pérdida de datos | Generar respaldo y probar restauración. |

## 3. Procedimientos periódicos

- **Diario:** comprobar errores críticos, salud API/BD, ejecución de respaldos y colas de tareas fallidas.
- **Semanal:** revisar eventos de permisos, versiones de dependencias, estado de integraciones y reconciliación de saldos.
- **Mensual:** probar restauración aislada, revisar índices/performance y auditar cuentas activas.
- **Ante cambio de proveedor:** validar contrato, licencia, periodo de actualización, geografía y fallos antes de habilitarlo.

## 4. Gestión de incidentes

Clasificar severidad por impacto. P0: corrupción/sobreasignación de stock, confirmaciones falsas, acceso entre entidades, pérdida de trazabilidad. P1: imposibilidad de solicitar o recepcionar, rutas inhabilitadas. P2: errores secundarios de visualización sin afectar operación. En P0 se detiene el comando afectado y se preserva evidencia; nunca se repara silenciosamente el historial de inventario.

## 5. Evolución funcional

Nuevos roles, emergencias concurrentes, GPS, gestión vehicular o automatización institucional requieren nueva definición de alcance y contratos; no se incorporan como efecto secundario de mantener infraestructura. Los cambios de interfaz o URL preservan los identificadores conceptuales de vista y sus criterios de aceptación.

## 6. Seguridad y ética operativa

Minimizar datos personales, explicar incertidumbre de observaciones territoriales, no presentar rutas como certificación de seguridad, no automatizar decisiones institucionales a partir de una alerta y no afirmar disponibilidad sin mediciones y acuerdos. La plataforma debe permitir auditar quién realizó cada compromiso o verificación comunitaria.

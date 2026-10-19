# Operación, monitoreo y mantenimiento

## 1. Principios operativos

La operación de Alivía debe preservar la disponibilidad, integridad y trazabilidad del sistema.

El monitoreo técnico permite detectar fallos y degradaciones, pero no sustituye la supervisión humanitaria de Defensa Civil.

Las alertas deben facilitar el diagnóstico y evitar que una operación sin persistencia confirmada se presente como exitosa.

## 2. Monitoreo técnico

| Señal                                           | Riesgo identificado                                        | Acción prevista                                                      |
| ----------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Errores HTTP `5xx` y conflictos `409`           | Fallos internos o conflictos operativos y de concurrencia. | Diagnosticar mediante `requestId` y operación, sin exponer secretos. |
| Latencia p95                                    | Degradación del rendimiento.                               | Correlacionar carga, consultas y recursos de infraestructura.        |
| Errores de autenticación y respuestas `403`     | Accesos fallidos o intentos no autorizados.                | Revisar patrones, límites de intentos y permisos.                    |
| Conexiones y almacenamiento PostgreSQL          | Saturación o crecimiento de recursos.                      | Evaluar pool, índices y capacidad.                                   |
| Fallos de ingesta externa                       | Observaciones desactualizadas.                             | Mostrar antigüedad y aplicar reintentos con _backoff_.               |
| Rutas vencidas                                  | Uso potencial de recorridos obsoletos.                     | Bloquear el retiro hasta obtener una nueva verificación.             |
| Fallos de generación documental e informe final | Archivos faltantes o resultados duplicados.                | Reintentar idempotentemente sin duplicar recepciones ni informes.    |
| Antigüedad de respaldos                         | Pérdida potencial de información.                          | Verificar la ejecución de respaldos y ensayar su restauración.       |

## 3. Mantenimiento periódico

| Frecuencia              | Actividades                                                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Diaria**              | Revisar errores críticos, salud de API y PostgreSQL, respaldos y tareas fallidas.                                                          |
| **Semanal**             | Examinar eventos de autorización, versiones de dependencias, integraciones externas y conciliación de saldos.                              |
| **Mensual**             | Ensayar restauraciones aisladas, revisar índices y rendimiento, y auditar cuentas activas.                                                 |
| **Cambio de proveedor** | Verificar contrato, licencia, frecuencia de actualización, cobertura geográfica y tratamiento de fallos antes de habilitar la integración. |

Las revisiones deben conservar evidencias de los problemas detectados y las acciones correctivas aplicadas.

## 4. Gestión de incidentes

Los incidentes se clasifican según su impacto sobre la integridad, seguridad y continuidad operativa.

| Severidad           | Condiciones                                                                                                          |
| ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **P0 — Crítica**    | Corrupción o sobreasignación de inventario, confirmaciones falsas, acceso entre entidades o pérdida de trazabilidad. |
| **P1 — Alta**       | Imposibilidad de registrar solicitudes o recepciones y fallos de rutas que impidan operaciones logísticas.           |
| **P2 — Secundaria** | Errores de presentación que no comprometen las operaciones ni la integridad de los datos.                            |

Ante un incidente P0 se debe detener la operación afectada, preservar las evidencias y evaluar la recuperación antes de restablecerla.

Las correcciones no deben borrar ni modificar silenciosamente movimientos de inventario o eventos históricos de auditoría.

## 5. Evolución y control de cambios

Las capacidades ajenas al alcance inicial, como nuevos roles, emergencias concurrentes, seguimiento GPS, gestión vehicular o automatización institucional, requieren una revisión explícita de requisitos y contratos.

El mantenimiento técnico no autoriza incorporar estas funciones de manera implícita.

Los cambios de interfaz, rutas o tecnologías deben conservar los identificadores conceptuales de las vistas y sus criterios de aceptación, salvo que exista una decisión documentada que los modifique.

## 6. Seguridad y responsabilidad operativa

La operación debe respetar las siguientes condiciones:

- Minimizar la recopilación y exposición de datos personales.
- Comunicar la fuente, vigencia e incertidumbre de las observaciones territoriales.
- No presentar rutas calculadas como garantías de transitabilidad o seguridad física.
- No automatizar decisiones institucionales a partir de alertas externas.
- No afirmar niveles de disponibilidad sin mediciones y acuerdos verificables.
- Mantener trazabilidad de los responsables de compromisos de inventario y verificaciones comunitarias.

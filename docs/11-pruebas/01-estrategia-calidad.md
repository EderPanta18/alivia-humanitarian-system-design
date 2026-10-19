# Estrategia de calidad y pruebas

## 1. Objetivo

Definir cómo verificar que Alivía cumple sus requisitos funcionales y preserva la integridad de los datos, inventarios y controles de seguridad ante errores, concurrencia y reintentos.

Los criterios establecidos son **objetivos de validación**, no resultados obtenidos. Su cumplimiento debe demostrarse mediante pruebas ejecutadas y evidencias verificables.

## 2. Dimensiones de calidad

| Atributo                   | Aspectos evaluados                                                | Evidencia esperada                                         |
| -------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| Adecuación funcional       | Cumplimiento de procesos y reglas de negocio.                     | Casos de aceptación por rol.                               |
| Fiabilidad                 | Atomicidad, idempotencia y consistencia ante fallos o reintentos. | Pruebas de concurrencia y recuperación.                    |
| Seguridad                  | Autenticación, titularidad y restricciones de acceso.             | Pruebas de permisos, sesiones y cookies.                   |
| Eficiencia de desempeño    | Tiempos de respuesta y cálculo de matching.                       | Métricas de percentil 95 con datos y entorno documentados. |
| Usabilidad y accesibilidad | Formularios, mensajes, navegación y adaptación móvil.             | Evaluaciones de tareas y accesibilidad.                    |
| Mantenibilidad             | Separación modular, tipado y capacidad de prueba.                 | Pruebas de contratos y revisión técnica.                   |
| Compatibilidad             | Navegadores y contratos de comunicación.                          | Matriz de entornos verificados.                            |

La clasificación toma como referencia ISO/IEC 25010, sin implicar una certificación formal.

## 3. Niveles y herramientas de prueba

| Nivel                   | Alcance                                                              | Herramientas                             |
| ----------------------- | -------------------------------------------------------------------- | ---------------------------------------- |
| Unitario frontend       | Componentes aislados y utilidades.                                   | Vitest                                   |
| Unitario backend        | FEFO, prioridades, saldos y transiciones de estado.                  | Jest                                     |
| Integración             | Prisma, PostgreSQL, transacciones y autorizaciones.                  | Jest y Supertest                         |
| Contratos HTTP          | Esquemas, respuestas de error y permisos.                            | Supertest y OpenAPI                      |
| Extremo a extremo (E2E) | Flujo de solicitud, autorización, despacho, recepción y supervisión. | Playwright                               |
| Análisis estático       | Formato, reglas, tipado y compilación.                               | Biome y TypeScript                       |
| Seguridad               | Accesos indebidos, comandos repetidos, CSRF y XSS.                   | Pruebas automatizadas y revisión técnica |

## 4. Datos y metas de aceptación

### 4.1. Conjunto de prueba

Se define un conjunto de referencia con datos ficticios:

- 7 comunidades.
- 3 ONG.
- 1 brigada.
- 30 solicitudes, con un máximo de 3 líneas cada una.
- 100 movimientos de inventario.

Este conjunto permite ejecutar pruebas reproducibles, pero no representa la escala productiva ni la demanda real de Piura.

### 4.2. Métricas de aceptación

| Métrica                                        | Objetivo  | Método de verificación                                                                      |
| ---------------------------------------------- | --------- | ------------------------------------------------------------------------------------------- |
| Operaciones HTTP comunes                       | p95 ≤ 3 s | 20 ejecuciones con datos fijos y entorno acordado.                                          |
| Cálculo de matching                            | ≤ 5 s     | Ejecuciones repetidas con trazas y resultados verificables sobre el conjunto de referencia. |
| Sobreasignaciones confirmadas                  | 0         | Autorizaciones concurrentes sobre existencias limitadas.                                    |
| Descuentos duplicados                          | 0         | Repetición del retiro con la misma clave idempotente.                                       |
| Accesos indebidos aceptados                    | 0         | Pruebas negativas de rol y titularidad.                                                     |
| Recepciones con cantidades inválidas aceptadas | 0         | Pruebas de frontera sobre `0 <= conforme <= recibida <= enviada`.                           |
| Incompatibilidades móviles críticas            | 0         | Pruebas E2E de los procesos principales en viewport de 360 × 800.                           |

Los tiempos definidos son **metas de diseño**, no mediciones realizadas ni compromisos de nivel de servicio (SLA).

Cada ejecución debe registrar el entorno, sus versiones, el conjunto de datos y los resultados obtenidos.

## 5. Prioridad de pruebas

| Prioridad           | Alcance                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0 — Crítica**    | Sobreasignación de existencias, accesos indebidos, descuentos duplicados, recepciones duplicadas y publicación prematura del informe final. |
| **P1 — Alta**       | Procesos principales, validación de rutas y transiciones de estado.                                                                         |
| **P2 — Secundaria** | Navegación y presentación de funciones complementarias.                                                                                     |

No se permite publicar una versión de producción con fallos P0 o P1 pendientes.

## 6. Criterios de salida

Una versión puede considerarse lista para publicación cuando:

- Todas las verificaciones obligatorias finalizan satisfactoriamente.
- Se ejecutan las pruebas de regresión correspondientes.
- No permanecen incidencias P0 o P1 abiertas.
- Se conservan evidencias vinculadas al commit y al entorno de ejecución.
- Los procedimientos de restauración han sido ensayados.

Los resultados deben reflejar el estado real de las verificaciones. Una prueba sin implementación o sin ejecución se registra como `No ejecutado`, nunca como `Aprobado`.

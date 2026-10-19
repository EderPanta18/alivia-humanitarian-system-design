# Estrategia de calidad y pruebas

## 1. Objetivo

Comprobar que Alivía responde a sus requisitos y no compromete datos, inventarios o seguridad ante errores operativos. Se separan **criterios proyectados** de **resultados obtenidos**. Esta especificación define cómo se medirá la calidad cuando exista implementación; no certifica ningún resultado.

## 2. Dimensiones de calidad

| Atributo | Qué se evalúa | Evidencia esperada |
|---|---|---|
| Adecuación funcional | Coincidencia con procesos y reglas | Casos de aceptación por rol. |
| Fiabilidad | Atomicidad, idempotencia, integridad bajo reintentos | Ensayos de carrera y reinicio. |
| Seguridad | Sesión, titularidad, acceso de solo lectura | Pruebas de permisos y cookies. |
| Eficiencia de desempeño | Tiempo de lecturas/guardados y matching | Métricas percentil 95 con datos declarados. |
| Usabilidad/accesibilidad | Errores claros, roles y formularios móvil | Evaluación de tareas y accesibilidad. |
| Mantenibilidad | Límites modulares, tests aislados y tipado | Pruebas de contratos y revisión. |
| Compatibilidad | Navegadores y contratos de comunicación | Matriz de entornos. |

La clasificación se inspira en ISO/IEC 25010 sin afirmar certificación formal.

## 3. Niveles y herramientas

| Nivel | Enfoque | Herramienta |
|---|---|---|
| Unitario frontend | Validación de componentes puros y utilidades | Vitest |
| Unitario backend | Algoritmo FEFO, prioridades, saldos y estados | Jest |
| Integración | Prisma/PostgreSQL, transacciones y autorizaciones | Jest + Supertest |
| Contrato HTTP | Esquemas, errores y permisos | Supertest/OpenAPI |
| E2E | Solicitud a recepción y supervisión | Playwright |
| Estática | Formato, reglas, tipado, compilación | Biome y TypeScript |
| Seguridad | Accesos indebidos, reenvíos, CSRF, XSS | Ensayos automatizados y revisión |

## 4. Datos y metas de aceptación

Conjunto de prueba de referencia: siete comunidades ficticias, tres ONG, una brigada, treinta solicitudes con hasta tres renglones y cien movimientos de inventario. No representa escala productiva ni demanda real de Piura.

| Métrica | Objetivo diseñado | Método |
|---|---|---|
| Operaciones comunes HTTP | p95 <= 3 s en entorno de prueba acordado | Repetir veinte veces con dataset fijo. |
| Cálculo de matching | <= 5 s para el conjunto de referencia | Repetir con trazas de carga y resultados verificables. |
| Sobreasignaciones confirmadas | 0 | Carrera simultánea de dos autorizaciones. |
| Retiros duplicados por reintento | 0 | Doble petición con misma clave. |
| Accesos a entidad ajena aceptados | 0 | Pruebas negativas por rol. |
| Recepciones fuera de rango aceptadas | 0 | Fronteras `conforme <= recibida <= enviada`. |
| Incompatibilidad móvil crítica | 0 en viewport 360 × 800 | E2E de procesos principales. |

Los tiempos son **metas de diseño**, no resultados medidos ni SLA. El entorno exacto y su versión deben registrarse en cada ejecución.

## 5. Prioridad de prueba

P0: sobreasignación, permisos, descuentos múltiples, duplicidad de recepciones, informe final prematuro; P1: procesos principales, ruta inválida, estados; P2: navegación y presentación secundaria. Ningún fallo P0 o P1 abierto permite publicar una versión de producción.

## 6. Criterio de salida

Pruebas obligatorias en verde, regresiones ejecutadas, incidencias críticas resueltas, evidencias conservadas con commit/entorno y procedimientos de restauración ensayados. La ausencia de código significa `No ejecutado`, nunca `Aprobado`.

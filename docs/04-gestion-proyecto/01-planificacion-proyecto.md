# Plan de desarrollo y coordinación

## 1. Objetivo de planificación

Organizar la construcción incremental de Alivía sin confundir actividades previstas con resultados ejecutados. El desarrollo se gestiona con un tablero Kanban, entregas funcionales cortas y verificación por criterio de aceptación. El diseño lógico del sistema mantiene su independencia respecto del tablero, las fechas y la herramienta de seguimiento.

## 2. Modelo de proceso

**Modelo:** desarrollo incremental con Kanban. Un incremento es una funcionalidad vertical usable, que incluye interfaz, API, validación, persistencia y pruebas aplicables. Los estados del tablero son `Por analizar`, `Preparado`, `En curso`, `En revisión`, `Verificado` y `Completado`. Máximo de dos tareas simultáneas en `En curso` por responsable; no iniciar trabajos bloqueados por contratos faltantes.

### 2.1. Orden de incrementos

| Incremento | Capacidad verificable | Dependencia operativa |
|---|---|---|
| I0 | Identidad, roles, catálogos y datos de referencia | Ninguna |
| I1 | Registro de solicitudes y validación de titularidad | I0 |
| I2 | Inventario utilizable y matching determinista | I0, I1 |
| I3 | Confirmación ONG, autorización y compromisos atómicos | I2 |
| I4 | Despachos, evaluación de ruta y retiro completo | I3 |
| I5 | Recepción, discrepancias, documentos e historial | I4 |
| I6 | Territorio, fuentes externas de observaciones y supervisión | I0, I5 para lectura de avance |
| I7 | Evento final y reporte consolidado, endurecimiento y despliegue | I5, I6 |

Los datos externos pueden integrarse primero mediante adaptadores que consuman muestras identificadas sin declarar una integración pública operativa.

## 3. Responsables y colaboración

El equipo de referencia consta de cuatro integrantes. Las responsabilidades son áreas de trabajo y no cuentas o usuarios de Alivía.

| Área | Responsable de coordinación | Producto revisable |
|---|---|---|
| Análisis y requisitos | Integrante 1 | Definiciones, requisitos y criterios de aceptación |
| Procesos y modelado | Integrante 2 | Flujos y modelo de dominio y persistencia |
| Arquitectura y comunicaciones | Integrante 3 | Componentes, contratos e infraestructura propuesta |
| Interfaz y cartografía | Integrante 4 | Especificaciones visuales, mapas y prototipos externos |
| Implementación y pruebas | Trabajo compartido | Incrementos validados con evidencia |

Toda modificación de contrato que afecte otras áreas necesita revisión del propietario de la especificación impactada. La revisión colectiva valida consistencia, no sustituye las pruebas.

## 4. Estimación y control

- El tamaño se estima por historias o capacidades completas, con complejidad relativa `S`, `M`, `L`.
- `S`: cambio local sin migración ni integración externa; `M`: modificación de un módulo y contrato; `L`: colaboración intermodular, persistencia crítica o proveedor externo.
- Las estimaciones se actualizan al comprobar datos reales de implementación; no se presentan horas o costos como si hubieran sido medidos.
- Las dependencias críticas son autorización/inventario, retiro/inventario, recepción/despacho y fuentes territoriales/mapa.
- El presupuesto de infraestructura distingue prototipo de operación real; las pruebas de carga y recuperación condicionan su dimensionamiento.

## 5. Definición de preparado y terminado

**Preparado:** propósito único, criterios de aceptación observables, dueño del módulo, contratos de entrada/salida y dependencias disponibles.

**Terminado:** implementación comprobada, validación de tipos, lint, pruebas aplicables, revisión de permisos, migración verificada si corresponde, evidencia registrada y cambios versionados. Una función descrita pero no implementada conserva estado `Diseñada`, nunca `Terminada`.

## 6. Riesgos de ejecución

| Riesgo | Señal | Mitigación |
|---|---|---|
| Datos viales incompletos | Ruta calculada sobre estado `UNKNOWN` | Bloquear retiro o requerir nueva evidencia; nunca presumir transitabilidad. |
| Proveedores externos no accesibles | Fuente inaccesible o términos no compatibles | Adaptador desacoplado y datos de prueba identificados; no atribuir datos reales. |
| Reservas simultáneas | Dos autorizaciones compiten por un lote | Transacciones con comprobación atómica y reintentos idempotentes. |
| Rutas/API cambiantes | Enlaces rotos o cambios de despliegue | Contratos estables y URLs como configuración, no como reglas del dominio. |
| Alcance expansivo | Solicitudes de GPS, rescate o gestión vehicular | Verificar límites aprobados; mantener fuera del primer incremento. |

## 7. Gestión de cambios

Registrar motivo, regla afectada, riesgo, alternativa elegida, criterio de aceptación y revisión de dependencias. Los cambios solo se trasladan a los consumidores realmente afectados. Las decisiones estructurales se conservan como entradas ADR con estado `Aceptada` o `Sustituida`; no constituyen nuevos requisitos funcionales.

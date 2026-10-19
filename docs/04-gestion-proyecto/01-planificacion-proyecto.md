# Plan de desarrollo y coordinación

## 1. Objetivo

Organizar el desarrollo incremental de Alivía mediante un tablero Kanban, entregas funcionales y verificaciones basadas en criterios de aceptación.

La planificación distingue las actividades previstas de los resultados comprobados, sin condicionar el diseño del sistema a fechas o herramientas de seguimiento.

## 2. Modelo de desarrollo

Se adopta un **modelo incremental con Kanban**, donde cada incremento entrega una capacidad funcional verificable que integra interfaz, API, validaciones, persistencia y pruebas aplicables.

El tablero contempla los siguientes estados:

`Por analizar` → `Preparado` → `En curso` → `En revisión` → `Verificado` → `Completado`

Se establece un máximo de dos tareas simultáneas en `En curso` por responsable. Las actividades con dependencias o contratos pendientes no deben iniciarse.

### 2.1. Secuencia de incrementos

| Incremento | Capacidad verificable                                                   | Dependencias                              |
| ---------- | ----------------------------------------------------------------------- | ----------------------------------------- |
| I0         | Autenticación, roles, catálogos y datos de referencia.                  | Ninguna                                   |
| I1         | Registro de solicitudes y validación de titularidad.                    | I0                                        |
| I2         | Inventario utilizable y matching determinista.                          | I0, I1                                    |
| I3         | Confirmación de aportes, autorización y compromisos atómicos.           | I2                                        |
| I4         | Despachos, evaluación de rutas y retiro completo.                       | I3                                        |
| I5         | Recepciones, discrepancias, documentos e historial.                     | I4                                        |
| I6         | Información territorial, observaciones externas y supervisión.          | I0, I5 para consultar avances de atención |
| I7         | Cierre del escenario, informe consolidado, endurecimiento y despliegue. | I5, I6                                    |

La integración de fuentes externas puede comenzar con adaptadores y datos de prueba identificados, sin asumir conexiones operativas con proveedores reales.

## 3. Responsabilidades y colaboración

El equipo de referencia está compuesto por cuatro integrantes, con responsabilidades distribuidas por área. Estas funciones corresponden al desarrollo del proyecto y no a los roles operativos de Alivía.

| Área                          | Responsable     | Entregable                                          |
| ----------------------------- | --------------- | --------------------------------------------------- |
| Análisis y requisitos         | Integrante 1    | Requisitos y criterios de aceptación.               |
| Procesos y modelado           | Integrante 2    | Flujos, modelo de dominio y persistencia.           |
| Arquitectura y comunicaciones | Integrante 3    | Componentes, contratos e infraestructura propuesta. |
| Interfaz y cartografía        | Integrante 4    | Diseño de interfaces, mapas y prototipos.           |
| Implementación y pruebas      | Equipo completo | Incrementos implementados y verificados.            |

Los cambios que afecten contratos compartidos requieren revisión del responsable de la especificación correspondiente. La revisión conjunta comprueba la coherencia entre áreas, sin sustituir las pruebas de implementación.

## 4. Estimación y seguimiento

Las tareas se estiman por capacidades completas mediante una escala de complejidad relativa:

| Tamaño | Criterio                                                                            |
| ------ | ----------------------------------------------------------------------------------- |
| `S`    | Cambio local sin migraciones ni integraciones externas.                             |
| `M`    | Modificación de un módulo y su contrato.                                            |
| `L`    | Cambios entre módulos, persistencia crítica o integración con proveedores externos. |

Las estimaciones se ajustan con evidencia de implementación. No se atribuyen horas ni costos medidos a actividades que todavía no se han ejecutado.

Las dependencias técnicas críticas comprenden autorización e inventario, retiro y descuento físico, recepción y despacho, e información territorial y mapas.

El dimensionamiento de infraestructura debe distinguir las necesidades del prototipo de las de una operación real, considerando resultados de pruebas de carga y recuperación.

## 5. Criterios de preparación y finalización

### 5.1. Preparado

Una tarea puede iniciar cuando dispone de:

- Objetivo y alcance definidos.
- Criterios de aceptación verificables.
- Responsable del módulo.
- Contratos de entrada y salida establecidos.
- Dependencias necesarias disponibles.

### 5.2. Terminado

Una tarea se considera terminada cuando cumple las verificaciones aplicables:

- Funcionalidad implementada y comprobada.
- Validación de tipos, lint y pruebas correspondientes.
- Revisión de permisos y restricciones.
- Migraciones verificadas, cuando existan.
- Evidencia de verificación registrada.
- Cambios versionados.

Una funcionalidad únicamente especificada conserva el estado `Diseñada`; no puede declararse `Terminada`.

## 6. Riesgos de ejecución

| Riesgo                               | Señal                                                                    | Mitigación                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| Información vial insuficiente        | Rutas con tramos `UNKNOWN` o sin verificación válida.                    | Bloquear retiros hasta obtener una ruta utilizable.                                                  |
| Fuentes externas inaccesibles        | Servicios no disponibles o condiciones de uso incompatibles.             | Utilizar adaptadores desacoplados y datos de prueba identificados, sin atribuirles procedencia real. |
| Autorizaciones concurrentes          | Varias operaciones intentan comprometer un mismo lote.                   | Aplicar transacciones atómicas y mecanismos idempotentes.                                            |
| Cambios de API o despliegue          | Contratos incompatibles, enlaces o rutas de integración desactualizados. | Mantener contratos estables y direcciones configurables, independientes de las reglas del dominio.   |
| Ampliación no controlada del alcance | Solicitudes de GPS, gestión vehicular o funciones de rescate.            | Respetar las exclusiones y los límites funcionales establecidos.                                     |

## 7. Gestión de cambios

Cada cambio debe documentar su motivo, las reglas afectadas, los riesgos, la alternativa seleccionada, los criterios de aceptación y las dependencias involucradas.

Las modificaciones se propagan únicamente a los componentes y documentos afectados.

Las decisiones arquitectónicas relevantes se registran mediante ADR (_Architecture Decision Records_), con estado `Aceptada` o `Sustituida`. Estos registros justifican decisiones técnicas y no constituyen requisitos funcionales adicionales.

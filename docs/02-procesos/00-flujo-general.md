# Flujo general de coordinación humanitaria

## 1. Objetivo

Describir el flujo integral de coordinación humanitaria en Alivía, desde el registro de necesidades hasta la entrega de ayuda y la supervisión territorial. Se presentan las relaciones entre las actividades principales, sin detallar los procedimientos internos de cada macroproceso.

## 2. Inicio, fin y participantes

- **Inicio operativo:** el representante de una comunidad confirma una solicitud válida dentro del escenario de atención configurado.
- **Participantes humanos:** jefe de Comuna/Albergue, jefe de ONG, jefe de Brigada y jefe de Defensa Civil.
- **Procesos automáticos:** matching, verificación de rutas, actualización de inventario, generación de documentos, incorporación de información territorial y consolidación final.
- **Fin por despacho:** la comunidad finaliza la recepción, conforme o con observaciones, y se generan los documentos correspondientes.
- **Cierre del escenario:** se produce mediante un evento externo preconfigurado, independiente de la finalización de los despachos.

## 3. Diagrama general

```mermaid
flowchart TD
    A[Comunidad confirma solicitud] --> B[Sistema identifica demanda sin cobertura]
    B --> C[Sistema genera propuestas por ONG]
    C --> D[ONG revisa y confirma o rechaza]
    D --> E{Aporte confirmado}
    E -- No --> F[Conservar cobertura pendiente]
    F --> B
    E -- Sí --> G[ONG revalida y autoriza salida]
    G --> H[Sistema verifica ruta y restricciones viales]
    H --> I{Ruta disponible y validada}
    I -- No --> J[Retiro bloqueado hasta nueva verificación]
    J --> H
    I -- Sí --> K[Brigada confirma retiro completo]
    K --> L[Sistema descuenta inventario una sola vez]
    L --> M[Brigada traslada y registra llegada]
    M --> N[Comunidad verifica recepción]
    N --> O{Recepción conforme}
    O -- Sí --> P[Finalizar conforme]
    O -- No --> Q[Finalizar con observaciones y reporte interno]
    P --> R[Generar manifiesto Excel y acta PDF]
    Q --> R
    C --> S[Demanda nunca cubierta permanece visible]

    T[Observaciones externas o datos precargados] -. alimentan .-> U[Evaluación de riesgo territorial]
    U -. consulta .-> V[Defensa Civil en modo lectura]
    R -. resultados .-> V
    S -. brechas .-> V
    W[Evento preconfigurado EMERGENCIA_FINALIZADA] --> X[Generar informe final una sola vez]
    X --> Y[Defensa Civil lee informe final]
```

## 4. Puntos de control

| Punto | Condición                                            | Consecuencia                                                                       |
| ----- | ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| PC-01 | La solicitud contiene datos inválidos.               | Se impide su confirmación hasta corregirlos.                                       |
| PC-02 | El inventario es insuficiente.                       | No se comprometen existencias inexistentes y se conserva la demanda sin cobertura. |
| PC-03 | La ONG rechaza o reduce una propuesta.               | Las cantidades no aceptadas permanecen pendientes de nuevas propuestas.            |
| PC-04 | El stock cambia antes de la autorización.            | Se revalida la disponibilidad para evitar compromisos incompatibles.               |
| PC-05 | La ruta está indisponible según la información vial. | Se bloquea el retiro sin descontar inventario físico.                              |
| PC-06 | La brigada confirma el retiro completo.              | Se registra el movimiento de inventario una sola vez.                              |
| PC-07 | La brigada registra su llegada.                      | Se habilita la verificación comunitaria, sin asumir conformidad.                   |
| PC-08 | La comunidad detecta daños o faltantes.              | La recepción finaliza con observaciones y las discrepancias quedan documentadas.   |
| PC-09 | Se recibe el evento de cierre del escenario.         | Se genera el informe consolidado final para su posterior consulta.                 |

## 5. Flujos paralelos y dependencias de negocio

1. **Cobertura pendiente:** el matching continúa buscando aportes para necesidades que nunca obtuvieron cobertura. Las cantidades autorizadas permanecen comprometidas y no se consideran nuevamente disponibles para esa misma necesidad.
2. **Recepciones con observaciones:** una recepción puede finalizar aunque existan productos faltantes o no conformes. Estas discrepancias se registran, pero no reactivan automáticamente el matching por las cantidades afectadas.
3. **Supervisión territorial:** Defensa Civil consulta riesgos y resultados de atención sin intervenir en las autorizaciones, despachos o recepciones. Su participación no condiciona la ejecución logística.
4. **Evaluación de riesgos:** la información territorial proviene de observaciones externas o datos precargados, independientemente de las recepciones. Una comunidad atendida puede mantener niveles de riesgo vigentes.
5. **Alertas externas:** los avisos de fuentes externas pueden generar notificaciones a usuarios autorizados, pero no declaran emergencias automáticamente ni sustituyen decisiones institucionales.

## 6. Límites de la representación

- La asignación de conductores y vehículos corresponde a la organización interna de cada brigada, fuera de Alivía.
- No se contempla seguimiento GPS continuo ni localización automática en tiempo real.
- La prioridad utiliza las ponderaciones de referencia: criticidad del producto (50 %), población afectada (30 %) y antigüedad de la solicitud (20 %).
- Las fuentes externas se integran mediante adaptadores que conservan la procedencia de los datos.
- Esta versión considera un escenario de emergencia activo; la coordinación de emergencias simultáneas queda fuera del alcance inicial.
- Los porcentajes de atención y los indicadores cartográficos no constituyen certificaciones automáticas de seguridad territorial.

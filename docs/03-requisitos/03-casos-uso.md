# Casos de uso de Alivía

## 1. Alcance y convenciones

Los casos de uso describen las interacciones de los cuatro roles humanos de Alivía con el sistema, incluyendo sus objetivos, flujos principales, alternativas y resultados.

Los procesos internos, como matching, actualización de inventario, generación de documentos e importación de datos externos, se ejecutan como parte de estas operaciones y no constituyen actores humanos.

Los identificadores utilizan los siguientes prefijos:

| Prefijo  | Actor                   |
| -------- | ----------------------- |
| `CU-COM` | Jefe de Comuna/Albergue |
| `CU-ONG` | Jefe de ONG             |
| `CU-BRI` | Jefe de Brigada         |
| `CU-DC`  | Jefe de Defensa Civil   |

### Condiciones generales

- Cada actor dispone de una cuenta activa, un único rol y una sesión válida.
- Las entidades, el catálogo y el escenario de emergencia están configurados.
- El servidor verifica los permisos y la titularidad de los recursos en cada operación.
- Las acciones críticas cuentan con mecanismos que evitan duplicaciones por reintentos.

## 2. Jefe de Comuna/Albergue

### CU-COM-01. Registrar solicitud de ayuda

**Objetivo:** registrar las necesidades de su comunidad con productos y cantidades definidos.

**Flujo principal:**

1. El sistema identifica la comunidad mediante la sesión.
2. El jefe registra la situación y población afectada.
3. Selecciona productos del catálogo e indica las cantidades requeridas.
4. Revisa y confirma la solicitud.
5. El sistema valida y registra la solicitud con sus líneas, habilitándola para matching.

**Alternativas:** los productos inválidos, cantidades incorrectas o líneas duplicadas impiden la confirmación. Ante fallos de comunicación, no se informa éxito sin verificar la persistencia.

**Resultado:** solicitud confirmada, sin comprometer inventario. No puede editarse ni cancelarse posteriormente por el jefe.

### CU-COM-03. Consultar estado de solicitud propia

**Objetivo:** conocer la cobertura y el progreso de atención de una solicitud.

**Flujo principal:**

1. El jefe consulta las solicitudes de su comunidad.
2. Selecciona una solicitud.
3. Visualiza las cantidades requeridas, sin cobertura, comprometidas y recibidas conformes, junto con el estado de sus despachos.

**Alternativas:** se deniega el acceso a solicitudes ajenas. Si no existen despachos, se muestran las necesidades pendientes sin atribuir entregas inexistentes.

**Resultado:** información consultada sin modificar registros.

### CU-COM-04. Confirmar recepción

**Objetivo:** verificar y confirmar la ayuda recibida de un despacho.

**Precondición:** despacho destinado a su comunidad con llegada registrada.

**Flujo principal:**

1. Consulta los productos y cantidades enviados.
2. Verifica físicamente la carga.
3. Registra las cantidades recibidas y conformes por línea.
4. Confirma la recepción.
5. El sistema finaliza el registro y genera el manifiesto Excel y el acta PDF.

**Alternativas:** se rechazan despachos ajenos, sin llegada registrada o con cantidades incoherentes. Las discrepancias se gestionan mediante `CU-COM-05`.

**Resultado:** recepción finalizada una sola vez por despacho.

### CU-COM-05. Registrar recepción con discrepancias

**Objetivo:** documentar faltantes o productos no conformes durante la recepción.

**Precondición:** discrepancias detectadas al ejecutar `CU-COM-04`.

**Flujo principal:**

1. Registra las cantidades físicamente recibidas y conformes.
2. Identifica faltantes, daños y observaciones por línea.
3. Confirma la recepción con observaciones.
4. El sistema registra las discrepancias internamente y genera los documentos del despacho.

**Alternativas:** las cantidades inconsistentes requieren corrección; si no existen discrepancias, se utiliza la confirmación conforme.

**Resultado:** recepción finalizada como `WITH_OBSERVATIONS`, sin reactivar automáticamente el matching por las cantidades faltantes o no conformes.

## 3. Jefe de ONG

### CU-ONG-01. Registrar ingreso de donaciones

**Objetivo:** incorporar productos recibidos al inventario de su organización.

**Precondición:** almacén y productos válidos.

**Flujo principal:**

1. Selecciona el almacén y el producto.
2. Registra cantidad, lote y vencimiento cuando corresponda.
3. Confirma el ingreso.
4. El sistema actualiza las existencias y registra el movimiento.

**Alternativas:** se rechazan cantidades no positivas, unidades incompatibles y almacenes ajenos.

**Resultado:** inventario actualizado una sola vez, con trazabilidad del ingreso.

### CU-ONG-02. Consultar inventario disponible

**Objetivo:** conocer las existencias físicas y las cantidades disponibles para nuevas asignaciones.

**Flujo principal:**

1. Consulta los almacenes de su ONG.
2. Revisa lotes, cantidades físicas, condiciones de utilización y compromisos vigentes.
3. Identifica la disponibilidad para asignar.

**Alternativas:** los lotes vencidos o bloqueados se muestran sin considerarse utilizables. Se deniega el acceso a almacenes ajenos.

**Resultado:** consulta sin modificación de inventario.

### CU-ONG-03. Registrar ajuste de inventario

**Objetivo:** corregir existencias mediante operaciones justificadas y trazables.

**Flujo principal:**

1. Selecciona un lote propio.
2. Indica el ajuste y su motivo.
3. Confirma la operación.
4. El sistema valida las restricciones y registra el movimiento.

**Alternativas:** se rechazan ajustes que generen existencias negativas o incumplan compromisos autorizados.

**Resultado:** inventario actualizado con registro de la corrección y su responsable.

### CU-ONG-04. Revisar propuesta de matching

**Objetivo:** evaluar los aportes sugeridos a su organización.

**Precondición:** propuesta dirigida a su ONG.

**Flujo principal:**

1. Accede a su bandeja de propuestas.
2. Consulta comunidad destinataria, productos, cantidades, prioridad y origen.
3. Revisa el estado de la propuesta antes de decidir.

**Alternativas:** se deniega el acceso a propuestas ajenas y se impide responder propuestas que hayan perdido validez.

**Resultado:** propuesta consultada, sin compromiso de inventario.

### CU-ONG-05. Confirmar, reducir o rechazar propuesta

**Objetivo:** registrar las cantidades que la ONG está dispuesta a aportar.

**Precondición:** propuesta propia vigente.

**Flujo principal:**

1. Selecciona una propuesta.
2. Acepta o reduce las cantidades sugeridas.
3. Confirma su decisión.
4. El sistema registra la respuesta y conserva las cantidades no aceptadas como pendientes de cobertura.

**Alternativas:** una respuesta con todas las cantidades en cero exige rechazo motivado. No se permiten cantidades superiores a las propuestas ni decisiones basadas en disponibilidad inválida.

**Resultado:** disponibilidad confirmada o propuesta rechazada, sin autorizar todavía el retiro.

### CU-ONG-06. Autorizar salida

**Objetivo:** comprometer explícitamente las cantidades confirmadas.

**Precondición:** disponibilidad confirmada y vigente.

**Flujo principal:**

1. Revisa los productos y cantidades confirmados.
2. Solicita la autorización de salida.
3. El sistema revalida inventario, titularidad y cobertura de forma atómica.
4. Registra la autorización y habilita el despacho.

**Alternativas:** los conflictos de disponibilidad impiden autorizar. Los reintentos no generan compromisos duplicados.

**Resultado:** cantidades comprometidas y excluidas de nuevas propuestas, sin descuento del inventario físico hasta el retiro confirmado.

## 4. Jefe de Brigada

### CU-BRI-01. Consultar despachos autorizados

**Objetivo:** identificar los despachos asignados a su brigada.

**Flujo principal:**

1. Consulta sus despachos autorizados.
2. Revisa almacén de origen, comunidad destinataria, productos, cantidades y estado logístico.

**Alternativas:** se deniega el acceso operativo a despachos de otras brigadas.

**Resultado:** información del despacho disponible para coordinar el retiro.

### CU-BRI-03. Consultar ruta de un despacho

**Objetivo:** obtener una ruta evaluada antes de retirar la ayuda.

**Precondición:** despacho propio con salida autorizada.

**Flujo principal:**

1. Selecciona el despacho.
2. El sistema calcula o reevalúa la ruta con la información vial disponible.
3. Presenta el recorrido, su estado y la fecha de verificación, o informa su indisponibilidad.

**Alternativas:** los tramos `IMPASSABLE` o `UNKNOWN` impiden considerar utilizable la ruta. Una verificación vencida requiere reevaluación y la ausencia de ruta válida bloquea el retiro.

**Resultado:** ruta verificada o indisponibilidad registrada, sin garantizar transitabilidad física.

### CU-BRI-05. Verificar y confirmar retiro completo

**Objetivo:** comprobar que la carga entregada por la ONG coincide íntegramente con lo autorizado.

**Precondición:** despacho autorizado, ruta vigente y disponible, y carga preparada.

**Flujo principal:**

1. Compara físicamente los productos con las cantidades autorizadas.
2. Confirma el retiro completo.
3. El sistema registra la operación y descuenta las existencias una sola vez.
4. Habilita la continuación del traslado.

**Alternativas:** las cantidades incompletas impiden confirmar el retiro. Los errores de descuento no se presentan como operaciones exitosas y los reintentos no duplican movimientos.

**Resultado:** retiro completo confirmado con descuento físico y trazabilidad.

### CU-BRI-04. Registrar llegada al destino

**Objetivo:** dejar constancia de la llegada del despacho transportado.

**Precondición:** retiro completo confirmado y despacho asignado.

**Flujo principal:**

1. Selecciona el despacho en traslado.
2. Confirma su llegada al destino.
3. El sistema registra responsable, fecha y hora.

**Alternativas:** se rechazan llegadas duplicadas o correspondientes a despachos ajenos.

**Resultado:** llegada registrada y recepción comunitaria habilitada, sin asumir conformidad de los productos.

## 5. Jefe de Defensa Civil

### CU-DC-01. Consultar riesgo territorial

**Objetivo:** conocer las evaluaciones de riesgo por comunidad y tipo de desastre.

**Flujo principal:**

1. Accede al mapa territorial.
2. Selecciona una comunidad o zona.
3. Consulta el desastre, nivel de riesgo, fuente y fecha de evaluación.

**Alternativas:** cuando faltan datos o son antiguos, se informa su condición sin atribuir niveles de riesgo no sustentados.

**Resultado:** evaluación consultada sin modificar información territorial.

### CU-DC-02. Consultar estado de atención y brechas

**Objetivo:** identificar avances de ayuda humanitaria y necesidades pendientes por territorio.

**Flujo principal:**

1. Consulta los resultados de atención.
2. Distingue cantidades autorizadas, en traslado y recibidas.
3. Examina entregas y brechas por zona y producto cuando existen datos.

**Alternativas:** las recepciones con observaciones conservan sus discrepancias. Los despachos con llegada registrada no se contabilizan automáticamente como recibidos conformes.

**Resultado:** información disponible para coordinación externa, sin modificar operaciones ni reactivar matching.

### CU-DC-03. Consultar informe final publicado

**Objetivo:** revisar los resultados consolidados y su trazabilidad tras finalizar el escenario.

**Precondición:** evento `EMERGENCIA_FINALIZADA` procesado e informe publicado.

**Flujo principal:**

1. Accede a los informes disponibles.
2. Selecciona la emergencia finalizada.
3. Consulta fecha de corte, solicitudes, autorizaciones, despachos, recepciones, brechas e incidencias.

**Alternativas:** mientras no exista un informe publicado, se impide su consulta. El reprocesamiento del evento no genera informes adicionales.

**Resultado:** informe final consultado en modo de solo lectura.

# Glosario del dominio de Alivía

## 1. Propósito y convenciones

Este glosario fija el significado de los términos utilizados en la coordinación de ayuda humanitaria. Los términos se definen desde el negocio, no por un nombre de tabla, clase o pantalla. Las cifras de los ejemplos son ficticias.

## 2. Entorno territorial y participantes

| Término | Definición precisa |
|---|---|
| Emergencia | Situación de atención humanitaria identificada en un escenario; puede dar contexto a solicitudes y evaluaciones. Una observación externa no implica automáticamente su declaración formal. |
| Catástrofe o tipo de desastre | Clasificación del fenómeno territorial, como inundación o deslizamiento, distinta de una evaluación puntual de su severidad. |
| Distrito | División territorial con código UBIGEO, utilizado para ubicar comunidades de manera normalizada. |
| UBIGEO | Identificador territorial almacenado como texto para preservar ceros iniciales. |
| Comunidad | Entidad destinataria de ayuda; puede corresponder a comuna, albergue o caserío en el modelo de atención. |
| ONG | Organización titular de sus almacenes, inventarios y decisiones de aporte; no es equivalente a un almacén individual. |
| Brigada | Unidad operativa de traslado cuyo jefe verifica retiros y registra llegadas; la plataforma no administra su personal ni vehículos. |
| Defensa Civil | Actor institucional de consulta territorial y resultados de atención, sin capacidad de modificar operaciones ni inventario de las ONG. |
| Jefe o representante | Usuario autorizado para actuar en nombre de una entidad según su rol y pertenencia; no es una cuenta general con permisos ilimitados. |
| Actor | Persona o rol externo que interactúa con el sistema. Los procesos internos automatizados no son actores humanos. |

## 3. Demanda y asignación

| Término | Definición precisa |
|---|---|
| Solicitud | Registro confirmado de necesidades de una comunidad con contexto y una o varias líneas de producto. |
| Línea de solicitud | Producto del catálogo y cantidad requerida dentro de una solicitud, sin duplicar el mismo producto en ella. |
| Población afectada | Cantidad agregada de personas afectadas declarada al registrar una solicitud; no es un padrón individual. |
| Prioridad | Valor determinado por criterios como criticidad de insumo, población afectada y antigüedad; pesos y límites exactos todavía no están aprobados. |
| Matching | Proceso automático que combina necesidades sin cobertura con existencias aptas y genera propuestas de aportes por ONG. |
| Propuesta de matching | Sugerencia calculada, todavía no comprometida, sobre qué productos y cantidades podría aportar una ONG. |
| Confirmación de disponibilidad | Decisión explícita de la ONG que acepta o reduce lo propuesto; no equivale a autorización de retiro físico. |
| Autorización de salida | Aprobación posterior que compromete cantidades y habilita despachos; no reduce por sí sola la existencia física. |
| Compromiso vigente | Cantidad autorizada pendiente de retiro o finalización de su entrega, excluida de nuevas ofertas del inventario. |
| Cobertura pendiente | Parte de una necesidad para la cual todavía no existe un compromiso vigente ni una recepción que la satisfaga. |
| Necesidad no satisfecha | Cantidad solicitada que todavía no se recibió conforme, aunque haya aportes autorizados o mercancía en tránsito. |

## 4. Inventario y recursos

| Término | Definición precisa |
|---|---|
| Producto | Artículo del catálogo con identificación, categoría y unidad de medida definida. |
| Categoría de producto | Agrupación con una criticidad utilizada en priorización; no habilita sustituir productos distintos automáticamente. |
| Unidad de medida | Unidad única definida para las cantidades de un producto en el alcance básico; no existen conversiones automáticas entre unidades. |
| Múltiplo de entrega | Restricción que determina cantidades válidas para proponer o retirar productos indivisibles. |
| Almacén o acopio | Punto físico que pertenece a una ONG y conserva lotes de productos. |
| Lote | Conjunto de existencias identificado por producto, almacén y código de lote; puede registrar fecha de vencimiento. |
| Existencia física | Cantidad registrada en almacén que todavía no ha sido retirada. Puede contener cantidades ya comprometidas. |
| Existencia utilizable | Existencia apta para distribución, excluyendo estados bloqueado, cuarentena o vencido. |
| Disponible para asignar | Existencia utilizable menos las cantidades con salida autorizada aún no retirada; no se almacena necesariamente como reserva independiente. |
| FEFO | Criterio *First Expired, First Out*: considerar primero lotes utilizables de vencimiento más próximo, siempre que puedan entregarse y consumirse oportunamente. |
| Movimiento de inventario | Registro auditable de un cambio de cantidad física o condición, ligado a actor, fecha y causa. |

## 5. Logística, recepción y evidencia

| Término | Definición precisa |
|---|---|
| Despacho | Movimiento autorizado desde un almacén de ONG hacia una comunidad, con líneas de producto y estado logístico. |
| Ruta | Recorrido calculado o propuesto entre origen y destino, con información de estado y vigencia de su verificación. |
| Vía | Tramo vial identificado y asociado a un estado reportado: transitable, intransitable o desconocido. |
| Ruta disponible | Resultado de un cálculo/validación que excluye bloqueos reportados y conserva evidencia de verificación; no garantiza por sí mismo que la vía siga físicamente libre. |
| Retiro completo | Confirmación de la brigada de que recibió la totalidad autorizada de un despacho; habilita el descuento físico único. |
| Llegada registrada | Declaración de la brigada de haber llegado al destino; no acredita la cantidad ni condición finalmente recibida. |
| Recepción | Confirmación de la comunidad sobre cantidades físicamente recibidas, conformes y faltantes de un despacho llegado. |
| Cantidad recibida | Cantidad que llegó físicamente, aunque alguna parte esté dañada. |
| Cantidad conforme | Subconjunto de lo recibido que cumple lo esperado y puede contarse como ayuda satisfecha. |
| Cantidad faltante del despacho | Diferencia entre lo enviado y lo recibido físicamente; no es idéntica a la necesidad comunitaria total pendiente. |
| Discrepancia | Diferencia de cantidad, condición u otra observación detectada en la recepción. |
| Recepción con observaciones | Recepción finalizada con discrepancias documentadas; finalizar el registro no prueba satisfacción íntegra. |
| Manifiesto Excel | Documento generado tras la recepción que conserva el detalle de productos despachados/enviados. |
| Acta PDF | Documento generado tras la recepción que consigna cantidades recibidas y observaciones. |
| Informe final de emergencia | Consolidado de resultados emitido después de un evento preconfigurado de finalización; distinto de manifiesto y acta por despacho. |

## 6. Riesgo e información externa

| Término | Definición precisa |
|---|---|
| Evaluación de riesgo | Registro por comunidad y desastre, con nivel, fuente y fecha de evaluación. |
| Nivel de riesgo | Categoría de severidad de una evaluación territorial; es independiente del porcentaje de ayuda recibida. |
| Estado de atención | Indicación del progreso humanitario de una comunidad, derivada de necesidades y entregas; no modifica el nivel de riesgo. |
| Observación externa | Dato proveniente de servicio meteorológico, geológico, satelital u otra fuente; lleva procedencia y antigüedad. |
| Alerta externa | Aviso publicado por una fuente; debe identificarse como tal y no sustituye una decisión formal de declaración de emergencia. |
| Trazabilidad | Capacidad de reconstruir operaciones y responsables a través de registros fechados, sin borrar hechos anteriores por una corrección. |
| Idempotencia | Propiedad por la cual repetir una solicitud crítica no produce duplicaciones de autorización, retirada, descuento o documentos. |

## 7. Diferencias que no deben confundirse

- `Propuesta` no equivale a `confirmación`, `autorización`, `retiro` ni `recepción`.
- `Cantidad autorizada` no equivale a `existencia retirada`.
- `Llegada registrada` no equivale a `recepción confirmada`.
- `Recibido físicamente` no equivale a `recibido conforme`.
- `Necesidad no satisfecha` no equivale a `cantidad sin autorización`.
- `Riesgo territorial` no equivale a `estado de atención`.
- `Cierre del registro de recepción` no equivale a `atención completa de la comunidad`.

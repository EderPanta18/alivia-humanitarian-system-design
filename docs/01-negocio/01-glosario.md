# Glosario del dominio de Alivía

## 1. Propósito y convenciones

Este glosario establece el significado de los términos utilizados en la coordinación de ayuda humanitaria de Alivía. Las definiciones responden a conceptos del dominio, independientemente de cómo se representen en tablas, clases o interfaces. Las cifras de los ejemplos, cuando se incluyan, son ficticias.

## 2. Entorno territorial y participantes

| Término                       | Definición                                                                                                                                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Emergencia                    | Situación que contextualiza la atención humanitaria, las solicitudes y las evaluaciones de un escenario. Los datos de fuentes externas no constituyen por sí mismos una declaración formal de emergencia. |
| Catástrofe o tipo de desastre | Clasificación de un fenómeno territorial, como inundación o deslizamiento, independiente de su nivel de severidad.                                                                                        |
| Distrito                      | División territorial identificada mediante un código UBIGEO, utilizada para ubicar comunidades de forma normalizada.                                                                                      |
| UBIGEO                        | Código de identificación territorial almacenado como texto para conservar los ceros iniciales.                                                                                                            |
| Comunidad                     | Entidad destinataria de ayuda humanitaria, que puede representar una comuna, un albergue o un caserío.                                                                                                    |
| ONG                           | Organización responsable de sus almacenes, inventarios y decisiones de aporte. Puede administrar varios almacenes.                                                                                        |
| Brigada                       | Unidad encargada del traslado de ayuda, cuyo jefe verifica los retiros y registra las llegadas. La plataforma no administra su personal ni sus vehículos.                                                 |
| Defensa Civil                 | Actor institucional con acceso de solo lectura a información territorial y resultados de atención, sin permisos para modificar operaciones o inventarios de ONG.                                          |
| Jefe o representante          | Usuario autorizado para actuar en nombre de una entidad según su rol y pertenencia, sin disponer de permisos generales sobre el sistema.                                                                  |
| Actor                         | Persona o rol externo que interactúa con el sistema. Los procesos internos automatizados no se consideran actores humanos.                                                                                |

## 3. Demanda y asignación

| Término                        | Definición                                                                                                                                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Solicitud                      | Registro confirmado de necesidades de una comunidad, que incluye su contexto y una o varias líneas de producto.                                                                                                                                  |
| Línea de solicitud             | Producto del catálogo y cantidad requerida dentro de una solicitud. Un mismo producto no puede repetirse en ella.                                                                                                                                |
| Población afectada             | Número agregado de personas afectadas declarado en una solicitud, sin identificar beneficiarios individualmente.                                                                                                                                 |
| Prioridad                      | Valor relativo calculado según la criticidad del producto, la población afectada y la antigüedad de la solicitud. Sus ponderaciones y límites pertenecen a la política de matching de referencia, no a una clasificación oficial de emergencias. |
| Matching                       | Proceso automático que relaciona necesidades pendientes de cobertura con existencias aptas y genera propuestas de aporte por ONG.                                                                                                                |
| Propuesta de matching          | Sugerencia calculada de productos y cantidades que una ONG podría aportar, sin comprometer todavía su inventario.                                                                                                                                |
| Confirmación de disponibilidad | Decisión de una ONG de aceptar o reducir las cantidades propuestas, sin autorizar aún el retiro físico.                                                                                                                                          |
| Autorización de salida         | Aprobación posterior que compromete cantidades y habilita su despacho, sin descontarlas todavía de la existencia física.                                                                                                                         |
| Compromiso vigente             | Cantidad autorizada pendiente de retiro o de finalización de su entrega, excluida de nuevas asignaciones de inventario.                                                                                                                          |
| Cobertura pendiente            | Cantidad requerida que aún no cuenta con un compromiso vigente ni con una recepción que satisfaga esa necesidad.                                                                                                                                 |
| Necesidad no satisfecha        | Cantidad solicitada que todavía no se ha recibido conforme, incluso si existen aportes autorizados o productos en tránsito.                                                                                                                      |

## 4. Inventario y recursos

| Término                  | Definición                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Producto                 | Artículo del catálogo identificado por su código, categoría y unidad de medida.                                                                               |
| Categoría de producto    | Agrupación de productos con un nivel de criticidad utilizado para priorizar necesidades, sin permitir sustituciones automáticas entre artículos distintos.    |
| Unidad de medida         | Unidad definida para expresar las cantidades de un producto. En el alcance básico no se realizan conversiones automáticas entre unidades.                     |
| Múltiplo de entrega      | Restricción que establece las cantidades válidas para proponer o retirar productos indivisibles.                                                              |
| Almacén o acopio         | Ubicación física perteneciente a una ONG donde se almacenan lotes de productos.                                                                               |
| Lote                     | Conjunto de existencias identificado por producto, almacén y código de lote, con fecha de vencimiento cuando corresponda.                                     |
| Existencia física        | Cantidad registrada en un almacén que aún no se ha retirado, incluidas las unidades comprometidas.                                                            |
| Existencia utilizable    | Existencia apta para distribución, excluyendo productos bloqueados, en cuarentena o vencidos.                                                                 |
| Disponible para asignar  | Existencia utilizable menos las cantidades autorizadas pendientes de retiro. No requiere necesariamente una reserva almacenada por separado.                  |
| FEFO                     | Criterio _First Expired, First Out_ que prioriza los lotes utilizables con vencimiento más próximo, siempre que puedan entregarse y consumirse oportunamente. |
| Movimiento de inventario | Registro auditable de una variación en cantidad física o condición de las existencias, con responsable, fecha y causa.                                        |

## 5. Logística, recepción y evidencia

| Término                        | Definición                                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Despacho                       | Traslado autorizado de productos desde un almacén de ONG hacia una comunidad, con líneas de producto y estado logístico.                                     |
| Ruta                           | Recorrido calculado o propuesto entre un origen y un destino, acompañado del estado de sus vías y la vigencia de su verificación.                            |
| Vía                            | Tramo vial identificado con un estado reportado: transitable, intransitable o desconocido.                                                                   |
| Ruta disponible                | Recorrido validado que no presenta bloqueos conocidos y cuenta con evidencia de verificación vigente, sin garantizar que permanezca físicamente transitable. |
| Retiro completo                | Confirmación de la brigada de haber recibido la totalidad de productos autorizados para un despacho, que habilita un único descuento de existencia física.   |
| Llegada registrada             | Declaración de la brigada de haber alcanzado el destino, sin acreditar las cantidades ni las condiciones de los productos recibidos.                         |
| Recepción                      | Verificación realizada por la comunidad sobre las cantidades físicamente recibidas, conformes y faltantes de un despacho llegado.                            |
| Cantidad recibida              | Total de unidades que llegaron físicamente al destino, incluidas aquellas que presentan daños.                                                               |
| Cantidad conforme              | Parte de la cantidad recibida que cumple las condiciones esperadas y puede contabilizarse como necesidad satisfecha.                                         |
| Cantidad faltante del despacho | Diferencia entre lo enviado y lo recibido físicamente, distinta de la necesidad total pendiente de la comunidad.                                             |
| Discrepancia                   | Diferencia de cantidad, condición u otra irregularidad documentada durante la recepción.                                                                     |
| Recepción con observaciones    | Recepción finalizada con discrepancias registradas, sin implicar que la necesidad haya sido satisfecha por completo.                                         |
| Manifiesto Excel               | Documento generado tras finalizar la recepción, que detalla los productos despachados y sus cantidades enviadas.                                             |
| Acta PDF                       | Documento generado tras finalizar la recepción, que registra las cantidades recibidas y las observaciones correspondientes.                                  |
| Informe final de emergencia    | Consolidado de resultados generado después del evento de finalización preconfigurado, independiente de los documentos emitidos por despacho.                 |

## 6. Riesgo e información externa

| Término              | Definición                                                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Evaluación de riesgo | Registro territorial asociado a una comunidad y un tipo de desastre, con nivel de riesgo, fuente y fecha de evaluación.                                           |
| Nivel de riesgo      | Categoría de severidad asignada a una evaluación territorial, independiente del porcentaje de ayuda recibida.                                                     |
| Estado de atención   | Indicador del avance de la asistencia humanitaria en una comunidad, derivado de sus necesidades y entregas, sin alterar su nivel de riesgo.                       |
| Observación externa  | Dato procedente de una fuente meteorológica, geológica, satelital u otra, acompañado de su procedencia y antigüedad.                                              |
| Alerta externa       | Aviso publicado por una fuente de información que no sustituye una declaración formal de emergencia.                                                              |
| Trazabilidad         | Capacidad de reconstruir las operaciones, sus responsables y resultados mediante registros fechados, conservando los hechos anteriores ante cualquier corrección. |
| Idempotencia         | Propiedad que impide que la repetición de una operación crítica genere autorizaciones, retiros, descuentos o documentos duplicados.                               |

## 7. Diferencias que no deben confundirse

- **Propuesta, confirmación, autorización, retiro y recepción:** representan etapas distintas del proceso de distribución y no son intercambiables.
- **Cantidad autorizada y existencia retirada:** la autorización compromete recursos; el retiro representa su salida física.
- **Llegada registrada y recepción confirmada:** llegar al destino no acredita la conformidad de la entrega.
- **Cantidad recibida y cantidad conforme:** recibir físicamente un producto no significa que cumpla las condiciones esperadas.
- **Necesidad no satisfecha y cantidad sin autorización:** una necesidad puede seguir pendiente aunque existan productos autorizados o en tránsito.
- **Riesgo territorial y estado de atención:** el primero describe las condiciones de riesgo; el segundo, el avance de la ayuda humanitaria.
- **Cierre de recepción y atención completa:** finalizar una recepción no garantiza que todas las necesidades de la comunidad estén cubiertas.

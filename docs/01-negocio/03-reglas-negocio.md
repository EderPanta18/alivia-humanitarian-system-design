# Reglas de negocio de Alivía

## 1. Carácter normativo

Las reglas de negocio establecen las condiciones que Alivía debe cumplir, independientemente de las tecnologías, el almacenamiento o la interfaz utilizados.

Los identificadores `RN-xx` son estables y sirven como referencia para requisitos y pruebas. Los parámetros operativos corresponden a políticas de software de esta versión, no a criterios oficiales de priorización humanitaria.

## 2. Identidad y titularidad

| ID    | Regla                                                                                                                                                                     |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN-01 | Cada cuenta tiene un único rol (`comuna`, `ong`, `brigada` o `defensaCivil`) y solo puede realizar operaciones autorizadas para él.                                       |
| RN-02 | Los jefes de comuna y ONG mantienen una relación exclusiva 1:1 con sus entidades. Cada brigada también tiene un único jefe responsable.                                   |
| RN-03 | El servidor debe verificar tanto el rol como la titularidad de los recursos en cada operación, sin confiar únicamente en los datos enviados por el navegador.             |
| RN-04 | Defensa Civil tiene acceso de solo lectura a información territorial y reportes finales publicados, sin consultar inventarios privados ni modificar registros operativos. |

## 3. Solicitudes y necesidades

| ID    | Regla                                                                                                                                                  |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RN-05 | Una comunidad puede registrar múltiples solicitudes confirmadas, cada una con al menos una línea de producto y cantidades positivas.                   |
| RN-06 | Las solicitudes confirmadas son inmutables para el jefe de comuna: no pueden editarse ni cancelarse en esta versión.                                   |
| RN-07 | Cada producto debe pertenecer al catálogo y aparecer una sola vez por solicitud.                                                                       |
| RN-08 | La prioridad considera criticidad del producto, población afectada y antigüedad de la solicitud, según el cálculo y los parámetros definidos en RN-31. |
| RN-09 | Una necesidad puede recibir propuestas de varias ONG. Generarlas no modifica el inventario ni representa ayuda entregada.                              |

## 4. Disponibilidad y compromisos

| ID    | Regla                                                                                                                                                                        |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN-10 | Solo pueden ofrecerse lotes utilizables que cumplan las condiciones de producto, unidad de medida, múltiplo de entrega y vencimiento.                                        |
| RN-11 | La selección de lotes sigue FEFO, priorizando los utilizables con vencimiento más próximo, sin conversiones de unidades ni sustituciones automáticas entre productos.        |
| RN-12 | Una ONG puede confirmar cantidades entre cero y lo propuesto. Si todas son cero, debe registrar un rechazo motivado.                                                         |
| RN-13 | Confirmar disponibilidad y autorizar salida son operaciones independientes. La autorización requiere revalidar atómicamente el stock y la cobertura.                         |
| RN-14 | Las cantidades autorizadas pendientes de retiro constituyen compromisos vigentes y se excluyen de nuevas propuestas, sin requerir una tabla independiente de reservas.       |
| RN-15 | El stock físico y los compromisos vigentes no pueden ser negativos ni producir disponibilidad negativa. Los ajustes de inventario deben respetar los compromisos existentes. |
| RN-16 | Las cantidades autorizadas no regresan al matching mientras esperan su entrega. Las necesidades que nunca obtuvieron cobertura permanecen elegibles para nuevas propuestas.  |

## 5. Despacho, traslado y recepción

| ID    | Regla                                                                                                                                                                                        |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN-17 | Antes de confirmar un retiro, el sistema debe verificar la ruta y descartar vías reportadas como intransitables. Una ruta indisponible impide el retiro.                                     |
| RN-18 | La ONG debe entregar la totalidad autorizada y la brigada solo puede confirmar retiros completos. No se permiten retiros parciales.                                                          |
| RN-19 | Cada retiro confirmado descuenta una única vez las existencias físicas correspondientes y genera su movimiento de inventario. Los reintentos no duplican descuentos.                         |
| RN-20 | Registrar la llegada no confirma la recepción. La comunidad debe verificar físicamente los productos frente al despacho.                                                                     |
| RN-21 | Por cada producto se cumple `0 <= conforme <= recibido <= enviado`. El faltante físico se calcula respecto a lo enviado, no al total solicitado por la comunidad.                            |
| RN-22 | La recepción finaliza conforme o con observaciones. Las discrepancias se documentan internamente y sus cantidades faltantes no reactivan automáticamente el matching.                        |
| RN-23 | Finalizar un despacho no cancela otros despachos ni las propuestas para necesidades que nunca tuvieron cobertura. La comunidad puede registrar una nueva solicitud si persisten necesidades. |
| RN-24 | Tras finalizar la recepción, se genera un manifiesto Excel con lo enviado y un acta PDF con lo recibido y sus observaciones, una sola vez por tipo de documento y despacho.                  |

## 6. Riesgo, supervisión y cierre

| ID    | Regla                                                                                                                                                                                       |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN-25 | El riesgo territorial se determina mediante evaluaciones por desastre, fuente y fecha. La distribución de ayuda no modifica automáticamente su nivel.                                       |
| RN-26 | El estado de atención y el nivel de riesgo son indicadores independientes; ninguno puede inferirse únicamente del color del otro.                                                           |
| RN-27 | Las observaciones y alertas externas no declaran emergencias automáticamente. Una declaración requiere validación o un procedimiento autorizado, sin asumir integraciones ya operativas.    |
| RN-28 | Defensa Civil consulta riesgos y avances de atención durante la operación, exclusivamente en modo lectura. El informe consolidado final solo se publica después de `EMERGENCIA_FINALIZADA`. |
| RN-29 | El evento de finalización preconfigurado genera exactamente un informe final. Su reprocesamiento no debe duplicarlo ni sobrescribir silenciosamente su contenido.                           |
| RN-30 | Cada acción crítica conserva usuario, rol, entidad, objeto, fecha, hora y cantidades pertinentes. Las correcciones generan nuevos registros sin eliminar la trazabilidad anterior.          |

## 7. Fórmulas y ejemplos operativos

### 7.1. Cantidades de inventario

La disponibilidad se calcula mediante:

`disponible_para_asignar = stock_fisico_utilizable - compromisos_autorizados_aun_no_retirados`

El resultado nunca puede ser negativo. El cálculo se realiza sobre las existencias del almacén y lote correspondientes, sin considerar utilizables los productos bloqueados, en cuarentena o vencidos.

### 7.2. Cobertura de demanda

La cantidad sin cobertura excluye las unidades recibidas conforme y los compromisos vigentes destinados a la solicitud.

Las **propuestas pendientes no reducen la demanda sin cobertura**. Asimismo, las discrepancias de una recepción finalizada no generan automáticamente nuevas propuestas para esas cantidades.

**Ejemplo ficticio:** una comunidad solicita 100 kits y una ONG autoriza 70. Después de la recepción, solo 65 se confirman conformes.

- **65 kits:** recibidos conforme.
- **5 kits:** diferencia entre lo autorizado y lo conforme, cuya naturaleza (faltante físico, producto no conforme o combinación) depende del registro de recepción.
- **30 kits:** necesidad que nunca obtuvo cobertura.

Los 5 kits de diferencia no reingresan automáticamente al matching. Los 30 restantes siguen siendo elegibles, salvo que el cierre de la solicitud u otra decisión válida modifique su estado.

### 7.3. Invariantes de recepción

Para cada línea de despacho deben cumplirse las siguientes condiciones:

- `cantidad_recibida_fisicamente >= 0`
- `cantidad_conforme >= 0`
- `cantidad_conforme <= cantidad_recibida_fisicamente`
- `cantidad_recibida_fisicamente <= cantidad_enviada`
- `cantidad_faltante_fisica = cantidad_enviada - cantidad_recibida_fisicamente`

Los productos recibidos con daños no se contabilizan como faltantes físicos. La cantidad no conforme corresponde a la diferencia entre lo recibido físicamente y lo conforme, y debe acompañarse de su observación.

## 8. Parámetros operativos de referencia

| ID    | Política de la versión de referencia                                                                                                                                                                                                                                                                      |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RN-31 | La prioridad se calcula como `0,50 × criticidad normalizada + 0,30 × población normalizada + 0,20 × antigüedad normalizada`. Cada factor se limita al intervalo `[0,1]`. Las referencias iniciales son 1 000 personas y siete días. Los empates se resuelven por solicitud más antigua y UUID ascendente. |
| RN-32 | El matching se reevalúa al confirmar solicitudes, registrar o ajustar inventario utilizable y rechazar o reducir propuestas. Su procesamiento es idempotente para evitar duplicados.                                                                                                                      |
| RN-33 | La verificación de rutas tiene una vigencia de treinta minutos. Las vías en estado `UNKNOWN` impiden considerar utilizable una ruta.                                                                                                                                                                      |
| RN-34 | Los mapas presentan riesgos separados por fenómeno y fuente, sin consolidar desastres distintos en un único nivel.                                                                                                                                                                                        |
| RN-35 | Las solicitudes confirmadas no pueden editarse y los roles no disponen de una pantalla para cerrar emergencias. La finalización depende exclusivamente del evento preconfigurado.                                                                                                                         |
| RN-36 | Una solicitud puede alcanzar el estado `CLOSED` aunque existan discrepancias o necesidades no satisfechas. Las cantidades históricas deben conservarse.                                                                                                                                                   |

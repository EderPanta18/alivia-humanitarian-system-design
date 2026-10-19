# Escenario transversal de Alivía

## Naturaleza y contexto

Escenario ficticio de lluvias intensas asociadas a El Niño en Piura, Perú. No es un pronóstico actual ni una afirmación de afectación real. Personas, entidades, comunidad, cantidades, observaciones, evaluaciones, vías y operaciones son datos sintéticos. Piura es el ámbito real de referencia; no se inventan coordenadas, boletines oficiales ni códigos institucionales. La fuente visible de las observaciones precargadas es un registro territorial interno, con la condición de verificación presentada desde T03 como «Por verificar». Se conserva la incertidumbre, sin nuevas evaluaciones o cambios de estado.

T01 conserva la historia cuantitativa de T00 y sustituye sus etiquetas de demostración en la interfaz por identificadores públicos estables. La equivalencia es explícita: escenario DEMO-PIURA-01 → EM-2026-001; DSP-DEMO-01 → DSP-2026-001; DSP-DEMO-02 → DSP-2026-002. Los almacenes antes denominados A/B pasan a Almacén Central Puente Verde / Almacén Manos del Norte. Son alias de los mismos registros ficticios.

## Participantes

| Rol | Identidad ficticia | Entidad y ámbito |
|---|---|---|
| Jefe de Comuna | Elena Rojas | Comunidad Las Palmeras, sector Ribera Norte. |
| Jefe de ONG | Marco Salazar | ONG Puente Verde, almacén propio. |
| Jefe de ONG | Ana Paredes | ONG Manos del Norte, almacén propio. |
| Jefe de Brigada | Lucía Ramos | Brigada Río Seco, dos despachos asignados. |
| Jefe de Defensa Civil | Rosa Medina | Supervisión territorial y resultados, solo lectura. |

El escenario está habilitado previamente por configuración técnica. Ningún rol dispone de declaración o cierre manual. La población afectada es de 180 personas agregadas, sin datos individuales de beneficiarios.

## Registros estables

| Tipo | Identificadores |
|---|---|
| Emergencia y solicitud | EM-2026-001; SOL-2026-001. |
| Comunidad operativa | COM-001 / Las Palmeras. |
| Propuestas | PR-2026-001 / Puente Verde; PR-2026-002 / Manos del Norte. |
| Autorizaciones | AUT-2026-001 y AUT-2026-002. |
| Despachos | DSP-2026-001 y DSP-2026-002, uno por almacén. |
| Recepciones | REC-2026-001 y REC-2026-002, una por despacho. |
| Informe | INF-2026-001, corte del evento de finalización. |

## Catálogo, inventario y matching

| Producto y unidad | Solicitado | Puente Verde: físico utilizable / propuesta | Manos del Norte: físico utilizable / propuesta |
|---|---:|---:|---:|
| Agua envasada de 20 L, bidón | 120 | 80 / 70 | 50 / 50 |
| Frazada, unidad | 80 | 50 / 40 | 40 / 40 |

Los productos se entregan en cantidades enteras, múltiplo 1. No se convierten bidones a litros ni se sustituyen productos. Agua requiere vencimiento. Puente Verde utiliza AG-A-2601, vence 2027-06-30, y FR-A-2601 sin vencimiento. Manos del Norte utiliza AG-B-2602, vence 2027-08-31, y FR-B-2602 sin vencimiento.

T01 añade dos lotes complementarios de Puente Verde para mostrar exclusiones: AG-A-2509 contiene 12 bidones vencidos el 2026-09-30; FR-A-2600 contiene 8 frazadas en cuarentena. No se incluyeron en propuestas ni aportan disponibilidad.

Generar propuestas por 120 bidones y 80 frazadas no reserva stock. Las dos ONG confirman sus aportes completos en la rama canónica. La puntuación técnica usa criticidad agua 1 y abrigo 0,7, población 180 y antigüedad 0 días: 0,554 y 0,404. Es política de software, no prioridad oficial. La autorización revalida existencia, titularidad y demanda de forma atómica en el modelo real.

## Autorización y stock

Puente Verde autoriza 70 bidones y 40 frazadas: físico 80/50, compromiso 70/40, disponible 10/10. Solo al retirar se descuenta físico: pasa a 10/10 y el compromiso pendiente queda 0/0. Manos del Norte autoriza y retira 50/40; su físico y compromiso quedan 0/0. Ambos retiros son completos y únicos.

## Recepción canónica

| Despacho y producto | Enviado | Recibido físico | Conforme | Faltante físico | Recibido no conforme |
|---|---:|---:|---:|---:|---:|
| DSP-2026-001 / agua | 70 | 68 | 68 | 2 | 0 |
| DSP-2026-001 / frazada | 40 | 40 | 38 | 0 | 2 |
| DSP-2026-002 / agua | 50 | 50 | 50 | 0 | 0 |
| DSP-2026-002 / frazada | 40 | 40 | 40 | 0 | 0 |
| Total agua, bidones | 120 | 118 | 118 | 2 | 0 |
| Total frazadas, unidades | 80 | 80 | 78 | 0 | 2 |

REC-2026-001 finaliza WITH_OBSERVATIONS. REC-2026-002 finaliza CONFORMING. Esto corrige la frase de T00 que atribuía observaciones a ambas, incompatible con las cantidades de la segunda entrega. Se conserva un registro interno de discrepancias para la primera, sin PDF adicional. Ambas generan manifiesto XLSX de lo enviado y acta PDF de recepción. Las diferencias no vuelven al matching automáticamente.

## Cronología canónica local, UTC−05:00

| Momento | Hecho y resultado |
|---|---|
| 18 oct 2026, 07:15 | OBS-2026-014: reporte interno de lluvias en Las Palmeras; pendiente de verificación. |
| 18 oct, 07:30 | Evaluación interna de inundación: nivel alto, fuente y fecha conservadas. |
| 18 oct, 07:40 | MK-01, sin solicitudes registradas. |
| 18 oct, 07:55 | MK-02, preparación de solicitud aún no confirmada. |
| 18 oct, 08:00 | Elena confirma SOL-2026-001, estado OPEN. |
| 18 oct, 08:05 | Propuestas por ONG calculadas sin comprometer inventario. |
| 18 oct, 08:10 y 08:30 | MK-03 inventario y MK-04 revisión de propuesta. |
| 18 oct, 09:00 | Confirmaciones de aportes, sin autorización. |
| 18 oct, 09:15 y 09:20 | MK-05 revisión y posterior autorización de cada ONG. |
| 18 oct, 09:25 | MK-06, dos despachos asignados y autorizados, por retirar. |
| 18 oct, 10:00 | Ruta disponible según registros viales internos R-1/R-2 PASSABLE. |
| 18 oct, 10:05 | MK-07, consulta de ruta; verificación de 5 minutos. |
| 18 oct, 10:15 y 10:35 | Retiros completos 70/40 y 50/40; descuento único de inventario. |
| 18 oct, 13:00 y 13:20 | Llegadas registradas; no acreditan conformidad. |
| 18 oct, 13:50 | Segunda entrega verificada conforme. |
| 18 oct, 13:55 | MK-08, primera entrega por verificar. Los valores iniciales iguales a enviado son entradas editables, no una recepción confirmada. |
| 18 oct, 14:00 | Primera recepción con dos bidones faltantes y dos frazadas dañadas. |
| 18 oct, 14:10 | MK-09, riesgo independiente de 118/120 bidones y 78/80 frazadas conformes. |
| 20 oct, 18:00 | Evento preconfigurado EMERGENCIA_FINALIZADA. No es una acción del usuario. |
| 20 oct, 18:01 | MK-10, informe publicado único e inmutable con fecha de corte. |

## Contexto territorial y fuentes

Las Palmeras tiene evaluación interna de inundación alta. Nuevo Horizonte (COM-002) tiene una evaluación moderada a las 07:20 y Ribera Norte (COM-003), otro núcleo del sector, tiene un registro a las 07:25 sin evaluación validada. Estos dos núcleos complementarios no tienen solicitudes ni operaciones históricas inventadas. Sus observaciones tienen IDs internos OBS-2026-015 y OBS-2026-016. Ausencia de evaluación no significa riesgo nulo; ausencia de solicitud no significa cobertura 0 %.

Los esquemas SVG muestran posiciones gráficas en píxeles, no coordenadas reales. R-1/R-2 son relaciones de acceso del escenario, no carreteras geográficas verificadas. No se presentan distancias, seguimiento GPS, telemetría ni garantía física de paso. La interfaz identifica el esquema sin escala y conserva fuente y fecha del registro vial.

No hay boletín oficial externo incorporado. Las observaciones internas no se atribuyen a SENAMHI, IGP o FIRMS. El estado pendiente de verificación es parte de la operación y no se transforma en emergencia oficial ni bloquea por sí solo la ayuda. Una restricción vial UNKNOWN sí bloquea el retiro por la regla logística.

## Ramas interactivas y cortes

La entrada directa de cada HTML restaura el momento indicado. La navegación interna conserva un estado compartido local. Ninguna navegación con estado incompleto adelanta una autorización, retiro, recepción o publicación. El catálogo permite abrir un corte distinto fuera del shell; no implementa cambio de rol.

Las variantes de revalidación introducen correcciones de conteo previas al compromiso: 50 bidones a las 08:31 invalida confirmar la propuesta; 60 bidones a las 09:16 bloquea autorizar 70. El registro de propuesta conserva su estado y no se inventa un enum INVALIDATED. La actualización vial a las 10:06 introduce R-2 UNKNOWN y bloquea el retiro sin descontar stock. Las variantes son ramas locales alternativas a la cronología canónica.

La recepción principal permite confirmar todo conforme como rama alternativa válida. La variante de discrepancias reproduce la rama canónica. El informe de entrada directa conserva la instantánea canónica; no se recalcula silenciosamente por operaciones posteriores ni se publica antes del evento.

## Resultado final

Una solicitud, dos ONG, dos autorizaciones, dos retiros completos, dos llegadas y dos recepciones: una conforme y una con observaciones. De 120 bidones se reciben 118 conformes; de 80 frazadas, 78 conformes. No queda demanda originalmente sin autorización ni compromisos por retirar. Las brechas históricas de 2 bidones y 2 frazadas permanecen, sin nuevo matching automático. El nivel de riesgo no se reduce por el volumen recibido.

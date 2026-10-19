# Especificación de requisitos funcionales de Alivía

**Estado:** especificación funcional de diseño, consolidada con los modelos y macroprocesos prioritarios; no constituye evidencia de software construido. Los identificadores RF heredados conservan su número cuando corresponde, pero su alcance se normaliza según las decisiones confirmadas. `RF-06`, `RF-25` y `RF-30` permanecen reservados y fuera del alcance básico.

## 1. Convenciones y criterios de redacción

- **RF:** capacidad observable del sistema, con comportamiento verificable.
- **Precondición:** estado mínimo necesario para ejecutar la operación.
- **Criterio de aceptación:** observación que permitiría decidir si una implementación satisface el requisito.
- **Lectura de roles:** `COM` (Comuna), `ONG`, `BRI` (Brigada), `DC` (Defensa Civil) y `SIS` (sistema automático).
- **Estados del dominio:** se distingue propuesta, confirmación, autorización, retirada, llegada y recepción.
- **Ámbito:** un escenario básico de emergencia; integraciones externas planificadas y datos ficticios para prueba.

## 2. Acceso y pertenencia

### RF-01. Autenticación de usuarios

**Actor:** COM, ONG, BRI, DC. **Precondición:** cuenta activa configurada.

**Comportamiento:** el sistema verifica credenciales en el servidor, establece una sesión protegida y presenta las operaciones propias del rol. No concede acceso a cuentas inactivas o credenciales inválidas.

**Aceptación:** credenciales válidas dan acceso al ámbito correcto; inválidas generan rechazo sin exponer datos restringidos.

### RF-02. Autorización por rol y titularidad

**Actor:** SIS. **Precondición:** operación autenticada.

**Comportamiento:** toda consulta o modificación comprueba permisos y entidad titular del recurso. Defensa Civil únicamente lee datos territoriales y de atención autorizados y el informe final ya publicado.

**Aceptación:** alterar manualmente identificadores de ONG o comunidad en una solicitud de API no permite acceder a registros ajenos.

### RF-03. Vinculación exclusiva de responsables

**Actor:** SIS. **Precondición:** usuarios y entidades configurados.

**Comportamiento:** cada jefe de comuna y ONG tiene una única entidad asociada y cada entidad participante tiene un solo jefe en esta versión. Se mantiene objetivo equivalente de jefatura única por brigada; la adecuación de persistencia se justifica posteriormente.

**Aceptación:** no se acepta asignar dos jefes a la misma entidad ni una jefatura simultánea de entidades incompatibles.

## 3. Solicitudes y recepción por comunidad

### RF-04. Registrar una solicitud

**Actor:** COM. **Precondición:** sesión válida, comunidad vinculada, escenario de atención habilitado.

**Comportamiento:** registrar situación, población afectada, productos del catálogo, cantidades positivas y unidades definidas, en una solicitud con múltiples líneas. La comunidad y el autor se obtienen de la sesión.

**Aceptación:** una solicitud con tres productos se guarda como una solicitud y tres líneas identificables.

### RF-05. Validar una solicitud

**Actor:** SIS. **Precondición:** intento de confirmación.

**Comportamiento:** rechazar campos obligatorios ausentes, productos inexistentes/inactivos, cantidades no positivas, unidades incompatibles o producto duplicado en una solicitud; identificar los errores antes de guardar.

**Aceptación:** cantidad negativa o duplicidad de producto impide confirmar y señala el campo afectado.

### RF-06. Reservado: edición de solicitud confirmada

No se considera función activa. La cancelación por jefe está prohibida; una edición posterior requeriría definir antes reglas y trazabilidad.

### RF-07. Consultar la atención de su comunidad

**Actor:** COM. **Precondición:** solicitud propia existente.

**Comportamiento:** mostrar por producto pedido, autorizado pendiente, recibido conforme y sin cobertura; identificar estados de sus despachos, sin mostrar inventarios privados de otras ONG.

**Aceptación:** distingue explícitamente 70 autorizados, 20 conformes y 50 aún comprometidos cuando correspondan a una misma necesidad.

### RF-08. Confirmar recepción de un despacho

**Actor:** COM. **Precondición:** despacho destinado a su comunidad con llegada registrada.

**Comportamiento:** registrar, por línea, cantidades recibidas físicamente y conformes, resultado y fecha/autor; impedir cantidades superiores a las enviadas.

**Aceptación:** llegada registrada sin confirmación comunitaria no cuenta como recepción conforme.

### RF-09. Registrar observaciones de recepción

**Actor:** COM. **Precondición:** verificación de una recepción.

**Comportamiento:** registrar diferencias de cantidad y condición, observaciones y reporte interno cuando no exista conformidad; concluir el registro con observaciones sin devolver automáticamente los faltantes al matching.

**Aceptación:** si se enviaron 20 y llegaron 17, se conservan las tres faltantes y el resultado observado; no aparece nueva autorización automática de reposición.

## 4. Inventario de ONG

### RF-10. Registrar ingreso de productos

**Actor:** ONG. **Precondición:** organización y almacén válidos, producto del catálogo.

**Comportamiento:** registrar cantidad positiva, producto, unidad, almacén, lote y vencimiento cuando aplique; conservar actor, motivo y momento.

**Aceptación:** un ingreso confirmado incrementa exactamente una vez el lote correspondiente y deja movimiento rastreable.

### RF-11. Consultar inventario utilizable y disponible

**Actor:** ONG. **Precondición:** pertenencia a la ONG.

**Comportamiento:** mostrar stock físico, aptitud del lote, cantidades autorizadas pendientes de retiro y cantidad ofertable, sin inventarios ajenos.

**Aceptación:** 150 unidades utilizables con 40 autorizadas y aún no retiradas muestran 110 disponibles para nuevas asignaciones.

### RF-12. Registrar ajuste de inventario

**Actor:** ONG. **Precondición:** existencia de lote propio.

**Comportamiento:** admitir ajuste justificado conservando movimiento, fecha y responsable; impedir stock físico negativo y reducciones incompatibles con compromisos autorizados vigentes.

**Aceptación:** no se confirma un ajuste que deje menos unidades aptas de las que siguen comprometidas.

## 5. Motor automático de matching

### RF-13. Identificar demanda elegible

**Actor:** SIS. **Precondición:** solicitudes confirmadas.

**Comportamiento:** determinar por línea la cantidad nunca cubierta, excluyendo recibidos conformes y autorizaciones vigentes aún destinadas a la solicitud; no reactivar faltantes de una recepción ya finalizada.

**Aceptación:** una propuesta pendiente no reduce demanda, una autorización vigente sí la excluye de nuevas propuestas.

### RF-14. Cruzar necesidades con existencias aptas

**Actor:** SIS. **Precondición:** inventarios por lote y catálogo disponibles.

**Comportamiento:** considerar solo producto y unidad compatibles, lotes aptos, cantidades no comprometidas y múltiplos permitidos; excluir vencidos, bloqueados y cuarentena.

**Aceptación:** un lote vencido nunca resulta candidato, aunque conserve existencia física positiva.

### RF-15. Seleccionar según prioridad y FEFO

**Actor:** SIS. **Precondición:** demanda competidora y/o varios lotes aptos.

**Comportamiento:** aplicar criterios de criticidad, población afectada y antigüedad y seleccionar lotes con FEFO. La fórmula de diseño usa criticidad normalizada (50 %), población normalizada frente a 1 000 personas (30 %) y antigüedad hasta siete días (20 %). Desempate: fecha de solicitud ascendente y UUID ascendente. Los múltiplos del catálogo limitan la cantidad asignable.

**Aceptación:** el resultado conserva justificación y, entre lotes utilizables equivalentes, considera primero vencimiento más cercano.

### RF-16. Generar propuestas independientes por ONG

**Actor:** SIS. **Precondición:** oferta compatible.

**Comportamiento:** crear propuestas por ONG/solicitud con líneas, cantidades, comunidad y origen pertinente. No consumir ni comprometer recursos en esta fase.

**Aceptación:** una solicitud puede originar más de una propuesta; aprobar una no aprueba la otra.

### RF-17. Controlar vigencia de propuestas

**Actor:** SIS. **Precondición:** propuesta pendiente.

**Comportamiento:** detectar cambios relevantes en inventario o cobertura y revalidar antes de confirmar/autorizar; rechazar decisiones basadas en cantidades obsoletas.

**Aceptación:** una propuesta de 70 no puede convertirse en autorización de 70 si solo existen 50 disponibles.

### RF-18. Mostrar faltantes sin cobertura

**Actor:** SIS. **Precondición:** necesidad parcialmente atendida.

**Comportamiento:** calcular y exponer demanda pendiente de compromiso separada de demanda todavía no recibida conforme, sin tratar una propuesta como entrega.

**Aceptación:** si se requieren 100 y únicamente se proponen 70, siguen figurando 100 no recibidas y 100 sin autorización hasta que haya decisión válida.

## 6. Decisiones de ONG y autorización

### RF-19. Bandeja de propuestas propias

**Actor:** ONG. **Precondición:** propuestas asociadas a su ONG.

**Comportamiento:** consultar productos, cantidades, destino, justificación, estado y disponibilidad relevante de su organización, sin propuestas privadas ajenas.

**Aceptación:** un jefe de ONG no puede aprobar ni leer propuestas privadas de otra ONG.

### RF-20. Confirmar, reducir o rechazar un aporte

**Actor:** ONG. **Precondición:** propuesta válida.

**Comportamiento:** confirmar cantidades iguales o menores a las propuestas; si la respuesta resulta cero en todos los productos, rechazar con motivo. Conservar decisión y cantidades no aceptadas.

**Aceptación:** no se admite aumento superior a lo propuesto; el rechazo no cancela la solicitud comunitaria.

### RF-21. Comprometer de forma atómica al autorizar

**Actor:** SIS. **Precondición:** disponibilidad confirmada y acción posterior de autorización.

**Comportamiento:** revalidar stock y cobertura al autorizar; excluir la cantidad autorizada de la disponibilidad para nuevas asignaciones mediante operación atómica. No se crea una reserva independiente al confirmar ni se descuenta stock físico antes del retiro.

**Aceptación:** dos autorizaciones simultáneas de 80 unidades cuando solo hay 100 disponibles no pueden comprometer 160.

### RF-22. Autorizar salida

**Actor:** ONG. **Precondición:** decisión de aporte confirmada.

**Comportamiento:** registrar una autorización explícita, identificando responsable, fecha, productos, almacén y destino; habilitar despacho sin registrar retiro físico.

**Aceptación:** una propuesta confirmada pero no autorizada no aparece como retiro habilitado.

### RF-23. Registrar descuento físico asociado al retiro

**Actor:** SIS, a partir de confirmación de BRI. **Precondición:** despacho autorizado, ruta válida y retirada completa verificada.

**Comportamiento:** descontar una sola vez la totalidad retirada y dejar movimiento de inventario ligado al despacho; impedir doble descuento o presentación de éxito no confirmado.

**Aceptación:** un retiro de 50 confirmado dos veces produce un único descuento físico de 50.

## 7. Brigada, rutas y despachos

### RF-24. Consultar despachos asignados

**Actor:** BRI. **Precondición:** usuario autenticado y despachos vinculados.

**Comportamiento:** mostrar origen, destino, productos, cantidades autorizadas y estado de despachos asignados, sin datos de vehículos o conductores.

**Aceptación:** una brigada no cambia despachos ni aportes de otra.

### RF-25. Eliminado: transportistas y vehículos

No se introduce gestión de conductores, vehículos, matrículas o asignación interna de transportistas.

### RF-26. Consultar ruta verificada antes del retiro

**Actor:** BRI/SIS. **Precondición:** despacho autorizado.

**Comportamiento:** calcular y mostrar ruta candidata considerando vías reportadas como intransitables; registrar disponibilidad, fecha de verificación y origen de restricciones. Sin ruta válida no se confirma retiro.

**Aceptación:** un tramo marcado como `IMPASSABLE` no integra una ruta calificada como utilizable; ausencia de ruta bloquea retirada.

### RF-27. Registrar retiro completo y llegada

**Actor:** BRI. **Precondición:** autorización y ruta verificada para retiro; posteriormente retiro completado para llegada.

**Comportamiento:** verificar la totalidad autorizada sin modificar cantidades y registrar la llegada del despacho con responsable y momento; no convertir llegada en recepción conforme.

**Aceptación:** una cantidad parcial no se confirma como retiro; registrar llegada habilita la verificación del destinatario, no la sustituye.

## 8. Supervisión y resultados

### RF-28. Generar informe final por evento de cierre

**Actor:** SIS. **Precondición:** evento preconfigurado `EMERGENCIA_FINALIZADA` para el escenario.

**Comportamiento:** consolidar un informe fechado de resultados, solicitudes, asignaciones, envíos, recepciones, brechas e incidencias. Publicarlo en solo lectura tras el evento, exactamente una vez por evento.

**Aceptación:** el informe no se publica durante la emergencia activa; reintentar evento no produce duplicados.

### RF-29. Conservar trazabilidad en informe final

**Actor:** SIS. **Precondición:** informe final generado.

**Comportamiento:** incluir secuencia de acciones y responsables con fechas, cantidades y relaciones relevantes para comprender decisiones y diferencias.

**Aceptación:** se puede distinguir quién solicitó 100, autorizó 70, retiró 70 y confirmó 65 conformes.

### RF-30. Eliminado: reportes operativos generales del MVP anterior

No se incorpora una función de generación arbitraria de reportes finales mientras el escenario esté abierto. Las consultas territoriales de lectura autorizadas siguen siendo una capacidad distinta.

### RF-31. Proteger consultas de Defensa Civil

**Actor:** DC. **Precondición:** sesión con rol `defensaCivil`.

**Comportamiento:** ofrecer consultas de solo lectura de riesgo, atención, entregas y brechas; permitir además acceder a informes finales publicados, sin modificar registros o consultar existencias/lotes privados de ONG.

**Aceptación:** la supervisión durante la operación es posible, pero un informe final no es visible antes del evento de cierre.

## 9. Restricciones transversales

### RF-32. Validar cambios de estado

**Actor:** SIS. **Comportamiento:** impedir transiciones inconsistentes entre solicitud, propuesta, autorización, despacho y recepción.

**Aceptación:** no se confirma recepción de un despacho sin llegada ni se descuenta inventario sin retiro completo válido.

### RF-33. Calcular saldos sin cobertura duplicada

**Actor:** SIS. **Comportamiento:** distinguir cantidad solicitada, nunca cubierta, comprometida, enviada, recibida y conforme, sin reactivar faltantes de recepciones finalizadas.

**Aceptación:** ningún mismo aporte se contabiliza dos veces como cobertura.

### RF-34. Registrar trazabilidad operativa

**Actor:** SIS. **Comportamiento:** conservar eventos críticos con actor, rol, entidad, fecha/hora, objeto y cantidades pertinentes; correcciones no sobrescriben hechos históricos.

**Aceptación:** la secuencia de operaciones puede reconstruirse sin perder eventos previos.

### RF-35. Mantener relaciones consistentes entre operaciones

**Actor:** SIS. **Comportamiento:** validar pertenencia de producto, lote, solicitud, propuesta, autorización, despacho y recepción, impidiendo referencias cruzadas incoherentes.

**Aceptación:** una recepción no puede asociarse a líneas de un despacho ajeno ni a la comunidad equivocada.

## 10. Capacidades confirmadas para esta versión ampliada

Los siguientes IDs comienzan tras el conjunto histórico y representan decisiones adicionales compatibles con los modelos priorizados.

### RF-36. Registrar evaluaciones de riesgo territorial

**Actor:** SIS, por integración o carga autorizada. **Precondición:** comunidad y categorías válidas.

**Comportamiento:** registrar desastre, nivel de severidad, fuente y fecha de evaluación, conservando historial y sin alterar riesgo por entregas de ayuda.

**Aceptación:** una nueva evaluación no borra las anteriores; una recepción no cambia el nivel de riesgo.

### RF-37. Presentar mapa territorial para supervisión

**Actor:** DC. **Comportamiento:** visualizar comunidades y evaluaciones de riesgo, junto con estado de atención representado separadamente. Mostrar procedencia/fecha de riesgo y evitar equiparar colores de riesgo y atención.

**Aceptación:** una comunidad atendida puede seguir figurando con riesgo elevado.

### RF-38. Consultar entregas y brechas territoriales

**Actor:** DC. **Comportamiento:** consultar cantidades efectivamente confirmadas y necesidades no cubiertas por zona, producto y fecha cuando esos datos existan, sin mostrar lotes o inventarios privados.

**Aceptación:** una llegada no cuenta como recepción conforme y las consultas no permiten cambios de estado.

### RF-39. Ingerir observaciones y alertas externas

**Actor:** SIS. **Comportamiento:** incorporar datos identificados de fuentes externas previstas, conservando origen, fecha y condición de verificación; permitir avisos informativos a usuarios autorizados sin declarar automáticamente emergencias.

**Aceptación:** un evento externo puede figurar como observación o alerta, nunca como declaración oficial automática por el solo hecho de haberse importado.

### RF-40. Generar documentos finales por despacho

**Actor:** SIS. **Precondición:** recepción finalizada, conforme o con observaciones.

**Comportamiento:** generar manifiesto Excel de lo enviado y acta PDF de lo recibido, ambos vinculados al despacho y recepción sin duplicación por reintentos.

**Aceptación:** una recepción observada genera ambos documentos; el reporte interno de discrepancias no se confunde con el acta PDF.

### RF-41. Impedir confirmación cuando no exista ruta disponible

**Actor:** SIS. **Precondición:** despacho autorizado.

**Comportamiento:** bloquear retiro físico registrado si no existe ruta evaluada como disponible o si alguna vía reportada intransitable forma parte del recorrido. Una verificación de ruta con treinta minutos cumplidos debe renovarse; vías `UNKNOWN` o `IMPASSABLE` impiden confirmar el retiro.

**Aceptación:** sin ruta disponible el inventario no sufre un descuento asociado a ese despacho.

## 11. Criterios técnicos complementarios

| Tema | Comportamiento elegido |
|---|---|
| Prioridad | Fórmula relativa determinista de 50/30/20, referencias de 1 000 personas y siete días, orden estable; no representa un índice institucional oficial. |
| Rutas | Evaluación de máximo treinta minutos, exclusión de `UNKNOWN` e `IMPASSABLE` y revalidación antes de retiro. |
| Emergencias | Contexto de emergencia autorizado y precargado; cierre por `EMERGENCIA_FINALIZADA` preconfigurado, sin nuevo rol humano. |
| Fuentes externas | Adaptadores backend con metadatos de origen y controles de frecuencia/licencia; datos no válidos no actualizan riesgo. |
| Varios almacenes | Un despacho por almacén; no optimización de recorrido con múltiples puntos de recojo. |

## 12. Ejemplo transversal de aceptación

Datos ficticios: se solicitan 100 kits. Dos ONG proponen 60 y 40. Una ONG autoriza 60; la otra no autoriza. Solo 60 quedan comprometidos y 40 nunca cubiertos siguen elegibles. La brigada no puede retirar los 60 sin ruta válida ni aceptar solo 55 como retiro completo. Tras retirar 60 y registrar llegada, la comunidad confirma 58 conformes y dos dañados: la recepción se finaliza con observaciones, se generan los dos documentos y las dos unidades observadas no regresan automáticamente al matching. Defensa Civil visualiza riesgo y atención como indicadores distintos y recibe el informe final solamente tras `EMERGENCIA_FINALIZADA`.

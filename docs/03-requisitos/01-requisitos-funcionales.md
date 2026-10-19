# Especificación de requisitos funcionales de Alivía

## 1. Convenciones generales

Esta especificación define las capacidades funcionales de Alivía mediante requisitos identificados como `RF-xx`, con comportamientos y criterios de aceptación verificables.

**Roles utilizados:**

- `COM`: Jefe de Comuna/Albergue.
- `ONG`: Jefe de ONG.
- `BRI`: Jefe de Brigada.
- `DC`: Jefe de Defensa Civil.
- `SIS`: Sistema o proceso automático.

Cada requisito identifica el actor responsable, las precondiciones necesarias cuando corresponda y el comportamiento esperado. Los criterios de aceptación permiten comprobar su cumplimiento.

El alcance contempla un escenario de emergencia activo previamente configurado, con datos de prueba e integraciones externas previstas. La especificación no implica que las funcionalidades estén implementadas.

## 2. Acceso y pertenencia

### RF-01. Autenticar usuarios

**Actor:** COM, ONG, BRI, DC.

**Precondición:** cuenta activa configurada.

**Comportamiento:** el sistema valida las credenciales en el servidor, establece una sesión protegida y habilita las funciones correspondientes al rol. Rechaza cuentas inactivas o credenciales inválidas.

**Aceptación:** un usuario válido accede a su ámbito autorizado; las credenciales incorrectas no permiten ingresar ni exponen información restringida.

### RF-02. Autorizar operaciones por rol y titularidad

**Actor:** SIS.

**Precondición:** operación autenticada.

**Comportamiento:** el servidor verifica los permisos del rol y la pertenencia del recurso a la entidad correspondiente antes de permitir consultas o modificaciones. Defensa Civil mantiene acceso exclusivamente de lectura a la información autorizada.

**Aceptación:** modificar identificadores de comunidad u ONG en una petición a la API no permite acceder ni operar sobre recursos ajenos.

### RF-03. Garantizar la vinculación exclusiva de responsables

**Actor:** SIS.

**Precondición:** usuarios y entidades configurados.

**Comportamiento:** cada jefe de comuna, ONG o brigada representa una única entidad, y cada entidad participante tiene un solo jefe responsable. Estas relaciones deben garantizarse mediante restricciones de unicidad en el almacenamiento.

**Aceptación:** no se permite asignar dos jefes a una misma entidad ni vincular un responsable a varias entidades incompatibles.

## 3. Solicitudes y recepción comunitaria

### RF-04. Registrar solicitudes de ayuda

**Actor:** COM.

**Precondición:** sesión válida, comunidad vinculada y escenario de atención habilitado.

**Comportamiento:** permitir registrar una solicitud con situación de afectación, población afectada y una o varias líneas de productos del catálogo con sus cantidades y unidades. La comunidad y el autor se obtienen de la sesión.

**Aceptación:** una solicitud que contiene tres productos se almacena como un único registro con tres líneas asociadas.

### RF-05. Validar solicitudes

**Actor:** SIS.

**Precondición:** intento de confirmación de una solicitud.

**Comportamiento:** validar campos obligatorios, productos activos, cantidades positivas, unidades compatibles y ausencia de productos duplicados. Las solicitudes confirmadas no admiten edición ni cancelación por el jefe de comuna.

**Aceptación:** un producto inexistente, una cantidad inválida o una línea duplicada impiden la confirmación e identifican el error correspondiente.

### RF-07. Consultar la atención de su comunidad

**Actor:** COM.

**Precondición:** comunidad vinculada con solicitudes registradas.

**Comportamiento:** mostrar las necesidades solicitadas, cantidades autorizadas pendientes, recepciones conformes, saldos sin cobertura y estados de los despachos propios, sin exponer inventarios privados de ONG.

**Aceptación:** el usuario puede distinguir cantidades recibidas conforme de aquellas todavía comprometidas. Por ejemplo, de 70 unidades autorizadas, 20 recibidas conforme y 50 aún comprometidas.

### RF-08. Confirmar recepción de despachos

**Actor:** COM.

**Precondición:** despacho destinado a su comunidad con llegada registrada.

**Comportamiento:** permitir verificar cada línea del despacho y registrar cantidades recibidas físicamente, cantidades conformes, resultado, responsable y fecha. Se impiden recepciones duplicadas y cantidades superiores a las enviadas.

**Aceptación:** la llegada registrada por una brigada no contabiliza productos como recibidos conformes hasta la confirmación comunitaria.

### RF-09. Registrar discrepancias de recepción

**Actor:** COM.

**Precondición:** recepción en proceso de verificación.

**Comportamiento:** registrar faltantes físicos, productos no conformes y observaciones por línea. Cuando existan discrepancias, generar un reporte interno y finalizar la recepción con observaciones, sin reactivar automáticamente el matching por las cantidades afectadas.

**Aceptación:** si se enviaron 20 unidades y llegaron 17, se registran tres faltantes físicos sin crear automáticamente una nueva autorización de reposición.

## 4. Inventario de ONG

### RF-10. Registrar ingresos de inventario

**Actor:** ONG.

**Precondición:** ONG, almacén y producto válidos.

**Comportamiento:** registrar ingresos con cantidad positiva, producto, unidad, almacén, lote y vencimiento cuando corresponda. Cada operación conserva responsable, fecha y motivo.

**Aceptación:** un ingreso confirmado incrementa una sola vez la existencia física del lote y genera un movimiento auditable.

### RF-11. Consultar inventario y disponibilidad

**Actor:** ONG.

**Precondición:** usuario vinculado a la organización.

**Comportamiento:** mostrar existencias físicas, condición de los lotes, cantidades autorizadas pendientes de retiro y disponibilidad para nuevas asignaciones, restringidas a los almacenes propios.

**Aceptación:** 150 unidades utilizables con 40 comprometidas y no retiradas muestran 110 disponibles para asignar.

### RF-12. Registrar ajustes de inventario

**Actor:** ONG.

**Precondición:** lote perteneciente a su organización.

**Comportamiento:** permitir ajustes justificados con trazabilidad de responsable, fecha y causa. Se rechazan operaciones que generen existencias negativas o reduzcan la disponibilidad por debajo de los compromisos vigentes.

**Aceptación:** no se confirma un ajuste que deje menos unidades aptas que las ya autorizadas y pendientes de retiro.

## 5. Motor automático de matching

### RF-13. Identificar necesidades elegibles

**Actor:** SIS.

**Precondición:** solicitudes confirmadas.

**Comportamiento:** calcular por línea las cantidades pendientes de cobertura, excluyendo recepciones conformes y compromisos vigentes. Los faltantes de recepciones finalizadas no reingresan automáticamente al matching.

**Aceptación:** una propuesta pendiente no reduce la demanda sin cobertura; una autorización vigente sí excluye las cantidades comprometidas de nuevas propuestas.

### RF-14. Cruzar necesidades con existencias aptas

**Actor:** SIS.

**Precondición:** solicitudes, catálogo e inventarios disponibles.

**Comportamiento:** seleccionar existencias compatibles por producto, unidad y múltiplo de entrega, excluyendo cantidades comprometidas y lotes vencidos, bloqueados o en cuarentena. No se realizan sustituciones ni conversiones automáticas no autorizadas.

**Aceptación:** un lote vencido o una unidad incompatible nunca se seleccionan como oferta válida.

### RF-15. Priorizar necesidades y seleccionar lotes mediante FEFO

**Actor:** SIS.

**Precondición:** necesidades elegibles y existencias aptas.

**Comportamiento:** ordenar las necesidades mediante la política determinista de prioridad y seleccionar lotes utilizables según FEFO, respetando sus vencimientos y múltiplos de entrega.

La prioridad se calcula mediante:

`score = 0,50 × criticidad_normalizada + 0,30 × min(población / 1000, 1) + 0,20 × min(antigüedad_días / 7, 1)`

Cada factor se normaliza al intervalo `[0,1]`. Los empates se resuelven por solicitud más antigua y UUID ascendente.

Esta puntuación es una política de software, no una clasificación institucional de urgencia.

**Aceptación:** el orden de prioridades es reproducible y, entre lotes equivalentes utilizables, se considera primero el vencimiento más próximo que permita una entrega y consumo oportunos.

### RF-16. Generar propuestas por ONG

**Actor:** SIS.

**Precondición:** demanda elegible y oferta compatible.

**Comportamiento:** generar propuestas independientes por ONG y solicitud, identificando productos, cantidades, comunidad destinataria y origen correspondiente. Las propuestas no reservan ni descuentan inventario.

**Aceptación:** una solicitud puede recibir propuestas de distintas ONG; confirmar una no confirma ni compromete las demás.

### RF-17. Controlar la vigencia de propuestas

**Actor:** SIS.

**Precondición:** propuesta pendiente de decisión.

**Comportamiento:** detectar cambios relevantes de inventario o cobertura y revalidar las condiciones antes de confirmar o autorizar aportes. No se aceptan cantidades que hayan dejado de estar disponibles.

**Aceptación:** una propuesta de 70 unidades no puede autorizarse íntegramente si solo quedan 50 disponibles.

### RF-18. Mostrar necesidades sin cobertura

**Actor:** SIS.

**Precondición:** solicitud confirmada con necesidades pendientes.

**Comportamiento:** presentar separadamente cantidades sin compromiso vigente y cantidades todavía no recibidas conforme. Las propuestas no se contabilizan como autorizaciones ni entregas.

**Aceptación:** si una comunidad solicita 100 unidades y recibe propuestas por 70, las 100 continúan sin autorización y sin recepción hasta que se registren las operaciones correspondientes.

## 6. Decisiones y autorizaciones de ONG

### RF-19. Consultar propuestas propias

**Actor:** ONG.

**Precondición:** propuestas dirigidas a su organización.

**Comportamiento:** mostrar productos, cantidades, destino, justificación, estado y disponibilidad relevante para decidir el aporte, sin permitir acceso a propuestas de otras ONG.

**Aceptación:** un jefe de ONG solo puede consultar y responder propuestas destinadas a su organización.

### RF-20. Confirmar, reducir o rechazar aportes

**Actor:** ONG.

**Precondición:** propuesta vigente.

**Comportamiento:** permitir confirmar cantidades iguales o inferiores a las propuestas. Una respuesta con todas las cantidades en cero se registra como rechazo con motivo obligatorio. Las cantidades no aceptadas permanecen sin cobertura.

**Aceptación:** no se pueden aumentar cantidades propuestas y un rechazo no cancela la solicitud comunitaria.

### RF-21. Comprometer existencias de forma atómica

**Actor:** SIS.

**Precondición:** disponibilidad confirmada y solicitud posterior de autorización.

**Comportamiento:** revalidar atómicamente inventario y cobertura antes de comprometer cantidades. La autorización reduce la disponibilidad para nuevas asignaciones, pero no descuenta las existencias físicas ni requiere crear una reserva independiente.

**Aceptación:** dos autorizaciones simultáneas de 80 unidades sobre una disponibilidad de 100 no pueden comprometer 160.

### RF-22. Autorizar la salida de aportes

**Actor:** ONG.

**Precondición:** disponibilidad confirmada.

**Comportamiento:** registrar una autorización explícita con responsable, fecha, productos, cantidades, almacén y destino. Cada despacho corresponde a un almacén; no se contempla optimizar recorridos con múltiples puntos de recojo.

La autorización habilita el despacho, sin representar un retiro físico.

**Aceptación:** un aporte confirmado, pero no autorizado, no puede retirarse ni aparecer como despacho habilitado para retiro.

### RF-23. Registrar descuento físico por retiro

**Actor:** SIS, a partir de la confirmación de BRI.

**Precondición:** despacho autorizado, ruta válida y retiro completo verificado.

**Comportamiento:** descontar una sola vez las cantidades retiradas y registrar el movimiento correspondiente, vinculado al despacho. Los reintentos no generan descuentos duplicados ni muestran éxito sin confirmación.

**Aceptación:** confirmar repetidamente un retiro de 50 unidades produce un único descuento físico de 50.

## 7. Brigada, rutas y despachos

### RF-24. Consultar despachos asignados

**Actor:** BRI.

**Precondición:** sesión válida y despachos vinculados a su brigada.

**Comportamiento:** mostrar origen, destino, productos, cantidades autorizadas y estado logístico de los despachos asignados, sin funciones de administración de vehículos o conductores.

**Aceptación:** una brigada no puede consultar operativamente ni modificar despachos ajenos.

### RF-26. Consultar rutas verificadas

**Actor:** BRI/SIS.

**Precondición:** despacho autorizado.

**Comportamiento:** calcular y presentar una ruta entre almacén y comunidad utilizando la información vial disponible. La verificación conserva fecha, hora y procedencia de las restricciones.

Una ruta es utilizable únicamente cuando no contiene tramos `IMPASSABLE`, no depende de tramos `UNKNOWN` y su verificación tiene menos de treinta minutos de antigüedad.

**Aceptación:** las rutas bloqueadas, desconocidas o con verificación vencida no se consideran disponibles y requieren una nueva evaluación.

### RF-27. Registrar retiro completo y llegada

**Actor:** BRI.

**Precondición:** despacho autorizado y ruta válida para el retiro; retiro completado para registrar llegada.

**Comportamiento:** permitir confirmar únicamente el retiro total de las cantidades autorizadas. Posteriormente, registrar la llegada al destino con usuario, fecha y hora, sin asumir recepción conforme.

**Aceptación:** no se admite un retiro parcial. La llegada habilita la verificación comunitaria, pero no sustituye su confirmación.

## 8. Supervisión y resultados

### RF-28. Generar informe final de emergencia

**Actor:** SIS.

**Precondición:** recepción del evento preconfigurado `EMERGENCIA_FINALIZADA`.

**Comportamiento:** consolidar solicitudes, autorizaciones, despachos, recepciones, cantidades atendidas, brechas e incidencias, conservando la fecha y hora de corte.

El informe se genera una sola vez por evento y se publica para consulta de Defensa Civil. Los reintentos no duplican ni modifican silenciosamente su contenido.

**Aceptación:** el informe final no se publica durante la emergencia activa y un evento repetido no crea otro informe.

### RF-29. Incorporar trazabilidad al informe final

**Actor:** SIS.

**Precondición:** consolidación final del escenario.

**Comportamiento:** incluir las operaciones y responsables necesarios para reconstruir solicitudes, decisiones, movimientos y diferencias de recepción, con sus fechas y cantidades correspondientes.

**Aceptación:** el informe permite identificar quién solicitó 100 unidades, autorizó 70, retiró 70 y confirmó 65 conformes.

### RF-31. Proteger las consultas de Defensa Civil

**Actor:** DC.

**Precondición:** sesión con rol `defensaCivil`.

**Comportamiento:** permitir consultas de solo lectura sobre riesgos, atención, entregas y brechas territoriales, así como informes finales ya publicados. Se excluyen modificaciones operativas e inventarios privados de ONG.

**Aceptación:** Defensa Civil puede supervisar la emergencia activa, pero no consultar su informe final antes del evento de cierre ni modificar información operativa.

## 9. Integridad y trazabilidad

### RF-32. Validar transiciones de estado

**Actor:** SIS.

**Comportamiento:** impedir cambios de estado incompatibles con la secuencia funcional de solicitudes, propuestas, autorizaciones, despachos y recepciones.

**Aceptación:** no se confirma una recepción sin llegada registrada ni se descuenta inventario sin un retiro completo válido.

### RF-33. Calcular cantidades sin duplicar cobertura

**Actor:** SIS.

**Comportamiento:** diferenciar cantidades solicitadas, nunca cubiertas, comprometidas, enviadas, recibidas físicamente y conformes, sin reactivar automáticamente los faltantes de recepciones finalizadas.

**Aceptación:** una misma cantidad no se contabiliza dos veces como cobertura ni una propuesta se interpreta como ayuda recibida.

### RF-34. Registrar trazabilidad operativa

**Actor:** SIS.

**Comportamiento:** conservar las acciones críticas con usuario, rol, entidad, objeto, fecha, hora y cantidades pertinentes. Las correcciones generan nuevos registros sin eliminar hechos anteriores.

**Aceptación:** se puede reconstruir la secuencia de operaciones, sus responsables y resultados sin perder el historial.

### RF-35. Mantener relaciones consistentes

**Actor:** SIS.

**Comportamiento:** validar las relaciones entre solicitudes, productos, lotes, propuestas, autorizaciones, despachos y recepciones, evitando referencias incompatibles o asociaciones con entidades ajenas.

**Aceptación:** una recepción no puede contener líneas de otro despacho ni atribuirse a una comunidad diferente de su destinataria.

## 10. Riesgo territorial, información externa y documentos

### RF-36. Registrar evaluaciones de riesgo territorial

**Actor:** SIS, mediante integración o carga autorizada.

**Precondición:** comunidades y categorías territoriales válidas.

**Comportamiento:** registrar evaluaciones por comunidad y tipo de desastre, conservando nivel, fuente, fecha e historial. Las entregas humanitarias no modifican automáticamente el riesgo.

**Aceptación:** una nueva evaluación conserva las anteriores y la recepción de ayuda no cambia por sí sola el nivel registrado.

### RF-37. Presentar mapa de riesgo y atención

**Actor:** DC.

**Comportamiento:** visualizar comunidades y evaluaciones territoriales con sus fuentes y fechas, diferenciando el riesgo del estado de atención. Los fenómenos y fuentes se representan individualmente, sin consolidar desastres distintos en un único nivel.

**Aceptación:** una comunidad puede figurar como atendida y conservar un nivel de riesgo elevado, sin contradicción entre los indicadores.

### RF-38. Consultar entregas y brechas territoriales

**Actor:** DC.

**Comportamiento:** consultar entregas confirmadas y necesidades pendientes por zona, producto y periodo, según los datos disponibles. La información no expone lotes ni inventarios privados.

**Aceptación:** los despachos que únicamente registran llegada no cuentan como recibidos conformes y ninguna consulta permite alterar operaciones.

### RF-39. Incorporar observaciones y alertas externas

**Actor:** SIS.

**Comportamiento:** importar observaciones y alertas mediante adaptadores backend, conservando fuente, fecha y estado de validación, con controles de frecuencia y condiciones de uso.

Los datos inválidos no actualizan evaluaciones de riesgo. Los avisos pueden mostrarse a usuarios autorizados, pero no declaran emergencias automáticamente.

**Aceptación:** un reporte externo se identifica como observación o alerta con procedencia verificable, sin generar por sí solo una declaración institucional de emergencia.

### RF-40. Generar documentos por despacho

**Actor:** SIS.

**Precondición:** recepción finalizada, conforme o con observaciones.

**Comportamiento:** generar un manifiesto Excel con los productos enviados y un acta PDF con las cantidades recibidas y observaciones, vinculados al despacho correspondiente.

Cada tipo de documento se genera una sola vez por despacho. El reporte interno de discrepancias no constituye un PDF adicional.

**Aceptación:** una recepción con observaciones produce ambos documentos y los reintentos no generan duplicados.

### RF-41. Bloquear retiros sin ruta disponible

**Actor:** SIS.

**Precondición:** despacho autorizado con intento de confirmación de retiro.

**Comportamiento:** verificar que exista una ruta utilizable según `RF-26` antes de permitir el retiro completo. Si la ruta no cumple las condiciones, se bloquea la operación sin modificar el inventario.

**Aceptación:** un despacho sin ruta válida no puede registrar retiro ni producir descuentos de existencias físicas.

## 11. Escenario integral de aceptación

Una comunidad solicita 100 kits. El matching genera propuestas de 60 y 40 unidades para dos ONG. Solo una autoriza sus 60 unidades, mientras las otras 40 permanecen sin cobertura.

La brigada debe contar con una ruta válida y verificar los 60 kits antes de confirmar el retiro completo. El sistema descuenta esa cantidad una sola vez.

Tras registrar la llegada, la comunidad confirma 58 kits conformes y dos dañados. La recepción finaliza con observaciones, se generan el manifiesto Excel y el acta PDF, y las dos unidades no conformes no reingresan automáticamente al matching.

Defensa Civil consulta los resultados de atención y el riesgo territorial por separado. El informe consolidado permanece inaccesible hasta que se procese `EMERGENCIA_FINALIZADA`.

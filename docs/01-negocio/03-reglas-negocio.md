# Reglas de negocio de Alivía

## 1. Carácter normativo

Estas reglas expresan condiciones del dominio que deben permanecer válidas independientemente del framework, almacenamiento o forma visual elegidos. Los identificadores `RN-xx` son estables y permiten formular requisitos y pruebas. Los parámetros operativos seleccionados para esta versión son reglas de software, no decisiones oficiales de priorización humanitaria.

## 2. Identidad y titularidad

| ID | Regla |
|---|---|
| RN-01 | Una cuenta tiene un único rol (`comuna`, `ong`, `brigada` o `defensaCivil`) y solo opera con las autorizaciones de ese rol. |
| RN-02 | Los responsables de comuna y ONG se vinculan de forma exclusiva 1:1 con su entidad; cada brigada también tiene un único jefe responsable. |
| RN-03 | La autorización exige comprobar la titularidad en el servidor, no solo el rol declarado por el navegador. |
| RN-04 | Defensa Civil conserva permisos de lectura territorial y de reportes finales publicados; no obtiene datos privados de inventario ni modifica registros. |

## 3. Solicitudes y necesidades

| ID | Regla |
|---|---|
| RN-05 | Una comunidad puede tener varias solicitudes confirmadas; cada solicitud contiene una o más líneas de producto con cantidades positivas. |
| RN-06 | Una solicitud confirmada no puede cancelarse por su jefe; la edición posterior no está permitida en esta versión. |
| RN-07 | No se admite duplicar un mismo producto dentro de una solicitud ni registrar productos ajenos al catálogo. |
| RN-08 | La prioridad se calcula con criterios de criticidad, población afectada y antigüedad; el cálculo y sus parámetros de referencia se establecen en RN-31. |
| RN-09 | Una necesidad puede recibir propuestas de distintas ONG; crear una propuesta no cambia inventario ni representa ayuda entregada. |

## 4. Disponibilidad y compromisos

| ID | Regla |
|---|---|
| RN-10 | Solo se ofrecen lotes utilizables y compatibles con producto, unidad, múltiplo de entrega y fecha de vencimiento. |
| RN-11 | Se seleccionan primero los lotes utilizables con vencimiento más próximo según FEFO; no se convierte ni sustituye automáticamente un producto por otro. |
| RN-12 | Una ONG solo puede confirmar cantidades no negativas e iguales o inferiores a las propuestas; si confirma cero para todos los productos, registra rechazo motivado. |
| RN-13 | Confirmar disponibilidad y autorizar la salida son acciones distintas; al autorizar se revalida stock y cobertura de forma atómica. |
| RN-14 | Las cantidades autorizadas aún no retiradas se consideran comprometidas y se excluyen de nuevas propuestas; no se necesita una tabla separada de reservas. |
| RN-15 | El stock físico y los compromisos vigentes no pueden volverse negativos ni generar disponibilidad negativa. Ajustes de inventario deben respetar compromisos existentes. |
| RN-16 | Una autorización vigente no vuelve al matching mientras espera su entrega; cantidades nunca cubiertas permanecen elegibles para nuevas propuestas. |

## 5. Despacho, traslado y recepción

| ID | Regla |
|---|---|
| RN-17 | Antes de confirmar el retiro de un despacho, el sistema debe verificar la ruta y excluir vías reportadas como intransitables; una ruta indisponible bloquea el retiro. |
| RN-18 | La ONG debe entregar todo lo autorizado y la brigada solo confirma retiro completo; no se admite retiro parcial en esta versión. |
| RN-19 | Confirmar un retiro descuenta una vez las existencias físicas correspondientes y registra movimiento; un reintento no crea descuentos duplicados. |
| RN-20 | Registrar llegada no equivale a confirmar recepción. La comunidad corrobora físicamente los productos contra el despacho. |
| RN-21 | Para cada producto del despacho: `0 <= conforme <= recibido <= enviado`. El faltante físico se determina frente a `enviado`, no frente a toda la solicitud. |
| RN-22 | Una recepción puede finalizar conforme o con observaciones. Si existen discrepancias, se conserva un reporte interno, pero las cantidades faltantes de esa recepción no reactivan el matching. |
| RN-23 | Finalizar un despacho no cancela otros despachos ni la búsqueda de cantidades que nunca tuvieron cobertura. La comunidad puede formular una petición posterior por una necesidad persistente. |
| RN-24 | Tras finalizar la recepción se generan un manifiesto Excel (enviado) y un acta PDF (recibido y observaciones), una vez por tipo y despacho. |

## 6. Riesgo, supervisión y cierre

| ID | Regla |
|---|---|
| RN-25 | El riesgo territorial depende de evaluaciones por desastre, fuente y fecha, no de la ayuda distribuida; recibir ayuda no cambia automáticamente el nivel de riesgo. |
| RN-26 | El estado de atención es distinto del nivel de riesgo y no puede deducirse únicamente del color de otro indicador. |
| RN-27 | Una observación o alerta externa no constituye por sí sola declaración automática de emergencia; necesita validación o procedimiento autorizado que no se simula como ya integrado. |
| RN-28 | Defensa Civil puede observar información territorial y de atención durante la operación en solo lectura, pero el informe consolidado final solo se publica tras `EMERGENCIA_FINALIZADA`. |
| RN-29 | El evento de finalización preconfigurado genera exactamente un informe final correspondiente al evento; procesarlo de nuevo no duplica ni reescribe silenciosamente el contenido. |
| RN-30 | El registro de acciones críticas conserva usuario, rol, entidad, objeto, momento y cantidades pertinentes; corregir un hecho exige nuevo registro, no borrar trazabilidad previa. |

## 7. Fórmulas y ejemplos operativos

### 7.1. Cantidades de inventario

`disponible_para_asignar = stock_fisico_utilizable - compromisos_autorizados_aun_no_retirados`

El resultado nunca es negativo. Para evitar ofrecer recursos de otro almacén o lote, el cálculo respeta el alcance físico de cada existencia. No se infiere que todos los lotes físicos estén utilizables.

### 7.2. Cobertura de demanda

La cantidad sin cobertura debe excluir la parte recibida conforme y las cantidades con compromiso vigente que continúan destinadas a la solicitud. Una **propuesta pendiente** no se descuenta de la demanda. Los faltantes de una recepción ya finalizada no se introducen nuevamente como saldo automático de matching.

**Ejemplo ficticio:** se solicitan 100 kits, se autorizan 70 y solo se confirman 65 conformes tras recepción. Hay una diferencia de 5 en la recepción y 30 que nunca tuvieron cobertura. Los 5 no reingresan automáticamente al matching; los 30 siguen siendo necesidades sin cobertura, salvo que un cierre de solicitud o nueva decisión válida cambie su estado.

### 7.3. Invariantes de recepción

- `cantidad_recibida_fisicamente >= 0`
- `cantidad_conforme >= 0`
- `cantidad_conforme <= cantidad_recibida_fisicamente`
- `cantidad_recibida_fisicamente <= cantidad_enviada`
- `cantidad_faltante_fisica = cantidad_enviada - cantidad_recibida_fisicamente`

Una parte recibida pero dañada **no** debe sumarse como faltante físico. La cantidad no conforme se identifica como recibida menos conforme, acompañada de observación.

## 8. Parámetros operativos de referencia

| ID | Política de la versión de referencia |
|---|---|
| RN-31 | La prioridad se calcula como 0,50 × criticidad normalizada + 0,30 × población normalizada + 0,20 × antigüedad normalizada; la normalización trunca cada factor al intervalo [0,1]. Población de referencia: 1 000; antigüedad: siete días. Empate: solicitud más antigua y UUID ascendente. |
| RN-32 | El matching se reevalúa por solicitud confirmada, ingreso/ajuste utilizable de inventario o rechazo/reducción de propuesta; un procesador idempotente evita propuestas duplicadas. |
| RN-33 | La comprobación de ruta vence a los treinta minutos; una vía `UNKNOWN` no constituye ruta utilizable. |
| RN-34 | El mapa ofrece riesgos individualizados por fenómeno y fuente; no se presenta un nivel único consolidado entre catástrofes distintas. |
| RN-35 | No hay edición de solicitudes confirmadas ni pantalla de cierre de emergencia; el fin se activa solo por evento preconfigurado de escenario. |
| RN-36 | Una solicitud puede pasar a `CLOSED` aunque la recepción final contenga discrepancias o saldos no satisfechos; las cantidades históricas permanecen visibles. |

# Casos de uso de Alivía

## 1. Propósito y límite del modelado

Los casos de uso describen interacciones **iniciadas por personas** para alcanzar resultados de valor, incluidos caminos alternativos. Los mecanismos internos de matching, importación de observaciones, descuento contable y generación de documentos se ejecutan como respuestas del sistema y no se representan como actores humanos.

Convenciones: `CU-COM` corresponde a Jefe de Comuna/Albergue; `CU-ONG`, a Jefe de ONG; `CU-BRI`, a Jefe de Brigada; `CU-DC`, a Jefe de Defensa Civil. Los identificadores de casos de uso se mantienen estables y reflejan los procesos operativos vigentes.

## 2. Precondiciones comunes

1. Existe una cuenta activa con rol único y sesión válida para el actor.
2. Los datos operativos de demostración, entidades y catálogo están configurados.
3. El servidor comprueba titularidad además del rol antes de entregar información o aceptar una acción.
4. Las operaciones críticas tienen confirmación del servidor y protecciones contra duplicación por reintentos.

## 3. Casos de uso del Jefe de Comuna/Albergue

### CU-COM-01. Registrar solicitud de ayuda

- **Objetivo:** comunicar una necesidad cuantificada de su comunidad.
- **Disparador:** el representante decide solicitar ayuda.
- **Flujo principal:** (1) inicia sesión; (2) el sistema identifica la comunidad; (3) registra situación y población afectada; (4) selecciona productos y cantidades; (5) revisa y confirma; (6) el sistema valida, guarda y deja la solicitud disponible para matching.
- **Alternativas:** producto inexistente, cantidad inválida o repetida: se rechaza la confirmación y se indican campos. Fallo de comunicación: no se comunica éxito sin respuesta del servidor.
- **Poscondición:** solicitud confirmada y sin compromiso de stock originado únicamente por ese registro.

### CU-COM-02. Reservado: modificar solicitud confirmada

No está activo. No se crea pantalla ni operación de edición/cancelación posterior mientras las condiciones no hayan sido acordadas.

### CU-COM-03. Consultar estado de solicitud propia

- **Objetivo:** conocer las cantidades pendientes y el progreso de las entregas.
- **Flujo principal:** (1) abre sus solicitudes; (2) selecciona una; (3) visualiza cantidades requeridas, nunca cubiertas, comprometidas y recibidas conformes, además del estado de los despachos correspondientes.
- **Alternativas:** solicitud de otra comunidad: acceso denegado; inexistencia de despachos: se muestran cantidades sin inventar entregas.
- **Poscondición:** no se modifica información.

### CU-COM-04. Confirmar recepción

- **Objetivo:** verificar los productos de un despacho llegado.
- **Precondición:** despacho dirigido a su comunidad y con llegada registrada.
- **Flujo principal:** (1) consulta detalle enviado; (2) compara físicamente productos y cantidades; (3) registra cantidades recibidas y conformes; (4) confirma la recepción; (5) el sistema la finaliza y prepara documentos.
- **Alternativas:** despacho sin llegada o ajeno: no se permite; cantidades superiores a las enviadas: se exige corrección; daños/faltantes: se ejecuta variante con observaciones.
- **Poscondición:** una única recepción finalizada para ese despacho.

### CU-COM-05. Registrar recepción con discrepancias

- **Objetivo:** conservar faltantes o productos no conformes sin ocultarlos bajo el estado de llegada.
- **Precondición:** despacho llegado y diferencia detectada durante comprobación.
- **Flujo principal:** (1) registra cantidad física recibida; (2) identifica cantidad conforme; (3) describe diferencias; (4) confirma recepción con observaciones; (5) se genera reporte interno de discrepancia y los documentos finales del despacho.
- **Alternativas:** sin discrepancia: confirmar conforme; cantidades incoherentes: detener confirmación y corregir.
- **Poscondición:** la recepción queda finalizada sin reactivar automáticamente el matching por sus faltantes.

## 4. Casos de uso del Jefe de ONG

### CU-ONG-01. Registrar ingreso de donaciones

- **Objetivo:** incorporar existencias físicamente recibidas al almacén de su ONG.
- **Precondición:** almacén y producto válidos.
- **Flujo principal:** (1) elige almacén y producto; (2) especifica cantidad, lote y vencimiento aplicable; (3) confirma; (4) el sistema incrementa existencias y registra movimiento.
- **Alternativas:** cantidad no positiva, unidad errónea o almacén ajeno: operación rechazada.
- **Poscondición:** existencia actualizada una sola vez.

### CU-ONG-02. Consultar inventario disponible

- **Objetivo:** diferenciar stock físico de cantidad realmente ofertable.
- **Flujo principal:** (1) consulta inventarios de su ONG; (2) examina lotes, estados de aptitud, compromisos autorizados pendientes y disponibilidad.
- **Alternativas:** lote vencido/bloqueado: se muestra sin ofrecerlo para asignación; almacén ajeno: acceso denegado.
- **Poscondición:** lectura sin modificación.

### CU-ONG-03. Registrar ajuste de inventario

- **Objetivo:** corregir existencias con motivo y trazabilidad.
- **Flujo principal:** (1) selecciona lote propio; (2) introduce ajuste y motivo; (3) confirma; (4) el sistema comprueba invariantes y guarda movimiento.
- **Alternativas:** reducción bajo compromisos autorizados o stock negativo: rechazo sin cambiar existencias.
- **Poscondición:** inventario y auditoría consistentes.

### CU-ONG-04. Revisar propuesta automática

- **Objetivo:** evaluar una recomendación para su ONG.
- **Precondición:** propuesta dirigida a esa organización.
- **Flujo principal:** (1) abre bandeja propia; (2) examina destino, productos, cantidades, prioridad y origen; (3) identifica si sigue pendiente de decisión.
- **Alternativas:** propuesta ajena o desactualizada: no se admite aprobarla.
- **Poscondición:** lectura que prepara la decisión de aporte.

### CU-ONG-05. Confirmar, reducir o rechazar propuesta

- **Objetivo:** indicar la cantidad que su ONG realmente está dispuesta a aportar.
- **Flujo principal:** (1) selecciona propuesta válida; (2) acepta cantidades iguales o menores a las sugeridas; (3) confirma; (4) el sistema registra decisión y diferencias.
- **Alternativas:** aporte cero: rechazo con motivo; cantidad mayor que propuesta: error; stock desactualizado: revalidación antes de seguir.
- **Poscondición:** decisión registrada, sin confundirse con retiro físico.

### CU-ONG-06. Autorizar salida

- **Objetivo:** comprometer expresamente el aporte confirmado.
- **Precondición:** disponibilidad confirmada y todavía válida.
- **Flujo principal:** (1) revisa cantidades confirmadas; (2) solicita autorización de salida; (3) el sistema revalida stock y cobertura de forma atómica; (4) registra autorización y habilita despacho.
- **Alternativas:** conflicto de existencias o reintento duplicado: no crear autorización incompatible ni compromiso adicional.
- **Poscondición:** cantidades autorizadas dejan de estar disponibles para nuevas propuestas, pero no se descuentan físicamente.

### CU-ONG-07. Reservado: confirmar retiro por ONG

No está activo con su significado histórico. El retiro completo se verifica y confirma por la brigada, mientras el sistema coordina la operación física de inventario.

## 5. Casos de uso del Jefe de Brigada

### CU-BRI-01. Consultar despachos autorizados

- **Objetivo:** conocer cargas y destinos que corresponden a su brigada.
- **Flujo principal:** (1) ingresa; (2) examina despachos asignados; (3) consulta origen, destino y cantidades autorizadas.
- **Alternativas:** despacho ajeno: acceso denegado.
- **Poscondición:** lectura del plan operativo del escenario.

### CU-BRI-02. Reservado: gestionar transportistas

Fuera de alcance. No existe gestión interna de conductores, vehículos o asignación de personal en Alivía.

### CU-BRI-03. Consultar ruta de un despacho

- **Objetivo:** conocer un recorrido evaluado con información vial disponible antes de retirar recursos.
- **Precondición:** despacho autorizado propio.
- **Flujo principal:** (1) selecciona despacho; (2) el sistema consulta restricciones; (3) presenta ruta, origen y fecha de verificación o indica indisponibilidad.
- **Alternativas:** tramo intransitable: excluir ruta afectada; sin alternativa: retiro bloqueado.
- **Poscondición:** ruta evaluada o declaración de ausencia de ruta disponible, sin afirmar verificación física absoluta.

### CU-BRI-04. Registrar llegada al destino

- **Objetivo:** dejar constancia de la llegada del despacho transportado.
- **Precondición:** retiro completo confirmado y despacho asignado.
- **Flujo principal:** (1) selecciona envío en traslado; (2) confirma llegada; (3) el sistema registra usuario y fecha/hora.
- **Alternativas:** llegada duplicada o despacho no asignado: denegar transición indebida.
- **Poscondición:** la comunidad queda habilitada para comprobar recepción; todavía no consta conformidad.

### CU-BRI-05. Verificar y confirmar retiro completo

- **Objetivo:** acreditar que lo entregado por la ONG coincide íntegramente con lo autorizado.
- **Precondición:** despacho autorizado, ruta disponible y carga preparada.
- **Flujo principal:** (1) coteja carga física con líneas autorizadas; (2) confirma cantidad completa; (3) el sistema registra retirada y realiza descuento físico único; (4) habilita avance logístico.
- **Alternativas:** faltan productos: no confirmar retiro; falla de descuento: no informar retiro finalizado; doble envío: no duplicar movimiento.
- **Poscondición:** retirada completa y movimiento contable coherentes.

## 6. Casos de uso del Jefe de Defensa Civil

### CU-DC-01. Consultar panorama de riesgo territorial

- **Objetivo:** identificar evaluación de riesgo por comunidad y tipo de desastre.
- **Flujo principal:** (1) abre mapa; (2) examina zonas; (3) consulta tipo de desastre, severidad, fecha y fuente de evaluación.
- **Alternativas:** dato ausente o antiguo: se informa su condición sin declarar riesgo conocido falso.
- **Poscondición:** no se modifica evaluación.

### CU-DC-02. Consultar estado de atención y brechas

- **Objetivo:** identificar comunidades con ayuda recibida y necesidades todavía sin cobertura.
- **Flujo principal:** (1) consulta resultados territoriales; (2) distingue autorizado, trasladado y recibido; (3) examina brechas por zona y producto cuando haya datos.
- **Alternativas:** recepción con observaciones: mostrar diferencias; llegada sin recepción: no contar conforme.
- **Poscondición:** lectura para coordinación externa, sin modificación ni reactivación de matching.

### CU-DC-03. Consultar informe final publicado

- **Objetivo:** revisar el consolidado y su trazabilidad después de finalizar el escenario.
- **Precondición:** recepción del evento preconfigurado de cierre y publicación del informe.
- **Flujo principal:** (1) abre informes disponibles; (2) selecciona la emergencia finalizada; (3) consulta corte, solicitudes, autorizaciones, despachos, recepciones e incidencias.
- **Alternativas:** evento aún no procesado: no mostrar informe final; repetición de evento: mantener un informe único.
- **Poscondición:** contenido consultado en solo lectura.

## 7. Operaciones automáticas vinculadas a los casos

| Código | Evento de inicio | Resultado esperado |
|---|---|---|
| AUT-01 | Solicitud confirmada o pendiente elegible | Matching genera propuestas y conserva porción nunca cubierta. |
| AUT-02 | Autorización válida de ONG | Bloquea oferta duplicada y prepara despacho. |
| AUT-03 | Solicitud de ruta | Calcula/verifica recorrido o indica indisponibilidad con datos conocidos. |
| AUT-04 | Retiro completo confirmado | Actualiza inventario físico una vez. |
| AUT-05 | Recepción finalizada | Genera manifiesto Excel y acta PDF; reporte interno cuando hay discrepancia. |
| AUT-06 | Observación o alerta externa importable | Conserva fuente y fecha, permite aviso informativo sin declarar emergencia. |
| AUT-07 | Evento preconfigurado `EMERGENCIA_FINALIZADA` | Publica informe final una vez por evento. |

Estas operaciones no constituyen actores de inicio de sesión. Los transportistas internos de brigada y proveedores de datos no reciben roles humanos nuevos.

## 8. Escenario integral ficticio para validación

1. Una comuna solicita 100 kits.
2. El sistema detecta que no existen compromisos previos y propone ONG A=60 y ONG B=40.
3. ONG A confirma y autoriza 60; ONG B rechaza. Permanecen 40 kits sin cobertura.
4. El sistema verifica una ruta disponible; la brigada confirma retiro completo de 60 y se descuenta ese stock una sola vez.
5. La brigada registra llegada de 60 kits; la comunidad encuentra 58 conformes y 2 dañados.
6. La comunidad finaliza con observaciones; se registra discrepancia interna, manifiesto Excel de 60 enviados y acta PDF de 58 conformes y 2 observados.
7. Los 2 dañados no regresan automáticamente al matching; los 40 nunca cubiertos permanecen identificables.
8. Defensa Civil consulta avance y riesgo sin modificar registros; al llegar `EMERGENCIA_FINALIZADA` recibe el informe consolidado final.

**Criterios de rechazo del escenario:** descontar stock al proponer, autorizar automáticamente, retirar sin ruta, contar llegada como conformidad, reactivar dos dañados en matching o mostrar informe final antes del evento.

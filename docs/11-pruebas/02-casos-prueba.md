# Casos de prueba funcionales y de seguridad

## 1. Convenciones

Cada caso incluye identificador, escenario, datos de entrada, acción y resultado esperado. Se ejecutan sobre datos sintéticos sin revelar información de beneficiarios reales. Una implementación no se considera conforme por haber definido sus casos de prueba.

## 2. Matriz principal

| ID | Escenario | Estímulo | Resultado esperado |
|---|---|---|---|
| CP-01 | Autenticación válida | Cuenta activa con credenciales correctas | Sesión y permisos de rol correctos. |
| CP-02 | Rol y entidad ajena | ONG A consulta propuesta de ONG B | Respuesta 403, sin fuga de datos. |
| CP-03 | Solicitud válida | 100 kits y 20 carpas para una comuna | Una solicitud y dos líneas confirmadas. |
| CP-04 | Solicitud inválida | Cantidad negativa o producto duplicado | 422 y detalle de campo, sin persistencia. |
| CP-05 | Propuesta no reserva | Generar matching de 70 kits | Stock físico/comprometido sin cambio. |
| CP-06 | Dos ONG | A aporta 60, B 30, demanda 100 | Máximo 90 comprometibles; 10 sin cobertura. |
| CP-07 | Lote inutilizable | Un lote vencido con unidades físicas | Nunca se propone ese lote. |
| CP-08 | FEFO | Dos lotes utilizables con distinta fecha | Primero el de vencimiento más cercano. |
| CP-09 | Reducción ONG | Propuesta 70, confirmación 50 | Confirma 50; 20 elegibles sin duplicación. |
| CP-10 | Autorizaciones concurrentes | Dos comandos de 80 sobre stock de 100 | Uno como máximo autoriza; sin stock negativo. |
| CP-11 | Retiro sin ruta | `UNKNOWN` o `IMPASSABLE` | No se confirma retiro ni descuenta stock. |
| CP-12 | Retiro completo | Despacho 50, confirmación 50 y ruta válida | Un movimiento `WITHDRAWAL` y despacho `WITHDRAWN`. |
| CP-13 | Retiro parcial | Despacho 50, propuesta de retirar 45 | Comando rechazado; no descuenta. |
| CP-14 | Reintento retiro | Dos peticiones con misma clave | Único descuento físico. |
| CP-15 | Llegada no conformidad | Brigada marca llegada | Estado `ARRIVED`, sin recepción automática. |
| CP-16 | Recepción con daños | Enviados 80, recibidos 80, conformes 75 | Cinco no conformes; cero faltante físico. |
| CP-17 | Recepción con faltantes | Enviados 80, recibidos 77, conformes 75 | Tres faltantes físicos, dos no conformes. |
| CP-18 | Recepción duplicada | Mismo despacho dos veces | Una única recepción y un conjunto documental. |
| CP-19 | Discrepancia final | Cerrar con observaciones | Informe interno; no vuelve al matching automáticamente. |
| CP-20 | Documento final | Recepción finalizada | Un XLSX de enviado y un PDF de recibido. |
| CP-21 | Riesgo/atención separados | Comunidad atendida en zona de alto riesgo | Riesgo permanece intacto. |
| CP-22 | Observación satelital | Nuevo foco de calor observado | No se declara automáticamente emergencia. |
| CP-23 | Informe temprano | Emergencia activa | Informe final no visible. |
| CP-24 | Informe idempotente | Repetir cierre configurado | Un único informe final con mismo corte. |
| CP-25 | Móvil y teclado | 360 × 800, navegación por tabulación | Formularios principales utilizables y errores visibles. |

## 3. Ejemplo detallado: CP-10

- **Precondición:** lote utilizable de 100 kits, dos ONG/propuestas pertinentes en el conjunto de prueba que compiten por la misma existencia conforme a titularidad válida del lote; para mantener consistencia con la propiedad de stock, ambos intentos deben corresponder a la **misma ONG** y su mismo lote.
- **Acción:** enviar dos autorizaciones distintas de 80 simultáneamente.
- **Esperado:** una autorización puede quedar confirmada y la segunda recibe conflicto. Existencia física 100 antes del retiro; compromiso vigente 80; disponible 20.
- **Fallo:** dos autorizaciones de 80, stock disponible negativo o solicitud marcada como entregada antes de retirar.

## 4. Ejemplo detallado: CP-17

- **Precondición:** despacho llegó con 80 unidades de un producto.
- **Acción:** jefe de Comuna informa 77 recibidas físicamente y 75 conformes.
- **Esperado:** `missing=3`, `non_conforming=2`, resultado `WITH_OBSERVATIONS`, discrepancia interna única y documentos con cantidades reales. No se crea nueva solicitud por defecto.

## 5. Pruebas negativas obligatorias

Enviar cuerpos manipulados, UUID ajenos, estados imposibles, cookies inválidas, solicitudes concurrentes e información externa malformada. El servidor debe rechazar de manera coherente y dejar la BD en estado consistente. Un error de red no debe producir confirmación visual sin escritura persistida.

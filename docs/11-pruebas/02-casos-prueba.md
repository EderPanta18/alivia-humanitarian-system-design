# Casos de prueba funcionales y de seguridad

## 1. Convenciones

Los casos de prueba verifican las reglas funcionales, la integridad de los datos y los controles de seguridad de Alivía.

Cada caso identifica un escenario, las condiciones o entradas relevantes y el resultado esperado. Las pruebas utilizan datos sintéticos, sin información de beneficiarios reales.

La definición de estos casos no acredita su ejecución ni demuestra conformidad de la implementación.

## 2. Matriz de casos de prueba

| ID    | Escenario                    | Entrada o acción                                                            | Resultado esperado                                                         |
| ----- | ---------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| CP-01 | Autenticación válida         | Cuenta activa y credenciales correctas.                                     | Sesión válida con rol y permisos correspondientes.                         |
| CP-02 | Acceso a entidad ajena       | ONG A consulta una propuesta de ONG B.                                      | Respuesta `403`, sin exposición de datos.                                  |
| CP-03 | Solicitud válida             | Solicitar 100 kits y 20 carpas.                                             | Una solicitud confirmada con dos líneas.                                   |
| CP-04 | Solicitud inválida           | Cantidad negativa o producto duplicado.                                     | Respuesta `422`, errores por campo y ninguna persistencia.                 |
| CP-05 | Propuesta sin reserva        | Generar matching de 70 kits.                                                | Existencias físicas y compromisos sin cambios.                             |
| CP-06 | Aportes de dos ONG           | ONG A aporta 60 y ONG B 30 para una demanda de 100.                         | Máximo 90 unidades comprometibles y 10 sin cobertura.                      |
| CP-07 | Lote no utilizable           | Lote vencido con existencias físicas.                                       | El lote queda excluido del matching.                                       |
| CP-08 | Selección FEFO               | Dos lotes utilizables con distintos vencimientos.                           | Se prioriza el lote de vencimiento más próximo.                            |
| CP-09 | Reducción de aporte          | Propuesta de 70 unidades; ONG confirma 50.                                  | Se confirman 50 y las 20 restantes siguen elegibles sin duplicación.       |
| CP-10 | Autorizaciones concurrentes  | Dos autorizaciones distintas de 80 sobre un mismo lote con 100 disponibles. | Como máximo una autorización exitosa; disponibilidad nunca negativa.       |
| CP-11 | Retiro sin ruta válida       | Ruta con tramos `UNKNOWN` o `IMPASSABLE`.                                   | Retiro bloqueado, sin descuento físico.                                    |
| CP-12 | Retiro completo              | Despacho de 50, retiro de 50 y ruta vigente.                                | Un movimiento `WITHDRAWAL` y estado `WITHDRAWN`.                           |
| CP-13 | Retiro parcial               | Despacho de 50; intento de retirar 45.                                      | Operación rechazada sin descuento.                                         |
| CP-14 | Reintento de retiro          | Dos solicitudes con la misma clave idempotente.                             | Un único descuento físico.                                                 |
| CP-15 | Llegada sin recepción        | Brigada registra llegada del despacho.                                      | Estado `ARRIVED`, sin recepción automática.                                |
| CP-16 | Recepción con daños          | Enviadas 80, recibidas 80 y conformes 75.                                   | Cinco unidades no conformes y ningún faltante físico.                      |
| CP-17 | Recepción con faltantes      | Enviadas 80, recibidas 77 y conformes 75.                                   | Tres faltantes físicos y dos unidades no conformes.                        |
| CP-18 | Recepción duplicada          | Confirmar dos veces el mismo despacho.                                      | Una recepción y un único conjunto de documentos finales.                   |
| CP-19 | Discrepancia finalizada      | Finalizar recepción con observaciones.                                      | Discrepancia interna registrada sin reactivar automáticamente el matching. |
| CP-20 | Generación documental        | Recepción finalizada.                                                       | Un manifiesto XLSX de cantidades enviadas y un acta PDF de recepción.      |
| CP-21 | Independencia de indicadores | Comunidad atendida en zona de riesgo alto.                                  | El riesgo territorial permanece independiente de la atención.              |
| CP-22 | Observación externa          | Incorporar una detección satelital de calor.                                | No se declara una emergencia automáticamente.                              |
| CP-23 | Informe prematuro            | Consultar informe final con emergencia `ACTIVE`.                            | No existe informe final publicado.                                         |
| CP-24 | Cierre idempotente           | Reprocesar el evento de cierre configurado.                                 | Un único informe final con la misma instantánea.                           |
| CP-25 | Accesibilidad móvil          | Vista de 360 × 800 y navegación por teclado.                                | Formularios principales utilizables y errores perceptibles.                |

## 3. Caso detallado CP-10: autorizaciones concurrentes

**Precondiciones:**

- Una ONG dispone de un lote utilizable con 100 unidades físicas.
- Existen dos propuestas confirmadas de 80 unidades que compiten por el mismo lote.
- Ambas propuestas pertenecen a la ONG propietaria del almacén y cumplen las reglas de titularidad.

**Acción:** ejecutar simultáneamente dos comandos de autorización distintos.

**Resultado esperado:**

- Una autorización puede confirmar el compromiso de 80 unidades.
- La otra recibe un conflicto por disponibilidad insuficiente.
- El inventario físico permanece en 100 unidades hasta el retiro.
- El compromiso vigente es de 80 unidades y la disponibilidad restante de 20.

**Condiciones de fallo:** autorizar ambas propuestas, producir disponibilidad negativa o registrar una entrega antes del retiro y la recepción correspondientes.

## 4. Caso detallado CP-17: recepción con faltantes

**Precondición:** despacho con llegada registrada y 80 unidades enviadas de un producto.

**Acción:** el jefe de Comuna confirma 77 unidades recibidas físicamente, de las cuales 75 son conformes.

**Resultado esperado:**

- `missing_quantity = 3`.
- Cantidad no conforme: `77 - 75 = 2`.
- Resultado de recepción: `WITH_OBSERVATIONS`.
- Una única discrepancia interna asociada a la recepción.
- Manifiesto XLSX y acta PDF con las cantidades correspondientes, generados después de finalizar la recepción.
- Ninguna solicitud nueva ni reactivación automática del matching.

## 5. Pruebas negativas obligatorias

Se deben verificar, como mínimo, las siguientes condiciones:

- **Datos manipulados:** cantidades inválidas, productos duplicados y cuerpos JSON incompatibles.
- **Autorización:** UUID de recursos ajenos, roles incorrectos y cookies inválidas.
- **Estados:** transiciones no permitidas, retiros parciales y recepciones sin llegada previa.
- **Concurrencia:** autorizaciones simultáneas, comandos repetidos y claves idempotentes reutilizadas incorrectamente.
- **Integraciones:** observaciones externas malformadas, fuentes no verificadas y datos geográficos inválidos.
- **Conectividad:** fallos de red sin confirmación visual indebida de operaciones no persistidas.

El servidor debe rechazar las operaciones inválidas y conservar la consistencia de los datos.

Una operación sin confirmación del servidor no debe presentarse al usuario como completada.

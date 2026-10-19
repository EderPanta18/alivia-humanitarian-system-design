# Especificación funcional de interfaces principales

## 1. Alcance y criterios de diseño

Las interfaces principales representan las tareas de los seis macroprocesos de Alivía. No se requiere una pantalla independiente para cada operación interna: el matching automático se refleja en las propuestas de ONG y en las consultas de cobertura.

Esta especificación define controles, interacciones, validaciones y estados, sin imponer URLs, herramientas de diseño ni distribuciones visuales rígidas.

Los diseños externos se clasifican como:

- `REFERENCIA`: propuesta visual pendiente de evaluación.
- `ADAPTADO`: diseño ajustado a los requisitos de Alivía.
- `ACEPTADO`: diseño que cubre entradas, acciones, restricciones, resultados y estados de su identificador `UI-...`.

Un cambio de ruta o tecnología visual no invalida por sí solo un diseño aceptado.

## 2. UI-COM-01: registrar solicitud

**Contexto:** usuario activo con rol `comuna`, vinculado a una comunidad.

- **Información visible:** comunidad de solo lectura, emergencia activa y fecha local informativa.
- **Entradas:** población afectada entera no negativa, descripción obligatoria de la situación y líneas con producto del catálogo, unidad fija y cantidad positiva.
- **Interacciones:** agregar o eliminar líneas, revisar y confirmar la solicitud.
- **Validaciones:** impedir productos duplicados y mostrar errores específicos por campo.
- **Estados:** vacío, edición, error de validación, envío, confirmación con identificador y error de red sin confirmación.

Una solicitud confirmada no puede editarse ni cancelarse desde la interfaz de Comuna.

## 3. UI-ONG-02 y UI-ONG-03: propuestas y autorizaciones

**Contexto:** propuesta perteneciente a la ONG autenticada.

- **Información visible:** comunidad destinataria, justificación, productos, cantidades propuestas, lotes, disponibilidad y prioridad explicable.
- **Confirmación:** aceptar cantidades iguales o inferiores a las propuestas, individualmente por línea.
- **Rechazo:** registrar un motivo obligatorio cuando no se acepta ningún aporte.
- **Autorización:** acción independiente y posterior a la confirmación, con advertencia previa y revalidación de existencias y cobertura.
- **Estados:** propuesta nueva, en revisión, confirmada, autorizada, rechazada o en conflicto.

La confirmación no reserva existencias ni produce descuentos físicos. Un conflicto de autorización debe mostrarse explícitamente y no puede presentarse como salida autorizada.

El estado de retiro solo aparece después de la confirmación correspondiente por la brigada.

## 4. UI-BRI-01 y UI-BRI-02: despacho y traslado

**Contexto:** despacho autorizado y asignado a la brigada autenticada.

- **Información visible:** almacén de origen, comunidad destinataria, productos, cantidades autorizadas, mapa de ruta, fecha de verificación y estados viales reportados.
- **Interacciones:** consultar o revalidar la ruta, confirmar retiro completo y registrar llegada.
- **Validaciones:** exigir ruta `AVAILABLE` vigente y coincidencia total con las cantidades autorizadas antes del retiro.
- **Restricciones:** no permitir modificaciones de cantidades ni retiros parciales.
- **Estados de ruta:** disponible, no disponible o vencida.
- **Estados de despacho:** autorizado, retirado y llegado.

Si la ruta no está verificada y vigente, la confirmación del retiro permanece deshabilitada.

El mapa representa recorridos calculados y condiciones conocidas, no seguimiento GPS en tiempo real.

## 5. UI-COM-03: confirmar recepción

**Contexto:** despacho con llegada registrada a la comunidad del usuario.

- **Información visible:** productos enviados, unidades y cantidades por línea.
- **Entradas:** cantidad recibida físicamente, cantidad conforme y observaciones.
- **Validaciones:** `0 <= conforme <= recibida <= enviada`. El servidor calcula el faltante físico.
- **Interacciones:** confirmar recepción conforme o finalizar con observaciones.
- **Resultado:** recepción finalizada y generación posterior del manifiesto XLSX y el acta PDF.

Los productos dañados cuentan como recibidos físicamente, pero no como conformes. Las discrepancias no impiden finalizar la recepción ni requieren resolución previa.

El reporte interno de discrepancias no genera un PDF independiente.

## 6. UI-DC-01, UI-DC-02 y UI-DC-03: supervisión

Las interfaces de Defensa Civil son exclusivamente de consulta.

| Vista                           | Información y comportamiento                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UI-DC-01` — Mapa territorial   | Riesgos por desastre, fuente y fecha; filtros, leyenda, severidad, antigüedad e incertidumbre de los datos.                                                   |
| `UI-DC-02` — Brechas y entregas | Solicitudes, cantidades autorizadas, trasladadas y conformes, junto con brechas de atención. La cobertura se representa separadamente del riesgo territorial. |
| `UI-DC-03` — Informe final      | Instantánea consolidada con fecha de corte y observaciones, disponible únicamente después del evento de cierre preconfigurado.                                |

Estas vistas no permiten modificar operaciones, cerrar emergencias ni consultar inventarios privados de ONG. Los colores de riesgo territorial no deben reutilizarse como indicadores de atención humanitaria.

## 7. Accesibilidad y diseño adaptable

Todas las interfaces deben cumplir las siguientes condiciones:

- Controles con etiquetas visibles y errores asociados a los campos correspondientes.
- Estados y mensajes comprensibles sin depender exclusivamente del color.
- Navegación mediante teclado, foco perceptible y contraste adecuado.
- Áreas de interacción táctil utilizables.
- Diseño funcional desde 360 px de ancho.
- Tablas extensas con representación compacta legible, sin ocultar cantidades críticas.

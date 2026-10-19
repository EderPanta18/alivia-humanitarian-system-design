# Especificación funcional de interfaces principales

## 1. Criterio de cobertura visual

Se priorizan pantallas de tareas representativas de los seis macroprocesos. No se requiere un mockup individual para cada operación técnica: el matching automático se observa desde la propuesta dirigida a ONG y la información agregada de cobertura. Los diseños visuales son recursos editables externos; este documento establece controles y comportamiento, no PNG, Figma, URLs ni posiciones rígidas.

## 2. UI-COM-01: registrar solicitud

- **Contexto:** cuenta de jefe de Comuna activa y asociada a una comunidad.
- **Cabecera:** comunidad (solo lectura), emergencia activa y fecha local informativa.
- **Entradas:** población afectada entera no negativa; situación obligatoria; lista con producto de catálogo, unidad fija y cantidad positiva por línea.
- **Interacciones:** agregar/eliminar línea antes de confirmar, revisar y enviar. Evitar duplicar producto en varias líneas.
- **Estados:** vacío, edición, error por campo, enviando, confirmado con ID, error de red sin confirmación.
- **Criterio:** ninguna solicitud confirmada queda editable o cancelable desde esta pantalla.

## 3. UI-ONG-02 y UI-ONG-03: propuesta y autorización

- **Contexto:** propuesta perteneciente a la ONG autenticada.
- **Visualizar:** comunidad, justificación, productos, cantidad propuesta, lotes y disponibilidad, prioridad explicable.
- **Acciones:** confirmar mismo o menor aporte por línea; rechazar con motivo si ninguna línea aportada; autorizar posteriormente en un paso distinto.
- **Confirmación:** advertencia antes de autorizar salida; el sistema revalida stock/cobertura y puede devolver conflicto.
- **Estados:** propuesta nueva, revisión, confirmada, autorizada, rechazada o conflicto; no mostrar «retirada» antes de acción de brigada.

## 4. UI-BRI-01 y UI-BRI-02: traslado

- **Contexto:** despacho autorizado de la brigada.
- **Visualizar:** almacén, comunidad, productos, cantidades, mapa con ruta, fecha de comprobación y tramos con estado reportado.
- **Acciones:** consultar/revalidar ruta; verificar retiro completo; registrar llegada.
- **Bloqueos:** sin ruta `AVAILABLE` vigente no aparece confirmación habilitada de retiro; tampoco se permite editar cantidades o confirmar retiro parcial.
- **Estados:** ruta disponible, no disponible o vencida; despacho autorizado, retirado, llegado. La ubicación indicada no pretende ser GPS en vivo.

## 5. UI-COM-03: recepción

- **Contexto:** despacho llegado a la comunidad de la cuenta.
- **Visualizar:** lista enviada y cantidades por producto/unidad; campos recibida físicamente, conforme y observaciones.
- **Validaciones:** `0 <= conforme <= recibida <= enviada`; faltante físico calculado por servidor. Registrar daño como no conforme, no como faltante físico.
- **Acciones:** confirmar todo conforme o finalizar con observaciones; no existe estado que requiera resolver discrepancias antes de terminar recepción.
- **Resultado:** manifiesto XLSX y acta PDF generados como documentos posteriores; reportes internos de discrepancia no tienen PDF propio.

## 6. UI-DC-01, UI-DC-02 y UI-DC-03: supervisión

- **Mapa de riesgo:** filtro por desastre/fuente/fecha, severidad territorial, leyenda, marca de antigüedad e incertidumbre.
- **Atención humanitaria:** vista separada de solicitudes, autorizado, trasladado, conforme y brechas. No trasladar colores de riesgo a estados de atención.
- **Informe final:** disponible solo tras evento preconfigurado de cierre; solo lectura, con fecha de corte y observaciones. No incluir existencias privadas de ONG.

## 7. Accesibilidad y responsive

Los controles tendrán etiquetas visibles, errores ligados a campo, mensajes no basados solo en colores, foco por teclado, contraste adecuado, tamaños táctiles útiles y navegación funcional desde 360 px. Las tablas extensas deben contar con representación compacta legible sin ocultar cantidades críticas.

## 8. Reutilización de diseños

Todo diseño externo se clasifica como `REFERENCIA`, `ADAPTADO` o `ACEPTADO`. Se acepta cuando cubre entradas, acciones, restricciones, resultados y estados de su identificador UI; un cambio de ruta o framework visual por sí solo no invalida un diseño previamente aceptado.

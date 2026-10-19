# Visualización cartográfica y semántica territorial

## 1. Objetivo

Mostrar posición de comunidades, evaluaciones de riesgo y recorrido logístico sin confundir información territorial externa con confirmaciones humanas de recepción. La cartografía es una herramienta de consulta y apoyo; no reemplaza comprobaciones operativas de brigada.

## 2. Capas independientes

| Capa | Datos | Visualización y leyenda |
|---|---|---|
| Ubicaciones | Comunidades y almacenes con coordenadas válidas | Marcadores identificables por tipo; coordenadas no confirmadas no se inventan. |
| Riesgo | Fenómeno, severidad, fuente, fecha, certeza | Escala por tipo de desastre, texto y color del catálogo. |
| Atención | Solicitudes, aportes, en tránsito, recibidas conformes | Indicadores de etapa y brecha; leyenda propia no mezclada con riesgo. |
| Vías | Segmentos y estado de tránsito conocido | `PASSABLE`, `IMPASSABLE`, `UNKNOWN`; mostrar fuente y actualización. |
| Ruta | Recorrido desde almacén a comunidad | Polilínea y vigencia; rutas rechazadas no se presentan como disponibles. |

## 3. Comportamiento cartográfico

- Zona inicial: región Piura; el mapa puede acotar la navegación a sus límites visuales, sin alterar los datos de coordenadas.
- Toda zona seleccionada ofrece nombre, tipo, distrito/UBIGEO si existe, fecha de dato y fuente. No exponer información personal privada.
- Un mapa con evaluaciones de distintos fenómenos permite filtrar fenómenos, no promedia automáticamente su severidad.
- Una comunidad que recibió ayuda puede seguir marcada con riesgo alto por inundación; el estado de entrega aparece separado.
- Si no hay coordenadas verificables se muestra «Ubicación no disponible» en lista textual; no fijar marcador aproximado como certeza.
- La brigada ve si la ruta está actualizada y la última verificación; el botón de retiro se desactiva cuando no existe una ruta elegible.

## 4. Tecnología de visualización

Leaflet se usa como biblioteca de mapas sobre la interfaz React mediante integración compatible con Next.js. OpenStreetMap aporta datos base, con proveedor de teselas adecuado para el tipo de uso y cumplimiento de licencia. El cálculo externo de recorridos puede servirse desde openrouteservice con adaptador desacoplado; la geografía y los bloqueos no se codifican manualmente como datos reales.

## 5. Calidad y limitaciones explícitas

- Estado vial externo puede llegar con retraso: se muestra fecha de fuente.
- Un trayecto calculado no garantiza apertura física ni seguridad de transporte.
- Mapas solo muestran información autorizada para el rol.
- La vista debe seguir siendo usable en móvil mediante panel de detalles alternativo y controles accesibles por teclado cuando sea practicable.
- El mapa no constituye rastreo GPS de personas o vehículos.

## 6. Criterios de aceptación

1. Cambiar la capa de riesgo no modifica la cobertura humanitaria almacenada.
2. Un tramo `UNKNOWN` no se representa con el estilo de «transitable».
3. Un despacho sin ruta vigente no habilita confirmación de retiro.
4. Seleccionar un marcador muestra origen y fecha del dato.
5. El mismo significado se expresa con texto/leyenda además del color.

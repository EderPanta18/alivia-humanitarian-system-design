# Visualización cartográfica y semántica territorial

## 1. Objetivo

Alivía utiliza mapas para visualizar comunidades, riesgos territoriales y recorridos logísticos, manteniendo diferenciadas las evaluaciones externas y las confirmaciones operativas.

La cartografía sirve como herramienta de consulta y apoyo, sin sustituir las verificaciones realizadas por la brigada.

## 2. Capas cartográficas

| Capa        | Información                                                       | Representación                                                                                           |
| ----------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Ubicaciones | Comunidades y almacenes con coordenadas verificables.             | Marcadores diferenciados por tipo, sin inventar posiciones.                                              |
| Riesgo      | Fenómeno, severidad, fuente, fecha y certeza.                     | Escala y colores del catálogo por tipo de desastre, acompañados de etiquetas textuales.                  |
| Atención    | Solicitudes, aportes, traslados, recepciones conformes y brechas. | Indicadores de cobertura y etapa, con leyenda independiente del riesgo.                                  |
| Vías        | Segmentos y estados `PASSABLE`, `IMPASSABLE` o `UNKNOWN`.         | Representación diferenciada por estado, fuente y fecha de actualización.                                 |
| Ruta        | Recorrido entre almacén y comunidad.                              | Polilínea, estado y vigencia de verificación; las rutas no disponibles no se presentan como utilizables. |

## 3. Comportamiento e interacción

- **Ámbito inicial:** región Piura, con posibilidad de limitar la navegación visual sin modificar las coordenadas almacenadas.
- **Selección de ubicaciones:** mostrar nombre, tipo, distrito o UBIGEO cuando corresponda, fuente y fecha de los datos.
- **Riesgo territorial:** permitir filtros por fenómeno, sin promediar niveles de severidad de desastres diferentes.
- **Atención humanitaria:** representar la cobertura independientemente del riesgo. Una comunidad puede conservar riesgo alto aunque haya recibido ayuda.
- **Coordenadas ausentes:** mostrar «Ubicación no disponible» en una lista textual, sin generar marcadores aproximados como si fueran verificados.
- **Rutas logísticas:** presentar estado y última verificación. El retiro permanece deshabilitado cuando no existe una ruta `AVAILABLE` vigente.
- **Control de acceso:** mostrar únicamente la información autorizada para cada rol.

## 4. Tecnología y limitaciones

La visualización utiliza **Leaflet** integrado con React y Next.js. OpenStreetMap proporciona datos cartográficos de base mediante un servicio de teselas adecuado, respetando las condiciones de uso y licencia correspondientes.

El cálculo de recorridos puede realizarse mediante un adaptador desacoplado de **openrouteservice**. Las coordenadas y restricciones viales deben provenir de datos verificables, no de valores codificados como si fueran información real.

Se aplican las siguientes limitaciones:

- Los estados viales pueden presentar retrasos; debe mostrarse la fecha de la información.
- Una ruta calculada no garantiza transitabilidad física ni seguridad del traslado.
- El mapa no realiza seguimiento GPS de personas o vehículos.
- La interfaz debe ser utilizable en dispositivos móviles, con panel alternativo de detalles y controles accesibles mediante teclado cuando sea practicable.

## 5. Criterios de aceptación

1. Cambiar o filtrar las capas de riesgo no modifica la cobertura humanitaria almacenada.
2. Los tramos `UNKNOWN` no se representan como transitables.
3. Un despacho sin ruta verificada y vigente no permite confirmar el retiro.
4. Seleccionar un marcador muestra la fuente y fecha de sus datos.
5. Los estados se comunican mediante texto o leyendas, sin depender exclusivamente del color.

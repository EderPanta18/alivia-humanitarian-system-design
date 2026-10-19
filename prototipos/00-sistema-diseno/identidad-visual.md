# Identidad visual

## Dirección y referencia

La revisión T01 adopta el sidebar claro, acentos cyan, superficies azul muy pálido, tablas densas y acciones alineadas de las once imágenes de ONG proporcionadas. Conserva el perfil inferior y la navegación conceptual de Alivía. La referencia gráfica no determina permisos, reservas, estados ni transiciones. Esta actualización sustituye el sidebar oscuro elegido en T00 y se aplica a las diez interfaces mediante una sola fuente compartida.

## Tokens cromáticos

| Token | Valor | Uso |
|---|---|---|
| brand-900 | #123D4B | Marca y texto de énfasis. |
| brand-700 | #007F99 | Acción primaria, enlaces y selección. |
| brand-100 | #E4F5FA | Fondo suave de marca. |
| ink-900 | #183B4A | Texto principal. |
| ink-700 | #4B6673 | Texto secundario. |
| ink-500 | #536B77 | Metadatos y ayudas. |
| canvas | #F2F7F9 | Fondo de aplicación. |
| surface | #FFFFFF | Sidebar, topbar y paneles. |
| line | #D6E3E9 | Divisores y bordes. |
| success-700 / 100 | #126C4E / #E9F7F0 | Conformidad o operación completada. |
| warning-800 / 100 | #8B590B / #FFF5DC | Incertidumbre, pendientes y restricciones. |
| danger-700 / 100 | #B83E48 / #FFF0F1 | Conflicto, bloqueo o error. |
| info-700 / 100 | #006C83 / #E5F6FC | Información operativa. |
| focus | #005F79 | Foco de teclado. |

El blanco sobre brand-700 alcanza aproximadamente 4,67:1. Los metadatos ink-500 superan 4,5:1 sobre blanco y el lienzo. Los estados mantienen texto explícito; el riesgo territorial usa etiquetas por fenómeno y no se deduce del color de atención.

## Tipografía

Fuente local Segoe UI, con Arial y sans-serif de respaldo: conserva el carácter de herramienta operativa y mejora la lectura de controles, cantidades y textos extensos en Windows. Cuerpo base 14 px con interlineado 1,5. Título principal 28 px/700; sección 17 px/650; controles y tablas 13 px; ayudas y metadatos 11 px, con 10 px solo en referencias secundarias. Las cifras métricas usan 31 px y numerales tabulares. No se descargan fuentes externas.

## Espaciado y layout

Escala reutilizable de 4, 8, 12, 16, 20, 24, 32, 40 y 48 px. Sidebar de 240 px, topbar de 68 px, contenido máximo de 1700 px con margen lateral de 32 px. El margen superior de escritorio es 20 px; los paneles usan 17–19 px y separación de 16–18 px. Las capturas emplean viewport de 1600 × 1000 con escala de dispositivo 1.

El Sidebar contiene marca arriba, Panel primero, opciones del rol y perfil al pie. T03 muestra Panel con icono, tipografía y color normal, sin subtítulo ni tratamiento de ausencia de implementación. Sigue siendo conceptual, sin enlace, foco ni otro destino dentro del alcance actual. MK-01 y MK-06 conservan su responsabilidad de Solicitudes y Despachos. La opción operativa activa usa fondo #DFF2F7, texto #006D83 y una barra lateral que indica ubicación. La Topbar muestra territorio, rol, fecha y campana fija en el mismo lugar. El encabezado contextual tiene breadcrumb, entidad, título, descripción y acción principal. No hay selector de rol dentro del producto.

Hasta 1150 px se reduce el sidebar a 210 px. Por debajo de 900 px se convierte en navegación superpuesta y las columnas principales se apilan. Hasta 600 px los controles se reorganizan; el contenido esencial funciona desde 360 px. Las tablas extensas desplazan su propio contenedor, sin provocar overflow del documento.

## Forma y componentes

Radio de panel 8 px, control 5 px y estado 4 px: distingue superficies, entradas y etiquetas. Borde de 1 px line y paneles sin sombra; la elevación se reserva para notificaciones, diálogos y herramientas sobre el mapa. Los botones primarios cyan tienen texto blanco; secundarios blancos con borde; acciones auxiliares sin fondo. Hover, foco de 3 px, estado ocupado y deshabilitado son distintos. Las acciones irreversibles requieren un diálogo que identifica producto, cantidad y efecto.

Iconografía SVG lineal de 19 px, trazo 1,8 px, extremos redondeados. Se conserva el vocabulario de caja, portapapeles, escudo, camión, mapa y documento para reconocer las responsabilidades entre roles. Panel usa cuatro celdas, sin atribuirle operaciones. Los controles auxiliares usan 14–16 px. Cada icono aislado tiene nombre accesible; los decorativos se ocultan a lectores. No se utilizan emojis.

## Decisiones de refinamiento T02

Lectura de diseño: herramienta operativa de coordinación humanitaria para Comuna, ONG, Brigada y Defensa Civil; ENERGY 2 / RHYTHM 2 / MOTION 1. La referencia estética continúa siendo el ZIP de ONG y la identidad de Alivía.

| Decisión | Propósito |
|---|---|
| Cyan concentrado en acción, ubicación y selección | Identificar la decisión y la posición actual; los colores de estado conservan significado operativo. |
| Métricas en una banda dividida | Comparar cifras relacionadas sin repetir cuatro tarjetas e iconos con fondo. |
| Encabezados y tablas con caja normal | Mejorar la lectura y separar título, instrucción, dato y metadato por tamaño y peso. |
| Filtros unidos a la tabla y acciones al borde de la tarea | Mantener cerca el criterio de búsqueda, su resultado y la operación correspondiente. |
| Secciones de formulario y resumen lateral | Ordenar la captura y permitir revisar productos y cantidades antes de confirmar. |
| Justificaciones abiertas, sin tarjetas anidadas | Dar peso a cantidades y decisión; conservar la explicación del matching como apoyo. |
| Cronología con conector y pasos numerados existentes | Relacionar eventos sin confundirlos con métricas ni inventar estados completados. |
| Mapa plano sin cuadrícula decorativa | Priorizar relaciones, marcadores, restricciones y fuentes; no sugerir escala geográfica. |
| Etiquetas mayores y alineadas hacia el interior en móvil | Evitar recortes y separar nombres de comunidad y controles de zoom. |
| Pestañas subrayadas y notificaciones con lectura explícita | Mostrar selección y avisos pendientes sin convertir cada control en una cápsula. |
| Transiciones de color de 140 ms y apertura del menú | Dar respuesta a interacción; sin animación perpetua y con reducción de movimiento. |
| Tema claro fijo | Conservar identidad y referencia aprobadas; T02 no amplía funciones con otro tema. |

El foco principal cambia con la tarea: solicitud y formulario en MK-01/02, lotes en MK-03, cantidades y decisión en MK-04/05, despacho y ruta en MK-06/07, verificación física en MK-08, mapa y detalle en MK-09 y comparación por producto en MK-10. El ritmo varía con estos contenidos y conserva el mismo marco visual.

## Accesibilidad

Objetivo WCAG AA: contraste de texto normal al menos 4,5:1, estados por texto además de color, foco visible, etiquetas programáticas, cantidades con unidad y mensajes de error específicos. Diálogos nativos contienen el foco y Escape cierra el elemento superior. Los mapas ofrecen selección por teclado y detalle textual equivalente. Se respeta reducción de movimiento. No se afirma una auditoría completa de accesibilidad automática.

## Cartografía

La representación vigente es un esquema SVG por sectores sin escala. Sus posiciones son píxeles de composición, no coordenadas ni una delimitación geográfica de Piura. No se usan teselas, calles reales ni atribuciones cartográficas sin fuente. La capa de riesgo muestra inundación, nivel, fuente y fecha; la capa de atención muestra cantidades por producto y mantiene su propia leyenda. Una comunidad sin solicitud no recibe un porcentaje de atención inferido.

El esquema logístico muestra almacén, destino y tramos R-1/R-2. Cada tramo conserva estado PASSABLE, UNKNOWN o IMPASSABLE; la ruta requiere AVAILABLE y una verificación menor a treinta minutos. El color y el estilo de línea distinguen restricciones. No se representan GPS, vehículos, distancias calculadas ni transitabilidad garantizada.

## Realismo de las interfaces

Las vistas operativas no muestran etiquetas de desarrollo ni notas dirigidas al evaluador. El carácter sintético de registros, evaluaciones y recorridos se declara en documentación y código. T03 conserva fuente, fecha e incertidumbre territorial con la redacción «Por verificar». «Sin evaluación» y «Sin solicitudes registradas» describen ausencia de datos del dominio, no funciones sin construir. No se inventan comunicados o códigos oficiales.

## Decisiones de composición T03

Se mantienen la identidad, ENERGY 2 / RHYTHM 2 / MOTION 1 y el tema claro. El refinamiento cambia la organización de información, conservando los diez cortes y las cinco variantes.

| Decisión | Propósito |
|---|---|
| Panel sin leyenda, atenuación o separador especial | Integrar la entrada conceptual en la estructura visual sin crear una acción ficticia. |
| Contexto territorial en línea secundaria | Reservar la mayor superficie visual a solicitud, inventario, decisión, traslado o recepción. |
| Solicitud antes del seguimiento en Comuna | Dar prioridad a la acción del actor; las cifras de seguimiento quedan como información de apoyo. |
| Comunidad y situación en una ficha | Evitar cajas apiladas que fragmentan el contexto del mismo destino. |
| Mapa de 430 px y ficha territorial única | Relacionar selección, evidencia, atención y observación sin dispersar el registro entre paneles. |
| Riesgo limitado al fenómeno seleccionado | Evitar una atribución visual falsa de evaluaciones de inundación a lluvias. |
| Dos balances del informe, con cantidades por etapa | Leer agua y abrigo en sus unidades, comparando autorizado, enviado y recibido sin ocho barras largas. |
| Microindicadores de 112 px como máximo | Complementar cifras explícitas de conformidad, sin competir con ellas ni ocupar el ancho del panel. |
| Discrepancias y cierre a la derecha | Separar el resultado cuantitativo de la causa de la diferencia y del estado final de las recepciones. |
| Cronología en dos columnas de cuatro eventos | Contener su altura y conservar orden temporal por columna; una columna en móvil. |
| Redacción operativa breve | Explicar requisitos y resultados de cada acción, sin exponer mecanismos del prototipo. |

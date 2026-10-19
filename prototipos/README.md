# Prototipos funcionales de Alivía

## Propósito y entrada

Diez interfaces de alta fidelidad que recorren la coordinación de ayuda ante lluvias intensas asociadas a El Niño en Piura. Los datos, personas y operaciones son ficticios y están documentados en las fuentes; no se atribuyen comunicados a instituciones reales.

Abrir [el catálogo](index.html). Para conservar la navegación compartida entre páginas, servir esta carpeta por HTTP local:

```powershell
python -m http.server 8080 --directory prototipos
```

Después abrir `http://localhost:8080/`. También se pueden abrir los HTML individualmente como archivos locales; la continuidad de localStorage entre archivos depende del navegador. No hay compilación, API ni dependencia de internet.

## Inventario principal

| ID | Pantalla | Actor | HTML | PNG | Markdown |
|---|---|---|---|---|---|
| MK-01 | Panel de solicitudes y atención | Comuna | [Abrir](01-solicitud/MK-01-panel-comuna.html) | [1600 × 1000](01-solicitud/MK-01-panel-comuna.png) | [Contrato](01-solicitud/MK-01-panel-comuna.md) |
| MK-02 | Registro de solicitud | Comuna | [Abrir](01-solicitud/MK-02-registro-solicitud.html) | [1600 × 1000](01-solicitud/MK-02-registro-solicitud.png) | [Contrato](01-solicitud/MK-02-registro-solicitud.md) |
| MK-03 | Centro operativo de ONG | ONG | [Abrir](02-matching/MK-03-centro-ong.html) | [1600 × 1000](02-matching/MK-03-centro-ong.png) | [Contrato](02-matching/MK-03-centro-ong.md) |
| MK-04 | Evaluación de propuesta | ONG | [Abrir](02-matching/MK-04-propuesta.html) | [1600 × 1000](02-matching/MK-04-propuesta.png) | [Contrato](02-matching/MK-04-propuesta.md) |
| MK-05 | Autorización de salida | ONG | [Abrir](03-autorizacion/MK-05-autorizacion.html) | [1600 × 1000](03-autorizacion/MK-05-autorizacion.png) | [Contrato](03-autorizacion/MK-05-autorizacion.md) |
| MK-06 | Panel de despachos | Brigada | [Abrir](04-traslado/MK-06-panel-brigada.html) | [1600 × 1000](04-traslado/MK-06-panel-brigada.png) | [Contrato](04-traslado/MK-06-panel-brigada.md) |
| MK-07 | Ruta, retiro y llegada | Brigada | [Abrir](04-traslado/MK-07-ruta-traslado.html) | [1600 × 1000](04-traslado/MK-07-ruta-traslado.png) | [Contrato](04-traslado/MK-07-ruta-traslado.md) |
| MK-08 | Recepción y documentos | Comuna | [Abrir](05-recepcion/MK-08-recepcion.html) | [1600 × 1000](05-recepcion/MK-08-recepcion.png) | [Contrato](05-recepcion/MK-08-recepcion.md) |
| MK-09 | Mapa territorial | Defensa Civil | [Abrir](06-supervision/MK-09-mapa-territorial.html) | [1600 × 1000](06-supervision/MK-09-mapa-territorial.png) | [Contrato](06-supervision/MK-09-mapa-territorial.md) |
| MK-10 | Informe final | Defensa Civil | [Abrir](06-supervision/MK-10-informe-final.html) | [1600 × 1000](06-supervision/MK-10-informe-final.png) | [Contrato](06-supervision/MK-10-informe-final.md) |

## Cinco variantes capturadas

| Pantalla | Estado | Captura y reproducción |
|---|---|---|
| MK-04 | Propuesta invalidada para confirmar | [PNG](02-matching/MK-04-propuesta-variante.png). Actualizar disponibilidad o `estado=invalidada`. |
| MK-05 | Autorización bloqueada | [PNG](03-autorizacion/MK-05-autorizacion-variante.png). Revalidar disponibilidad o `estado=bloqueada`. |
| MK-07 | Ruta no disponible | [PNG](04-traslado/MK-07-ruta-traslado-variante.png). Actualizar información vial o `estado=sin-ruta`. |
| MK-08 | Recepción con discrepancias | [PNG](05-recepcion/MK-08-recepcion-variante.png). Agua 68 recibidos/68 conformes; frazadas 40/38; observaciones obligatorias. También `estado=discrepancias`. |
| MK-09 | Observación sin evaluación validada | [PNG](06-supervision/MK-09-mapa-territorial-variante.png). Elegir Ribera Norte y capa Observaciones o `estado=sin-evaluacion`. |

Los parámetros se añaden a la URL del HTML correspondiente. Las capturas se obtuvieron mediante las interacciones, sin sustituir la interfaz por imágenes independientes. También se comprueba el informe no publicado con `estado=pendiente`.

## Reutilización e interacciones

[La base compartida](00-sistema-diseno/README.md) contiene tokens, datos, componentes, navegación y renderer único. Los HTML declaran su ID y reutilizan el mismo Sidebar, Topbar, perfil, centro de notificaciones, modales, tablas, campos, botones y esquemas SVG.

- Comuna registra, revisa y confirma una solicitud; consulta cantidades y verifica recepción. Los productos se agregan y retiran; los resúmenes y diferencias se recalculan.
- ONG busca y filtra lotes, registra ingresos y ajustes justificados, reduce o rechaza propuestas y autoriza aportes en un paso independiente.
- Brigada consulta sus despachos, inspecciona la red de acceso, verifica la carga, confirma retiro completo y registra llegada sin asumir recepción.
- Defensa Civil selecciona comunidades, cambia capas, consulta riesgo y atención por separado y accede al informe publicado en lectura.
- La campana mantiene posición y comportamiento entre roles. Permite filtrar, abrir detalle y marcar lectura; los registros se limitan a su ámbito y corte.
- El manifiesto XLSX y el acta PDF se generan desde la recepción final y son descargas reales. La generación usa bibliotecas incluidas y conserva un archivo por tipo en la sesión.

La entrada directa reinicia el momento preconfigurado de una pantalla. Los enlaces internos usan `continuar=1`, preservan la memoria/localStorage y bloquean pasos sin precondiciones. No hay un selector de identidad en el producto. El catálogo exterior permite abrir los cortes de cada rol.

## Referencia gráfica y decisiones

Se inspeccionaron las once imágenes del ZIP de ONG, sin modificarlo. Se adoptaron su sidebar blanco, acentos cyan, fondos claros, densidad de tablas, acciones alineadas y tarjetas con borde suave. El flujo, las opciones permitidas, el compromiso de stock y las transiciones se derivaron de las especificaciones de Alivía.

T01 actualiza el sidebar oscuro de T00 en la fuente común y autoriza avisos territoriales contextuales a cada rol según su entidad/destino. Conserva la consulta territorial global de Defensa Civil. Corrige la recepción del segundo despacho a CONFORMING, coherente con sus cantidades completas. La invalidación es una condición de vigencia de interfaz, sin añadir un estado persistido INVALIDATED al dominio.

## Escenario y cantidades

Una solicitud de Las Palmeras requiere 120 bidones de agua y 80 frazadas para 180 personas. Puente Verde propone y autoriza 70/40; Manos del Norte 50/40. El matching y la confirmación no comprometen recursos. La autorización compromete cantidades sin disminuir físico; el retiro completo lo descuenta una sola vez.

La rama canónica final registra 118 bidones recibidos y conformes, con dos faltantes físicos; 80 frazadas recibidas, 78 conformes y dos dañadas. La primera recepción tiene observaciones y la segunda es conforme. Las discrepancias no regresan automáticamente al matching. El informe se publica después del evento preconfigurado del 20 de octubre, con una instantánea inmutable.

## Cartografía y fuentes

Los mapas son esquemas interactivos de sectores y relaciones logísticas, sin escala. No se inventan coordenadas geográficas, distancias, calles reales ni recorridos calculados por proveedores. Los tramos internos conservan estado y fecha, y UNKNOWN bloquea el retiro por regla logística. El esquema ofrece zoom, selección por teclado, leyenda y detalle textual.

Las observaciones conservan origen interno, fecha y estado pendiente de verificación. No hay boletines oficiales o alertas institucionales fabricados ni conexiones activas con SENAMHI, IGP o FIRMS. El riesgo, las observaciones y la atención se muestran en capas diferentes y no se modifican entre sí.

## Verificación ejecutada

Se ejecutó [verificar.cjs](00-sistema-diseno/verificar.cjs) con Playwright y Edge/Chromium headless, sin instalar paquetes ni navegadores. La prueba levanta y cierra un servidor local temporal, ejecuta las acciones y produce las capturas de la implementación.

- Diez PNG principales y cinco variantes, todos exactamente de 1600 × 1000, escala 1. El contenido de cada captura queda dentro del viewport; se inspeccionaron las quince imágenes.
- Sintaxis de las dos fuentes JavaScript, IDs únicos, ausencia de errores de consola y de etiquetas de desarrollo visibles.
- Solicitud inválida/válida e inmutable; filtros; ingreso y ajuste; reducción, rechazo motivado e invalidación; compromiso sin descuento; bloqueo por stock; retiro único, vigencia de ruta y llegada independiente.
- Límites de recepción, cálculo de faltantes/no conformes, observaciones obligatorias y habilitación posterior de documentos.
- XLSX abierto con openpyxl: 70/40 enviados. PDF leído con pypdf: 68 bidones recibidos y 38 frazadas conformes en la primera entrega.
- Selección territorial, cambios de capas y zoom, estado sin evaluación, avisos, filtros, diálogos y pestañas del informe. Informe no disponible antes de publicación.
- Las diez pantallas y las cinco variantes a 360 × 800 sin overflow de página; menú con recorrido de foco y cierre por Escape, notificaciones y diálogos en los diez cortes.
- Contraste medido: blanco sobre acción primaria aproximadamente 4,67:1. Los metadatos superan 4,5:1 sobre blanco y lienzo.

Resultado: PASS en el recorrido automatizado y en el inventario técnico. No representa certificación de accesibilidad, pruebas de Firefox/Android, autenticación real, concurrencia de servidor, integración externa ni despliegue productivo.

## Entrega de refinamiento T03

Los mismos diez HTML y cinco variantes conservan sus rutas, datos, cantidades y procesos. Los quince PNG se regeneran desde ellos a 1600 × 1000. No se crean archivos ni páginas de Panel. El carácter sintético permanece en código y documentación; no se anuncia en las pantallas.

**Sidebar:** Panel aparece primero para Comuna, ONG, Brigada y Defensa Civil con icono de cuatro celdas y el mismo color, peso, tamaño, altura y alineación de las opciones normales. Se retiran subtítulo, atenuación, separación especial y `aria-disabled`. No tiene `href`, foco ni una acción ficticia. Después permanecen exclusivamente Solicitudes/Recepciones, Inventario/Propuestas/Autorizaciones, Despachos y Territorio/Atención/Informe. MK-01 y MK-06 continúan en sus tareas originales. El activo y `aria-current` coinciden al cambiar de capa; Escape sincroniza `aria-expanded`.

**Presentación:** la tarea principal precede al contexto territorial. Se mantienen identidad, tipografía, controles, tablas, formularios, diálogos y accesibilidad de T02, con columnas más equilibradas y menos superficies largas. Se revisan los textos de vistas, alertas, notificaciones, requisitos, detalles y mensajes tras acciones. Se retiran explicaciones del mecanismo local o dirigidas al evaluador. Los estados territoriales conservan su significado y se presentan como «Por verificar»; la ausencia de evaluación o solicitudes sigue siendo información del dominio. Los motivos están en [identidad visual](00-sistema-diseno/identidad-visual.md).

### Pantallas con mayor profundidad de refinamiento

| Pantalla | Problema encontrado | Cambio realizado |
|---|---|---|
| MK-10 | Ocho barras extensas repetían cantidades; las métricas y el encabezado restaban espacio al resultado. | Dos balances por producto con resultado conforme, cuatro cantidades por etapa, microindicadores de hasta 112 px y diferencias explícitas; discrepancias/cierre laterales; alcance e identificación compactos; cronología en dos columnas. |
| MK-09 | Filtros en una barra, detalle y observación fragmentados; leyendas con mensajes para el evaluador. | Filtros etiquetados, mapa dominante de 430 px y una ficha de comunidad con fuente/fecha, atención y observación. La presentación de riesgo respeta el fenómeno elegido y no reutiliza evaluaciones de inundación para lluvias. |
| MK-01 | Métricas precedían a una solicitud vacía; el contexto aparecía como cajas independientes. | Solicitud y acción primero, seguimiento debajo en dos columnas y ficha lateral única de comunidad/situación. El vacío conserva su significado real en este corte. |
| MK-04/05/07 | Notas de software, vocabulario técnico y explicaciones ajenas a la tarea. | Redacción de requisitos y decisiones más breve, columnas equilibradas y estados operativos legibles. Puntuaciones, disponibilidad, permisos, rutas y bloqueos se conservan. |
| MK-02/03/06/08 | Contexto transversal de peso excesivo y navegación con señal de ausencia de implementación. | Contexto secundario, Panel normal y componentes compartidos consistentes; formularios, inventario, despachos y recepción conservan su operación. |

### Archivos afectados

| Grupo | Archivos |
|---|---|
| Tres fuentes compartidas | `00-sistema-diseno/styles.css`, `app.js`, `escenario.js`. |
| Verificación | `00-sistema-diseno/verificar.cjs`. |
| Seis documentos comunes | Este README y `00-sistema-diseno/README.md`, `identidad-visual.md`, `componentes-compartidos.md`, `navegacion-roles.md`, `escenario-demostracion.md`. |
| Diez contratos técnicos | Los Markdown MK-01 a MK-10, solo el apartado visual afectado. |
| Quince capturas | Los PNG principales MK-01 a MK-10 y las variantes MK-04/05/07/08/09, en sus carpetas originales. |

Total: 35 archivos existentes actualizados. Los HTML declarativos y el catálogo conservan sus fuentes; reciben el refinamiento mediante los componentes compartidos. El documento del escenario solo actualiza la redacción de la condición de verificación. El contrato MK-10 corrige una fecha mal redactada sin alterar su cronología. No se alteran datos, cantidades, ZIP, `docs/`, `diagramas/` ni configuración humana.

### Recorrido de comprobación T03

| Acción comprobada en Edge/Chromium | Resultado |
|---|---|
| Panel primero en las diez vistas | PASS: apariencia normal sin subtítulo ni `aria-disabled`, sin destino o enlace ficticio; lista, orden e iconos estables por rol. |
| Realismo de textos | PASS: comprobación en entradas, acciones, capturas, variantes y diálogos; sin etiquetas de desarrollo, ausencia de implementación o preconfiguración. |
| Todos los enlaces del sidebar y del contenido inicial | PASS: navegación efectiva y perfil del mismo rol; destinos existentes. |
| Solicitud | PASS: población obligatoria, cantidad inválida, quitar/agregar, revisión, confirmación e inmutabilidad. |
| Inventario | PASS: búsqueda, condición, limpiar filtros, ingreso, ajuste negativo y protección de compromisos. |
| Propuesta | PASS: límite propuesto, reducción sin reserva, rechazo con motivo e invalidación conservada. |
| Autorización | PASS: cotejo obligatorio, compromiso sin descuento físico y bloqueo por disponibilidad. |
| Brigada | PASS: búsqueda, filtros vacíos, actualización de listado, apertura del segundo despacho, ruta y controles de origen/destino/restricciones con teclado. |
| Retiro y llegada | PASS: retiro completo una sola vez, saldo y compromisos correctos; UNKNOWN y antigüedad de 30 minutos bloquean. El vencimiento se describe como tal, sin inventar una nueva observación vial; llegada independiente de recepción. |
| Recepción | PASS: límites, diferencias por producto, observaciones, finalización y físico sin segundo descuento. |
| XLSX/PDF | PASS: descargas reales tras finalizar; firmas de archivo y lectura con openpyxl/pypdf de 70/40 enviados, 68 bidones recibidos y 38 frazadas conformes. |
| Mapas | PASS: capas, activo/ARIA, fenómeno, selección, zoom, fuente/fecha, atención y observación vinculadas. Lluvias + riesgo muestra tres comunidades sin evaluación, sin niveles de inundación reutilizados. |
| Notificaciones | PASS: abrir/cerrar, tres filtros, detalle, marcar leído y reducción del contador; Escape del diálogo conserva el panel inferior. |
| Informe | PASS: estado en consolidación antes de publicar, 118/78 conformes, comparación por etapas y dos microindicadores de hasta 112 px; sin las ocho barras extensas. Cronología y participantes conservados; impresión invoca `window.print` mediante sustitución de prueba, sin imprimir físicamente. |
| Capturas de escritorio | PASS: diez principales y cinco variantes, 1600 × 1000, escala 1, contenido completo; inspección visual de las quince. |
| Móvil | PASS: diez vistas y cinco variantes a 360 × 800; sin overflow del documento, foco circular del menú, cierre y ARIA coherentes; etiquetas del mapa sin solaparse entre título y subtítulo. |
| Contraste y errores | PASS: texto visible de principales, variantes, diálogos y cortes móviles sobre superficies planas; blanco/cyan 4,67:1 y estado ámbar 5,48:1. Microindicadores con cifras explícitas. Sin errores de consola/JavaScript. |

Las capturas auxiliares de móvil, menú, notificaciones y cronología y las descargas de comprobación se guardan en una carpeta temporal del sistema. Los únicos PNG de entrega siguen siendo los quince del inventario.

### Puerta de entrega antislop T03

Se mantiene el modo `during` de la preferencia global y la dirección ENERGY 2 / RHYTHM 2 / MOTION 1. Prevalece la instrucción expresa T03 de conservar los datos sintéticos de T01 y presentar Panel normalmente sin una leyenda de implementación incompleta. Su ausencia de destino queda en esta documentación; no se inventa un enlace o comportamiento. Las comprobaciones de contraste son una revisión concreta de las superficies indicadas, no una certificación de accesibilidad.

| Regla | Estado y evidencia |
|---|---|
| R-01 Color | PASS: cyan de Alivía y colores de estado con propósito escrito; sin nuevos degradados. |
| R-02 Texto | PASS: el refinamiento no introduce rayas largas en la interfaz. |
| R-03 Móvil | PASS: 10 vistas y 5 variantes a 360 × 800, controles HTML principales de 44 px y sin overflow de página. |
| R-04 Iconos | PASS: vocabulario SVG operativo conservado; Panel solicitado usa cuatro celdas. |
| R-05 Composición | PASS: formulario, tabla, despacho, mapa e informe mantienen jerarquía según su tarea. |
| R-06 Tipografía | PASS: Segoe UI local por lectura operativa, escala y pesos documentados. |
| R-07 Fondo | PASS: cuadrícula retirada del SVG; mapa plano para leer relaciones y estados. |
| R-08 Flechas | PASS: señalan volver, continuar o abrir un detalle; no se añaden flechas decorativas. |
| R-09 Etiquetas | PASS: corresponden a estados y capas; entidad sobre H1 es texto secundario sin cápsula. |
| R-10 Cristal | PASS: no se incorpora glassmorphism. |
| R-11 Radios | PASS: panel 8, control 5 y estado 4 px documentados. |
| R-12 Sombras | PASS: paneles planos; elevación de menú, avisos, diálogos y herramientas superpuestas. |
| R-13 Brillos | PASS: sin glows ni luces decorativas. |
| R-14 Tarjetas | PASS: cifras en banda comparativa y justificación abierta; sin tarjetas de relleno. |
| R-15 Acciones | PASS: verbos de solicitud, aporte, autorización, retiro, llegada y recepción conservados. |
| R-16 Lenguaje | PASS: sin reclamos promocionales añadidos. |
| R-17 Cifras | PASS por instrucción T03: solo cantidades del escenario de T01 y totales derivados, documentados como sintéticos. |
| R-18 Testimonios | PASS: no existen testimonios ni retratos generados. |
| R-19 Movimiento | PASS: respuesta de color y apertura de navegación; sin bucles y con reducción de movimiento. |
| R-20 Identidad | PASS: coordinación territorial, origen/destino, unidades, permisos y trazabilidad determinan la composición. |
| R-21 Tema | PASS: claro de Alivía y referencia aprobada; se conserva alcance sin otro tema. |
| R-22 Ilustración | PASS: sin ilustraciones de relleno; se conservan los esquemas operativos. |
| R-23 Recursos | PASS: marca y perfiles existentes; Panel y regeneración de PNG pedidos expresamente. |
| R-24 Navegación | PASS según instrucción T03: destinos operativos comprobados y Panel conceptual sin enlace, sin señal de ausencia de implementación en pantalla. |
| R-25 Contraste | PASS: comprobaciones de texto descritas arriba, sin fallos en esas superficies; cifras acompañan cada microindicador. |
| R-26 Controles | PASS: acciones compartidas ejercitadas; Panel no se presenta como control. |
| R-27 Estados | PASS: vacíos inicial/filtrado, validaciones, bloqueos y estado ocupado al exportar conservados. |
| R-28 FAQ | PASS: no se incorpora una FAQ. |
| R-29 Paleta | PASS: blanco, petrol y cyan; ámbar/rojo/verde solo codifican estados del dominio. |
| R-30 Originalidad | PASS: referencia estética del ZIP con procesos propios de Alivía, sin clonar otros productos. |
| R-31 Motivos | PASS: tabla de decisiones en identidad-visual.md. |
| R-32 Teclado | PASS: foco visible, menú con Tab/Shift+Tab, mapas con Enter y diálogos con Escape. |
| R-33 Fuente | PASS: cambios escritos directamente en las fuentes compartidas, sin scripts que reescriban CSS. |
| R-34 Temas | PASS: único tema claro; sin alternador con un modo incompleto. |
| R-35 Ejecución | PASS: verificar.cjs ejecuta el recorrido registrado y comprueba consola. |
| R-36 Afirmaciones | PASS: sin nuevas afirmaciones de seguridad, certificación, rendimiento o clientes. |
| R-37 Dirección | PASS: identidad y ZIP indicados por el usuario, lectura declarada antes de editar. |
| R-38 Contenido | PASS por instrucción T03: escenario ficticio de T01 declarado en README y fuentes; sin nuevos datos o funciones aparentes. |
| Diales | PASS: ENERGY 2 / RHYTHM 2 / MOTION 1 definidos y aplicados en la identidad visual. |
| Foco por pantalla | PASS: solicitud, lotes, cantidades, despacho, verificación, mapa o comparación según el proceso. |
| Espacio estructural | PASS: filtros/resultados unidos y separación entre tarea y contexto. |
| Acento | PASS: cyan en acción y selección; avisos con semántica de estado. |
| Motivo de identidad | PASS: contexto territorial, unidades y trazabilidad repetidos en el marco de Alivía. |
| Lectura previa | PASS: dirección y diales declarados antes de modificar las fuentes. |
| C-1 Intención | PASS: razones de jerarquía, espaciado, cifras, iconos y mapas registradas. |
| C-2 Función | PASS: recorrido de controles anterior; Panel es una entrada estructural sin comportamiento ficticio según T03. |
| C-3 Contenido | PASS: no se añaden secciones de relleno o dashboards. |
| C-4 Resistencia | PASS: estados principales y variantes en los tamaños comprobados; errores y teclado incluidos. |
| C-5 Evidencia | PASS: no se añaden cifras ni afirmaciones ajenas al escenario autorizado. |

Resultado de la puerta: PASS dentro del alcance comprobado. Permanecen las limitaciones de T01: prototipos locales sin autenticación ni backend real, esquemas sin GIS y ausencia de pruebas en dispositivos físicos u otros motores.

## Estado del repositorio

La entrega se limita a `prototipos/`. No se modificaron `docs/`, `diagramas/`, el ZIP ni configuraciones humanas. `.serena/` era un directorio no rastreado preexistente y se conserva. No se crearon commits; los prototipos están disponibles para revisión y versionado.

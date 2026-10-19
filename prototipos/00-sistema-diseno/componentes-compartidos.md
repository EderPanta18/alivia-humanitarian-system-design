# Componentes compartidos

Los contratos describen presentación e interacción. La autorización efectiva, las transiciones y la persistencia pertenecen a servicios posteriores. Las propiedades son datos de entrada conceptuales y no fijan un framework.

## AppShell

1. **Responsabilidad:** mantener el marco común de todas las vistas autenticadas.
2. **Composición:** Sidebar, Topbar, área de encabezado y contenido principal.
3. **Propiedades:** `role`, `activeView`, `pageTitle`, `children`, `notifications`.
4. **Variantes:** escritorio expandido y móvil con sidebar superpuesta.
5. **Estados:** cargando sesión, listo, error de sesión.
6. **Comportamiento:** mantiene sidebar y centro de notificaciones en ubicación consistente al cambiar de vista/rol.
7. **Restricciones:** no representa autenticación ni concede permisos por ocultamiento.
8. **Accesibilidad:** regiones `header`, `nav`, `main`; enlace para saltar al contenido; orden de foco lógico.

## Sidebar

1. **Responsabilidad:** dar acceso a las vistas permitidas del rol.
2. **Composición:** marca, Panel conceptual primero, navegación por tarea, elemento activo, contexto territorial y perfil inferior.
3. **Propiedades:** `items[{id,label,icon,viewIds}]`, `activeView`, `expanded`, `role`.
4. **Variantes:** fija de 240 px en escritorio, 210 px hasta 1150 px; panel superpuesto de 240 px en móvil.
5. **Estados:** normal, hover, foco, activo, móvil abierto/cerrado.
6. **Comportamiento:** selección cambia la vista conceptual; el indicador activo usa fondo, barra lateral e icono/texto.
7. **Restricciones:** mostrar exactamente las opciones documentadas para el rol. Panel conserva apariencia normal sin subtítulo, estilo atenuado ni `aria-disabled`; es una entrada estructural sin enlace, botón o foco dentro de este alcance. Las opciones operativas conservan sus destinos de T01.
8. **Accesibilidad:** `nav` con nombre, `aria-current="page"`, botón móvil con `aria-expanded` y Escape para cerrar.

## Topbar

1. **Responsabilidad:** ofrecer contexto superior y acceso al centro compartido.
2. **Composición:** título/área contextual, botón de notificaciones y contexto del rol.
3. **Propiedades:** `context`, `unreadCount`, `onNotificationsOpen`, `roleLabel`.
4. **Variantes:** de 68 px en escritorio y 62 px en móvil.
5. **Estados:** normal, menú de notificaciones abierto, notificaciones no leídas.
6. **Comportamiento:** botón de notificaciones mantiene ubicación e interacción entre roles; abre panel anclado.
7. **Restricciones:** no anuncia push, SMS, correo ni detalles fuera del ámbito autorizado.
8. **Accesibilidad:** etiqueta accesible con conteo, estado expandido, foco devuelto al cerrar.

## UserProfile

1. **Responsabilidad:** identificar de forma persistente quién opera y con qué rol/entidad.
2. **Composición:** iniciales, nombre, entidad y etiqueta de rol.
3. **Propiedades:** `name`, `roleLabel`, `organizationLabel`, `avatarUrl?`.
4. **Variantes:** compacto en móvil y completo en sidebar.
5. **Estados:** perfil disponible o identidad cargando/no disponible.
6. **Comportamiento:** solo muestra identidad recibida del contexto autenticado.
7. **Restricciones:** no incluye cambio de rol o entidad, ya que la cuenta tiene rol único.
8. **Accesibilidad:** nombre y rol en texto; imagen decorativa con alternativa vacía.

## PageHeader

1. **Responsabilidad:** explicar propósito y contexto de la vista actual.
2. **Composición:** breadcrumb conceptual, título, descripción, acción primaria opcional.
3. **Propiedades:** `title`, `description`, `section`, `actions[]`.
4. **Variantes:** solo lectura, con una acción, con conjunto de acciones.
5. **Estados:** estándar y título cargando.
6. **Comportamiento:** refleja el elemento activo y no repite texto de la topbar.
7. **Restricciones:** no incorporar operaciones ajenas a la vista/rol.
8. **Accesibilidad:** un `h1` por vista; títulos de acciones descriptivos.

## NotificationCenter

1. **Responsabilidad:** reunir avisos territoriales informativos y avisos operativos autorizados.
2. **Composición:** botón en Topbar, panel con filtros «Todos», «Territoriales» y «Operativos», contador, lista de avisos y estado vacío.
3. **Propiedades:** `items[{id,type,title,phenomenon,location,source,observedAt,verification,operationalState,read,scope}]`, `permissions`, `onOpen`, `onMarkRead`.
4. **Variantes:** panel; lista completa dentro de panel; vacío. `type` distingue territorial de operativo.
5. **Estados:** cerrado, abierto, cargando, vacío, error, leído/no leído; territorial observado/estimado/no verificado/desactualizado.
6. **Comportamiento:** conserva posición/comportamiento para todo rol; filtra antes de renderizar por permisos y ámbito. Alerta territorial presenta fenómeno, ubicación disponible, fuente, fecha y verificación; datos ausentes se identifican, no se inventan. Aviso externo informa, no declara emergencia ni bloquea ayuda.
7. **Restricciones:** solo notificaciones autorizadas del ámbito del usuario; la vista previa usa eventos sintéticos; no implica push, SMS, correo o decisiones automáticas. El alcance de lectura territorial para cada rol debe proceder de permisos explícitos, no inferirse de este componente.
8. **Accesibilidad:** botón con nombre/contador, panel `dialog` no modal o región etiquetada, filtros operables por teclado, `aria-live="polite"` para cambios y texto que comunica tipo/estado sin depender del color.

## MetricCard

1. **Responsabilidad:** resumir una cantidad o conteo contextual.
2. **Composición:** etiqueta, valor/unidad, periodo o definición corta, icono opcional.
3. **Propiedades:** `label`, `value`, `unit`, `context`, `tone`.
4. **Variantes:** neutra e indicador de progreso/advertencia.
5. **Estados:** cargando, disponible, sin datos, error.
6. **Comportamiento:** presenta una sola medida de alcance definido.
7. **Restricciones:** nunca combina unidades ni mezcla riesgo y atención; muestra guion/«Sin datos» en ausencia.
8. **Accesibilidad:** valor y unidad leídos juntos; icono decorativo oculto.

## DataTable

1. **Responsabilidad:** comparar registros operativos por columnas.
2. **Composición:** título, filtros opcionales, encabezados, filas y paginación/estado.
3. **Propiedades:** `columns`, `rows`, `rowKey`, `sort`, `filters`, `emptyState`.
4. **Variantes:** estándar, seleccionable cuando la tarea lo requiere, compacta en móvil.
5. **Estados:** cargando, vacío, error, datos, filtro sin resultados.
6. **Comportamiento:** orden y filtros son visibles; cantidades mantienen unidad y etapa; en móvil usa resumen por fila o desplazamiento interno.
7. **Restricciones:** no ocultar cantidades críticas ni mostrar filas fuera del ámbito autorizado.
8. **Accesibilidad:** tabla con `caption`, encabezados asociados, controles etiquetados y estado de orden anunciado.

## FormField

1. **Responsabilidad:** recoger un valor con etiqueta y ayuda/validación.
2. **Composición:** etiqueta persistente, control, ayuda, error y unidad cuando aplique.
3. **Propiedades:** `id`, `label`, `type`, `value`, `required`, `unit`, `help`, `error`, `disabled`.
4. **Variantes:** texto, número/cantidad, selección, fecha, área de texto.
5. **Estados:** vacío, enfocado, válido, inválido, deshabilitado, solo lectura.
6. **Comportamiento:** valida formato/localización y presenta límites; servidor revalida reglas de dominio.
7. **Restricciones:** no recopilar padrones nominales; cantidades usan producto y unidad declarados; deshabilitado requiere razón visible.
8. **Accesibilidad:** etiqueta programática visible, error relacionado, instrucciones antes de entrada y foco al primer error al enviar.

## ActionButton

1. **Responsabilidad:** ejecutar una acción de la vista.
2. **Composición:** texto, icono opcional y estado ocupado.
3. **Propiedades:** `label`, `variant`, `disabled`, `busy`, `type`, `ariaLabel`.
4. **Variantes:** primaria, secundaria, terciaria, destructiva.
5. **Estados:** normal, hover, foco, presionada, deshabilitada, procesando.
6. **Comportamiento:** acción irreversible abre Modal de confirmación y muestra claramente el resultado solo tras confirmación del servidor.
7. **Restricciones:** ocultar/deshabilitar no reemplaza autorización; nunca presentar éxito por timeout o pérdida de red.
8. **Accesibilidad:** elemento `button` real, nombre comprensible, indicador de ocupado anunciado.

## StatusBadge

1. **Responsabilidad:** resumir estado de proceso sin sustituir una explicación.
2. **Composición:** texto del estado e icono opcional, fondo suave y borde/forma.
3. **Propiedades:** `label`, `state`, `category`, `updatedAt?`.
4. **Variantes:** neutral, info, success, warning, danger.
5. **Estados:** confirmado, propuesto, autorizado, retirado, llegado, conforme, con observaciones, sin verificar, antiguo, no disponible.
6. **Comportamiento:** muestra etapa específica; riesgo territorial y etapa de ayuda usan categorías visuales distintas.
7. **Restricciones:** nunca convertir observación en emergencia oficial ni llegada en recepción conforme.
8. **Accesibilidad:** estado completo visible como texto; contraste suficiente.

## Modal

1. **Responsabilidad:** solicitar confirmación o contener tarea breve que interrumpe el flujo.
2. **Composición:** título, contexto, cuerpo, acciones primaria/secundaria y cierre.
3. **Propiedades:** `open`, `title`, `description`, `children`, `confirmLabel`, `onConfirm`, `onClose`.
4. **Variantes:** confirmación de compromiso y formulario corto.
5. **Estados:** abierto, procesando, error, cerrado.
6. **Comportamiento:** confirma lo que ocurrirá y cantidades afectadas; conserva formulario ante error recuperable.
7. **Restricciones:** no presentar confirmación como garantía de éxito del servidor.
8. **Accesibilidad:** foco atrapado mientras modal, Escape si no está procesando, título/descripcion asociados y retorno del foco al origen.

## AlertPanel

1. **Responsabilidad:** destacar un aviso que requiere atención contextual.
2. **Composición:** icono, título/tipo, explicación, fuente/fecha y acción opcional.
3. **Propiedades:** `severity`, `title`, `message`, `source`, `timestamp`, `verification`, `action`.
4. **Variantes:** info, aviso, bloqueo/error; territorial u operativo.
5. **Estados:** actual, desactualizado, no verificado, resuelto/archivado cuando el dominio lo indique.
6. **Comportamiento:** territorial informa observación y procedencia; un bloqueo logístico explica la condición que impide retirar.
7. **Restricciones:** no declarar emergencia ni bloquear otras operaciones de ayuda por causa territorial.
8. **Accesibilidad:** `role="status"` o `alert` según urgencia inmediata real, texto explícito y sin anunciar reiteradamente.

## ProcessTimeline

1. **Responsabilidad:** mostrar hitos ya ocurridos y el siguiente paso operativo.
2. **Composición:** lista ordenada con nombre, fecha/hora, responsable y estado.
3. **Propiedades:** `steps[{id,label,status,occurredAt,actor,detail}]`.
4. **Variantes:** horizontal para espacio amplio, vertical para móvil; historial completado.
5. **Estados:** completado, actual, pendiente, no disponible.
6. **Comportamiento:** representa cronología: propuesta, confirmación, autorización, retiro, llegada, recepción; permite marcar no ocurrido como pendiente.
7. **Restricciones:** no inferir ni saltar transiciones; llegada no equivale a recepción; informe final requiere evento de cierre.
8. **Accesibilidad:** lista ordenada con estado textual y fechas comprensibles.

## MapPanel

1. **Responsabilidad:** dar contexto espacial útil para riesgo, atención o ruta.
2. **Composición:** mapa/capa, leyenda, filtros, panel de selección y alternativa textual.
3. **Propiedades:** `layer`, `features`, `source`, `updatedAt`, `verification`, `accessibleList`.
4. **Variantes:** mapa de riesgo por fenómeno, cobertura, ruta logística y esquema de demostración.
5. **Estados:** disponible, sin coordenadas, datos antiguos, no verificado, cargando, error.
6. **Comportamiento:** capas separadas; al seleccionar objeto presenta nombre, tipo/etapa, fuente y fecha disponibles.
7. **Restricciones:** no inventar coordenadas, geografía ni transitabilidad; un esquema se marca «sin escala y no geográfico»; ruta calculada no garantiza paso físico.
8. **Accesibilidad:** lista equivalente con teclado, controles nombrados, contraste/estilo no cromático y no exigir interacción con el mapa.

## EmptyState

1. **Responsabilidad:** explicar ausencia legítima de registros.
2. **Composición:** título, motivo y siguiente acción permitida opcional.
3. **Propiedades:** `title`, `description`, `action?`, `icon?`.
4. **Variantes:** inicial, filtrado sin resultados, sin permisos/datos no disponibles.
5. **Estados:** visible cuando el conjunto está vacío, nunca confundido con error.
6. **Comportamiento:** distingue «aún no hay datos» de «no se pudo consultar».
7. **Restricciones:** acción solo si el rol puede ejecutarla.
8. **Accesibilidad:** texto claro y foco no desplazado inesperadamente.

## LoadingState

1. **Responsabilidad:** comunicar que una consulta/acción está en curso.
2. **Composición:** indicador discreto y descripción del contenido que carga.
3. **Propiedades:** `label`, `busy`, `skeleton?`.
4. **Variantes:** bloque, tabla y acción en curso.
5. **Estados:** activo y finalizado.
6. **Comportamiento:** conserva contexto; tras escritura espera confirmación del servidor.
7. **Restricciones:** no usar como señal de éxito ni mantener animaciones si el sistema solicita movimiento reducido.
8. **Accesibilidad:** `aria-busy`, texto para lector de pantalla y no solo spinner.

## ErrorState

1. **Responsabilidad:** explicar una operación o consulta fallida y la recuperación disponible.
2. **Composición:** mensaje, impacto, referencia de solicitud si existe y acción segura de reintento.
3. **Propiedades:** `title`, `message`, `requestId?`, `retry?`, `recoverable`.
4. **Variantes:** validación, permiso, conflicto, conectividad y servicio.
5. **Estados:** recuperable y no recuperable.
6. **Comportamiento:** ante resultado incierto invita a consultar estado antes de repetir; conserva datos de formulario cuando sea seguro.
7. **Restricciones:** no exponer secretos ni afirmar que no hubo efecto si el servidor no lo confirmó.
8. **Accesibilidad:** error anunciado, foco contextual y texto asociado a campos cuando corresponda.

## Implementación reutilizada en T01

Los diez documentos HTML son entradas declarativas a un mismo AppShell, renderer por pantalla, modelo de escenario y hoja de tokens. La navegación, perfil, campana, filtros de notificaciones, modal, métricas, formularios, tabla y esquema SVG proceden de esa fuente común. No existen diez copias del sidebar.

El catálogo abre instantáneas preconfiguradas; los enlaces dentro de cada rol continúan el estado local. Los avisos se filtran por momento del escenario y contexto autorizado. Su fuente interna y estado de verificación siempre son visibles. Las actualizaciones de disponibilidad introducen una corrección trazada previa al compromiso; no equivalen a un estado persistido INVALIDATED.

Los documentos finales se habilitan después de la recepción. JSZip empaqueta el manifiesto XLSX y PDF-Lib genera el acta PDF. El contenido se calcula a partir de las cantidades de esa recepción, y una segunda descarga reutiliza el archivo generado en la sesión. No se genera un PDF de discrepancias separado.

Las operaciones se ejecutan en memoria y localStorage. Los límites, permisos y estados de la interfaz son parte del prototipo; no constituyen autenticación, transacciones concurrentes o seguridad de un backend. Los diálogos, avisos y errores no comunican éxito de una escritura de servidor.

## Refinamiento compartido T02

- AppShell: sidebar de 240 px, topbar de 68 px y encabezado con entidad secundaria y título principal. Panel aparece primero en los cuatro menús, sin destino y con la limitación visible.
- Sidebar: una única función construye el menú por rol; clase activa y `aria-current` coinciden también al cambiar de capa. Escape actualiza `aria-expanded` y devuelve foco; Panel queda fuera del recorrido de teclado.
- MetricCard: las cifras relacionadas se agrupan en una banda con divisores, sin repetir tarjetas con fondo ni resaltar iconos secundarios. En móvil la banda pasa a dos columnas.
- DataTable y filtros: texto de 13 px, encabezados de 11 px en caja normal, cantidades destacadas y filtros anexos a su resultado. Desplazamiento horizontal dentro de la tabla en móvil.
- Formularios: etiquetas de 13 px, ayudas de 11 px, solo lectura diferenciada, secciones numeradas y pie de acciones. Se conservan límites, validaciones y confirmaciones de T01.
- AlertPanel, StatusBadge y NotificationCenter: contraste reforzado, etiquetas de estado rectangulares, filtros de avisos subrayados y lectura explícita. No hay nuevos canales ni alertas externas.
- MapPanel: lienzo plano, herramientas agrupadas, leyendas de 11 px y etiquetas mayores en móvil orientadas hacia el interior del esquema. Se conservan selección, capas, zoom, fuentes y estados.
- Timeline e informe: conector legible, numerales y metadatos diferenciados; pestañas por subrayado y barras por producto con mejor contraste. No se añaden eventos ni métricas.
- Modal y ActionButton: cabecera/pie diferenciados, radios moderados, controles principales de al menos 44 px en móvil y foco de 3 px. Solo menús, notificaciones y diálogos usan elevación funcional.

## Composición y redacción T03

- Sidebar: Panel se representa con `.nav-entry`, sin leyenda ni señal de ausencia de implementación. La restricción de destino se documenta aquí y no se anuncia dentro de la aplicación.
- Contexto: el aviso territorial transversal pasa a una línea discreta con fuente/registro accesible; las alertas de validación y bloqueo conservan su prioridad.
- Comuna: solicitud y acción primero, seguimiento debajo en dos columnas y una ficha lateral que reúne comunidad y situación territorial.
- Supervisión: filtros con etiquetas visibles, mapa dominante y ficha contextual unificada. Evaluación, atención y observación mantienen sus fuentes y significados propios. Cambiar a lluvias no reutiliza los niveles de inundación.
- Informe: dos balances de producto con resultado conforme, cantidades por etapa, diferencias y microindicadores de hasta 112 px. Discrepancias y cierre son módulos laterales; el encabezado documental y el alcance sustituyen las métricas repetitivas. Cronología en dos columnas en escritorio y una en móvil.
- Redacción: «Por verificar» conserva la incertidumbre de los registros. «Por autorizar» conserva el estado previo a autorización. Se retiran notas de implementación, preconfiguración, memoria del navegador y mensajes para el evaluador; no se alteran estados internos ni validaciones.

# MK-09 — Mapa territorial de Defensa Civil

## 1. Identificación

Identificador: `MK-09`. Actor: **Jefe de Defensa Civil**. Macroproceso: **Supervisión territorial**.

## 2. Propósito funcional

Las Palmeras: 118/120 bidones y 78/80 frazadas conformes. Nuevo Horizonte y Ribera Norte no tienen solicitudes. Ausencia de solicitud no equivale a cobertura 0 %.

## 3. Precondiciones

Sesión de Defensa Civil con acceso territorial de lectura. La identidad está precargada y fija por pantalla. La implementación local no autentica ni constituye autorización de servidor.

## 4. Datos y momento representado

Escenario ficticio de lluvias intensas asociadas a El Niño en Piura. Fecha de operación: 18 de octubre de 2026, 14:10, salvo el informe posterior al evento del 20 de octubre. Comunidad Las Palmeras, 180 personas afectadas; ONG Puente Verde y Manos del Norte; Brigada Río Seco. Los nombres, observaciones internas, evaluaciones, vías y operaciones son sintéticos; no se atribuyen a instituciones reales.

## 5. Estado inicial

Recepciones verificadas, riesgo y cobertura independientes. La entrada directa carga este corte de la historia. La navegación con `continuar=1` conserva el estado local y no adelanta precondiciones incompletas.

## 6. Composición visual

Refinamiento T03: sidebar claro de 240 px con Panel primero, icono y tipografía normal, sin subtítulo ni señal de ausencia de implementación. Es una entrada conceptual sin enlace dentro del alcance actual; no recibe foco ni crea otro destino. Se conservan las opciones operativas y el activo del rol, la topbar de 68 px y los componentes compartidos. El contexto territorial tiene menor peso que la tarea principal. Captura regenerada desde el HTML existente, a 1600 × 1000 px.

Filtros etiquetados sobre el mapa, mapa principal de 430 px en escritorio y ficha lateral unificada: comunidad, evaluación con fuente/fecha, atención por producto y observación vinculada. Los microindicadores de conformidad miden como máximo 112 px. Riesgo se representa solo para el fenómeno seleccionado: las evaluaciones de inundación no se reutilizan como riesgo de lluvias. La ausencia de evaluación y de solicitud sigue siendo un estado del dominio, sin cobertura ni riesgo inferidos.

## 7. Componentes compartidos

AppShell, Sidebar, Topbar, UserProfile, PageHeader, NotificationCenter, ActionButton, StatusBadge, AlertPanel y estados vacíos/error. Las tablas, campos, timeline o mapa se incorporan únicamente donde resuelven una tarea de esta pantalla.

## 8. Acciones

Seleccionar comunidad; capas riesgo/atención/observaciones; filtros; zoom; detalle de aviso; actualizar consulta. Los controles de negocio tienen efecto local visible; no se comunican con una API.

## 9. Validaciones

Solo lectura; no acceso a lotes, físico ni disponibilidad privada; no inferir riesgo por volumen entregado; sin coordenadas verificadas no se geolocaliza. Los errores conservan los datos y no muestran éxito indebido. Cantidades y unidades permanecen separadas por producto.

## 10. Estados representados

Riesgo alto/moderado; sin evaluación; pendiente de verificación; atención y brechas.

## 11. Transiciones y efectos

Cambiar capa y selección modifica la información representada sin cambiar solicitudes, riesgo o inventario. Las acciones repetidas se bloquean por el estado final para no duplicar descuentos, compromisos o recepciones.

## 12. Restricciones de rol

Solo se muestran recursos vinculados al actor o resúmenes autorizados. No hay selector de rol en la aplicación, flotas, conductores, GPS, beneficiarios nominales ni declaración/cierre de emergencia. Defensa Civil consulta y no modifica operaciones.

## 13. Notificaciones

Campana en la misma ubicación, categorías Territoriales y Operativas, detalle y marcado de lectura. Los avisos se construyen según el corte temporal y el ámbito: comunidad, aporte propio, despacho asignado o supervisión territorial. Observaciones internas conservan fuente, fecha y la condición de verificación, ahora presentada como «Por verificar». El cambio es de redacción; no modifica el estado, declara emergencia ni bloquea ayuda por sí solo.

## 14. Relación con otras etapas

La solicitud habilita matching; decidir un aporte no lo autoriza; autorizar compromete sin descontar físico; retirar exige ruta vigente y carga completa; llegada habilita recepción; recepción habilita documentos; el informe exige el evento de finalización. La navegación del rol conserva la misma estructura entre sus pantallas.

## 15. Variantes

Seleccionar Ribera Norte y la capa Observaciones: no hay evaluación validada y no se inventa severidad.
La entrada directa con `estado=sin-evaluacion` carga el mismo estado alternativo para capturas reproducibles.

## 16. Accesibilidad

Etiquetas visibles, encabezados de tabla, foco perceptible, acciones de teclado y estados textuales. Diálogos nativos con foco contenido y Escape. Los mapas ofrecen detalle textual equivalente y selección por teclado. Diseño adaptable desde 360 px; las tablas amplias se desplazan dentro de su contenedor.

## 17. Persistencia y ejecución

HTML, CSS y JavaScript compartidos, sin compilación ni servicios externos. El estado se guarda en localStorage cuando está disponible; si falla, el recorrido funciona en memoria. Entradas directas reinician el corte de esa pantalla; los enlaces del producto continúan el estado. Una nueva entrada directa permite repetir las pruebas sin controles de desarrollo dentro de la interfaz.

## 18. Criterios de aceptación

- Actor, opción activa y perfil correctos y constantes para el rol.
- Datos y etapa compatibles con el corte indicado.
- Acciones y validaciones anteriores producen su resultado visible.
- Propuesta, confirmación, autorización, retiro, llegada y recepción no se equiparan.
- Sin inventario privado en supervisión ni avisos oficiales fabricados.
- PNG corresponde a la implementación y conserva resolución exacta.

## 19. Verificación

El script compartido de verificación ejecuta las interacciones y genera la captura desde el navegador. El resultado de la ejecución completa se registra en el inventario principal. Los criterios funcionales son controles locales de prototipo, no pruebas de transacciones o seguridad de un backend.

## 20. Limitaciones técnicas

No hay servidor, autenticación real, integraciones oficiales, evaluación vial externa ni GIS geográfico. Los puntos y recorridos son un esquema SVG sin escala y no recomiendan una ruta real. La actualización de disponibilidad y de restricciones usa correcciones locales trazadas para reproducir conflictos. Los documentos de recepción son archivos reales XLSX/PDF generados localmente, sin firmas institucionales. La impresión del informe depende del navegador.

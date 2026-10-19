# Navegación por rol

## Reglas comunes

- Hay cuatro roles operativos y cada cuenta tiene uno solo. La navegación no incluye selector de rol.
- El Sidebar muestra la marca arriba, las opciones en el orden definido aquí y `UserProfile` al pie. La Topbar mantiene el botón del centro de notificaciones en la misma ubicación para todos.
- El elemento activo usa superficie `#DFF2F7`, barra lateral y texto cyan, además de `aria-current`; el fondo del Sidebar es blanco.
- T03 conserva `Panel` primero en los cuatro roles y corrige su representación: icono y texto con la misma tipografía, color, altura y alineación de una opción normal. No tiene subtítulo, separación especial, atenuación, `aria-disabled` ni señales de implementación incompleta. Es una entrada conceptual sin `href`, botón, foco o comportamiento inventado dentro de los diez cortes disponibles. No se crean páginas ni dashboards. MK-01 y MK-06 siguen siendo Solicitudes y Despachos.
- Una opción puede agrupar varias vistas conceptuales de la misma tarea; no crea una operación ni amplía permisos.
- Seleccionar una opción abre su vista inicial; los subestados se alcanzan desde enlaces dentro de esa vista y conservan el rol.
- Las rutas web se definirán en la implementación. Los identificadores de vista son estables.
- La API vuelve a verificar rol, titularidad y ámbito para cada lectura y operación.
- El centro de notificaciones es transversal y visualmente idéntico. Solo recibe avisos del ámbito autorizado. T01 autoriza avisos territoriales contextuales también para Comuna, ONG y Brigada: únicamente los de su comunidad, destino de aporte o despacho asignado. La consulta territorial global continúa reservada a Defensa Civil. Esta precisión sustituye la presentación conservadora de avisos territoriales solo en Defensa Civil adoptada en T00.

## Jefe de Comuna

**Perfil:** parte inferior del Sidebar: nombre, «Jefe de Comuna» y nombre de la comunidad vinculada.

| Orden | Opción del Sidebar | Icono | Vista conceptual | Encabezado contextual |
|---:|---|---|---|---|
| 1 | Panel | `panel` (cuatro celdas) | Entrada conceptual, fuera de los diez cortes | Sin destino web en este alcance |
| 2 | Solicitudes | `clipboard` | `UI-COM-01` registrar y `UI-COM-02` consultar solicitudes propias | «Solicitudes de [comunidad]» |
| 3 | Recepciones | `box` | `UI-COM-03` verificar y finalizar recepción propia | «Recepciones pendientes» |

Solicitud confirmada no tiene acciones de editar o cancelar. Recepciones solo aparecen tras llegada registrada a despacho de su comunidad. No se muestra inventario de ONG, solicitudes ajenas ni navegación territorial no autorizada.

## Jefe de ONG

**Perfil:** parte inferior del Sidebar: nombre, «Jefe de ONG» y nombre de la organización vinculada.

| Orden | Opción del Sidebar | Icono | Vista conceptual | Encabezado contextual |
|---:|---|---|---|---|
| 1 | Panel | `panel` (cuatro celdas) | Entrada conceptual, fuera de los diez cortes | Sin destino web en este alcance |
| 2 | Inventario | `box` | `UI-ONG-01` ingresos, consulta y ajustes de lotes propios | «Inventario de [ONG]» |
| 3 | Propuestas | `layers` | `UI-ONG-02` revisar y decidir propuestas propias | «Propuestas de aporte» |
| 4 | Autorizaciones | `shield` | `UI-ONG-03` autorizar cantidades confirmadas | «Salidas por autorizar» |

La decisión de propuesta y la autorización son acciones separadas. Confirmar no compromete inventario; autorizar revalida stock y cobertura. No se listan propuestas ni existencias de otras ONG.

## Jefe de Brigada

**Perfil:** parte inferior del Sidebar: nombre, «Jefe de Brigada» y nombre de la brigada vinculada.

| Orden | Opción del Sidebar | Icono | Vista conceptual | Encabezado contextual |
|---:|---|---|---|---|
| 1 | Panel | `panel` (cuatro celdas) | Entrada conceptual, fuera de los diez cortes | Sin destino web en este alcance |
| 2 | Despachos | `truck` | `UI-BRI-01` consulta, ruta, retiro completo y llegada (`UI-BRI-02`) | «Despachos de [brigada]» |

La misma tarea reúne los cuatro casos de uso de Brigada sin crear opciones para flotas, vehículos, conductores o GPS. Retiro solo se habilita con autorización, ruta `AVAILABLE` vigente y cotejo completo. La llegada requiere retiro confirmado y abre recepción comunitaria sin afirmar conformidad.

## Jefe de Defensa Civil

**Perfil:** parte inferior del Sidebar: nombre y «Jefe de Defensa Civil»; sin ONG, comunidad o brigada vinculada.

| Orden | Opción del Sidebar | Icono | Vista conceptual | Encabezado contextual |
|---:|---|---|---|---|
| 1 | Panel | `panel` (cuatro celdas) | Entrada conceptual, fuera de los diez cortes | Sin destino web en este alcance |
| 2 | Territorio y alertas | `map` | `UI-DC-01` riesgos por fenómeno y alertas recientes | «Panorama territorial» |
| 3 | Atención y brechas | `chart` | `UI-DC-02` entregas y cobertura de solo lectura | «Avance de atención» |
| 4 | Informe final | `file` | `UI-DC-03` informe publicado tras evento | «Informe final» |

No existe acción para declarar/cerrar emergencias ni acceso a inventario privado, lotes o movimientos de ONG. Riesgo y atención se consultan como conceptos y vistas distintas. Informe final vacío o no publicado no se muestra como disponible.

## Comportamiento activo y adaptable

- El elemento que contiene la vista actual se marca activo. En opciones agrupadas, los detalles mantienen esa opción activa. En MK-09, atención activa «Atención y brechas»; riesgo y observaciones activan «Territorio y alertas». Fondo activo y `aria-current` se actualizan juntos al navegar o cambiar de capa/fenómeno.
- En escritorio el Sidebar permanece estable al navegar. En móvil se abre con control etiquetado, se cierra al seleccionar destino o con Escape y devuelve el foco al control de apertura.
- Si la sesión pierde acceso a una vista, el backend lo rechaza y la interfaz muestra estado de permiso; no simula éxito por navegación.
- El título de página identifica tarea y entidad autorizada, sin exponer información de otra entidad.

## Correspondencia con las diez interfaces

| Rol y opción | Interfaces que reutilizan el mismo menú |
|---|---|
| Comuna / Solicitudes | MK-01 y MK-02. |
| Comuna / Recepciones | MK-08. |
| ONG / Inventario | MK-03. |
| ONG / Propuestas | MK-04. |
| ONG / Autorizaciones | MK-05. |
| Brigada / Despachos | MK-06 y MK-07. |
| Defensa Civil / Territorio y alertas | MK-09, capa de riesgo u observaciones. |
| Defensa Civil / Atención y brechas | MK-09, capa de atención. |
| Defensa Civil / Informe final | MK-10. |

El catálogo de interfaces se encuentra fuera del shell de la aplicación. Permite abrir cortes de cada rol sin convertir el cambio de identidad en una operación del producto. La entrada directa carga el momento preconfigurado de una pantalla. Los enlaces internos conservan el recorrido local; no habilitan recepciones sin llegada, autorizaciones sin confirmación ni un informe no publicado.

# Actores y responsabilidades

## 1. Modelo de participación

Alivía contempla cuatro roles humanos con permisos distintos. Una cuenta operativa posee un único rol. Los representantes vinculados a comunidad u ONG solo actúan sobre registros de su entidad; Defensa Civil consulta la información territorial y los resultados permitidos, sin permisos de modificación.

La vinculación uno a uno de los jefes con su entidad es una **regla funcional objetivo**; su aplicación requiere que el diseño posterior imponga unicidad, no basta con mostrar un campo de pertenencia en la interfaz. La carga de responsables puede hacerse durante la configuración inicial; no se requiere módulo público de gestión de usuarios.

## 2. Responsabilidades por actor

### 2.1. Jefe de Comuna/Albergue (`comuna`)

**Responsabilidad:** comunicar necesidades de su comunidad y corroborar lo que realmente recibe.

- Identificar su comunidad por la sesión, sin elegir libremente otra.
- Registrar situación, población afectada, productos y cantidades requeridas.
- Consultar sus solicitudes y sus cantidades/estados.
- Verificar un despacho llegado, confirmar recepción conforme o con observaciones y dejar constancia de discrepancias.
- Crear posteriormente una nueva solicitud si sigue necesitando ayuda tras una recepción finalizada.

**No puede:** modificar existencias de ONG, autorizar propuestas, registrar retiradas por brigada, acceder a solicitudes privadas de otras comunidades ni cancelar solicitudes confirmadas.

### 2.2. Jefe de ONG (`ong`)

**Responsabilidad:** administrar los recursos de su organización y decidir qué aportes se comprometen.

- Registrar ingresos de inventario, consultar existencias y registrar ajustes justificables.
- Revisar propuestas dirigidas a su ONG.
- Confirmar una cantidad igual o menor a la propuesta, o rechazar con motivo.
- Autorizar, en una acción distinta, la salida de lo confirmado.
- Conocer el estado de las entregas de sus propios aportes según necesidad operativa.

**No puede:** aceptar propuestas dirigidas a otras ONG, decidir recepción de una comunidad, cambiar el retiro confirmado por la brigada, asignar conductores o intervenir en inventarios ajenos.

### 2.3. Jefe de Brigada (`brigada`)

**Responsabilidad:** verificar el retiro de ayuda ya autorizada y registrar su llegada a destino.

- Consultar los despachos asignados a la brigada en el escenario.
- Consultar la ruta proporcionada por el sistema y su resultado de verificación.
- Corroborar y confirmar el retiro **completo** de los productos autorizados.
- Registrar la llegada al destino con identificación y fecha/hora.

**No puede:** aumentar o reducir aportes de ONG, autorizar salidas, confirmar recepción comunitaria ni gestionar dentro de Alivía vehículos, conductores o incidencias internas del trayecto.

**Vinculación:** cada brigada dispone de un identificador propio y un único jefe responsable. La pertenencia se almacena en la entidad `brigade` y en una referencia `brigade_id` única de usuario; los despachos identifican al responsable de brigada.

### 2.4. Jefe de Defensa Civil (`defensaCivil`)

**Responsabilidad:** observar riesgos y resultados territoriales para apoyar coordinaciones externas.

- Consultar evaluaciones de riesgo por comunidad, desastre y fecha.
- Consultar el avance de atención separado del nivel de riesgo.
- Consultar entregas efectivamente recibidas y brechas por territorio, producto o periodo, sin obtener inventarios privados de ONG.
- Leer un informe consolidado **solo cuando haya llegado** el evento de finalización preconfigurado de esa emergencia.

**No puede:** editar evaluaciones territoriales, registrar o confirmar ayuda, modificar inventarios, aprobar propuestas, gestionar despachos, cerrar emergencias desde una pantalla ni consultar existencias/lotes privados de ONG.

La supervisión territorial durante la operación y el informe final posterior al evento son **dos capacidades de lectura diferentes**; la primera no implica publicación anticipada del segundo.

## 3. Procesos sin actor humano propio

| Proceso | Ejecución | Restricción |
|---|---|---|
| Motor de matching | Automática según necesidades y existencias aptas. | No posee cuenta de usuario ni autoriza aportes. |
| Registro de riesgo externo | Importación o carga precargada verificada. | No declara emergencias por sí mismo. |
| Cálculo de rutas | Servicio interno con información vial disponible. | No atribuye disponibilidad física garantizada. |
| Descuento de inventario | Operación de sistema tras confirmación de retiro. | No puede ejecutarse dos veces por el mismo retiro. |
| Generación de documentos | Tras finalizar recepción. | Diferencia manifiesto Excel de acta PDF. |
| Consolidación final | Tras evento `EMERGENCIA_FINALIZADA`. | Se realiza una vez por evento, sin habilitar edición a Defensa Civil. |

Los transportistas internos de la brigada y los proveedores de datos externos son participantes operativos o sistemas externos, pero **no se añaden como roles de inicio de sesión**.

## 4. Matriz de permisos

| Recurso / operación | Comuna | ONG | Brigada | Defensa Civil |
|---|---|---|---|---|
| Registrar solicitud propia | Sí | No | No | No |
| Confirmar recepción de despacho propio | Sí | No | No | No |
| Administrar inventario propio | No | Sí | No | No |
| Confirmar propuesta propia | No | Sí | No | No |
| Autorizar salida de su aporte | No | Sí | No | No |
| Ver despachos asignados | Según destino | Según aporte | Sí | Solo resumen de atención |
| Verificar retiro completo | No | No | Sí | No |
| Registrar llegada | No | No | Sí | No |
| Consultar riesgo territorial | No exigido | No exigido | No exigido | Sí |
| Consultar entregas y brechas territoriales | Solo propia atención | Solo aportes propios | Solo asignaciones | Sí, sin datos privados |
| Leer informe final publicado | No | No | No | Sí |
| Declarar fin de emergencia | No | No | No | No |

**Regla de seguridad:** las restricciones se verifican en el servidor para cada operación y entidad. Ocultar controles en una pantalla no es autorización suficiente.

## 5. Relaciones y cardinalidades objetivo

- Una persona usuaria tiene un solo rol dentro del alcance actual.
- Un jefe de comuna dirige exactamente una comunidad y cada comunidad participante tiene un único jefe para esta versión.
- Un jefe de ONG dirige exactamente una ONG y cada ONG participante tiene un único jefe para esta versión.
- Un jefe de brigada dirige exactamente una brigada y cada brigada participante tiene un único jefe; la unicidad se impone en almacenamiento.
- Defensa Civil tiene rol de lectura territorial global sin comunidad u ONG asignada.
- Una ONG puede tener varios almacenes; una comunidad puede originar múltiples solicitudes; una solicitud puede recibir propuestas de distintas ONG.

## 6. Identificadores UML para los actores

| Identificador | Actor | Uso en diagramas de casos de uso |
|---|---|---|
| ACT-COM | Jefe de Comuna/Albergue | Demanda y recepción. |
| ACT-ONG | Jefe de ONG | Inventario y autorizaciones. |
| ACT-BRI | Jefe de Brigada | Retiro y llegada. |
| ACT-DC | Jefe de Defensa Civil | Supervisión e informe final. |

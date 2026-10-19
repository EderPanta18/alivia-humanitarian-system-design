# Actores y responsabilidades

## 1. Modelo de participación

Alivía contempla cuatro roles humanos con permisos diferenciados. Cada cuenta operativa tiene un único rol y solo puede actuar sobre los recursos autorizados. Los representantes de comunidades y ONG están limitados a sus respectivas entidades, mientras que Defensa Civil dispone de acceso de lectura a información territorial y resultados de atención.

Cada comunidad, ONG y brigada debe tener un único jefe responsable. Esta **regla funcional** requiere restricciones de unicidad en el almacenamiento y no puede depender únicamente de la interfaz. Los responsables pueden registrarse durante la configuración inicial, sin necesidad de un módulo público de administración de usuarios.

## 2. Responsabilidades por actor

### 2.1. Jefe de Comuna/Albergue (`comuna`)

**Responsabilidad:** registrar las necesidades de su comunidad y verificar la ayuda recibida.

- Acceder a su comunidad mediante la sesión, sin posibilidad de seleccionar otra.
- Registrar la situación, población afectada, productos y cantidades requeridas.
- Consultar las solicitudes propias, sus cantidades y estados.
- Verificar los despachos llegados, confirmar recepciones conformes o con observaciones y documentar discrepancias.
- Registrar nuevas solicitudes si persisten necesidades después de finalizar una recepción.

**Restricciones:** no puede modificar inventarios de ONG, autorizar propuestas, confirmar retiros de brigada, consultar solicitudes privadas de otras comunidades ni cancelar solicitudes confirmadas.

### 2.2. Jefe de ONG (`ong`)

**Responsabilidad:** administrar los recursos de su organización y decidir los aportes que autoriza.

- Registrar ingresos de inventario, consultar existencias y realizar ajustes justificados.
- Revisar las propuestas de matching dirigidas a su ONG.
- Confirmar cantidades iguales o inferiores a las propuestas, o rechazarlas indicando el motivo.
- Autorizar la salida de las cantidades confirmadas mediante una operación independiente.
- Consultar el estado de las entregas correspondientes a sus aportes.

**Restricciones:** no puede responder propuestas de otras ONG, confirmar recepciones comunitarias, modificar retiros verificados por brigadas, asignar conductores ni intervenir en inventarios ajenos.

### 2.3. Jefe de Brigada (`brigada`)

**Responsabilidad:** verificar el retiro completo de los recursos autorizados y registrar su llegada al destino.

- Consultar los despachos asignados a su brigada.
- Revisar las rutas propuestas y sus resultados de verificación.
- Comprobar y confirmar el retiro **completo** de los productos autorizados.
- Registrar la llegada al destino con su identificación, fecha y hora.

**Restricciones:** no puede modificar los aportes de ONG, autorizar salidas, confirmar recepciones comunitarias ni gestionar vehículos, conductores o incidencias internas del trayecto dentro de Alivía.

**Vinculación:** cada brigada tiene un identificador propio y un único jefe responsable. La relación se representa mediante la entidad `brigade` y una referencia `brigade_id` única en el usuario. Los despachos identifican al responsable de brigada correspondiente.

### 2.4. Jefe de Defensa Civil (`defensaCivil`)

**Responsabilidad:** supervisar el riesgo territorial y los resultados de atención para apoyar la coordinación externa.

- Consultar evaluaciones de riesgo por comunidad, desastre y fecha.
- Visualizar el avance de atención de forma independiente del nivel de riesgo.
- Consultar entregas recibidas y brechas de atención por territorio, producto o periodo, sin acceder a inventarios privados de ONG.
- Acceder al informe consolidado únicamente después del evento de finalización preconfigurado de la emergencia.

**Restricciones:** no puede modificar evaluaciones territoriales, registrar o confirmar ayuda, gestionar inventarios o despachos, aprobar propuestas, cerrar emergencias desde la interfaz ni consultar existencias o lotes privados de ONG.

La supervisión durante la emergencia y la consulta del informe final son **capacidades de lectura independientes**. El acceso a información operativa no habilita la publicación anticipada del consolidado.

## 3. Procesos sin actor humano propio

Alivía contempla procesos automatizados que ejecutan operaciones internas sin representar roles adicionales de usuario.

| Proceso                    | Ejecución                                                     | Restricción                                                                      |
| -------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Motor de matching          | Automática, según necesidades pendientes y existencias aptas. | No utiliza una cuenta humana ni autoriza aportes.                                |
| Registro de riesgo externo | Mediante importación o carga inicial de datos verificados.    | No declara emergencias automáticamente.                                          |
| Cálculo de rutas           | Servicio interno basado en información vial disponible.       | No garantiza la transitabilidad física.                                          |
| Descuento de inventario    | Operación automática tras confirmar el retiro.                | Cada retiro produce un único descuento.                                          |
| Generación de documentos   | Después de finalizar la recepción.                            | Genera documentos diferenciados: manifiesto Excel y acta PDF.                    |
| Consolidación final        | Tras el evento `EMERGENCIA_FINALIZADA`.                       | Se ejecuta una vez por evento, sin conceder permisos de edición a Defensa Civil. |

Los transportistas de las brigadas y los proveedores externos de información participan en la operación, pero **no constituyen roles de inicio de sesión**.

## 4. Matriz de permisos

| Recurso u operación                        | Comuna               | ONG                  | Brigada           | Defensa Civil            |
| ------------------------------------------ | -------------------- | -------------------- | ----------------- | ------------------------ |
| Registrar solicitud propia                 | Sí                   | No                   | No                | No                       |
| Confirmar recepción de despacho propio     | Sí                   | No                   | No                | No                       |
| Administrar inventario propio              | No                   | Sí                   | No                | No                       |
| Confirmar propuesta propia                 | No                   | Sí                   | No                | No                       |
| Autorizar salida de aportes propios        | No                   | Sí                   | No                | No                       |
| Consultar despachos asignados              | Según destino        | Según aporte         | Sí                | Solo resumen de atención |
| Verificar retiro completo                  | No                   | No                   | Sí                | No                       |
| Registrar llegada                          | No                   | No                   | Sí                | No                       |
| Consultar riesgo territorial               | No exigido           | No exigido           | No exigido        | Sí                       |
| Consultar entregas y brechas territoriales | Solo atención propia | Solo aportes propios | Solo asignaciones | Sí, sin datos privados   |
| Consultar informe final publicado          | No                   | No                   | No                | Sí                       |
| Declarar fin de emergencia                 | No                   | No                   | No                | No                       |

**Regla de seguridad:** el servidor debe verificar los permisos y la pertenencia a la entidad correspondiente en cada operación. Ocultar funciones en la interfaz no sustituye estos controles.

## 5. Relaciones y cardinalidades objetivo

- **Usuario y rol:** cada cuenta tiene un único rol.
- **Comuna:** cada jefe representa exactamente una comunidad y cada comunidad participante tiene un único jefe.
- **ONG:** cada jefe representa exactamente una ONG y cada ONG participante tiene un único jefe.
- **Brigada:** cada jefe representa exactamente una brigada y cada brigada participante tiene un único jefe, con unicidad garantizada en el almacenamiento.
- **Defensa Civil:** dispone de acceso de lectura territorial global, sin vinculación a una comunidad u ONG.
- **Relaciones operativas:** una ONG puede administrar varios almacenes, una comunidad puede registrar múltiples solicitudes y una solicitud puede recibir propuestas de distintas ONG.

Estas cardinalidades corresponden al alcance funcional actual.

## 6. Identificadores UML para los actores

| Identificador | Actor                   | Uso en diagramas de casos de uso                       |
| ------------- | ----------------------- | ------------------------------------------------------ |
| ACT-COM       | Jefe de Comuna/Albergue | Registro de necesidades y verificación de recepciones. |
| ACT-ONG       | Jefe de ONG             | Gestión de inventario, propuestas y autorizaciones.    |
| ACT-BRI       | Jefe de Brigada         | Verificación de retiros y registro de llegadas.        |
| ACT-DC        | Jefe de Defensa Civil   | Supervisión territorial y consulta del informe final.  |

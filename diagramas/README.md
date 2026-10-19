# Diagramas UML de Alivía

## 1. Propósito

Documentar el diseño funcional, conceptual y arquitectónico de **Alivía**, plataforma de coordinación humanitaria orientada a registrar necesidades, gestionar aportes de ONG, coordinar despachos, verificar recepciones y supervisar la atención de comunidades afectadas.

Los diagramas representan actores, casos de uso, procesos, interacciones, entidades del dominio, responsabilidades modulares, componentes y despliegue propuesto.

Su propósito es facilitar la comprensión y trazabilidad del sistema, manteniendo coherencia con los requisitos funcionales y los modelos de datos vigentes.

## 2. Organización

| Carpeta                      | Contenido                                                                               |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `00-casos-uso-general/`      | Panorama de los cuatro actores humanos y sus objetivos dentro del sistema.              |
| `01-casos-uso-actores/`      | Casos de uso organizados por Comuna, ONG, Brigada y Defensa Civil.                      |
| `02-casos-uso-procesos/`     | Colaboraciones funcionales que describen los procesos humanitarios principales.         |
| `03-secuencias-casos-uso/`   | 17 diagramas de secuencia correspondientes a los casos de uso iniciados por personas.   |
| `04-secuencias-automaticas/` | 3 diagramas de secuencia correspondientes a operaciones internas y eventos del sistema. |
| `05-estructura/`             | Modelo conceptual, paquetes, componentes y despliegue cloud propuesto.                  |

### 2.1. Secuencias de casos de uso

Los 17 diagramas se distribuyen de la siguiente manera:

| Rol                     | Identificadores           | Cantidad |
| ----------------------- | ------------------------- | -------: |
| Jefe de Comuna/Albergue | `CU-COM-01` a `CU-COM-04` |        4 |
| Jefe de ONG             | `CU-ONG-01` a `CU-ONG-06` |        6 |
| Jefe de Brigada         | `CU-BRI-01` a `CU-BRI-04` |        4 |
| Jefe de Defensa Civil   | `CU-DC-01` a `CU-DC-03`   |        3 |
| **Total**               |                           |   **17** |

Cada secuencia representa la interacción entre el actor, el frontend Next.js, la API NestJS y los módulos responsables de ejecutar la operación.

### 2.2. Secuencias automáticas

La carpeta `04-secuencias-automaticas/` conserva tres diagramas:

| Identificador | Archivo                       | Responsabilidad                                                     |
| ------------- | ----------------------------- | ------------------------------------------------------------------- |
| `AUT-01`      | `AUT-01-matching.puml`        | Generación y recálculo automático de propuestas de matching.        |
| `AUT-02`      | `AUT-02-ingesta-externa.puml` | Ingesta de observaciones y alertas procedentes de fuentes externas. |
| `AUT-03`      | `AUT-03-informe-final.puml`   | Procesamiento del evento de cierre y publicación del informe final. |

Estos identificadores corresponden a los archivos de esta carpeta. No deben renumerarse automáticamente a partir de otros catálogos de operaciones internas.

Las operaciones automáticas no constituyen actores humanos ni requieren nuevas cuentas de usuario.

### 2.3. Diagramas estructurales

La carpeta `05-estructura/` incluye cuatro perspectivas complementarias:

| Identificador | Diagrama                       | Propósito                                                                                  |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| `EST-01`      | Modelo conceptual del dominio  | Representar entidades, atributos relevantes y relaciones de negocio.                       |
| `EST-02`      | Paquetes y contratos modulares | Identificar responsabilidades y límites de colaboración entre módulos.                     |
| `EST-03`      | Componentes y colaboraciones   | Mostrar componentes de ejecución, integraciones e infraestructura compartida.              |
| `EST-04`      | Despliegue cloud propuesto     | Representar la distribución prevista entre dispositivos, servicios y proveedores externos. |

Los diagramas estructurales son vistas complementarias; no deben interpretarse como cuatro modelos independientes del sistema.

## 3. Alcance y reglas funcionales

### 3.1. Actores y permisos

Alivía contempla únicamente cuatro roles humanos: Jefe de Comuna/Albergue, Jefe de ONG, Jefe de Brigada y Jefe de Defensa Civil.

Cada operación debe respetar la autenticación, el rol y la titularidad de los recursos en el backend. Los procesos automáticos, proveedores externos y motores internos no son usuarios registrados.

### 3.2. Solicitudes y matching

- Comuna registra necesidades y consulta la atención de su comunidad.
- El sistema genera propuestas automáticamente a partir de demanda elegible e inventario utilizable.
- Las propuestas pueden cubrir parcialmente una solicitud y distribuirse entre distintas ONG.
- La generación y confirmación de propuestas no reservan ni descuentan existencias.
- Las cantidades autorizadas se excluyen de nuevas asignaciones para evitar doble cobertura.
- Los faltantes de recepciones finalizadas no regresan automáticamente al matching.

### 3.3. Inventario y autorizaciones

- Cada ONG administra exclusivamente sus almacenes, lotes y propuestas.
- El inventario diferencia existencias físicas, cantidades autorizadas pendientes de retiro y disponibilidad para nuevas autorizaciones.
- Los ajustes no pueden invalidar compromisos vigentes.
- Confirmar un aporte y autorizar su salida son operaciones distintas.
- La autorización compromete cantidades, pero no reduce el stock físico.
- Las operaciones críticas deben preservar consistencia e idempotencia.

### 3.4. Despachos y recepciones

- La salida debe estar autorizada antes de proceder al retiro.
- Brigada verifica y confirma el retiro completo.
- El retiro requiere una ruta disponible y con verificación vigente.
- No se incluye gestión de conductores, vehículos ni transportistas dentro del sistema.
- El descuento físico del inventario ocurre una sola vez al confirmar el retiro.
- Registrar la llegada no equivale a confirmar la recepción.
- Comuna registra la recepción como `CONFORMING` o `WITH_OBSERVATIONS`.
- Las discrepancias conservan las diferencias entre cantidades enviadas, recibidas y conformes.
- Al finalizar la recepción se generan el manifiesto de despacho en Excel y el acta de entrega en PDF.

### 3.5. Supervisión y cierre

Defensa Civil consulta evaluaciones de riesgo, avance de atención, brechas e informes finales publicados. Sus operaciones son de solo lectura y no permiten acceder a inventarios privados de ONG.

Las evaluaciones territoriales se mantienen independientes de la ayuda entregada. Una comunidad atendida no reduce automáticamente su nivel de riesgo.

El evento preconfigurado `EMERGENCIA_FINALIZADA` inicia la consolidación y publicación del informe final. No existe una pantalla pública para declarar, finalizar o reabrir emergencias.

El informe final se publica una sola vez por evento, conserva su fecha de corte y permanece inmutable.

La ingesta de observaciones o alertas externas no declara emergencias ni autoriza operaciones humanitarias automáticamente.

## 4. Convenciones de modelado

Los diagramas utilizan las siguientes convenciones:

- **`CU-*`:** casos de uso asociados a actores humanos.
- **`AUT-*`:** secuencias de procesos automáticos de esta colección.
- **`EST-*`:** representaciones estructurales del sistema.
- **`alt`:** alternativas de ejecución con condiciones excluyentes.
- **`opt`:** comportamiento condicionado u opcional.
- **`loop`:** procesamiento repetido.
- **`note`:** reglas, restricciones o aclaraciones relevantes.

Los mensajes de los diagramas de secuencia expresan colaboraciones lógicas. No todos equivalen necesariamente a peticiones HTTP independientes.

Los diagramas conceptuales y de componentes no representan automáticamente tablas, claves foráneas o dependencias directas de implementación.

Las referencias entre módulos deben respetar sus contratos públicos, sin acceder a repositorios internos ni introducir dependencias circulares.

## 5. Arquitectura representada

Alivía utiliza un frontend Next.js y un backend NestJS organizado como monolito modular.

Los módulos funcionales principales son:

| Módulo      | Responsabilidad                                               |
| ----------- | ------------------------------------------------------------- |
| `Identity`  | Identidad, roles, autenticación y titularidad.                |
| `Shelter`   | Comunidades, solicitudes, recepciones y discrepancias.        |
| `Inventory` | Productos, almacenes, existencias, matching y autorizaciones. |
| `Logistics` | Despachos, rutas, retiros y documentos de entrega.            |
| `Territory` | Evaluaciones de riesgo e integración territorial.             |

La orquestación de aplicación coordina operaciones entre módulos mediante contratos. Las consultas de supervisión integran información autorizada sin modificar los registros operativos.

Los procesos HTTP y automáticos pueden tener diferentes puntos de entrada sin convertir los módulos en microservicios independientes.

La persistencia utiliza PostgreSQL con separación lógica por schemas. Las referencias entre módulos no implican claves foráneas físicas entre dichos schemas.

### 5.1. Decisiones pendientes de implementación

Algunos diagramas expresan responsabilidades funcionales cuya implementación concreta todavía requiere definición, como la persistencia de observaciones externas, la vigencia de propuestas de matching, el almacenamiento del informe final y los mecanismos de coordinación transaccional o entrega fiable de eventos.

Estas representaciones no autorizan a introducir tablas, estados, endpoints o servicios adicionales sin actualizar previamente los contratos y modelos correspondientes.

## 6. Despliegue propuesto

El diagrama `EST-04` representa una arquitectura cloud propuesta con:

| Servicio             | Responsabilidad prevista                                                          |
| -------------------- | --------------------------------------------------------------------------------- |
| Vercel               | Frontend Next.js y BFF/Proxy HTTP.                                                |
| Render               | API NestJS y procesamiento de tareas internas.                                    |
| Supabase             | PostgreSQL administrado y almacenamiento de documentos, sujeto a configuración.   |
| Proveedores externos | Información territorial, cartografía y cálculo de rutas cuando estén habilitados. |

El diagrama no acredita la existencia de servicios desplegados ni integraciones operativas.

El despliegue definitivo debe verificar seguridad de credenciales, disponibilidad, respaldos, observabilidad y mecanismos de recuperación ante fallos.

## 7. Uso y renderizado

La colección documentada comprende **35 archivos `.puml`**, según el inventario del proyecto.

Los archivos utilizan codificación UTF-8 y pueden visualizarse mediante editores compatibles con PlantUML o renderizarse utilizando el JAR de PlantUML.

Las definiciones detalladas de procesos y los modelos entidad-relación pueden utilizar Mermaid en otros documentos. Esta colección conserva las vistas UML destinadas a explicar el comportamiento y la estructura general de Alivía.

## 8. Mantenimiento y revisión de cambios

Toda modificación debe preservar la correspondencia entre requisitos funcionales, identificadores, actores, estados, relaciones y operaciones.

Antes de actualizar un diagrama, debe comprobarse su coherencia con los casos de uso, los contratos de los módulos y los modelos de datos vigentes.

No se deben introducir silenciosamente funcionalidades, estados, entidades persistentes o integraciones que todavía no estén definidos.

Cuando cambie una decisión funcional o arquitectónica, deben actualizarse los diagramas afectados y sus referencias relacionadas, evitando contradicciones entre las vistas de casos de uso, secuencia y estructura.

**El objetivo es mantener una representación UML consistente, comprensible y verificable de Alivía, diferenciando las reglas confirmadas de las decisiones técnicas pendientes.**

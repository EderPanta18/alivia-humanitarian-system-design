# Especificación de requisitos no funcionales de Alivía

## 1. Alcance y criterios de evaluación

Los requisitos no funcionales establecen las condiciones de calidad, seguridad, rendimiento y confiabilidad de Alivía, tomando como referencia las características de ISO/IEC 25010 y las necesidades operativas del sistema.

Las metas numéricas corresponden a **parámetros de validación propuestos**, no a garantías de un servicio en producción.

Las pruebas deberán documentar el entorno, versión, datos utilizados, procedimiento, resultados medidos y errores detectados. Ningún requisito se considerará cumplido sin evidencia de ejecución.

## 2. Seguridad, privacidad e integridad

### RNF-01. Autenticación y autorización en servidor

**Condición:** las credenciales se validan en el servidor, las contraseñas se almacenan mediante algoritmos de hash adecuados y las sesiones se protegen. Cada petición verifica los permisos del rol y la pertenencia del recurso, independientemente de los controles visibles en la interfaz.

**Verificación:** un usuario de ONG A no puede consultar ni modificar propuestas de ONG B, aunque altere identificadores en la URL o el cuerpo de la petición.

### RNF-02. Integridad de inventario y operaciones concurrentes

**Condición:** las autorizaciones y retiros utilizan operaciones atómicas que impiden existencias físicas negativas, disponibilidad negativa o compromisos superiores al inventario utilizable.

Las propuestas no comprometen recursos. La autorización establece el compromiso y el retiro confirmado descuenta las existencias físicas.

**Verificación:** ante dos autorizaciones concurrentes de 80 unidades sobre una disponibilidad de 100, como máximo una puede completarse íntegramente.

### RNF-03. Trazabilidad y auditoría

**Condición:** cada operación crítica conserva identificador de evento, usuario, rol, entidad, fecha y hora, acción, recurso afectado y cantidades pertinentes. Las correcciones no eliminan registros anteriores.

Los informes consolidados conservan la fecha de corte y los datos necesarios para reconstruir los resultados históricos.

**Verificación:** se puede reconstruir la secuencia de una solicitud, propuesta, autorización, retiro y recepción, identificando cantidades, responsables y momentos.

### RNF-08. Privacidad y minimización de datos

**Condición:** se recopilan únicamente identidades y contactos operativos necesarios, cantidades agregadas y ubicaciones relevantes. No se requieren padrones nominales de beneficiarios ni se exponen inventarios privados a usuarios sin autorización.

**Verificación:** los formularios no solicitan DNI ni nombres individuales de beneficiarios, y Defensa Civil no puede consultar existencias o lotes privados de ONG.

## 3. Usabilidad y accesibilidad

### RNF-04. Usabilidad operativa

**Condición:** las interfaces muestran etiquetas y unidades comprensibles, errores específicos por campo, confirmación previa a autorizaciones irreversibles y estados identificables mediante texto, sin depender exclusivamente del color.

Las cantidades enviadas, autorizadas, recibidas y conformes deben distinguirse claramente.

**Verificación:** un usuario puede diferenciar una propuesta pendiente, un despacho llegado y una recepción confirmada sin conocer los códigos internos.

### RNF-05. Adaptabilidad y accesibilidad

**Condición:** las operaciones esenciales funcionan en dispositivos móviles y de escritorio, con controles accesibles mediante teclado y tacto. Los formularios críticos deben visualizarse desde un ancho de referencia de 360 px sin desplazamiento horizontal obligatorio.

Los mapas deben disponer de una alternativa textual para consultar información que no pueda interpretarse adecuadamente mediante colores, escala o controles gráficos.

**Verificación:** ejecutar los flujos de solicitud, autorización y recepción en Chrome Android, Chrome y Firefox de escritorio, incluyendo una resolución de 360 × 800 px.

## 4. Rendimiento, confiabilidad y recuperación

### RNF-06. Rendimiento bajo carga de referencia

**Conjunto de prueba propuesto:**

- 7 comunidades ficticias.
- 3 ONG y 1 brigada.
- 30 solicitudes de hasta 3 líneas.
- Al menos 100 movimientos de inventario.

**Metas propuestas:**

- Operaciones habituales de lectura y escritura: percentil 95 de tiempo de respuesta igual o inferior a 3 segundos.
- Ejecución de matching con el conjunto de referencia: máximo 5 segundos.

**Verificación:** realizar al menos 20 repeticiones por operación, registrando tiempos, volumen de datos, entorno y errores. Las metas solo se consideran alcanzadas tras mediciones reales.

### RNF-07. Idempotencia y reintentos seguros

**Condición:** las operaciones críticas de autorización, retiro, recepción, generación de documentos y cierre de emergencia deben evitar efectos duplicados mediante claves idempotentes o mecanismos equivalentes.

Cada despacho conserva un único documento por tipo y cada evento de finalización produce un solo informe consolidado, sin sobrescrituras silenciosas.

Ante fallos de conexión, no se informa éxito hasta confirmar el resultado de la operación en el servidor.

**Verificación:** repetir una confirmación de retiro de 50 unidades genera un único movimiento de salida. Los reintentos de generación documental o cierre tampoco producen duplicados.

### RNF-09. Persistencia, respaldo y recuperación

**Condición:** solicitudes, inventarios, propuestas, despachos, recepciones, evaluaciones territoriales, eventos y documentos deben almacenarse de forma persistente. El navegador no constituye la fuente única de información.

**Política de referencia:**

| Parámetro                                | Valor propuesto |
| ---------------------------------------- | --------------- |
| Frecuencia de respaldo                   | Diaria          |
| Conservación de respaldos                | 30 días         |
| Prueba de restauración                   | Mensual         |
| Objetivo de punto de recuperación (RPO)  | 24 horas        |
| Objetivo de tiempo de recuperación (RTO) | 8 horas         |

**Verificación:** reiniciar los servicios y comprobar la conservación de registros. Ejecutar al menos una restauración de respaldo antes de una demostración operativa.

Estos objetivos requieren infraestructura y procedimientos adecuados; no representan garantías de disponibilidad contratadas.

## 5. Mantenibilidad y consistencia

### RNF-10. Ampliación de entidades sin reglas fijas

**Condición:** las relaciones y autorizaciones utilizan identificadores y pertenencia a entidades, sin depender de nombres codificados de ONG, comunidades o brigadas.

**Verificación:** incorporar una cuarta ONG con existencias compatibles sin modificar las reglas del motor de matching.

### RNF-11. Consistencia de contratos entre componentes

**Condición:** frontend, backend y persistencia comparten definiciones coherentes de usuarios, organizaciones, solicitudes, productos, propuestas, autorizaciones, despachos, recepciones, riesgos y documentos.

Las validaciones del servidor deben impedir asociaciones incompatibles entre recursos.

**Verificación:** rechazar un despacho vinculado a una autorización ajena o una recepción que incluya productos no pertenecientes al envío.

### RNF-12. Exactitud de cantidades, fechas y estados

**Condición:** las cantidades respetan las unidades del catálogo, las fechas utilizan un tratamiento temporal consistente y las operaciones conservan identificadores únicos y transiciones válidas.

No se suman unidades heterogéneas sin equivalencia aprobada ni se equiparan etapas distintas del proceso logístico.

**Verificación:** el sistema no presenta 10 cajas y 10 unidades como 20 unidades equivalentes sin conversión autorizada. Registrar una llegada tampoco cambia automáticamente la recepción a conforme.

## 6. Calidad territorial e información externa

### RNF-13. Procedencia y vigencia de evaluaciones de riesgo

**Condición:** cada evaluación territorial conserva fuente, tipo de desastre y fecha. La visualización permite identificar su antigüedad y distingue registros históricos de información reciente.

Una evaluación antigua no reemplaza automáticamente otra más reciente. Los riesgos de fenómenos distintos se muestran separadamente, sin producir un nivel agregado único.

Los datos externos inválidos no actualizan las evaluaciones territoriales.

**Verificación:** importar evaluaciones de distintas fechas conserva su historial y procedencia. La recepción de ayuda no modifica automáticamente el nivel de riesgo.

**Pendiente de definición:** umbrales específicos para clasificar evaluaciones como desactualizadas y escalas de presentación cuando corresponda.

### RNF-14. Verificabilidad de rutas y restricciones viales

**Condición:** cada ruta registra el origen de la información, su estado y la fecha y hora de cálculo y verificación.

Una ruta solo se considera utilizable cuando:

- No contiene tramos `IMPASSABLE`.
- No depende de tramos `UNKNOWN`.
- Su verificación tiene menos de 30 minutos de antigüedad.

Las rutas que incumplan estas condiciones deben reevaluarse antes del retiro. La verificación no garantiza la transitabilidad física de las vías.

**Verificación:** bloquear un tramo de una ruta candidata impide utilizarlo. Si no existe alternativa válida, se rechaza el retiro sin descontar inventario.

### RNF-15. Diferenciación entre alertas y declaraciones de emergencia

**Condición:** las observaciones y alertas externas conservan su procedencia y se identifican como información de fuente. Su importación no constituye una declaración institucional de emergencia ni ejecuta automáticamente su cierre.

**Verificación:** importar una observación sísmica o meteorológica no modifica por sí sola el estado formal del escenario ni habilita despachos.

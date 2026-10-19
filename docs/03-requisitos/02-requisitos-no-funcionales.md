# Especificación de requisitos no funcionales de Alivía

## 1. Alcance, prioridad y medición

Estas condiciones describen atributos de calidad esperados para una aplicación destinada a coordinar ayuda humanitaria. Se inspiran en las áreas de calidad contempladas por ISO/IEC 25010 y en las restricciones operativas conocidas. Las **metas numéricas son propuestas para validar un eventual prototipo**, no compromisos acordados de un servicio productivo.

Toda prueba real deberá registrar versión, entorno, volumen de datos, fecha, pasos ejecutados, resultados medidos y fallos observados. Una descripción de ensayo no equivale a evidencia de ejecución.

## 2. Seguridad, privacidad e integridad

### RNF-01. Autenticación y autorización en servidor

- **Objetivo:** evitar operaciones o lecturas fuera del rol y entidad asignados.
- **Condición:** credenciales validadas del lado del servidor; contraseñas protegidas con un algoritmo de hash adecuado; sesiones verificadas; permisos comprobados por petición.
- **Comprobación propuesta:** usuario de ONG A intenta consultar o aprobar propuesta de ONG B modificando identificadores de URL/cuerpo. Resultado esperado: acceso denegado y ausencia de mutación.
- **Aclaración:** ocultar botones por rol no reemplaza la comprobación del servidor.

### RNF-02. Integridad de inventario y autorizaciones concurrentes

- **Objetivo:** impedir comprometer o retirar más unidades de las disponibles.
- **Condición:** operaciones críticas atómicas, existencia física no negativa, disponibilidad no negativa y compromisos pendientes no superiores al stock utilizable pertinente.
- **Comprobación propuesta:** dos autorizaciones concurrentes intentan comprometer 80 de 100 unidades disponibles. Como máximo una autorización de 80 puede completarse con esos datos.
- **Aclaración:** una propuesta no compromete; el compromiso ocurre al autorizar y el descuento físico ocurre al confirmar el retiro.

### RNF-03. Trazabilidad y auditoría de operaciones

- **Objetivo:** permitir reconstruir decisiones y cantidades.
- **Condición:** conservar identificador de evento, usuario, rol, entidad, fecha/hora, acción, objeto y cantidades cuando proceda. Los eventos anteriores no deben desaparecer por ajustes posteriores.
- **Comprobación propuesta:** reconstruir para un despacho cantidad solicitada, propuesta, autorizada, retirada y conforme, con responsables y momentos correspondientes.

### RNF-08. Privacidad y minimización

- **Objetivo:** reducir exposición de información personal y organizacional innecesaria.
- **Condición:** almacenar identidades y contactos operativos mínimos, cantidades agregadas y ubicaciones de centros/comunidades cuando sean relevantes. Excluir nombres nominales de beneficiarios y datos privados de inventarios de otras ONG en vistas no autorizadas.
- **Comprobación propuesta:** formularios no exigen padrón nominal o DNI de beneficiarios; una consulta de Defensa Civil no revela existencias de lotes privados.

## 3. Usabilidad y compatibilidad

### RNF-04. Usabilidad operativa

- **Objetivo:** que un usuario comprenda qué acción realiza y qué estado produce.
- **Condición:** campos con etiquetas y unidades visibles, errores concretos por campo, confirmación previa a una autorización irreversible, estados expresados con texto además de color y separación clara entre enviado y recibido.
- **Comprobación propuesta:** una persona puede distinguir una propuesta no autorizada, un despacho llegado y una recepción confirmada sin conocer códigos internos.

### RNF-05. Interfaz adaptable y accesible

- **Objetivo:** permitir operaciones esenciales desde móvil y escritorio.
- **Meta propuesta:** ancho mínimo de referencia de 360 px, sin desplazamiento horizontal obligatorio para formularios críticos; botones operables por tacto y teclado.
- **Pruebas propuestas:** validar en Chrome Android, Chrome y Firefox de escritorio; comprobar solicitud, autorización y recepción con resolución 360 × 800 px.
- **Condición adicional:** el mapa debe tener una alternativa de consulta textual cuando color, escala o controles impidan comprender una zona.

## 4. Rendimiento y confiabilidad

### RNF-06. Respuesta bajo carga de demostración

- **Conjunto de referencia propuesto:** 7 comunidades ficticias, 3 ONG, 1 brigada, 30 solicitudes de hasta 3 líneas y al menos 100 movimientos de inventario.
- **Metas propuestas:** el percentil 95 de las operaciones habituales de lectura y escritura será de 3 segundos o menos; una ejecución de matching con este conjunto completará en 5 segundos o menos.
- **Protocolo mínimo futuro:** 20 repeticiones por operación; registrar ambiente, tamaño de datos, respuesta y errores. No declarar cumplimiento sin medición real.

### RNF-07. Reintentos seguros e idempotencia

- **Objetivo:** evitar efectos duplicados por doble clic, latencia o reconexión.
- **Condición:** operaciones críticas de autorización, retiro, recepción, generación de documentos y evento de cierre aceptan un identificador o mecanismo equivalente que impida duplicados. Ante error de red no se informa éxito hasta confirmación del servidor.
- **Comprobación propuesta:** repetir confirmación de retiro de 50 unidades; resultado esperado: solo un movimiento de salida por 50.

### RNF-09. Persistencia y recuperación

- **Objetivo:** conservar operaciones aun cuando se reinicie la aplicación.
- **Condición:** guardar solicitudes, inventario, propuestas, despachos, recepciones, evaluaciones territoriales, eventos relevantes y documentos con persistencia duradera. El navegador no es la fuente única de verdad.
- **Prueba propuesta:** reiniciar servicios del entorno de ensayo y comprobar recuperación de datos, además de verificar al menos una restauración de respaldo antes de una eventual demostración operativa.
- **Política de referencia:** respaldo diario, conservación de 30 días y prueba mensual de restauración; objetivo de recuperación de datos (RPO) de 24 horas y de servicio (RTO) de 8 horas en el entorno previsto. Estos objetivos requieren infraestructura acorde antes de considerarse una garantía operativa.

## 5. Mantenibilidad e interoperabilidad

### RNF-10. Separación por entidades y capacidad de ampliación

- **Objetivo:** incorporar nuevas ONG, comunidades y brigadas sin modificar reglas de matching específicas por nombre.
- **Condición:** las relaciones y permisos se basan en identificadores y pertenencia válidos, no en listas de nombres fijos.
- **Comprobación propuesta:** agregar una cuarta ONG ficticia con producto compatible sin cambiar el algoritmo por código duro.

### RNF-11. Contratos consistentes entre componentes

- **Objetivo:** mantener la misma semántica para recursos y operaciones en frontend, backend y persistencia.
- **Condición:** contratos y validaciones acordados para usuarios, organizaciones, solicitudes, productos, propuestas, autorizaciones, despachos, recepciones, riesgos y documentos; toda mutación comprueba las relaciones en el servidor.
- **Comprobación propuesta:** rechazar un despacho vinculado a autorización ajena o una recepción con línea de producto que no pertenece al envío.

### RNF-12. Exactitud de unidades, fechas y estados

- **Objetivo:** prevenir resultados falsos por mezclar magnitudes o etapas distintas.
- **Condición:** cantidades en unidad del catálogo, fechas con tratamiento temporal consistente, identificadores únicos y transiciones validadas. No sumar unidades heterogéneas ni equiparar autorización con recepción.
- **Comprobación propuesta:** no presentar 10 cajas y 10 unidades como 20 unidades sin equivalencia aprobada; llegada no cambia recepción a conforme.

## 6. Calidad cartográfica e información de fuentes externas

### RNF-13. Procedencia y frescura de riesgo

- **Objetivo:** impedir que se interpreten datos históricos como información actualizada.
- **Condición:** cada evaluación territorial registra fuente y fecha de evaluación; se puede mostrar su antigüedad. Importar un dato antiguo no reemplaza automáticamente una evaluación más reciente.
- **Comprobación propuesta:** dos mediciones de diferentes fechas se conservan y se muestran de forma interpretable; una ayuda recibida no altera el nivel de riesgo.
- **Pendiente:** umbral temporal para rotular una evaluación como desactualizada, escalas y agregación entre distintas fuentes.

### RNF-14. Verificabilidad de rutas y restricciones viales

- **Objetivo:** evitar registrar como validado un retiro basado en una ruta intransitable conocida.
- **Condición:** una ruta contiene estado, origen de datos y momento de cálculo/verificación; se excluyen vías reportadas bloqueadas. En ausencia de ruta disponible no se confirma retirada.
- **Comprobación propuesta:** bloquear un tramo candidato y comprobar que ya no se use; si no hay alternativa, no registrar movimiento de salida.
- **Pendiente:** periodicidad de los datos y política para estado de vía desconocido. No se promete verificación física ni disponibilidad absoluta.

### RNF-15. Separación de alerta observada y decisión institucional

- **Objetivo:** evitar afirmaciones no sustentadas de una emergencia oficialmente confirmada.
- **Condición:** los datos externos se identifican como observación/aviso con su fuente; no disparan automáticamente una declaración formal de emergencia ni un cierre administrativo.
- **Comprobación propuesta:** importar una observación sísmica no cambia por sí sola el estado de una emergencia a declarada ni habilita despachos.

## 7. Informe final y documentos: restricciones de calidad

- El informe consolidado se publica **solo** después del evento preconfigurado de fin del escenario; permanece en modo lectura para Defensa Civil.
- Se genera una sola versión final por evento y no se duplica por un evento repetido.
- Se conserva el corte temporal del informe, incluidas necesidades no cubiertas y observaciones.
- El manifiesto Excel refleja cantidades enviadas; el acta PDF refleja recepción y observaciones; ninguno sustituye al informe consolidado.
- Al reintentar su generación, se preserva unicidad por despacho y tipo de documento.

## 8. Matriz de calidad y estado

| Grupo | Característica prioritaria | Tipo de evaluación |
|---|---|---|
| RNF-01, 08, 15 | Seguridad, protección de datos y corrección informativa | Pruebas de autorización, inspección de contratos y escenarios externos. |
| RNF-02, 03, 07, 12 | Integridad, confiabilidad y trazabilidad | Pruebas de concurrencia, reintentos y estados. |
| RNF-04, 05 | Interacción y accesibilidad | Evaluación con tareas por rol y revisión de interfaz. |
| RNF-06 | Eficiencia del desempeño | Medición bajo carga de referencia. |
| RNF-09 | Recuperabilidad | Reinicio, respaldo y restauración. |
| RNF-10, 11 | Mantenibilidad y compatibilidad | Revisión modular y pruebas de contratos. |
| RNF-13, 14 | Confiabilidad de información geográfica | Pruebas con fechas y restricciones viales. |

**Estado real a esta fecha:** no se reportan ejecuciones de pruebas ni resultados medidos; todas las comprobaciones descritas son criterios o planes futuros.

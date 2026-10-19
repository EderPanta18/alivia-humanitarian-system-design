# Alcance y límites de Alivía

## 1. Alcance funcional de referencia

Alivía contempla un escenario de emergencia activo, cuatro roles humanos y seis macroprocesos. Su arquitectura está diseñada para una aplicación web con frontend y backend separados. Para la validación inicial, los datos operativos pueden precargarse.

| Área          | Comportamiento incluido                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identidad     | Inicio de sesión, rol único por usuario, jefe único por entidad y autorización del lado del servidor.                                              |
| Solicitudes   | Identificación de la comunidad mediante la sesión, registro de productos, población afectada y situación, validación y confirmación no cancelable. |
| Matching      | Cálculo de cobertura, selección de lotes utilizables, prioridad determinista, criterio FEFO y generación de propuestas por ONG.                    |
| ONG           | Gestión de inventarios y movimientos, respuesta a propuestas, confirmación de cantidades y autorización posterior.                                 |
| Brigada       | Consulta de despachos, comprobación de rutas, verificación del retiro completo y registro de llegada.                                              |
| Recepción     | Comparación por línea, cierre conforme o con observaciones y registro interno de discrepancias.                                                    |
| Documentos    | Generación de manifiestos de despacho en Excel y actas de entrega en PDF después de finalizar la recepción.                                        |
| Territorio    | Registro histórico de riesgos por desastre y comunidad, observaciones geográficas con fuente y fecha, y mapas independientes de riesgo y atención. |
| Defensa Civil | Consulta de información territorial y de atención en modo de solo lectura; informe consolidado únicamente al cierre configurado.                   |
| Ingesta       | Importación de observaciones y avisos externos con procedencia y fecha, sin activar operaciones automáticamente.                                   |

## 2. Límites operativos

- **Ámbito territorial:** inicialmente Piura. El modelo permite incorporar otras localidades mediante datos, sin introducir reglas territoriales fijas.
- **Estado de emergencia:** escenario activo previamente configurado por la administración técnica. Ninguno de los cuatro roles dispone de una interfaz para declarar o cerrar emergencias.
- **Cierre del escenario:** la señal preconfigurada `EMERGENCIA_FINALIZADA` congela una única instantánea final, independientemente de las recepciones individuales.
- **Escenarios simultáneos:** la primera versión funcional no contempla coordinación entre emergencias concurrentes, aunque los datos se identifican por emergencia para facilitar futuras ampliaciones.
- **Rutas:** los recorridos calculados son propuestas basadas en información vial conocida, no garantías de transitabilidad.

## 3. Exclusiones

1. Gestión de conductores, matrículas, flotas o asignación interna de transportistas.
2. Seguimiento GPS continuo o localización automática en tiempo real.
3. Registro de incidentes internos del trayecto como operaciones de usuario, sin excluir las discrepancias detectadas durante la recepción.
4. Reactivación automática del matching por faltantes de una recepción finalizada.
5. Retiros parciales o devoluciones operativas de inventario dentro del flujo principal.
6. Administración individual de beneficiarios o recopilación de padrones nominales.
7. Acceso de Defensa Civil a lotes o inventarios privados de ONG, así como modificación de datos operativos.
8. Declaración automática de emergencias a partir de información del IGP, SENAMHI o fuentes satelitales.
9. Uso de fuentes externas como API autorizadas cuando únicamente ofrecen datos para consulta.
10. Incorporación obligatoria de microservicios, GIS propio, predicción satelital o infraestructura de alta disponibilidad sin dimensionamiento que lo justifique.

## 4. Decisiones de diseño fijadas

### 4.1. Matching y prioridad

El sistema asigna a cada necesidad una prioridad **relativa y reproducible**, sin representar un nivel oficial de emergencia. El cálculo combina tres factores:

- **Criticidad de la categoría de producto (50 %):** valor normalizado según la categoría.
- **Población afectada (30 %):** normalizada respecto a una referencia configurable, inicialmente de 1 000 personas.
- **Antigüedad de la solicitud (20 %):** días transcurridos respecto a un horizonte configurable, inicialmente de siete días.

Cada factor se limita a un valor máximo de 1. Los empates se resuelven mediante la fecha de confirmación más antigua y, posteriormente, el UUID en orden ascendente.

Estas ponderaciones corresponden a una **política de software definida para la versión de referencia**, no a criterios oficiales validados por una autoridad humanitaria. La fórmula completa se detalla en la especificación de matching.

### 4.2. Disparadores de matching

El matching se ejecuta cuando:

- Se confirma una solicitud.
- Se registra inventario utilizable nuevo o corregido.
- Se rechaza o reduce una propuesta.

Cada evento se procesa mediante una tarea en cola con clave idempotente. La generación de propuestas no compromete inventario.

Las cantidades ya autorizadas y los faltantes cerrados con observaciones quedan excluidos de nuevas propuestas.

### 4.3. Comprobación de ruta

Antes de confirmar un retiro, el sistema calcula o actualiza la ruta correspondiente. Se considera utilizable únicamente si cumple las siguientes condiciones:

- No contiene tramos registrados como `IMPASSABLE`.
- No depende de tramos con estado `UNKNOWN`.
- Su verificación más reciente tiene una antigüedad inferior a treinta minutos.

Una vez superado ese plazo, la ruta debe reevaluarse.

El intervalo de treinta minutos es una regla técnica del diseño y no garantiza que las fuentes externas actualicen su información con esa frecuencia.

### 4.4. Riesgo territorial

Cada registro de riesgo conserva su fuente, tipo de desastre y fecha. Cuando existen varias evaluaciones, el sistema presenta las capas de riesgo por separado.

La vista resumida selecciona la evaluación más reciente por tipo de desastre y fuente, sin asumir que la entrega de ayuda humanitaria disminuye el riesgo territorial.

No se genera un color único que combine fenómenos de distinta naturaleza.

### 4.5. Edición y cierre

Una solicitud confirmada es inmutable para el jefe de Comuna: no puede editarla ni cancelarla.

La recepción concluye con conformidad o con observaciones. Una solicitud puede cerrarse cuando no existan autorizaciones ni líneas en curso.

El estado `CLOSED` no implica que todas las necesidades hayan sido satisfechas. Los saldos no atendidos permanecen registrados como parte del resultado histórico.

## 5. Carácter del diseño

Las tecnologías, los proveedores cloud y las políticas técnicas descritas son decisiones de referencia para una implementación posterior. Su especificación no implica que el sistema esté desplegado, que exista disponibilidad contratada ni que las integraciones externas estén operativas.

# Problema y objetivos de Alivía

## 1. Contexto de operación

Alivía es una plataforma web para coordinar y dar seguimiento a la distribución de ayuda humanitaria, orientada inicialmente a comunidades, caseríos y albergues de Piura. Opera en escenarios de desastres naturales y restricciones de acceso que dificultan identificar necesidades, coordinar recursos entre ONG y verificar entregas.

Integra a responsables comunitarios, administradores de ONG, responsables de brigada y Defensa Civil, con acceso a información y funciones según sus respectivos roles.

El riesgo territorial no determina por sí solo el nivel de atención de una comunidad, del mismo modo que la ayuda despachada no equivale necesariamente a ayuda recibida. Por ello, Alivía diferencia el riesgo del avance humanitario y distingue las cantidades solicitadas, autorizadas, retiradas, recibidas y conformes.

## 2. Problema central

La fragmentación de información sobre solicitudes, inventarios, autorizaciones, despachos y recepciones dificulta conocer qué comunidades necesitan ayuda, qué recursos utilizables tienen las ONG, cuánto se ha comprometido y qué cantidades llegaron en condiciones aceptables.

### 2.1. Consecuencias observables

1. Una misma existencia puede comprometerse más de una vez si las autorizaciones no se contrastan con el inventario disponible.
2. Las decisiones logísticas pueden basarse en información vial desactualizada o ignorar bloqueos conocidos.
3. Una entrega puede darse por concluida al registrar su llegada, sin verificar las cantidades ni el estado de los productos.
4. Pueden persistir necesidades sin cobertura y discrepancias de recepción no documentadas.
5. La supervisión territorial puede confundir el nivel de riesgo con la cantidad de ayuda recibida.
6. Los reportes sísmicos o meteorológicos pueden interpretarse erróneamente como declaraciones de emergencia.

## 3. Objetivo general

Diseñar una plataforma web que centralice las necesidades de las comunidades, proponga asignaciones según inventarios utilizables, gestione autorizaciones y despachos, verifique recepciones y facilite la supervisión del riesgo territorial y las brechas de atención, con trazabilidad y control de acceso por rol.

## 4. Objetivos específicos

| Código | Objetivo                        | Resultado esperado                                                                                               |
| ------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| OBJ-01 | Centralizar solicitudes         | Cada solicitud identifica la comunidad, su situación, población y necesidades cuantificadas.                     |
| OBJ-02 | Mantener inventarios confiables | Las existencias, autorizaciones y retiros se gestionan sin generar sobreasignaciones.                            |
| OBJ-03 | Proponer ayuda de varias ONG    | El matching identifica opciones de cobertura sin comprometer inventario durante la propuesta.                    |
| OBJ-04 | Controlar la salida de ayuda    | La preparación y el retiro completo requieren una autorización válida.                                           |
| OBJ-05 | Evaluar rutas                   | Se impide confirmar el retiro si la ruta está indisponible por bloqueos conocidos.                               |
| OBJ-06 | Verificar entregas              | La comunidad diferencia las cantidades enviadas, recibidas físicamente y conformes.                              |
| OBJ-07 | Mantener trazabilidad           | Cada acción crítica registra su responsable, momento y resultado.                                                |
| OBJ-08 | Proporcionar supervisión        | Defensa Civil consulta el riesgo y la atención sin modificar operaciones ni acceder a inventarios de ONG.        |
| OBJ-09 | Integrar observaciones externas | Cada dato conserva su fuente, fecha y estado de validación, sin generar declaraciones automáticas de emergencia. |

## 5. Indicadores de cumplimiento

- Las autorizaciones válidas no comprometen más unidades utilizables de las disponibles.
- La repetición accidental de autorizaciones, retiros o recepciones no genera registros duplicados.
- Cada recepción registra cantidades conformes y discrepancias por producto.
- Los recursos autorizados, pero aún no entregados, permanecen identificados como pendientes de atención.
- Los usuarios solo pueden operar sobre datos y recursos permitidos por su rol y entidad.
- La representación cartográfica distingue el riesgo territorial de la cobertura de atención.
- Los datos de fuentes externas y los resultados operativos conservan su identificación y fecha.

Estos indicadores establecen criterios de diseño y verificación; no implican que las funcionalidades ya estén implementadas.

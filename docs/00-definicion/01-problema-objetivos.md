# Problema y objetivos de Alivía

## 1. Contexto de operación

Alivía es una plataforma web de coordinación y trazabilidad de ayuda humanitaria dirigida inicialmente a comunidades, caseríos y albergues de Piura. Atiende escenarios en los que desastres naturales y restricciones de acceso dificultan identificar necesidades, coordinar recursos de varias ONG y comprobar entregas. Conecta a responsables comunitarios, administradores de ONG, responsables de brigada y Defensa Civil mediante información operativa diferenciada por rol.

La situación de una comunidad no se deduce únicamente de la intensidad del desastre, ni la ayuda enviada equivale a ayuda recibida. El sistema debe conservar ambas distinciones: riesgo territorial frente a avance humanitario, y recursos solicitados frente a recursos autorizados, retirados y conformes.

## 2. Problema central

La fragmentación de solicitudes, inventarios, autorizaciones, traslados y recepciones provoca que los participantes desconozcan qué comunidades esperan ayuda, qué ONG cuentan con existencias utilizables, cuánto se ha comprometido y qué cantidades llegaron en condiciones aceptables.

### 2.1. Consecuencias observables

1. Una misma existencia puede prometerse dos veces si las autorizaciones no se concilian contra inventario.
2. Las decisiones logísticas pueden basarse en rutas ya afectadas por bloqueos o información vial obsoleta.
3. Una entrega puede considerarse terminada simplemente por registrar la llegada, sin verificar cantidad o estado de los productos.
4. Las comunidades pueden quedar con necesidades sin cobertura o con discrepancias no documentadas.
5. La supervisión territorial puede confundir riesgo del fenómeno con cantidad de ayuda recibida.
6. Un reporte de fuente sísmica o meteorológica puede interpretarse equivocadamente como una emergencia declarada.

## 3. Objetivo general

Diseñar una plataforma web que registre necesidades de comunidades, proponga asignaciones de ayuda de acuerdo con inventarios utilizables, controle autorizaciones y despachos, verifique recepciones y permita supervisar el riesgo territorial y las brechas de atención mediante información trazable y permisos específicos.

## 4. Objetivos específicos

| Código | Objetivo | Resultado esperado |
|---|---|---|
| OBJ-01 | Centralizar solicitudes | Cada solicitud identifica comunidad, situación, población y necesidades cuantificadas. |
| OBJ-02 | Mantener inventarios confiables | Las existencias, autorizaciones y retiros no generan sobreasignación. |
| OBJ-03 | Proponer ayuda de varias ONG | El matching identifica cobertura sin comprometer inventario al proponer. |
| OBJ-04 | Controlar la salida de ayuda | Solo una autorización válida habilita la preparación y el retiro completo. |
| OBJ-05 | Evaluar rutas | No se confirma retiro cuando la ruta está indisponible por bloqueos conocidos. |
| OBJ-06 | Verificar entrega | La comunidad distingue lo enviado, lo recibido físicamente y lo conforme. |
| OBJ-07 | Mantener trazabilidad | Se conoce responsable, momento y resultado de cada acción crítica. |
| OBJ-08 | Proporcionar supervisión | Defensa Civil observa riesgo y atención sin modificar operaciones ni acceder a inventarios de ONG. |
| OBJ-09 | Integrar observaciones externas | Cada dato conserva fuente, fecha y estado de validación sin declarar emergencias automáticamente. |

## 5. Indicadores de cumplimiento

- Ninguna autorización válida compromete más unidades utilizables de las disponibles.
- Una autorización, retiro o recepción repetida por error no genera duplicados.
- Las recepciones registran cantidad conforme y discrepancias por producto.
- Los faltantes nunca se ocultan por considerar «entregado» lo meramente autorizado.
- Ningún usuario opera sobre datos de otra entidad fuera de sus permisos.
- La representación cartográfica diferencia el riesgo de la cobertura de atención.
- Las fuentes externas y los resultados de operación aparecen identificados y fechados.

Estos son criterios de diseño y verificación, no declaraciones de software ya implementado.

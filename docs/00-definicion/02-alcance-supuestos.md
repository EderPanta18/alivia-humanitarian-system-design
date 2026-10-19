# Alcance y límites de Alivía

## 1. Alcance funcional de referencia

Alivía contempla un escenario de emergencia activo, cuatro roles humanos y seis macroprocesos. La arquitectura se especifica para una implementación web con frontend y backend separados; los datos operativos iniciales pueden precargarse para la validación del sistema.

| Área | Comportamiento incluido |
|---|---|
| Identidad | Inicio de sesión, rol único, jefe único por entidad y autorización del lado del servidor. |
| Solicitudes | Comunidad identificada por la sesión; productos, población afectada, situación, validación y confirmación no cancelable. |
| Matching | Cálculo de cobertura, filtro de lotes utilizables, prioridad determinista, FEFO y propuestas por ONG. |
| ONG | Inventarios, movimientos, respuesta a propuestas, confirmación de cantidades y autorización posterior. |
| Brigada | Consulta de despacho, disponibilidad de ruta, verificación del retiro completo y registro de llegada. |
| Recepción | Comparación por línea, conformidad o cierre con observaciones; discrepancias internas. |
| Documentos | Manifiesto de despacho Excel y acta de entrega PDF tras recepción finalizada. |
| Territory | Riesgos históricos por desastre/comunidad, observaciones geográficas, fuente y fecha; mapas independientes de riesgo y atención. |
| Defensa Civil | Consultas territoriales y de atención de solo lectura; informe consolidado únicamente al cierre configurado. |
| Ingesta | Importación de observaciones y avisos externos, con procedencia y fecha; ningún reporte externo activa operaciones por sí solo. |

## 2. Límites operativos

- Ámbito territorial inicial: Piura. El modelo admite otras localidades mediante datos, sin agregar reglas territoriales fijas.
- Estado de emergencia: contexto activo configurado previamente por administración técnica. No hay interfaz para que los cuatro roles declaren o cierren emergencias.
- Cierre del escenario: la señal preconfigurada `EMERGENCIA_FINALIZADA` congela una sola instantánea final, independiente de las recepciones individuales.
- Escenarios simultáneos: la coordinación entre emergencias concurrentes no está incluida en la primera versión funcional. Los datos se identifican por emergencia para favorecer evolución posterior.
- Las rutas calculadas son propuestas basadas en evidencia vial conocida, nunca una garantía física de tránsito.

## 3. Exclusiones

1. No gestionar conductores, matrículas, flota ni asignación interna de transportistas.
2. No proporcionar GPS continuo o seguimiento automático en vivo.
3. No registrar incidentes internos del trayecto como operaciones de usuario; las discrepancias de recepción sí se conservan.
4. No activar matching automáticamente por faltantes de una recepción ya finalizada.
5. No admitir retiro parcial ni devolución operativa de inventario en el flujo principal.
6. No administrar personas beneficiarias individualmente ni recoger padrones nominales.
7. No permitir que Defensa Civil consulte lotes/stock privado ni modifique datos operativos.
8. No generar una declaración automática de emergencia a partir de un dato del IGP, SENAMHI o satélite.
9. No afirmar que una fuente externa tiene API autorizada si solo publica datos para consulta.
10. No requerir microservicios, GIS propio, predicción satelital ni infraestructura de alta disponibilidad sin dimensionamiento real.

## 4. Decisiones de diseño fijadas

### 4.1. Matching y prioridad

El sistema calcula una prioridad **relativa y reproducible** por necesidad, no un nivel oficial de emergencia. Utiliza tres factores disponibles en el modelo: criticidad normalizada de la categoría de producto (50 %), población afectada normalizada contra una referencia configurable (30 %) y antigüedad en días contra un horizonte configurable (20 %). La población usa como referencia inicial 1 000 personas y la antigüedad siete días; cada factor se trunca a 1. Los empates se resuelven por fecha de confirmación más antigua y UUID ascendente. Los valores constituyen una **política de software seleccionada para la versión de referencia**, no una ponderación oficial validada por una autoridad humanitaria. La fórmula se documenta en la especificación de matching.

### 4.2. Disparadores de matching

Se ejecuta al confirmar una solicitud, registrar inventario utilizable nuevo o corregido, o rechazar/reducir una propuesta. Una tarea en cola procesa cada evento con una clave idempotente; la propuesta no compromete stock. Las porciones ya autorizadas y los faltantes cerrados con observaciones se excluyen de propuestas nuevas.

### 4.3. Comprobación de ruta

Antes del retiro se calcula o renueva la ruta. Una ruta se considera utilizable cuando no contiene tramos registrados como `IMPASSABLE`, no depende de tramos `UNKNOWN` y su verificación tiene menos de treinta minutos desde la evaluación más reciente. Al exceder ese plazo se reevalúa. El valor de treinta minutos es una regla técnica del diseño, no una medición garantizada de la frecuencia de actualización externa.

### 4.4. Riesgo territorial

Los riesgos conservan fuente, desastre y fecha. Ante varios registros se muestra cada capa de riesgo por separado; la vista resumida elige la evaluación más reciente por tipo de desastre y fuente, sin inferir que una entrega humanitaria reduzca riesgo. No se calcula un color único agregado de fenómenos heterogéneos.

### 4.5. Edición y cierre

Una solicitud confirmada es inmutable para el jefe de Comuna; no se edita ni cancela. La recepción finaliza conforme o con observaciones. La solicitud puede cerrarse cuando no queden autorizaciones o líneas en curso; `CLOSED` no significa satisfacción completa y conserva el saldo no atendido como resultado histórico.

## 5. Carácter del diseño

Tecnologías, proveedores cloud y políticas técnicas son elecciones de referencia para construcción posterior. Ninguna especificación constituye evidencia de un despliegue operativo, una disponibilidad contratada o integraciones externas ya conectadas.

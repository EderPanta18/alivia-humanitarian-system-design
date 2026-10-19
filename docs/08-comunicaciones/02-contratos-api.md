# Contratos de API REST

## 1. Convenciones de contrato

Los endpoints listados constituyen la interfaz seleccionada para el diseño, no evidencia de que estén implementados. Prefijo común `/v1`; los recursos se identifican por UUID; peticiones JSON validadas por DTO y esquema; respuestas tipadas.

```json
{"success":true,"data":{"id":"uuid","status":"OPEN"},"meta":{"requestId":"uuid"}}
```

Para paginación: `page`, `pageSize`, `totalItems`, `totalPages`; `pageSize` predeterminado 20 y máximo 100. En errores se devuelve `application/problem+json`, sin `success=true`.

## 2. Catálogo de operaciones

| Método y ruta | Actor | Efecto |
|---|---|---|
| `POST /v1/auth/login` | Todos | Crea sesión y cookie HttpOnly. |
| `POST /v1/auth/logout` | Todos | Revoca sesión/cookie. |
| `GET /v1/auth/me` | Todos | Devuelve rol, identidad y entidad de alcance. |
| `GET /v1/catalog/products` | Comuna, ONG | Productos activos, unidades y múltiplos. |
| `POST /v1/requests` | Comuna | Crea solicitud confirmada de su propia comunidad. |
| `GET /v1/requests` | Comuna | Solicitudes de su comunidad, paginadas. |
| `GET /v1/requests/{id}` | Comuna | Detalle, cobertura y recepciones vinculadas. |
| `GET /v1/ong/stocks` | ONG | Existencias de sus propios almacenes. |
| `POST /v1/ong/stocks/entries` | ONG | Registra entrada válida y movimiento. |
| `POST /v1/ong/stocks/adjustments` | ONG | Ajuste justificado con validación de compromisos. |
| `GET /v1/ong/proposals` | ONG | Propuestas propias con cantidad y prioridad. |
| `POST /v1/ong/proposals/{id}/confirm` | ONG | Confirma cantidades iguales o menores a las propuestas. |
| `POST /v1/ong/proposals/{id}/reject` | ONG | Rechaza con motivo obligatorio. |
| `POST /v1/ong/proposals/{id}/authorize` | ONG | Autoriza salida y compromete stock atómicamente. |
| `GET /v1/brigade/dispatches` | Brigada | Despachos propios autorizados y estados. |
| `GET /v1/brigade/dispatches/{id}/route` | Brigada | Ruta y evidencia de vigencia disponibles. |
| `POST /v1/brigade/dispatches/{id}/withdraw` | Brigada | Retiro completo y descuento idempotente. |
| `POST /v1/brigade/dispatches/{id}/arrive` | Brigada | Registra llegada con fecha de servidor. |
| `POST /v1/receipts` | Comuna | Confirma única recepción por despacho dirigido a la comunidad. |
| `GET /v1/receipts/{id}` | Comuna | Resultado propio conforme o con observaciones. |
| `GET /v1/dispatches/{id}/documents` | ONG, Comuna, Brigada según titularidad | Metadatos y enlaces autorizados de documentos finales. |
| `GET /v1/supervision/territory` | Defensa Civil | Riesgo territorial por comunidad/fenómeno. |
| `GET /v1/supervision/coverage` | Defensa Civil | Brechas, autorizado, enviado y recibido conforme. |
| `GET /v1/supervision/deliveries` | Defensa Civil | Entregas finalizadas, filtros por zona/producto/fecha. |
| `GET /v1/supervision/final-reports` | Defensa Civil | Informes ya publicados, sin datos privados de stock. |

Los procesos internos de matching, ingesta y cierre no necesitan endpoints públicos para actores humanos. Se ejecutan por eventos autorizados del servidor; nunca mediante una URL pública que declare emergencias.

## 3. Ejemplo de creación de solicitud

```json
{
 "affectedPopulation":80,
 "situation":"Inundación con acceso limitado",
 "items":[
  {"productId":"producto-uuid-1","quantity":"100"},
  {"productId":"producto-uuid-2","quantity":"20"}
 ]
}
```

La comunidad y emergencia activa provienen de la sesión y contexto de escenario. Los UUID son marcadores de ejemplo, no IDs reales. Respuesta `201` con solicitud, líneas y estado `OPEN`. Dos líneas del mismo producto o una cantidad no positiva devuelven `422`.

## 4. Contratos críticos

- **Confirmación ONG:** `items:[{matchingItemId,confirmedQuantity}]`; `0 <= confirmed <= proposed`, rechazo si todas son cero. Se guarda responsable y fecha.
- **Autorización:** cuerpo de comando sin cantidades editables; estado de propuesta `CONFIRMED`; encabezado `Idempotency-Key` obligatorio.
- **Retiro:** `confirmFullWithdrawal:true`; solo después de ruta `AVAILABLE` vigente y coincidencia total con lo autorizado; clave idempotente.
- **Recepción:** `dispatchId`, `items:[{dispatchItemId,receivedQuantity,conformingQuantity,observations}]`, `observations` generales; servidor deriva `missingQuantity` y resultado. Clave idempotente.
- **Lectura de mapa:** campos `communityId`, `coordinates`, `catastrophe`, `riskLevel`, `source`, `assessedAt`; `coverage` se presenta separado como información de atención.
- **Control de acceso:** `403` ante entidad ajena, aun si se manipula la URL; el cliente no decide el propietario.

## 5. Versionado

Cambios compatibles pueden agregar propiedades opcionales; renombrar/cambiar significado de propiedades obliga a nueva versión mayor o transición explícita. El contrato se prueba con ejemplos y validación automática; no se propaga una URL de pantalla dentro del modelo de dominio.

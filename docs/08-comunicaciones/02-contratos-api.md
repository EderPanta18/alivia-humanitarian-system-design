# Contratos de API REST

## 1. Convenciones generales

Alivía expone una API REST con prefijo `/v1`, recursos identificados mediante UUID y comunicación JSON sobre HTTPS.

Las peticiones se validan mediante DTO y esquemas, mientras que las respuestas mantienen una estructura tipada.

**Respuesta exitosa:**

```json
{
    "success": true,
    "data": {
        "id": "uuid",
        "status": "OPEN"
    },
    "meta": {
        "requestId": "uuid"
    }
}
```

Las consultas paginadas incluyen `page`, `pageSize`, `totalItems` y `totalPages`, con un tamaño de página predeterminado de 20 y máximo de 100.

Los errores utilizan `application/problem+json`, sin incluir `success: true`.

Estos contratos definen la interfaz prevista y no implican que los endpoints ya estén implementados.

## 2. Catálogo de endpoints

| Método y ruta                               | Actor                | Operación                                                         |
| ------------------------------------------- | -------------------- | ----------------------------------------------------------------- |
| `POST /v1/auth/login`                       | Todos                | Autenticar usuario y establecer sesión mediante cookie HttpOnly.  |
| `POST /v1/auth/logout`                      | Todos                | Revocar sesión y cookie.                                          |
| `GET /v1/auth/me`                           | Todos                | Consultar identidad, rol y entidad vinculada.                     |
| `GET /v1/catalog/products`                  | Comuna, ONG          | Consultar productos activos, unidades y múltiplos de entrega.     |
| `POST /v1/requests`                         | Comuna               | Registrar solicitud confirmada de su comunidad.                   |
| `GET /v1/requests`                          | Comuna               | Consultar solicitudes propias con paginación.                     |
| `GET /v1/requests/{id}`                     | Comuna               | Consultar detalle, cobertura y recepciones vinculadas.            |
| `GET /v1/ong/stocks`                        | ONG                  | Consultar existencias de almacenes propios.                       |
| `POST /v1/ong/stocks/entries`               | ONG                  | Registrar ingresos y movimientos de inventario.                   |
| `POST /v1/ong/stocks/adjustments`           | ONG                  | Registrar ajustes justificados respetando compromisos.            |
| `GET /v1/ong/proposals`                     | ONG                  | Consultar propuestas propias, cantidades y prioridades.           |
| `POST /v1/ong/proposals/{id}/confirm`       | ONG                  | Confirmar cantidades iguales o inferiores a las propuestas.       |
| `POST /v1/ong/proposals/{id}/reject`        | ONG                  | Rechazar una propuesta con motivo obligatorio.                    |
| `POST /v1/ong/proposals/{id}/authorize`     | ONG                  | Autorizar salida y comprometer existencias atómicamente.          |
| `GET /v1/brigade/dispatches`                | Brigada              | Consultar despachos asignados y sus estados.                      |
| `GET /v1/brigade/dispatches/{id}/route`     | Brigada              | Consultar ruta y vigencia de su verificación.                     |
| `POST /v1/brigade/dispatches/{id}/withdraw` | Brigada              | Confirmar retiro completo y descuento idempotente.                |
| `POST /v1/brigade/dispatches/{id}/arrive`   | Brigada              | Registrar llegada con fecha del servidor.                         |
| `POST /v1/receipts`                         | Comuna               | Confirmar recepción única de un despacho propio.                  |
| `GET /v1/receipts/{id}`                     | Comuna               | Consultar recepción conforme o con observaciones.                 |
| `GET /v1/dispatches/{id}/documents`         | ONG, Comuna, Brigada | Consultar documentos según titularidad.                           |
| `GET /v1/supervision/territory`             | Defensa Civil        | Consultar riesgos por comunidad y fenómeno.                       |
| `GET /v1/supervision/coverage`              | Defensa Civil        | Consultar brechas y cantidades autorizadas, enviadas y conformes. |
| `GET /v1/supervision/deliveries`            | Defensa Civil        | Consultar entregas por zona, producto y fecha.                    |
| `GET /v1/supervision/final-reports`         | Defensa Civil        | Consultar informes finales publicados.                            |

Los procesos automáticos de matching, ingesta y cierre se ejecutan mediante eventos autorizados del servidor, sin endpoints públicos para declarar emergencias.

## 3. Contrato de creación de solicitudes

**Endpoint:** `POST /v1/requests`

**Ejemplo de petición:**

```json
{
    "affectedPopulation": 80,
    "situation": "Inundación con acceso limitado",
    "items": [
        {
            "productId": "producto-uuid-1",
            "quantity": "100"
        },
        {
            "productId": "producto-uuid-2",
            "quantity": "20"
        }
    ]
}
```

La comunidad se identifica mediante la sesión y la emergencia corresponde al escenario activo configurado. Los identificadores del ejemplo son marcadores ficticios.

**Respuesta esperada:** `201 Created`, con la solicitud, sus líneas y el estado `OPEN`.

**Validación:** los productos duplicados y las cantidades no positivas generan `422 Unprocessable Content`.

## 4. Contratos de operaciones críticas

### 4.1. Confirmación de aportes

**Endpoint:** `POST /v1/ong/proposals/{id}/confirm`

El cuerpo contiene:

`items: [{ matchingItemId, confirmedQuantity }]`

Cada cantidad debe cumplir `0 <= confirmedQuantity <= proposedQuantity`.

Si todas las cantidades son cero, corresponde un rechazo motivado. La operación conserva el responsable y la fecha de la decisión, sin autorizar todavía la salida.

### 4.2. Autorización de salida

**Endpoint:** `POST /v1/ong/proposals/{id}/authorize`

Requiere una propuesta en estado `CONFIRMED` y la cabecera `Idempotency-Key`.

El cuerpo del comando no admite modificar cantidades. El servidor revalida disponibilidad y cobertura antes de registrar atómicamente la autorización.

### 4.3. Confirmación de retiro

**Endpoint:** `POST /v1/brigade/dispatches/{id}/withdraw`

El cuerpo incluye:

`confirmFullWithdrawal: true`

La operación requiere:

- Ruta `AVAILABLE` con verificación vigente.
- Coincidencia física con la totalidad de las cantidades autorizadas.
- Cabecera `Idempotency-Key`.

El retiro confirmado produce un único descuento de inventario. No se admiten retiros parciales.

### 4.4. Confirmación de recepción

**Endpoint:** `POST /v1/receipts`

El cuerpo contiene:

```json
{
    "dispatchId": "despacho-uuid",
    "items": [
        {
            "dispatchItemId": "linea-uuid",
            "receivedQuantity": "80",
            "conformingQuantity": "75",
            "observations": "5 unidades dañadas"
        }
    ],
    "observations": "Recepción con observaciones"
}
```

El servidor calcula `missingQuantity` respecto a la cantidad enviada y determina el resultado `CONFORMING` o `WITH_OBSERVATIONS`.

La confirmación requiere `Idempotency-Key` y no permite registrar más de una recepción final por despacho.

### 4.5. Consulta territorial

**Endpoint:** `GET /v1/supervision/territory`

La información de riesgo utiliza los campos:

- `communityId`
- `coordinates`
- `catastrophe`
- `riskLevel`
- `source`
- `assessedAt`

Los datos de cobertura se presentan separadamente del riesgo territorial.

## 5. Autorización y versionado

### 5.1. Control de acceso

El servidor valida rol y titularidad en cada operación.

Las solicitudes sobre recursos ajenos devuelven `403 Forbidden`, incluso si el cliente modifica manualmente sus identificadores. La interfaz no determina los permisos efectivos.

### 5.2. Evolución de contratos

Los cambios compatibles pueden incorporar propiedades opcionales sin modificar el significado de las existentes.

Renombrar propiedades, alterar su semántica o introducir cambios incompatibles requiere una nueva versión mayor o un mecanismo explícito de transición.

Los contratos deben verificarse mediante ejemplos y validación automatizada. Las rutas de interfaz y los endpoints HTTP no forman parte de las reglas del dominio.

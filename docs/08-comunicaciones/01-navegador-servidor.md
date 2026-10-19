# Comunicación entre navegador y servidor

## 1. Modelo de interacción

Alivía utiliza un frontend Next.js y una API NestJS independientes, comunicados mediante HTTPS. El frontend envía solicitudes JSON a la API, que valida identidad, permisos y datos antes de ejecutar los casos de uso y acceder a PostgreSQL.

Las integraciones externas se realizan desde el backend para evitar exponer credenciales en el navegador.

```mermaid
sequenceDiagram
    autonumber
    participant U as Usuario
    participant B as Navegador
    participant N as Next.js
    participant A as API NestJS
    participant D as PostgreSQL

    U->>B: Confirma acción
    B->>N: HTTPS
    N->>A: HTTPS JSON con sesión
    A->>A: Validar identidad, titularidad y datos
    A->>D: Transacción autorizada
    D-->>A: Resultado persistido
    A-->>N: Respuesta tipada
    N-->>B: Actualización visible
    B-->>U: Confirmación o error
```

## 2. Protocolos y contratos

La comunicación debe cumplir las siguientes convenciones:

- **Transporte:** HTTPS con TLS válido y redirección desde HTTP.
- **API:** REST con JSON y rutas versionadas mediante `/v1`. Las direcciones se gestionan mediante configuración.
- **Identificadores:** UUID para recursos.
- **Fechas:** ISO 8601 en UTC.
- **Cantidades:** cadenas decimales normalizadas cuando se requiera precisión exacta de inventario, evitando errores de coma flotante.
- **Errores:** respuestas `application/problem+json` con `type`, `title`, `status`, `detail`, `instance` y `requestId`, sin exponer trazas internas ni secretos.

### Códigos de respuesta HTTP

| Código | Uso                                                       |
| ------ | --------------------------------------------------------- |
| `200`  | Consulta o actualización exitosa.                         |
| `201`  | Recurso creado.                                           |
| `204`  | Operación exitosa sin cuerpo de respuesta.                |
| `400`  | Petición mal formada.                                     |
| `401`  | Autenticación ausente o inválida.                         |
| `403`  | Operación no autorizada para el usuario.                  |
| `404`  | Recurso inexistente u oculto por restricciones de acceso. |
| `409`  | Conflicto de estado o concurrencia.                       |
| `422`  | Datos semánticamente inválidos.                           |
| `429`  | Límite de solicitudes excedido.                           |
| `500`  | Error interno no previsto.                                |

## 3. Sesión y credenciales

El backend emite un JWT validado mediante firma, expiración y audiencia. El navegador transporta la sesión mediante una cookie con los atributos:

- `HttpOnly`: impide el acceso al token desde JavaScript.
- `Secure`: restringe su transmisión a conexiones HTTPS.
- `SameSite=Lax`: limita su envío en determinados contextos entre sitios.

Next.js utiliza un proxy de servidor para comunicarse con la API desde un contexto de mismo sitio, reduciendo la complejidad de CORS y evitando exponer el JWT al código del navegador.

Las operaciones de escritura autenticadas mediante cookies requieren protección CSRF y validación de origen.

## 4. Idempotencia y consistencia de operaciones

Las operaciones críticas, como autorizaciones, retiros y recepciones, utilizan una cabecera `Idempotency-Key` para evitar efectos duplicados.

El frontend debe:

- Deshabilitar temporalmente la acción mientras se procesa la solicitud.
- Actualizar el estado visible únicamente después de recibir una respuesta confirmada.
- Consultar el estado de la operación ante fallos de red antes de reintentar.
- Evitar interpretar la desaparición de un indicador de carga como confirmación de éxito.

Los reintentos deben conservar la identidad de la operación original para impedir autorizaciones, descuentos o recepciones duplicadas.

## 5. Actualización de información

La versión de referencia utiliza consultas HTTP con revalidación después de cada operación y actualizaciones periódicas moderadas para las bandejas de trabajo.

WebSocket no forma parte del alcance inicial. Su incorporación requiere justificar la necesidad de comunicación en tiempo real y definir mecanismos de ordenamiento, reconexión y recuperación de eventos.

La plataforma no proporciona seguimiento GPS continuo ni detección instantánea de bloqueos viales.

## 6. Conectividad y accesibilidad

La interfaz debe contemplar conexiones inestables mediante indicadores de conectividad, mensajes de error comprensibles y reintentos seguros.

No se implementa un modo completamente offline con sincronización diferida. Las operaciones de escritura sin confirmación del servidor no se consideran completadas.

Los estados y resultados deben presentarse mediante etiquetas textuales, sin depender exclusivamente de colores.

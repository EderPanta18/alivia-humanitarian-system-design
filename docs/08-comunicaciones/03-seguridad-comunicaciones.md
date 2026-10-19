# Seguridad de comunicaciones y autorización

## 1. Objetivos de seguridad

La seguridad de Alivía busca garantizar la autenticidad de los usuarios, la confidencialidad de la información operativa, la integridad de las operaciones y su trazabilidad.

La API constituye el punto de control de acceso y debe validar los permisos y la titularidad de los recursos en cada consulta o modificación. Las restricciones visuales del frontend no sustituyen estas comprobaciones.

## 2. Amenazas y controles

| Amenaza                        | Control de seguridad                                                                                       | Verificación                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Suplantación de identidad      | Contraseñas protegidas con Argon2id, sesiones firmadas, expiración y revocación.                           | Un JWT inválido o expirado devuelve `401`.                                                   |
| Acceso entre ONG               | Autorización por entidad y verificación de titularidad del recurso.                                        | ONG A no puede consultar ni autorizar recursos de ONG B.                                     |
| Escalada de privilegios        | Roles determinados por el servidor, sin confiar en valores enviados por el cliente.                        | Un usuario de Comuna no puede autorizar salidas.                                             |
| CSRF                           | Cookies `SameSite`, validación de `Origin` y tokens CSRF para operaciones de escritura según la topología. | Una petición entre sitios sin protección válida no modifica registros.                       |
| XSS                            | Escape de contenido, política CSP y prohibición de almacenar tokens en `localStorage`.                     | Los campos de texto no permiten ejecutar scripts.                                            |
| Repetición de comandos         | Claves idempotentes y validación transaccional de estados.                                                 | Una confirmación repetida no duplica descuentos.                                             |
| Filtración de credenciales     | Exclusión de contraseñas, JWT, cookies y datos personales sensibles de los logs.                           | Los registros no exponen credenciales ni secretos.                                           |
| Manipulación de datos externos | Validación de esquema, fuente, fecha y ubicación.                                                          | Una observación inválida no activa operaciones ni genera evaluaciones de riesgo arbitrarias. |
| Acceso indebido a documentos   | Autorización en la API y URLs firmadas de corta duración para archivos.                                    | Un usuario sin permisos recibe `403`.                                                        |

## 3. Gestión de sesiones

Las sesiones web deben cumplir las siguientes condiciones:

- **Cookies:** utilizar `HttpOnly`, `Secure` sobre HTTPS y `SameSite=Lax` cuando la comunicación se realice mediante el proxy de mismo sitio.
- **Comunicación entre servicios:** emplear un proxy seguro de Next.js sin exponer el JWT a JavaScript.
- **Validación de tokens:** verificar emisor, firma, audiencia, expiración y revocación en el backend.
- **Contraseñas:** transmitirlas exclusivamente mediante TLS, impedir su registro en logs y aplicar límites de intentos para mitigar ataques de fuerza bruta.
- **Cierre de sesión:** invalidar la cookie y revocar el token o la sesión correspondiente en el servidor.

## 4. Autorización por recurso

Cada operación se valida según el usuario autenticado, su rol, la entidad vinculada y el recurso solicitado.

| Rol            | Ámbito autorizado                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `comuna`       | Solicitudes, despachos y recepciones de su comunidad.                                                                             |
| `ong`          | Inventarios, propuestas, autorizaciones y aportes de su organización.                                                             |
| `brigada`      | Despachos asignados a su brigada y operaciones logísticas permitidas.                                                             |
| `defensaCivil` | Consultas territoriales y de atención de solo lectura, además de informes finales publicados, sin acceder a inventarios privados. |

La administración técnica de fuentes externas y escenarios de emergencia permanece fuera de los roles operativos públicos.

## 5. Protección de datos e infraestructura

- **Comunicaciones:** utilizar TLS para conexiones externas.
- **Base de datos:** restringir el acceso y las credenciales a los servicios autorizados del backend.
- **Secretos:** gestionarlos mediante mecanismos seguros del proveedor de infraestructura.
- **Respaldos:** mantener copias de seguridad cifradas.
- **Privacidad:** no recopilar nombres ni DNI de beneficiarios. Las ubicaciones corresponden a comunidades y almacenes, sin seguimiento individual de personas.
- **Auditoría:** conservar registros de operaciones y accesos a información sensible conforme a la política de retención establecida.

## 6. Respuesta a incidentes

Ante un incidente de seguridad, las medidas aplicables incluyen:

1. Revocar sesiones o tokens comprometidos y rotar las credenciales afectadas.
2. Restringir temporalmente operaciones críticas cuando el impacto lo requiera.
3. Preservar registros y evidencias para investigar el incidente.
4. Recuperar y verificar la integridad del servicio antes de restablecer las operaciones afectadas.

Las correcciones no deben eliminar ni sobrescribir eventos históricos de auditoría.

Las alertas automáticas se limitan a incidentes y fallos técnicos, sin ejecutar decisiones humanitarias autónomas.

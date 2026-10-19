# Seguridad de comunicaciones y autorización

## 1. Objetivos de seguridad

Proteger autenticidad de usuarios, confidencialidad de datos operativos, integridad de comandos y trazabilidad de acciones. La interfaz no constituye una frontera de seguridad; la API vuelve a verificar cada lectura y escritura.

## 2. Amenazas y controles

| Amenaza | Medida de diseño | Verificación |
|---|---|---|
| Suplantación | Hash Argon2id, sesión firmada, vencimiento y revocación | JWT inválido/expirado devuelve 401. |
| Acceso entre ONG | Filtro por entidad y comparación del propietario del recurso | ONG A no lee ni autoriza recursos de ONG B. |
| Escalada de rol | Roles impuestos por servidor; jamás confiar en un `role` del JSON de usuario | Usuario Comuna no autoriza despacho. |
| CSRF | Cookie SameSite, comprobación Origin y token CSRF en comandos mutantes según topología | Petición cross-site sin protección no altera registros. |
| XSS | Escape de contenido y política CSP, sin tokens en localStorage | Campos libres no ejecutan scripts. |
| Reenvío de comandos | Clave idempotente y control de estados transaccional | Doble clic no duplica descuento. |
| Filtración por logs | Redacción de cookies, JWT, contraseñas y PII | Logs sin credenciales. |
| Datos externos alterados | Validación de esquema, fuente, fecha y geolocalización | Observación inválida no activa procesos ni riesgo arbitrario. |
| Descarga de archivos ajenos | Autorización en API y URLs de objeto firmadas de duración corta | Usuarios ajenos reciben 403. |

## 3. Sesiones web

- Cookie: `HttpOnly`, `Secure` en HTTPS y `SameSite=Lax` cuando toda sesión fluye por el mismo sitio a través del frontend.
- Enlace entre servicios: proxy servidor seguro, sin JWT expuesto a JavaScript; el backend valida emisión, firma, audiencia, caducidad y revocación.
- Contraseña: no se transmite fuera de TLS ni se registra en consola; protección contra fuerza bruta y límite de intentos de login.
- Logout: expira cookie y revoca token o sesión identificada en backend.

## 4. Autorización por recurso

Todas las consultas y comandos vinculan `actor_user_id`, `role`, entidad y objeto concreto. Un miembro de ONG accede únicamente a su ONG y sus almacenes; Comuna accede únicamente a su comunidad y recepciones; Brigada solamente a despachos asignados; Defensa Civil solo a vistas agregadas territoriales y reporte final publicado. La administración técnica de fuentes y escenarios no se expone como quinto rol público.

## 5. Seguridad de datos

TLS externo, credenciales de BD restringidas al backend, copia de seguridad cifrada y secretos gestionados por proveedor. No se recogen nombres ni DNI de beneficiarios. Ubicación geográfica almacenada corresponde a comunidad/almacén y no al seguimiento de personas. Se conservan registros de auditoría y accesos a información sensible durante el periodo establecido por la política operativa del sistema.

## 6. Respuesta a incidentes

Revocar tokens comprometidos, rotar claves, congelar temporalmente acciones críticas según impacto, conservar evidencia y recuperar servicio mediante procedimiento verificable. Nunca «arreglar» inconsistencias borrando eventos de auditoría. Las alertas automáticas se basan en errores y fallas técnicas, no en decisiones humanitarias autónomas.

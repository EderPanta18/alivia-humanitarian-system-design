# Servidores web y ejecución de aplicaciones

## 1. Arquitectura de ejecución

Alivía utiliza **Vercel** para alojar el frontend Next.js y **Render** para ejecutar la API NestJS sobre Node.js.

El navegador accede a la interfaz mediante HTTPS, con navegación y renderizado de servidor según las necesidades de cada página. Los recursos estáticos se distribuyen mediante la infraestructura de Vercel, aplicando políticas de caché adecuadas.

La comunicación entre componentes sigue estas condiciones:

- **Frontend:** utiliza un proxy seguro de Next.js hacia la API configurada, con control de origen y manejo de cookies.
- **Backend:** expone una API REST versionada mediante HTTPS, utilizando el puerto configurado en `PORT`.
- **Autorización:** la API autentica las operaciones, valida sus datos y aplica límites de recursos.
- **Persistencia:** únicamente el backend accede a PostgreSQL mediante conexiones cifradas y un pool configurado.
- **Integraciones:** los servicios externos se consumen desde adaptadores del backend, sin exponer credenciales al navegador.

Los secretos de sesión, las conexiones de base de datos y las claves de proveedores permanecen fuera del código ejecutado en el navegador.

## 2. Procesamiento de tareas

Las operaciones de matching, importación de observaciones y generación documental pueden ejecutarse inicialmente como tareas controladas e idempotentes del backend.

Si sus necesidades de procesamiento lo justifican, podrán trasladarse a workers independientes sin modificar las responsabilidades ni los contratos funcionales de los módulos.

Esta separación es una posibilidad de evolución, no un requisito de despliegue inicial.

## 3. Variables de entorno

| Variable              | Responsable      | Exposición                                                           |
| --------------------- | ---------------- | -------------------------------------------------------------------- |
| `APP_ORIGIN`          | Frontend y API   | URL pública; no es un secreto.                                       |
| `API_INTERNAL_ORIGIN` | Servidor Next.js | Configuración del servidor, no expuesta al navegador.                |
| `DATABASE_URL`        | Backend          | Secreto exclusivo del backend.                                       |
| `SESSION_SECRET`      | Backend          | Secreto con rotación programada.                                     |
| `MAP_PROVIDER_KEY`    | Backend          | Secreto cuando el proveedor lo requiera.                             |
| `SOURCE_API_KEYS`     | Backend          | Credenciales según cada fuente externa.                              |
| `DOCUMENT_STORAGE_*`  | Backend          | Credenciales privadas, excepto endpoints configurados como públicos. |

Las credenciales reales no deben almacenarse en Git. Las variables de Next.js expuestas al navegador mediante prefijos públicos nunca deben contener secretos.

## 4. Salud y despliegue

El backend expone dos endpoints de comprobación:

| Endpoint            | Propósito                                                                              |
| ------------------- | -------------------------------------------------------------------------------------- |
| `GET /health/live`  | Comprobar que el proceso responde.                                                     |
| `GET /health/ready` | Verificar que las dependencias necesarias están disponibles para procesar operaciones. |

Las respuestas no deben revelar credenciales ni cadenas de conexión. Un proceso activo no se considera necesariamente listo para atender solicitudes.

El despliegue requiere compilación correcta, validación de variables de entorno y aplicación controlada de las migraciones previamente revisadas.

## 5. Costos y continuidad

Vercel y Supabase ofrecen planes de desarrollo sujetos a sus condiciones de uso. Render dispone de instancias de pago y un servicio gratuito que puede suspenderse por inactividad.

El costo definitivo depende del tráfico, la región, el almacenamiento documental y los requisitos de disponibilidad; por tanto, no se establece una estimación anual sin mediciones y condiciones de servicio definidas.

Una instalación destinada a operaciones humanitarias reales requiere planes con disponibilidad comprobable y mecanismos de recuperación adecuados al riesgo.

**Documentación oficial:**

- Vercel: https://vercel.com/docs/
- Render: https://render.com/docs/
- Supabase: https://supabase.com/docs/

Las condiciones de los proveedores deben verificarse antes de contratar o desplegar los servicios.

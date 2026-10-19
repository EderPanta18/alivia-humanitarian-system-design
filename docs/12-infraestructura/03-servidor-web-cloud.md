# Servidores web y ejecución de aplicaciones

## 1. Frontend

Vercel aloja la aplicación Next.js. El navegador recibe UI por HTTPS y puede efectuar navegación y renderizado de servidor según las páginas. No se almacenan en el navegador secretos de sesión, conexiones de base de datos ni claves de proveedores. Los recursos estáticos se sirven mediante distribución web del proveedor y siguen una política de caché apropiada.

## 2. Backend

Render aloja un servicio web Node.js/NestJS accesible por HTTPS. El proceso expone un puerto configurado (`PORT`), endpoint de salud y API REST versionada. Las operaciones de matching, importación y documentos pueden comenzar como tareas del mismo backend con ejecución controlada e idempotente; si requieren procesamiento separado, se podrán desplegar workers sin alterar límites funcionales de los módulos.

## 3. Topología de peticiones

- Dominio público de la interfaz con certificado TLS.
- Proxy seguro desde Next.js a URL configurada de API, control de origen y cookies.
- API con autenticación de cada comando, validación y límites de recursos.
- Base PostgreSQL únicamente desde servidor, conexión cifrada y pool.
- Servicios externos solo consumidos por adaptadores autenticados del backend.

## 4. Variables de entorno

| Variable | Dueño | Exposición |
|---|---|---|
| `APP_ORIGIN` | Frontend y API | URL pública, no secreto |
| `API_INTERNAL_ORIGIN` | Frontend servidor | Configuración privada del servidor |
| `DATABASE_URL` | Backend | Secreto; solo backend |
| `SESSION_SECRET` | Backend | Secreto; rotación programada |
| `MAP_PROVIDER_KEY` | Backend | Secreto si API lo requiere |
| `SOURCE_API_KEYS` | Backend | Secreto según cada fuente |
| `DOCUMENT_STORAGE_*` | Backend | Secreto salvo endpoint público configurado |

No almacenar claves reales en repositorios. Las variables de Next.js con prefijo público jamás contendrán secretos.

## 5. Salud y despliegue

`GET /health/live` evalúa que el proceso responda; `GET /health/ready` comprueba dependencias necesarias sin revelar cadenas de conexión. La plataforma debe distinguir un proceso activo de uno listo para procesar operaciones. El despliegue inicia solo tras construir, validar variables y completar migraciones revisadas.

## 6. Costos y continuidad

Render dispone de instancias de entrada de pago y un servicio gratuito con suspensión por inactividad; Vercel y Supabase ofrecen planes de desarrollo sujetos a condiciones. No fijar el costo anual definitivo sin conocer tráfico, región, almacenamiento documental y acuerdo de disponibilidad. Para una operación humanitaria pública se necesitan planes con disponibilidad comprobable y medidas de recuperación acordes al riesgo.

Sitios oficiales: https://vercel.com/docs/ ; https://render.com/docs/ ; https://supabase.com/docs/ .

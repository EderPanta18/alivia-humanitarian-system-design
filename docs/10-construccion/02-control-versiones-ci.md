# Control de versiones e integración continua

## 1. Organización de repositorios

Alivía utiliza dos repositorios Git independientes: `frontend` y `backend`.

Los contratos HTTP se mantienen mediante una especificación OpenAPI versionada, cuya compatibilidad debe verificarse durante la integración. La documentación del sistema se gestiona sin depender de las rutas físicas de los repositorios.

## 2. Flujo de cambios

- La rama principal permanece protegida; el desarrollo se realiza en ramas cortas por capacidad.
- Cada cambio documenta su objetivo, comportamiento, pruebas y riesgos.
- Los commits deben agrupar modificaciones coherentes y verificables, sin incorporar refactorizaciones ajenas a la tarea.
- Los cambios funcionales que afecten contratos o estados requieren actualizar sus criterios de aceptación antes de integrarse.
- Las migraciones destructivas necesitan un plan de restauración y pruebas sobre datos representativos antes de fusionarse.

## 3. Integración continua

```mermaid
flowchart LR
    Commit[Commit o pull request] --> Install[Instalar dependencias reproducibles]
    Install --> Static[Biome y TypeScript]
    Static --> Unit[Pruebas unitarias]
    Unit --> Integration[Pruebas de integración]
    Integration --> Build[Compilación]
    Build --> Report[Publicar estado y evidencias]
```

Las verificaciones se adaptan a cada repositorio:

- **Backend:** pruebas unitarias y de integración contra PostgreSQL efímero, con migraciones aplicadas.
- **Frontend:** pruebas de componentes, análisis estático y compilación de Next.js.
- **Flujos transversales:** pruebas Playwright en un job de CI con servicios de prueba conectados, cuando corresponda.

El pipeline debe fallar ante cualquier verificación obligatoria incumplida y publicar el resultado asociado al commit.

## 4. Comandos de referencia

```bash
pnpm install --frozen-lockfile
pnpm exec biome check .
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

Los scripts y comandos definitivos se establecen en cada repositorio. Esta secuencia representa las verificaciones previstas, no evidencia de que hayan sido ejecutadas.

## 5. Secretos, artefactos y migraciones

- **Secretos:** no almacenar tokens, credenciales de base de datos, claves de proveedores ni cookies en Git o logs públicos.
- **Artefactos de CI:** conservar resultados de pruebas y referencias al commit, sin incluir información privada de emergencias.
- **Migraciones de producción:** ejecutarlas con permisos restringidos y revisión previa.
- **Despliegues:** evitar que la compilación aplique automáticamente migraciones destructivas sin aprobación y control.

## 6. Versiones y releases

Cada release debe identificar:

- Versión del frontend y de la API.
- Migraciones de base de datos asociadas.
- Pruebas y resultados de verificación.
- Etiqueta Git y configuración necesaria para restaurar el despliegue.

La reversión del código no revierte automáticamente cambios irreversibles en los datos. Las operaciones de restauración deben contemplar explícitamente esta limitación.

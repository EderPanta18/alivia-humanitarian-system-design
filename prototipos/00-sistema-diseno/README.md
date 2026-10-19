# Sistema de diseño de Alivía

Base común de los diez prototipos: identidad, navegación, componentes, escenario, operaciones locales y captura reproducible. No implementa servicios de producción.

## Inventario y lectura

| Archivo | Responsabilidad |
|---|---|
| `identidad-visual.md` | Tokens, referencia del ZIP y criterios de refinamiento T02. |
| `componentes-compartidos.md` | Contratos y comportamiento de componentes reutilizables. |
| `navegacion-roles.md` | Opciones exactas, orden, perfil, activos y ámbito por rol. |
| `escenario-demostracion.md` | Datos ficticios, correcciones de T00, cronología y ramas. |
| `styles.css` | Tokens, componentes, layout, mapas, diálogos y adaptación móvil. |
| `escenario.js` | Datos y cortes iniciales de las diez etapas. |
| `app.js` | Único shell, renderers e interacciones locales. |
| `verificar.cjs` | Servidor temporal, pruebas de navegador y capturas de 1600 × 1000. |
| `index.html` | Acceso al catálogo exterior de interfaces. |
| `vendor/` | JSZip 3.10.1 y PDF-Lib 1.17.1, copiados del runtime disponible, con licencias. Solo se cargan al generar documentos. |

Leer identidad, componentes, navegación y escenario en ese orden. Los documentos de contenido usan identificadores conceptuales; los inventarios de archivos se mantienen en README.

## Reutilización

Cada HTML declara únicamente su identificador y carga el mismo CSS, escenario y runtime. El sidebar, perfil y centro de notificaciones no se copian entre pantallas. Los datos visibles se limitan al rol y al corte temporal. No hay selector de rol en el producto. La apariencia de desarrollo se elimina de las vistas operativas; el carácter sintético está documentado y comentado en las fuentes.

T03 conserva esas diez entradas y las cinco variantes. `styles.css` y `app.js` reorganizan MK-01, MK-09 y MK-10 y ajustan componentes comunes: contexto secundario, ficha territorial integrada, balances por producto y microindicadores compactos. Panel continúa primero con apariencia normal, sin subtítulo o marca de implementación incompleta; su condición conceptual y la ausencia de destino se documentan aquí. `escenario.js` conserva sus datos y presenta la incertidumbre territorial como «Por verificar». Las responsabilidades, destinos y reglas de T01 permanecen intactos; no hay nuevas páginas.

La entrada directa reinicia el corte; `continuar=1` conserva la sesión local entre enlaces internos. Los comandos verifican precondiciones, cantidades y estado final para evitar efectos repetidos. Los archivos exportados se calculan de la recepción y se reutilizan en descargas posteriores de esa sesión.

## Ejecución y verificación

Abrir el catálogo o servir `prototipos/` con `python -m http.server 8080 --directory prototipos`. Las fuentes no requieren compilación ni internet. Para verificar, configurar NODE_PATH con un Playwright ya instalado y ejecutar `node prototipos/00-sistema-diseno/verificar.cjs`. El navegador predeterminado es Edge; ALIVIA_BROWSER permite seleccionar un canal Chromium instalado. No se descargan navegadores ni paquetes. Las descargas de prueba se guardan en una carpeta temporal del sistema.

No se ejecutan APIs ni permisos reales de servidor. La cartografía es esquemática; no hay teselas, cálculo real de rutas o datos institucionales conectados.

# Alivía — Guion de exposición (presentación v3)

**Universidad Nacional de Piura · Ingeniería de Software**

**Duración objetivo:** 18 min 10 s  
**Tiempo máximo:** 20 min  
**Margen disponible:** 1 min 50 s  
**Material asociado:** `Alivia_Presentacion_Sistema_v3.pptx` (20 diapositivas)

## Distribución sugerida entre integrantes

| Integrante | Diapositivas | Tiempo |
|---|---:|---:|
| Paucar Campoverder Kenyi Yair | 01–06 | 5:00 |
| Villegas Saavedra Axel Alberto | 07–10 | 4:15 |
| Panta Sanchez Eder Daniel | 11–15 | 4:35 |
| Inoñan González Justin Hafid | 16–20 | 4:20 |

## Control de tiempos

| Diap. | Apartado y tema | Tiempo | Acumulado |
|:---:|---|---:|---:|
| 01 | Portada — Presentación de Alivía | 0:25 | 0:25 |
| 02 | Contexto — La fragmentación impide saber qué ayuda llegó | 0:50 | 1:15 |
| 03 | Descripción — Alivía vincula necesidades, aportes y evidencias | 0:45 | 2:00 |
| 04 | Análisis — Actores, responsabilidades y permisos | 0:55 | 2:55 |
| 05 | Análisis — Flujo de los macroprocesos | 1:00 | 3:55 |
| 06 | Análisis — Estados, reglas de negocio y alertas externas | 1:05 | 5:00 |
| 07 | Modelado — Modelo conceptual del dominio | 0:55 | 5:55 |
| 08 | Modelado — Modelo ER: solicitudes, inventario y matching | 1:05 | 7:00 |
| 09 | Modelado — Modelo ER: autorización, logística y recepción | 1:05 | 8:05 |
| 10 | Modelado — Integridad transaccional y trazabilidad | 1:10 | 9:15 |
| 11 | Arquitectura — Organización lógica por capas | 1:05 | 10:20 |
| 12 | Arquitectura — Colaboración entre módulos | 0:55 | 11:15 |
| 13 | Infraestructura — Servidor web y topología cloud | 0:45 | 12:00 |
| 14 | Infraestructura — Persistencia cloud, seguridad y recuperación | 0:55 | 12:55 |
| 15 | Comunicaciones — Del navegador a una operación persistida | 0:55 | 13:50 |
| 16 | Diseño De Interfaz — Sistema visual y registro de Comuna | 0:50 | 14:40 |
| 17 | Diseño De Interfaz — ONG: evaluar el matching y autorizar la salida | 0:55 | 15:35 |
| 18 | Diseño De Interfaz — Brigada y Comuna: del traslado a la recepción | 0:55 | 16:30 |
| 19 | Diseño De Interfaz — Defensa Civil: supervisión territorial | 0:55 | 17:25 |
| 20 | Resultados — Informe final y conclusión | 0:45 | 18:10 |

## Guion para cada diapositiva

Los párrafos están redactados para **decirlos en voz alta**. Las indicaciones de *Apoyo visual* no forman parte del discurso.

### 01. Presentación de Alivía — Portada (0:25)

Buenos días. Somos el equipo de Ingeniería de Software de la Universidad Nacional de Piura. Presentamos Alivía, una propuesta de sistema web para coordinar y dar seguimiento a la ayuda humanitaria. Explicaremos primero el problema y los procesos; después, el modelado, la arquitectura y las interfaces que diseñamos.

**Apoyo visual:** Mostrar la portada y avanzar sin leer los cuatro nombres uno por uno.

### 02. La fragmentación impide saber qué ayuda llegó — Contexto (0:50)

Durante lluvias intensas asociadas a El Niño, una comunidad puede necesitar agua o abrigo mientras distintas organizaciones intentan ayudar. El problema no es solamente disponer de recursos, sino coordinar la información. Una comunidad registra lo que necesita; una ONG conoce su almacén; una brigada sabe lo que transporta. Si esos registros no se relacionan, se pierde la diferencia entre lo solicitado, lo prometido y lo realmente recibido. También es difícil detectar necesidades pendientes y responsabilidades. Alivía parte de ese problema de coordinación y trazabilidad.

**Apoyo visual:** Señalar los tres problemas: registros dispersos, decisiones inciertas y consecuencias.

### 03. Alivía vincula necesidades, aportes y evidencias — Descripción (0:45)

Alivía propone centralizar el recorrido de la ayuda en una plataforma web. La comuna registra productos y cantidades; las ONG revisan si pueden atenderlos y autorizan sus aportes; la brigada gestiona el traslado; y la comuna verifica finalmente lo recibido. Cada paso queda relacionado con el anterior, así que una propuesta no se confunde con una entrega. El alcance actual comprende el análisis, el diseño técnico y prototipos interactivos. No estamos afirmando que todas las integraciones estén funcionando en producción.

**Apoyo visual:** Conectar los tres bloques de la diapositiva: necesidad, decisión y resultado.

### 04. Actores, responsabilidades y permisos — Análisis (0:55)

El sistema se organiza alrededor de cuatro responsables. El jefe de Comuna registra necesidades y confirma la recepción de su comunidad. El jefe de ONG administra existencias, evalúa propuestas y autoriza salidas. El jefe de Brigada consulta los despachos asignados, verifica la ruta, confirma el retiro y registra la llegada. Por último, Defensa Civil consulta riesgos, cobertura y resultados, pero no modifica los movimientos de ayuda. Esta separación evita que una misma pantalla entregue permisos de más. Además, ocultar una opción del menú no basta: el backend debe comprobar el rol y la entidad a la que pertenece cada usuario.

**Apoyo visual:** Recorrer los cuatro roles por filas; no leer toda la tabla literalmente.

### 05. Flujo de los macroprocesos — Análisis (1:00)

Veamos el recorrido completo. Primero, la Comuna registra una solicitud. El sistema compara esa necesidad con los productos y lotes disponibles y genera propuestas de matching. La ONG decide qué cantidad acepta y, en un paso distinto, autoriza su salida. Después, la Brigada verifica el acceso, retira la carga y registra su llegada. La Comuna realiza la verificación física de la entrega. Defensa Civil consulta la situación territorial y el avance durante todo el proceso. Paralelamente pueden ingresar observaciones sobre lluvias, pero esas alertas no son requisito para solicitar ayuda ni autorizan recursos por sí solas.

**Apoyo visual:** Seguir las flechas en orden; remarcar que supervisión y alertas son transversales.

### 06. Estados, reglas de negocio y alertas externas — Análisis (1:05)

Aquí importa distinguir decisiones que podrían parecer iguales. Cuando el matching genera una propuesta, todavía no se reserva inventario. Si la ONG la confirma, acepta una cantidad, pero aún falta la autorización. Recién al autorizar se compromete el recurso disponible; el descuento físico se registra al retirar la carga completa. Más adelante, que una brigada llegue a destino no significa que la Comuna haya recibido todo conforme: debe verificarlo. Si hay faltantes o daños, quedan registrados sin reactivar automáticamente el matching. Por otro lado, las observaciones meteorológicas sirven para contextualizar el riesgo. Una alerta externa no equivale a declarar oficialmente una emergencia.

**Apoyo visual:** Señalar los estados PROPOSED, CONFIRMED, AUTHORIZED y los estados logísticos.

### 07. Modelo conceptual del dominio — Modelado (0:55)

Pasamos al modelado. Antes de pensar en tablas de base de datos, identificamos los conceptos del negocio y cómo se relacionan. Identity representa usuarios y permisos; Shelter, comunidades, solicitudes y recepciones; Inventory, productos, lotes, matching y autorizaciones; Logistics, despachos y rutas; y Territory, observaciones y evaluaciones de riesgo. Esta separación ayuda a establecer quién es dueño de cada regla. Por ejemplo, el riesgo territorial describe un fenómeno, mientras que una recepción describe ayuda entregada: aunque ambos se consulten juntos, no son el mismo dato.

**Apoyo visual:** Mostrar los cinco dominios; evitar explicar campos que aparecerán en los siguientes ER.

### 08. Modelo ER: solicitudes, inventario y matching — Modelado (1:05)

Ahora sí vemos el diseño relacional. Una comunidad puede registrar solicitudes; cada solicitud contiene líneas con productos y cantidades. El inventario se organiza por almacenes y lotes, porque no basta saber que existe un producto: importa dónde está, cuánto hay y si todavía puede utilizarse. El matching relaciona una línea solicitada con un lote concreto mediante su detalle. En el diagrama, PK identifica la clave primaria y FK una relación interna de base de datos. Las líneas discontinuas representan referencias lógicas entre módulos, que se validan mediante sus contratos. Lo esencial es que la propuesta pueda rastrearse hasta la necesidad y hasta las existencias consideradas.

**Apoyo visual:** Señalar request → request_item → matching_item → stock; explicar la leyenda una sola vez.

### 09. Modelo ER: autorización, logística y recepción — Modelado (1:05)

La segunda vista del modelo continúa el mismo recorrido. Una autorización se vincula con el aporte decidido y habilita un despacho. El despacho contiene líneas de productos y puede tener una ruta verificada. Al llegar, la Comuna registra la recepción con sus detalles: cuánto se envió, cuánto llegó físicamente y cuánto llegó conforme. Si hay diferencias, se conserva un reporte de discrepancia. También se registran documentos relacionados con la operación. El diseño mantiene identificadores y restricciones de unicidad para evitar asociar un mismo despacho con recepciones contradictorias. Así es posible reconstruir qué sucedió con cada aporte, incluso si intervienen varios actores.

**Apoyo visual:** Señalar autorización → despacho → recepción y los detalles correspondientes.

### 10. Integridad transaccional y trazabilidad — Modelado (1:10)

Un modelo de datos útil también debe impedir inconsistencias. En Alivía, la disponibilidad se calcula restando al stock físico utilizable los compromisos autorizados aún no retirados. Cuando una ONG autoriza, la disponibilidad se vuelve a comprobar y el compromiso se registra dentro de una operación atómica. Cuando la brigada confirma el retiro, se descuenta el stock físico una sola vez. Para evitar dobles descuentos si una petición se repite, el diseño utiliza claves de idempotencia. Las restricciones también impiden que la cantidad conforme supere lo recibido, o que lo recibido supere lo enviado. Por último, la auditoría conserva responsable, fecha y cambios: una discrepancia no desaparece solo porque el proceso termine.

**Apoyo visual:** Apoyarse en la fórmula y la tabla; definir idempotencia como “no ejecutar dos veces el mismo efecto”.

### 11. Organización lógica por capas — Arquitectura (1:05)

En arquitectura, elegimos separar la experiencia del usuario de las reglas que controlan el sistema. El frontend, planteado con Next.js y React, presenta formularios, mapas y estados por rol. El backend, diseñado con NestJS, concentra la API y las validaciones. Dentro de él distinguimos presentación, aplicación, dominio e infraestructura. La aplicación coordina los casos de uso; el dominio contiene reglas como la disponibilidad o las transiciones; y la infraestructura accede a PostgreSQL mediante Prisma y a las fuentes externas. Es un monolito modular: una aplicación backend con límites internos claros, no cinco microservicios independientes.

**Apoyo visual:** Recorrer las capas de arriba hacia abajo; remarcar la diferencia entre capas y servicios.

### 12. Colaboración entre módulos — Arquitectura (0:55)

Los cinco módulos no trabajan aislados, pero tampoco deben acceder libremente a las tablas privadas de los demás. Se comunican mediante contratos y casos de uso. Por ejemplo, Logistics coordina el retiro, pero solicita a Inventory el descuento que corresponde; no modifica por su cuenta las existencias. Cuando se registra una llegada, queda habilitada la recepción que gestiona Shelter. Territory aporta evaluaciones para la supervisión, mientras Identity controla identidad y permisos. Esto permite mantener reglas claras, reducir dependencias circulares y cambiar componentes sin alterar el comportamiento del negocio.

**Apoyo visual:** Seguir únicamente dos relaciones concretas: retiro e inicio de recepción.

### 13. Servidor web y topología cloud — Infraestructura (0:45)

La infraestructura mostrada es una propuesta de despliegue, no un servicio ya publicado. El navegador accedería al frontend Next.js alojado en Vercel. Ese frontend se comunicaría mediante HTTPS con la API NestJS en Render, y el backend utilizaría PostgreSQL administrado en Supabase. Los documentos generados, como Excel y PDF, se gestionarían mediante almacenamiento apropiado. La separación permite desplegar la interfaz y el servidor de manera independiente, mientras las credenciales sensibles permanecen en el backend.

**Apoyo visual:** Distinguir los tres proveedores y el sentido de las conexiones.

### 14. Persistencia cloud, seguridad y recuperación — Infraestructura (0:55)

En la capa de datos, PostgreSQL conserva solicitudes, inventario, movimientos y recepciones organizados por dominios. Prisma sirve como herramienta de acceso desde el backend; no es la base de datos. El navegador nunca debería conectarse directamente con credenciales SQL. El diseño contempla conexiones cifradas, permisos mínimos y cuentas distintas para ejecutar la aplicación y realizar migraciones. También propone respaldos y pruebas de restauración. No basta con tener copias: una recuperación debe comprobar que solicitudes, saldos e historiales siguen siendo coherentes después de restaurar.

**Apoyo visual:** Mostrar dónde están los datos y explicar que seguridad y recuperación son responsabilidades distintas.

### 15. Del navegador a una operación persistida — Comunicaciones (0:55)

Para comprender la comunicación, pensemos en registrar una solicitud. El usuario completa el formulario en el navegador. Next.js envía la petición a la API mediante HTTPS y datos JSON. El backend valida la sesión, confirma que el usuario pertenece a esa comunidad y comprueba productos y cantidades. Solo entonces realiza la operación en PostgreSQL. La respuesta devuelve un identificador y el nuevo estado, o un error concreto si algo falla. Con ello, la interfaz informa un éxito únicamente cuando el servidor lo confirma. El control de permisos no depende del navegador, sino de la API.

**Apoyo visual:** Seguir el recorrido navegador → frontend → API → base de datos → respuesta.

### 16. Sistema visual y registro de Comuna — Diseño De Interfaz (0:50)

Pasamos a las interfaces, que convierten esas reglas en acciones comprensibles. Todas mantienen una estructura compartida, pero cambian las opciones según el rol. En el registro de Comuna, la comunidad ya está vinculada al usuario. La persona selecciona productos y cantidades, mientras el formulario valida unidades, valores y duplicados. Antes de confirmar, puede revisar lo solicitado. Así se evita que un error de captura pase directamente al matching. Lo que vemos es un prototipo interactivo, no una conexión a un backend de producción.

**Apoyo visual:** Señalar la lista de productos y el resumen del formulario, no cada botón.

### 17. ONG: evaluar el matching y autorizar la salida — Diseño De Interfaz (0:55)

Estas dos capturas muestran decisiones consecutivas de la ONG. En la primera se revisa la propuesta automática: necesidad de origen, lotes disponibles y cantidades que pueden aceptarse, reducirse o rechazarse. Esa decisión no reserva recursos. En la segunda aparece la autorización de salida, donde se vuelven a comprobar existencias y demanda pendiente antes de comprometer el stock. Separar ambos pasos evita que una simple intención de aportar se interprete como un despacho ya autorizado. También permite bloquear la operación si las condiciones cambiaron entre una decisión y la otra.

**Apoyo visual:** Señalar primero MK-04 y luego MK-05; contrastar “aceptar” frente a “autorizar”.

### 18. Brigada y Comuna: del traslado a la recepción — Diseño De Interfaz (0:55)

Después de la autorización interviene la brigada. La pantalla de ruta muestra origen, destino y restricciones de acceso por lluvias. Antes de retirar se exige una verificación vigente; una vía marcada como desconocida o intransitable bloquea la salida. La brigada confirma el retiro completo y después registra la llegada. La Comuna realiza una operación distinta: compara lo enviado con lo recibido y lo conforme. En el escenario de las capturas faltan dos bidones y dos frazadas llegan dañadas. Esas diferencias quedan documentadas y no vuelven automáticamente al matching.

**Apoyo visual:** Apoyarse en MK-07 para la ruta y en MK-08 para las columnas de recepción.

### 19. Defensa Civil: supervisión territorial — Diseño De Interfaz (0:55)

La vista de Defensa Civil permite consultar información que normalmente estaría dispersa. En el mapa se pueden distinguir evaluaciones de riesgo por fenómeno, comunidades atendidas y observaciones externas. Lo importante es que son dimensiones independientes: que una comunidad reciba ayuda no significa que el riesgo de inundación haya desaparecido. Las observaciones conservan fuente, fecha y estado de verificación, para no presentar una alerta sin confirmar como una declaración oficial. Defensa Civil consulta este panorama, pero no cambia autorizaciones, inventarios ni recepciones.

**Apoyo visual:** Señalar el mapa y la separación entre capa de riesgo y cobertura.

### 20. Informe final y conclusión — Resultados (0:45)

Terminamos con el informe consolidado. En el escenario de los prototipos se solicitaron 120 bidones y 80 frazadas; quedaron conformes 118 bidones y 78 frazadas. La diferencia permite distinguir ayuda autorizada de ayuda efectivamente recibida en buen estado. El valor de Alivía está precisamente en conservar ese recorrido: quién solicitó, qué recursos se autorizaron, qué se retiró y qué confirmó la comunidad. El resultado es un diseño técnico y visual que facilita coordinación, control de inventario y supervisión sin ocultar las discrepancias.

**Apoyo visual:** Cerrar mirando al público; no abrir nuevos apartados técnicos.

## Recomendaciones para exponer

- Hablar con naturalidad y mirar al público; no leer las diapositivas literalmente.
- Usar los tiempos como guía. Incluyen una pausa corta para señalar diagramas y mockups.
- Explicar **PK** como clave primaria y **FK** como clave foránea cuando aparezcan por primera vez.
- Definir **idempotencia** de manera sencilla: repetir una solicitud no vuelve a ejecutar el mismo efecto.
- Diferenciar siempre el **diseño propuesto** de los **prototipos locales**; no afirmar que los servicios cloud están desplegados.
- Si falta tiempo, acortar ejemplos secundarios, sin saltar los apartados de Modelado y Arquitectura.

**Tiempo planificado total: 18:10.** Margen antes del límite de 20 minutos: 1:50.

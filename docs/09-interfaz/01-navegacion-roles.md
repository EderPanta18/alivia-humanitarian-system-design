# Navegación conceptual por rol

## 1. Principio de diseño

Las vistas se describen mediante identificadores estables `UI-...`, independientes de URLs, directorios Next.js, rutas de API o herramientas de prototipado. La navegación solo expone funciones permitidas, pero el backend sigue siendo responsable de seguridad. Un mockup existente puede representar una vista aunque su ruta cambie.

## 2. Mapas de navegación

```mermaid
flowchart TB
 Login[Acceso autenticado] --> Who{Rol valido}
 Who --> Com[Comuna]
 Who --> Ong[ONG]
 Who --> Br[Brigada]
 Who --> DC[Defensa Civil]
 Com --> CR[UI-COM-01 Registrar solicitud]
 Com --> CT[UI-COM-02 Consultar atencion]
 Com --> Rec[UI-COM-03 Confirmar recepcion]
 Ong --> Stock[UI-ONG-01 Inventario]
 Ong --> Prop[UI-ONG-02 Revisar propuesta]
 Ong --> Aut[UI-ONG-03 Autorizar salida]
 Br --> Disp[UI-BRI-01 Despacho y ruta]
 Br --> Arr[UI-BRI-02 Retiro y llegada]
 DC --> Risk[UI-DC-01 Mapa territorial]
 DC --> Gaps[UI-DC-02 Brechas y entregas]
 DC --> Final[UI-DC-03 Informe final publicado]
```

## 3. Matriz de vistas

| ID | Rol | Acción principal | Resultado observable |
|---|---|---|---|
| UI-COM-01 | Comuna | Solicitar productos | Número y detalle de solicitud confirmada. |
| UI-COM-02 | Comuna | Revisar sus solicitudes | Demanda, compromisos, entregas y saldos distinguidos. |
| UI-COM-03 | Comuna | Corroborar recepción | Conformidad u observaciones y documentos finales. |
| UI-ONG-01 | ONG | Gestionar existencias | Existencia física, utilizable y comprometida. |
| UI-ONG-02 | ONG | Aceptar, reducir o rechazar | Confirmación de cantidades y motivo si rechazo. |
| UI-ONG-03 | ONG | Autorizar salida | Compromiso válido sin descuento físico inmediato. |
| UI-BRI-01 | Brigada | Revisar despacho/ruta | Ruta vigente/disponible con evidencia de fecha. |
| UI-BRI-02 | Brigada | Confirmar retiro/llegada | Transición de estado con responsable y fecha. |
| UI-DC-01 | Defensa Civil | Consultar capas de riesgo | Catástrofe, fuente, fecha y nivel territorial. |
| UI-DC-02 | Defensa Civil | Ver atención | Riesgo separado de cobertura, entregas y brechas. |
| UI-DC-03 | Defensa Civil | Leer informe publicado | Corte final sin edición ni inventario privado. |

## 4. Reglas de acceso visual

Comuna no ve inventarios de otras organizaciones. ONG no confirma recepción. Brigada no modifica cantidad autorizada. Defensa Civil es siempre lectura; no aparecen botones para cerrar emergencia o alterar datos. El acceso a una URL manipulada no concede permiso: la API rechaza lectura/acción ajena.

## 5. Convención para rutas físicas

Los nombres concretos de rutas quedan como decisión de implementación de Next.js; **no son parte de los requisitos ni del identificador de vista**. Un cambio de URL no afecta nombre, propósito, datos obligatorios ni criterios de aceptación de la interfaz conceptual.

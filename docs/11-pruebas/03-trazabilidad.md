# Trazabilidad entre objetivos, requisitos y verificación

## 1. Propósito y convenciones

La trazabilidad relaciona las capacidades de Alivía con sus objetivos, requisitos, reglas de negocio, casos de uso, interfaces y pruebas.

Los identificadores `OBJ`, `RN`, `RF`, `RNF`, `CU`, `UI` y `CP` son referencias conceptuales estables, independientes de archivos, URLs y tecnologías de implementación.

La matriz representa **cobertura planificada**, no funcionalidades implementadas ni resultados de pruebas ejecutadas.

## 2. Matriz de trazabilidad

| Capacidad               | Objetivo       | Requisitos y reglas                 | Caso de uso                          | Interfaz                    | Pruebas       |
| ----------------------- | -------------- | ----------------------------------- | ------------------------------------ | --------------------------- | ------------- |
| Identidad y pertenencia | OBJ-07         | RF-01, RF-02, RN-01 a RN-04, RNF-01 | Inicio de sesión de los cuatro roles | Acceso y navegación por rol | CP-01, CP-02  |
| Solicitud de ayuda      | OBJ-01         | RF-04, RF-05, RN-05 a RN-09         | CU-COM-01                            | UI-COM-01                   | CP-03, CP-04  |
| Matching                | OBJ-03         | RF-13 a RF-19, RN-10, RN-11         | CU-ONG-04                            | UI-ONG-02                   | CP-05 a CP-08 |
| Compromiso de salida    | OBJ-02, OBJ-04 | RN-12 a RN-16, RNF-02               | CU-ONG-05                            | UI-ONG-02, UI-ONG-03        | CP-09, CP-10  |
| Ruta y traslado         | OBJ-05         | RN-17 a RN-20                       | CU-BRI-01                            | UI-BRI-01, UI-BRI-02        | CP-11 a CP-15 |
| Recepción               | OBJ-06         | RN-21 a RN-24                       | CU-COM-04                            | UI-COM-03                   | CP-16 a CP-20 |
| Riesgo y supervisión    | OBJ-08         | RN-25, RN-26, RN-28                 | CU-DC-01                             | UI-DC-01, UI-DC-02          | CP-21         |
| Observaciones externas  | OBJ-09         | RN-27                               | Proceso interno sin actor público    | UI-DC-01                    | CP-22         |
| Informe final           | OBJ-08         | RN-29                               | CU-DC-03                             | UI-DC-03                    | CP-23, CP-24  |
| Accesibilidad           | OBJ-07         | RNF-04, RNF-05                      | Procesos de todos los roles          | Interfaces principales      | CP-25         |

## 3. Criterios de trazabilidad

- Cada capacidad debe vincularse con al menos un comportamiento verificable y un caso de prueba.
- Las pruebas no deben exigir funcionalidades excluidas, como gestión de flotas, seguimiento GPS continuo o declaración automática de emergencias.
- Cualquier cambio que altere el significado de un identificador requiere actualizar sus referencias y criterios de aceptación relacionados.
- La conformidad solo puede declararse mediante resultados de ejecución verificables; una especificación no constituye evidencia de aprobación.

## 4. Gestión de cambios e impactos

Los cambios se analizan a partir de las dependencias conceptuales de cada capacidad.

Por ejemplo, modificar la regla de autorización de salida puede afectar:

- Las reglas de compromiso de inventario.
- El caso de uso de ONG.
- El contrato de API correspondiente.
- La operación transaccional de autorización.
- La interfaz de confirmación y autorización.
- Los casos de prueba `CP-09` y `CP-10`.

Este cambio no requiere modificar elementos independientes, como las evaluaciones de riesgo territorial o las fuentes de observaciones externas.

La actualización debe limitarse a los elementos afectados, manteniendo la coherencia de sus identificadores y criterios de verificación.

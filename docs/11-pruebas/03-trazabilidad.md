# Trazabilidad entre objetivos, requisitos y verificación

## 1. Propósito y convenciones

La trazabilidad relaciona las capacidades de Alivía con sus objetivos, requisitos, reglas de negocio, casos de uso, interfaces y pruebas.

Los identificadores `OBJ`, `RN`, `RF`, `RNF`, `CU`, `UI` y `CP` son referencias conceptuales estables, independientes de archivos, URLs y tecnologías de implementación.

Los casos de uso activos utilizan numeración consecutiva por rol:

- `CU-COM-01` a `CU-COM-04`: Comuna.
- `CU-ONG-01` a `CU-ONG-06`: ONG.
- `CU-BRI-01` a `CU-BRI-04`: Brigada.
- `CU-DC-01` a `CU-DC-03`: Defensa Civil.

La matriz representa **cobertura planificada**, no funcionalidades implementadas ni resultados de pruebas ejecutadas.

## 2. Matriz de trazabilidad

| Capacidad                              | Objetivo       | Requisitos y reglas                       | Casos de uso                                   | Interfaces                  | Pruebas       |
| -------------------------------------- | -------------- | ----------------------------------------- | ---------------------------------------------- | --------------------------- | ------------- |
| Identidad y pertenencia                | OBJ-07         | RF-01, RF-02, RN-01 a RN-04, RNF-01       | Autenticación de los cuatro roles              | Acceso y navegación por rol | CP-01, CP-02  |
| Solicitud de ayuda                     | OBJ-01         | RF-04, RF-05, RN-05 a RN-09               | CU-COM-01                                      | UI-COM-01                   | CP-03, CP-04  |
| Matching                               | OBJ-03         | RF-13 a RF-19, RN-10, RN-11               | CU-ONG-04; generación automática de propuestas | UI-ONG-02                   | CP-05 a CP-08 |
| Confirmación y autorización de aportes | OBJ-02, OBJ-04 | RF-20 a RF-22, RN-12 a RN-16, RNF-02      | CU-ONG-05, CU-ONG-06                           | UI-ONG-02, UI-ONG-03        | CP-09, CP-10  |
| Rutas y traslado                       | OBJ-05         | RF-24, RF-26, RF-27, RF-41, RN-17 a RN-20 | CU-BRI-01 a CU-BRI-04                          | UI-BRI-01, UI-BRI-02        | CP-11 a CP-15 |
| Recepción y discrepancias              | OBJ-06         | RF-08, RF-09, RF-40, RN-21 a RN-24        | CU-COM-03, CU-COM-04                           | UI-COM-03                   | CP-16 a CP-20 |
| Riesgo y supervisión                   | OBJ-08         | RF-36 a RF-38, RN-25, RN-26, RN-28        | CU-DC-01, CU-DC-02                             | UI-DC-01, UI-DC-02          | CP-21         |
| Observaciones y alertas externas       | OBJ-09         | RF-39, RN-27                              | Ingesta automática; consulta mediante CU-DC-01 | UI-DC-01                    | CP-22         |
| Informe final                          | OBJ-08         | RF-28, RF-29, RN-29                       | CU-DC-03; generación automática al cierre      | UI-DC-03                    | CP-23, CP-24  |
| Accesibilidad                          | OBJ-07         | RNF-04, RNF-05                            | Procesos de los cuatro roles                   | Interfaces principales      | CP-25         |

Las operaciones automáticas se vinculan con los casos de uso que permiten consultar sus resultados, pero no constituyen casos de uso iniciados por un rol humano.

En particular, las observaciones externas pueden producir avisos informativos y alimentar la consulta territorial de Defensa Civil. No declaran emergencias, autorizan recursos ni activan por sí solas el flujo de distribución de ayuda.

## 3. Criterios de trazabilidad

- Cada capacidad debe vincularse con requisitos identificables, comportamientos verificables y pruebas relacionadas.
- Los casos de uso deben conservar su correspondencia con las responsabilidades y restricciones de cada rol.
- Los procesos automáticos deben diferenciarse de las operaciones iniciadas por usuarios.
- Las pruebas no deben exigir funcionalidades excluidas, como gestión de flotas, seguimiento GPS continuo o declaración automática de emergencias.
- Los cambios que afecten el significado de un identificador requieren actualizar las referencias y criterios relacionados.
- La conformidad solo puede declararse mediante evidencias de ejecución; una especificación no equivale a una prueba aprobada.

## 4. Gestión de cambios e impactos

Los cambios se analizan según las dependencias conceptuales de cada capacidad, evitando modificaciones innecesarias en elementos independientes.

Por ejemplo, modificar la autorización de salida puede afectar:

- Las reglas de compromiso y disponibilidad de inventario.
- `CU-ONG-05` y `CU-ONG-06`, según el alcance del cambio.
- El contrato HTTP de confirmación o autorización.
- Las transacciones de validación y compromiso de existencias.
- `UI-ONG-02` y `UI-ONG-03`.
- Los casos de prueba `CP-09` y `CP-10`.

Estos cambios no requieren modificar las evaluaciones de riesgo territorial ni los contratos de fuentes externas si sus comportamientos permanecen intactos.

Toda actualización debe limitarse a los elementos afectados y mantener la coherencia entre identificadores, reglas y criterios de verificación.

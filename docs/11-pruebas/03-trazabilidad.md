# Trazabilidad entre objetivos, requisitos y verificación

## 1. Principio

La trazabilidad enlaza capacidades de negocio con criterios verificables, sin remitir a nombres de archivos. Los IDs `OBJ`, `RN`, `RF`, `RNF`, `CU`, `UI`, `CP` son identificadores conceptuales y se conservan estables aunque cambien rutas, frameworks o documentos. La matriz muestra cobertura **planificada**, no resultados de ejecución.

## 2. Matriz de capacidades

| Capacidad | Objetivo | Requisito o regla | Caso de uso | Interfaz | Pruebas |
|---|---|---|---|---|---|
| Identidad y pertenencia | OBJ-07 | RF-01, RF-02, RN-01 a RN-04, RNF-01 | Inicio de sesión de los cuatro roles | Acceso y navegación por rol | CP-01, CP-02 |
| Solicitud de ayuda | OBJ-01 | RF-04, RF-05, RN-05 a RN-09 | CU-COM-01 | UI-COM-01 | CP-03, CP-04 |
| Matching | OBJ-03 | RF-13 a RF-19, RN-10, RN-11 | CU-ONG-04 | UI-ONG-02 | CP-05 a CP-08 |
| Compromiso de salida | OBJ-02, OBJ-04 | RN-12 a RN-16, RNF-02 | CU-ONG-05 | UI-ONG-02, UI-ONG-03 | CP-09, CP-10 |
| Ruta y traslado | OBJ-05 | RN-17 a RN-20 | CU-BRI-01 | UI-BRI-01, UI-BRI-02 | CP-11 a CP-15 |
| Recepción | OBJ-06 | RN-21 a RN-24 | CU-COM-04 | UI-COM-03 | CP-16 a CP-20 |
| Riesgo/supervisión | OBJ-08 | RN-25, RN-26, RN-28 | CU-DC-01 | UI-DC-01, UI-DC-02 | CP-21 |
| Observaciones externas | OBJ-09 | RN-27 | Sin actor humano público | UI-DC-01 | CP-22 |
| Informe final | OBJ-08 | RN-29 | CU-DC-03 | UI-DC-03 | CP-23, CP-24 |
| Accesibilidad | OBJ-07 | RNF-04, RNF-05 | Procesos de todos los roles | Interfaces principales | CP-25 |

## 3. Criterios de aceptación de trazabilidad

- Toda capacidad incluida tiene al menos un comportamiento verificable y un caso de prueba asociado.
- Ningún caso de prueba espera una funcionalidad excluida (flota gestionada, GPS en vivo, declaración autónoma de emergencia).
- Una decisión de diseño que cambie el significado de un identificador exige actualización consistente de sus criterios.
- Ningún documento de pruebas puede declarar PASS a partir de una especificación; requiere evidencia de ejecución concreta.

## 4. Gestión de impactos

Ejemplo: cambiar la regla de autorización afecta compromiso de stock, caso ONG, operación API, transacción, pantalla de confirmación y CP-09/CP-10, pero no requiere modificar la explicación del riesgo territorial o de fuentes externas. El análisis se realiza por conceptos enlazados, no mediante búsqueda ciega de nombres de archivos.

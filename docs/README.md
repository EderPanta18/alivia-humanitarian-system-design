# Documentación de Alivía

## Propósito

Especificar de forma ordenada el funcionamiento, las reglas, el análisis, el diseño, la construcción prevista, la verificación, la infraestructura y la operación de Alivía, plataforma web de coordinación de ayuda humanitaria para comunidades de Piura.

## Principios de lectura

- Las carpetas se leen en orden desde `00` hasta `13`.
- En cada carpeta, su README describe el propósito y los archivos, y los documentos técnicos se leen en orden numérico.
- Cada documento de contenido tiene una responsabilidad y no requiere referencias a otros archivos Markdown.
- Los diagramas de cada documento utilizan Mermaid editable dentro del propio Markdown.
- Los documentos describen **el diseño seleccionado**. No afirman que funciones, servicios o pruebas estén ejecutados si no existe evidencia real.
- Las cantidades ficticias son ejemplos, nunca datos operativos auténticos.

## Etapas

| Orden | Carpeta | Materia principal |
|---|---|---|
| 00 | `00-definicion/` | Problema, objetivos y límites. |
| 01 | `01-negocio/` | Actores y reglas del dominio. |
| 02 | `02-procesos/` | Flujo general y seis macroprocesos. |
| 03 | `03-requisitos/` | Requisitos y casos de uso. |
| 04 | `04-gestion-proyecto/` | Planificación y control de trabajo. |
| 05 | `05-analisis/` | Modelo conceptual y estados. |
| 06 | `06-arquitectura/` | Componentes, capas y decisiones técnicas. |
| 07 | `07-datos/` | Persistencia y consistencia. |
| 08 | `08-comunicaciones/` | API, navegador y fuentes externas. |
| 09 | `09-interfaz/` | Navegación, pantallas y cartografía. |
| 10 | `10-construccion/` | Implementación y CI. |
| 11 | `11-pruebas/` | Calidad, casos y evidencias. |
| 12 | `12-infraestructura/` | Servidores y base de datos cloud. |
| 13 | `13-despliegue-operacion/` | Publicación y mantenimiento. |

## Convenciones

Los identificadores `OBJ`, `RN`, `RF`, `RNF`, `CU`, `UI`, `CP` y `ADR` relacionan conceptos, no nombres de archivos. Las restricciones y estados se verifican siempre en servidor; el diseño visual no reemplaza permisos. Las fuentes externas permiten observación y apoyo, no declaración automática de emergencia.

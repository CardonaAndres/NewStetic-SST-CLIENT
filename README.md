# Documentación Técnica del Proyecto SST - Frontend

## Descripción General

Este repositorio contiene el **frontend** del sistema de gestión de Seguridad y Salud en el Trabajo (SST). El proyecto adopta una arquitectura basada en microservicios, permitiendo cubrir los distintos dominios funcionales del área SST. Su objetivo es facilitar la gestión integral de procesos, el seguimiento del personal, la vigilancia epidemiológica, la administración de equipos de protección, la realización de inspecciones y el control de la accidentalidad.

---

## Tecnologías Utilizadas

- **Framework principal:** React.js
- **Estilos:** Tailwind CSS

---

## Arquitectura General

- **Microservicios independientes:** Cada dominio funcional cuenta con su propio microservicio y API RESTful.
- **Comunicación entre servicios:** Basada en HTTP RESTful.
- **Autenticación y autorización:** Centralizadas mediante JWT y gestionadas por un middleware compartido.
- **Frontend desacoplado:** Este repositorio consume las APIs expuestas por los microservicios del backend, permitiendo flexibilidad y escalabilidad.

---

## Microservicios y Módulos

### 1. Ingreso y Seguimiento de Personal
- **Ingreso de Personal:** Coordinación de exámenes médicos, registro de resultados, ingreso de colaboradores y almacenamiento de conceptos de personal retirado.
- **Seguimiento Médico Programado:** Agenda de exámenes periódicos, registro de salud y seguimiento de condiciones médicas.
- **Historial de Exámenes Médicos:** Consulta y visualización del historial de exámenes por colaborador.

### 2. Vigilancia y Epidemiología Ocupacional
- **Sistema de Vigilancia Epidemiológica (SVE):** Agrupación y clasificación de personas según patologías y estados.
- **Recomendaciones y Seguimiento:** Registro y seguimiento de recomendaciones, con notificaciones automáticas.
- **Desactivación de Personas:** Gestión de bajas y preservación del historial médico.

### 3. Equipos de Protección Personal (EPP) y Ergonomía
- **Gestión de EPP:** Registro y control de equipos, integración con sistemas externos y notificaciones de vencimiento.
- **Herramientas Ergonómicas:** Control y seguimiento de elementos ergonómicos.
- **Análisis de Consumo:** Visualización detallada del consumo de EPP y alertas de reemplazo.

### 4. Inspecciones y Gestión de Seguridad
- **Inspecciones de Seguridad:** Formularios, registro de hallazgos y generación de acciones de seguimiento.
- **Plan de Acción:** Registro y gestión de planes de acción, con asignación de responsables.

### 5. Accidentalidad e Higiene Ocupacional
- **Reporte y Matriz de Accidentabilidad:** Registro y consulta de incidentes y accidentes.
- **Higiene Ocupacional:** Registro y análisis de mediciones higiénicas en el entorno laboral.

---

## Consideraciones

- El frontend está diseñado para ser **modular y escalable**, facilitando la integración de nuevos módulos y microservicios.
- La autenticación y autorización se gestionan de manera centralizada, garantizando la seguridad y trazabilidad de las acciones.
- Se promueve el uso de buenas prácticas de desarrollo, asegurando mantenibilidad y facilidad de pruebas.

---

**Andrés Cardona**

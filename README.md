# 📘 Documentación Técnica – Proyecto SST (Frontend)

## 🧩 Descripción General

Este repositorio contiene el **frontend** del sistema de gestión de **Seguridad y Salud en el Trabajo (SST)**. La aplicación forma parte de una arquitectura basada en **microservicios**, diseñada para cubrir de forma modular y eficiente los distintos dominios funcionales del área SST.

Su propósito principal es **automatizar, centralizar y facilitar la gestión de procesos** relacionados con salud ocupacional, personal, equipos de protección, inspecciones y reporte de accidentes, entre otros.

---

## 🚀 Tecnologías Utilizadas

* **Framework:** React.js
* **Estilos:** Tailwind CSS
* **Consumo de APIs:** Fetch
* **Gestión de estado:** Context API
* **Control de rutas:** React Router DOM

---

## 🏗️ Arquitectura del Sistema

* **Frontend desacoplado:** Este repositorio actúa como consumidor de los microservicios backend mediante APIs RESTful.
* **Microservicios independientes:** Cada módulo funcional (por ejemplo, Vigilancia Epidemiológica o Inspecciones) tiene su propio backend.
* **Comunicación entre servicios:** HTTP con autenticación vía JWT.
* **Seguridad:** Autenticación centralizada mediante un middleware de autorización compartido.

---

## 🧱 Módulos Funcionales y Microservicios

### 1. Ingreso y Seguimiento de Personal

* Registro y edición de datos de ingreso.
* Coordinación de exámenes médicos iniciales y periódicos.
* Historial médico completo de cada colaborador.

### 2. Vigilancia y Epidemiología Ocupacional

* Clasificación y agrupación por patologías.
* Gestión de recomendaciones con alertas automáticas.
* Desactivación controlada de personal con historial preservado.

### 3. Equipos de Protección Personal (EPP) y Ergonomía

* Gestión de inventario y entregas de EPP.
* Control de vencimientos y necesidades de reemplazo.
* Integración con herramientas externas de ergonomía.

### 4. Inspecciones y Gestión de Seguridad

* Registro de inspecciones periódicas.
* Identificación de hallazgos y generación de acciones correctivas.
* Seguimiento de planes de acción y responsables.

### 5. Accidentalidad e Higiene Ocupacional

* Reporte y seguimiento de incidentes y accidentes laborales.
* Registro de condiciones higiénicas y mediciones ambientales.

---

## ⚙️ Variables de Entorno

Para que el frontend se conecte correctamente con los microservicios, se deben configurar las variables de entorno en un archivo `.env` ubicado en la raíz del proyecto.

### 📄 Ejemplo de `.env`:

```env
VITE_AUTH_SERVICE=http://localhost:3001/API/v1/auth
VITE_STAFF_SERVICE=http://localhost:3002/API/v1/staff

VITE_BUK_API_URL=https://dominio.buk.co/api/v1/colombia
VITE_BUK_AUTH_TOKEN=
```

> 💡 Todas las variables deben comenzar con `VITE_` para que Vite (usado por defecto en proyectos React modernos) pueda exponerlas al entorno de ejecución.

---

## 📌 Consideraciones Importantes

* El frontend está construido con un enfoque **modular, reutilizable y escalable**.
* Cada módulo funcional puede ser extendido o reemplazado sin afectar al sistema completo.
* Se prioriza la **seguridad, trazabilidad y buenas prácticas de desarrollo**.
* El sistema está preparado para operar en entornos corporativos con múltiples usuarios y roles.

---

## 👤 Autor

**Andrés Cardona**
Desarrollador – SST Project

---

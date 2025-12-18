# Trello Clone 🧩
Clon de Trello desarrollado como **proyecto de portfolio**, enfocado en reproducir un flujo de trabajo **Kanban** realista y en demostrar buenas prácticas de **desarrollo frontend moderno** con React y Next.js.

El proyecto prioriza una arquitectura clara, escalable y mantenible, con un enfoque cercano al de un **producto digital real**, más allá de una simple demo técnica.

--- 

## 🧠 Descripción
La aplicación permite gestionar tableros, columnas y tarjetas mediante interacciones directas, incorporando **drag & drop**, edición inline y feedback visual.

El objetivo no fue únicamente replicar la interfaz de Trello, sino **modelar un flujo de trabajo real**, considerando cómo las decisiones de arquitectura frontend impactan directamente en la **experiencia de usuario, mantenibilidad y evolución del producto**.

Está construida con **Next.js (App Router) y TypeScript**, poniendo especial énfasis en la organización del código, el manejo del estado global y la consistencia de la UI.

---

## 🎯 Objetivo del proyecto
- Demostrar experiencia sólida en **React y Next.js**
- Aplicar criterios de **arquitectura frontend** y separación de responsabilidades
- Diseñar una UI interactiva con **estado global y lógica compleja**
- Presentar un proyecto de portfolio alineado a estándares de desarrollo frontend utilizados en **productos digitales a gran escala**

---

## 🧱 Stack tecnológico
### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

### Estado y arquitectura
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat)
![Next.js App Router](https://img.shields.io/badge/Next.js_App_Router-000000?style=flat&logo=next.js&logoColor=white)

### UI & UX
![Drag and Drop](https://img.shields.io/badge/Drag_&_Drop-UX-important)
![CSS Modular](https://img.shields.io/badge/CSS_Modular-1572B6?style=flat&logo=css3&logoColor=white)

### Utilidades
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

El proyecto está construido sobre un stack moderno orientado a **escalabilidad, mantenibilidad y experiencia de usuario**:

- **Next.js (App Router)** – Routing, layouts y estructura de la aplicación  
- **React + TypeScript** – Componentes reutilizables y tipado fuerte  
- **Zustand** – Manejo de estado global  
- **Drag & Drop** – Interacción fluida entre tarjetas y columnas  
- **Capa de servicios** – Separación de lógica de comunicación  
- **Estilos desacoplados** – UI clara, consistente y escalable  

---

## ✨ Funcionalidades principales
### Tableros y columnas
- Visualización de tableros con múltiples columnas
- Render dinámico y ordenado de columnas
- Arquitectura preparada para soportar múltiples tableros

### Tarjetas
- Creación y edición de tarjetas
- Edición inline del contenido
- Movimiento fluido entre columnas mediante drag & drop
- Feedback visual durante las interacciones

### Experiencia de usuario
- Interacciones rápidas y naturales
- Animaciones suaves al mover elementos
- Componentes reutilizables y consistentes
- Enfoque en claridad visual y usabilidad

---

## 🗂️ Organización del proyecto

La estructura del proyecto sigue una separación clara de responsabilidades, orientada a escalabilidad, mantenibilidad y trabajo en equipo:

```bash
src/
├─ app/              # Rutas, layouts y páginas (Next.js App Router)
│  ├─ [locale]/      # Rutas localizadas para soporte de internacionalización (i18n)
│  └─ api/           # Endpoints y capa de comunicación con backend
├─ components/       # Componentes reutilizables y de dominio (boards, columns, cards)
├─ hooks/            # Custom hooks y lógica reutilizable
├─ helpers/          # Funciones utilitarias y helpers
├─ context/          # Contextos globales (ej: theming)
├─ config/           # Configuraciones del proyecto
├─ i18n/             # Configuración y mensajes de internacionalización (ES / EN)
├─ lib/              # Utilidades compartidas (HTTP client, cache, etc.)
├─ services/         # Servicios auxiliares (autenticación)
└─ types/            # Tipos y contratos de datos
```

La estructura está pensada para facilitar la lectura del código, la evolución del producto y el trabajo colaborativo entre desarrolladores frontend.

---

## 🔐 Autenticación

La aplicación cuenta con un sistema de autenticación que permite:

- Login con **email y contraseña**

- Login mediante **Google**

La lógica de autenticación se encuentra centralizada en la carpeta `services`, a través del archivo:

- `AuthActions.ts`

Este archivo encapsula las acciones relacionadas al proceso de login, manteniendo la lógica desacoplada de los componentes de UI.

### Tecnologías utilizadas en autenticación

- **Firebase Authentication** -- Gestión de usuarios y proveedores de login

- **MongoDB Atlas** -- Persistencia de datos

- Integración con la arquitectura de la aplicación mediante servicios desacoplados

Este enfoque permite extender fácilmente los métodos de autenticación y mantener un flujo claro y controlado.

---

## 🌍 Internacionalización (i18n)

La aplicación incluye soporte de **internacionalización**, permitiendo visualizar la interfaz en **español e inglés**.

- Rutas localizadas utilizando **Next.js App Router**

- Mensajes centralizados y desacoplados de los componentes

- Arquitectura preparada para escalar a nuevos idiomas

- Integración transparente con la UI existente

La implementación de i18n permite adaptar el producto a distintos mercados sin impactar la arquitectura del frontend.

---

## 🎨 Theming (Light / Dark Mode)

El proyecto cuenta con soporte para **modo claro y oscuro**, priorizando accesibilidad y experiencia de usuario.

- Cambio de tema en tiempo real

- Persistencia de la preferencia del usuario

- Configuración centralizada de estilos

- Consistencia visual en todos los componentes

El sistema de theming fue diseñado para ser extensible y mantener coherencia visual en toda la aplicación.

--- 

## 🧩 Manejo de estado

El estado global de la aplicación se gestiona con **Zustand**, lo que permite:

- Centralizar la información de tableros, columnas y tarjetas

- Evitar *prop drilling* innecesario

- Separar la lógica de negocio de los componentes visuales

- Mantener un flujo de datos claro y predecible

Todo el estado está tipado con **TypeScript**, reforzando la robustez y mantenibilidad del código.

---

## ⚙️ Decisiones técnicas destacadas

- Elección de **Zustand** por su simplicidad, bajo acoplamiento y buena escalabilidad

- Separación clara entre:

    - lógica de negocio

    - estado global

    - componentes de UI

- Uso intensivo de **TypeScript** para reducir errores y mejorar la calidad del código

- Decisiones técnicas tomadas considerando mantenibilidad, legibilidad y trabajo en equipo

- Enfoque en arquitectura frontend y experiencia de usuario más allá de la implementación visual

---

## 🧠 Product & Frontend Focus

Este proyecto fue diseñado con un enfoque similar al de un **producto digital real**, priorizando:

- Escalabilidad del frontend y claridad arquitectónica

- Componentes reutilizables y consistentes

- Experiencia de usuario fluida y predecible

- Separación clara de responsabilidades

- Decisiones técnicas orientadas a facilitar la evolución del producto

El desarrollo se abordó considerando escenarios reales de crecimiento, mantenimiento y colaboración en equipos de frontend.

---

## 📌 Cierre

Este proyecto refleja un enfoque orientado a **producto y calidad de código**, priorizando arquitectura frontend, experiencia de usuario y decisiones técnicas conscientes.

El trabajo fue realizado considerando prácticas utilizadas en **productos digitales de alto impacto**, alineado con prácticas comunes en equipos de frontend de productos digitales de gran escala.


---

## 👤 Autor

Desarrollado por **Emanuel Sarco -- Michael**\
Frontend React Developer

🔗 GitHub: <https://github.com/emasar91>

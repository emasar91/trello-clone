# Trello Clone 🧩

Clon de Trello desarrollado como **proyecto de portfolio**, enfocado en reproducir un flujo de trabajo **Kanban** realista y en demostrar buenas prácticas de **desarrollo frontend moderno** con React y Next.js.

El proyecto prioriza una arquitectura clara, escalable y mantenible, más cercana a un producto real que a una demo técnica.

---

## 🧠 Descripción

La aplicación permite gestionar tableros, columnas y tarjetas mediante interacciones directas, incorporando **drag & drop**, edición inline y feedback visual, simulando el comportamiento de herramientas de productividad utilizadas en entornos profesionales.

Está construida con **Next.js (App Router) y TypeScript**, poniendo especial énfasis en la organización del código, el manejo del estado global y la experiencia de usuario.

---

## 🎯 Objetivo del proyecto

- Demostrar experiencia sólida en **React y Next.js**
- Aplicar criterios de **arquitectura frontend** y separación de responsabilidades
- Mostrar manejo de **estado global y UI compleja**
- Presentar un proyecto de portfolio con nivel **SSR / Senior Frontend**

---

## 🧱 Stack tecnológico

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

### Estado y arquitectura
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat)
![App Router](https://img.shields.io/badge/Next.js_App_Router-000000?style=flat&logo=next.js&logoColor=white)

### UI & UX
![Drag and Drop](https://img.shields.io/badge/Drag_&_Drop-UX-important)
![CSS](https://img.shields.io/badge/CSS_Modular-1572B6?style=flat&logo=css3&logoColor=white)

### Utilidades
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

## 🚀 Tecnologías utilizadas

- **Next.js (App Router)** – Routing, layouts y estructura de la aplicación  
- **React + TypeScript** – Componentes reutilizables y tipado fuerte  
- **Zustand** – Manejo de estado global  
- **Drag & Drop** – Interacción entre tarjetas y columnas  
- **Capa de servicios** – Separación de lógica de comunicación  
- **Estilos desacoplados** – UI clara, mantenible y escalable  

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
- Componentes reutilizables y desacoplados
- Enfoque en claridad visual y usabilidad

---

## 🗂️ Organización del proyecto

La estructura del proyecto sigue una separación clara de responsabilidades:

```bash
src/
├─ app/          # Rutas, layouts y páginas (Next.js App Router)
├─ components/   # Componentes reutilizables y de dominio (board, columns, cards)
├─ store/        # Estado global manejado con Zustand
├─ services/     # Capa de servicios y lógica de negocio
├─ lib/          # Configuración compartida (ej: cliente HTTP)
└─ types/        # Tipos y contratos de datos
```
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
- Enfoque en arquitectura y experiencia de usuario más allá de la implementación visual


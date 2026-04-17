# 🎬 Gestor de Películas y Series

Esta aplicación web, desarrollada con **React**, nace como una solución personalizada para organizar tu catálogo audiovisual. El sistema no solo permite la gestión básica de datos (**CRUD**), sino que ofrece una experiencia fluida mediante herramientas avanzadas de filtrado, búsqueda y ordenamiento en tiempo real.

---

## 👥 Equipo de Desarrollo
*  **Tomas Sanchez (FAI-4494)** – *Developer*
*  **Axel Ostrovsky (FAI-4744)** – *Developer*
*  **Jorge Gonzalez (FAI-4460)** – *Project Manager*

---

## ✨ Características Principales

La aplicación otorga control total sobre tu contenido, priorizando la usabilidad y la persistencia de los datos:

* **Gestión de Contenido:** Permite añadir nuevas entradas, editar detalles existentes o eliminar títulos (con una capa de confirmación para evitar accidentes).
* **Estado Dinámico:** Cambia fácilmente entre contenido "Visto" y "Por ver" con un solo clic.
* **Búsqueda Inteligente:** Filtra instantáneamente por título, director o género mientras escribes.
* **Persistencia Local:** Gracias a la integración con `localStorage`, tu colección se mantiene a salvo incluso si cierras el navegador o recargas la página.
* **Estadísticas en Vivo:** Visualiza cuántos títulos tienes por categoría y género de forma automática.

---

## 🏗️ Arquitectura del Proyecto

Para mantener un código limpio y escalable, hemos divido la lógica en componentes modulares y reutilizables:

### Componentes (`/components`)
* **`CharacterCard`**: La unidad visual mínima. Se encarga de presentar la información de cada película o serie de forma atractiva y ordenada.
* **`ContenidoList`**: El motor de visualización. Organiza las listas, gestiona las acciones de edición/borrado y despliega los contadores dinámicos por género.
* **`FilterBar`**: El centro de control. Aquí residen la barra de búsqueda, los selectores de tipo/género y las opciones de ordenamiento (por año o rating).
* **`FormularioContenido`**: Una pieza versátil que se adapta según el contexto, sirviendo tanto para dar de alta nuevo contenido como para modificar el existente mediante un `modoEdicion`.
* **`Titulo`**: Componente dedicado a la identidad visual de la cabecera, permitiendo estilos independientes sin afectar el flujo global.

### Página Principal (`/page`)
* **`Home`**: Actúa como el cerebro de la aplicación. Aquí reside el estado global, la colección predefinida, la lógica de sincronización con el navegador y las funciones que coordinan los cambios en la colección.

### ⚡ Punto de Entrada
* **`App.jsx`**: Es el componente raíz que orquesta la carga de la página principal, envolviendo toda la experiencia del usuario bajo una estructura única.
* **`package-lock.json`**:

---

## 🛠️ Tecnologías Utilizadas

| Herramienta | Función |
| :--- | :--- |
| **React** | Biblioteca principal para la interfaz de usuario |
| **CSS Modules** | Estilizado modular para evitar colisiones de nombres |
| **Local Storage** | Almacenamiento local para persistencia de datos |
| **JavaScript (ES6+)** | Lógica de filtrado, ordenamiento y manejo de arrays |
# Todo List Backend con WebSockets

Este proyecto es una aplicación backend sencilla desarrollada con **Node.js**, **Express**, **Sequelize** y **Socket.IO** que permite gestionar tareas (CRUD) en una base de datos local (SQLite) y actualizar en tiempo real a los clientes conectados mediante WebSockets.

## Funcionalidades

- CRUD de tareas (`title`, `description`, `status`)
- Base de datos local usando SQLite
- Comunicación en tiempo real con WebSockets (Para efectos de prueba el id:1 es asociado al clienteA.html y el id:2 al clienteB.html)
- Emisión de eventos específicos para cada tarea
- Clientes HTML que reaccionan a eventos según su asignación (`task-1`, `task-2`)

## Tecnologías

- Node.js + Express
- TypeScript + ES Modules
- Sequelize ORM + SQLite
- Socket.IO
- HTML + TailwindCSS para los clientes

## Estructura del Proyecto

```
todo-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── sockets/
│   ├── db/
│   └── index.ts
├── public/
│   ├── clienteA.html
│   └── clienteB.html
├── db.sqlite
├── package.json
└── tsconfig.json
```

## Instalación y ejecución

1. Clona el repositorio y entra al directorio:

```bash
git clone https://github.com/tuusuario/todo-backend.git
cd todo-backend
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor backend:

```bash
npm run dev
```

4. En otro terminal, sirve los archivos HTML:

```bash
npx serve public -l 3000
```

o en su defecto utiliza la extension Live Server, luego botón derecho sobre los archivos clienteA.html y clienteB.html "Open with Live Server"

5. Abre los clientes en el navegador:

- http://localhost:3000/clienteA.html
- http://localhost:3000/clienteB.html
  o si usas LiveServer
  http://127.0.0.1:5500/clienteA.html
  http://127.0.0.1:5500/clienteB.html

> Asegúrate de que el backend esté corriendo en `localhost:3000`.

## Créditos

Desarrollado por Alexis Labraña como parte de una práctica de backend en tiempo real con WebSockets.

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
│── clienteA.html
│── clienteB.html
├── db.sqlite
├── package.json
└── tsconfig.json
```

## Instalación y ejecución

1. Clona el repositorio y entra al directorio:

```bash
git clone git@github.com:Alabrana/todo-backend.git
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

- http://127.0.0.1:5500/clienteA.html
- http://127.0.0.1:5500/clienteB.html

> Asegúrate de que el backend esté corriendo en `localhost:3000`.

## Pruebas

Luego de levantar el proyecto se crea la bd.
Ten en vista las dos paginas clienteA.html y clienteB.html

1. POST

Crear al menos 5 tareas.

```bash
curl --request POST \
  --url http://localhost:3000/tasks \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.1.0' \
  --data '{
  "title": "Tarea test",
  "description": "Ejemplo descripcion de una tarea",
	"status": "pendiente"
}'
```

respuesta

```bash

{
	"dateCreate": "2025-05-30T08:19:28.807Z",
	"dateUpdate": "2025-05-30T08:19:28.807Z",
	"id": 5,
	"title": "Tarea test",
	"description": "Ejemplo descripcion de una tarea",
	"status": "pendiente"
}

```

Se debe actualizar las vistas de los clientes.

2. PUT

Considerar que para efectos de prueba el id de la task 1 esta asociado al clienteA y el id de la task 2 esta asociado al clienteB.
Al cambiar el estado en la task id: 1 a Completado solo se debe ver reflejado el clienteA y no en el B
Al cambiar el estado en la task id: 2 a Completado solo se debe ver reflejado el clienteB y no en el A

```bash

curl --request PUT \
  --url http://localhost:3000/tasks/1 \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/11.1.0' \
  --data '{
  "status": "Completado"
}'
```

Se deben actualizar el cliente que corresponde.

3. DELETE

Para efectos de prueba se sugiere eliminar task id 1 o 2, esto para ver reflejado en pantalla la actualizacion

```bash

curl --request DELETE \
  --url http://localhost:3000/tasks/2 \
  --header 'User-Agent: insomnia/11.1.0'
```

## Demo CRUD

[![Ver demo en YouTube](https://img.youtube.com/vi/axhD6nEVopE/0.jpg)](https://youtu.be/axhD6nEVopE)

## Oportunidades de mejoras

1. Aplicar Zod a los endpoint para mayor seguridad.
2. Completar el manejo de errores.
3. Agregar tests

## Créditos

Desarrollado por Alexis Labraña como parte de una práctica de backend en tiempo real con WebSockets.

# Product Management CRUD Application

A web application developed with Vanilla JavaScript that allows users to manage products through a complete CRUD system (Create, Read, Update, Delete), synchronized with a remote REST API and Local Storage.

## Overview

This project demonstrates the implementation of a product management system using:

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- Local Storage
- MockAPI REST Service

The application allows users to create, update, delete, and retrieve products while maintaining local persistence and synchronization with a remote server.

---

## Features

### Product Management

- Add new products
- Edit existing products
- Delete products
- View product list
- Synchronize products with API

### Data Persistence

- Local Storage backup
- Remote API synchronization
- Fast loading from local cache

### User Experience

- Dynamic interface updates
- Form validation
- Success and error notifications
- Responsive and clean layout

---

## Project Structure

```text
project/
│
├── index.html
├── app.js
├── style.css
└── README.md
```

---

## Application Architecture

### Frontend

The application interface is built using HTML and dynamically manipulated using JavaScript.

Main elements:

- Product registration form
- Synchronization button
- Status message area
- Product list

### Backend Service

The application consumes a REST API hosted on MockAPI.

```javascript
const URL_API =
"https://663f733ae3a7c3216d4005b4.mockapi.io/api/v1/productos";
```

---

## 🔧 CRUD Operations

### Create Product

Creates a new product and stores it in:

- Remote API
- Local Storage

```http
POST /productos
```

Example:

```json
{
  "nombre": "Laptop",
  "precio": 1500
}
```

---

### Read Products

Retrieves all products from the API.

```http
GET /productos
```

The retrieved data is:

1. Stored in Local Storage
2. Rendered dynamically in the DOM

---

### Update Product

Updates an existing product.

```http
PUT /productos/{id}
```

Example:

```json
{
  "nombre": "Gaming Laptop",
  "precio": 1800
}
```

---

### Delete Product

Removes a product from:

- Remote API
- Local Storage
- User Interface

```http
DELETE /productos/{id}
```

---

## Local Storage Integration

The application uses Local Storage as a local backup system.

### Save Data

```javascript
localStorage.setItem(
  "productos_app",
  JSON.stringify(productos)
);
```

### Load Data

```javascript
localStorage.getItem("productos_app");
```

### Benefits

- Faster application startup
- Reduced API dependency
- Temporary offline persistence

---

## Form Validation

Before sending information to the server, the application validates:

### Product Name

- Cannot be empty

### Product Price

- Must be numeric
- Must be greater than zero

Example:

```javascript
if (
  nombre === "" ||
  isNaN(precio) ||
  precio <= 0
) {
  mostrarMensaje(
    "Error: Nombre inválido o precio debe ser mayor a 0",
    "danger"
  );
}
```

---

## Main Functions

### `consumirApiGet()`

Retrieves all products from the server.

### `consumirApiPost()`

Creates a new product.

### `consumirApiPut()`

Updates an existing product.

### `consumirApiDelete()`

Deletes a product.

### `guardarLocalStorage()`

Stores product data locally.

### `cargarLocalStorage()`

Loads locally stored products.

### `renderizarProductosDOM()`

Updates the product list in the user interface.

### `mostrarMensaje()`

Displays status notifications.

---

## Application Workflow

### Initial Load

1. Load products from Local Storage.
2. Render products.
3. Synchronize with API.
4. Update Local Storage.

### Create Product

1. User fills form.
2. Validation is executed.
3. POST request is sent.
4. UI is updated.
5. Local Storage is updated.

### Edit Product

1. User clicks edit button.
2. Form is populated.
3. User updates data.
4. PUT request is executed.
5. UI refreshes.

### Delete Product

1. User clicks delete button.
2. DELETE request is sent.
3. Product is removed from UI.
4. Local Storage is updated.

---

## Learning Objectives

This project demonstrates practical knowledge of:

- CRUD operations
- DOM manipulation
- Event handling
- JavaScript ES6+
- Asynchronous programming
- Fetch API
- REST API consumption
- Local Storage management
- Error handling with try/catch
- Dynamic rendering techniques

---

## Possible Improvements

Future enhancements could include:

- Search products
- Pagination
- Product categories
- Sorting and filtering
- User authentication
- Responsive mobile design
- Dark mode
- Confirmation dialogs before deletion

---

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/sayderochoa-gif/semana_cuatro_javascript.git
```

2. Open the project folder.

3. Launch `index.html` in your browser.

Or use the VS Code Live Server extension:

```bash
Right Click → Open with Live Server
```

---

## Author
Sayder Carreno
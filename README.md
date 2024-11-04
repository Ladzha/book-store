# Bookstore

## Project Description

This project is a **Bookstore** built with **Node.js**, **Express.js** and **Sequelize**. 
It provides a backend for managing bookstore data, such as books, authors, categories, genres, orders, users, and wishlists. 
Each entity has dedicated endpoints for CRUD operations, making it suitable for applications that handle bookstore-related data.

The project follows a modular structure, with routers and controllers for each entity, allowing for organized code and maintainability. 
It leverages an ORM to facilitate database interactions, supporting data retrieval, updates, and relationship management between entities.

---

## API Endpoints

Each entity has specific endpoints designed to handle its management tasks.

### Authors API

Manages author data.

- **`GET /authors`**: Retrieve all authors.
- **`POST /authors`**: Create a new author.
- **`GET /authors/:id`**: Retrieve author details by ID.
- **`PATCH /authors/:id`**: Update author information by ID.
- **`DELETE /authors/:id`**: Delete an author by ID.

---

### Books API

Handles operations related to books.

- **`GET /books`**: Retrieve all books.
- **`POST /books/authors/:id`**: Create a new book associated with an author.
- **`GET /books/:id`**: Retrieve a book by its ID.
- **`PATCH /books/:id`**: Update a book by ID.
- **`DELETE /books/:id`**: Delete a book by ID.

---

### Categories API

Manages category data.

- **`GET /categories`**: Retrieve all categories.
- **`POST /categories`**: Create a new category.
- **`GET /categories/:id`**: Retrieve a category by ID.
- **`PATCH /categories/:id`**: Update a category by ID.
- **`DELETE /categories/:id`**: Delete a category by ID.

---

### Genres API

Handles genre management and associations.

- **`GET /genres`**: Retrieve all genres.
- **`POST /genres/categories/:id`**: Create a new genre linked to a category.
- **`GET /genres/:id`**: Retrieve a genre by ID.
- **`PATCH /genres/:id`**: Update a genre by ID.
- **`DELETE /genres/:id`**: Delete a genre by ID.
- **`PATCH /genres/:id/addBook`**: Add a book to a specific genre.

---

### Users API

Manages user data, registration, and login.

- **`GET /users`**: Retrieve all users.
- **`POST /users`**: Register a new user.
- **`POST /users/registration`**: Register with validation (name, email, and password checks).
- **`POST /users/login`**: Log in a user.
- **`GET /users/profile/:id`**: Get a user profile by ID.
- **`GET /users/:id`**: Retrieve a user by ID.
- **`PATCH /users/:id`**: Update a user by ID.
- **`DELETE /users/:id`**: Delete a user by ID.

---

### Orders API

Facilitates the management of orders.

- **`GET /orders`**: Retrieve all orders.
- **`POST /users/:id/createOrder`**: Create a new order linked to user.
- **`GET /orders/:id`**: Retrieve an order by ID.
- **`PATCH /orders/:id`**: Update an order by ID.
- **`PATCH /orders/:id/addBook`**: Add a book to an existing order.
- **`DELETE /orders/:id`**: Delete an order by ID.

---

### Wishlist API

Handles wishlist data for storing books of interest.

- **`GET /wishlists`**: Retrieve all wishlists.
- **`POST /users/:id/createWishlist`**: Create a new wishlist linked to user.
- **`GET /wishlists/:id`**: Retrieve a wishlist by ID.
- **`PATCH /wishlists/:id/addBook`**: Add a book to an existing wishlists.
- **`DELETE /wishlists/:id`**: Delete a wishlist by ID.

---

## How to Run the Project

1. **Clone the repository**.
2. **Install dependencies** by running `npm install`.
3. **Configure environment variables** (e.g., `PORT`, `DB_CONNECTION_STRING`).
4. **Start the server** by running `npm start` or `node server.js`.
5. Access the API through `http://localhost:PORT`.




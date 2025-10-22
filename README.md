<p align="center">
  <img src="./assets/favicon.png" width="120" alt="CMS Logo" />
</p>

<p align="center">A role-based content management system API built with <a href="http://nestjs.com" target="_blank">NestJS</a>, PostgreSQL, and JWT authentication.</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#installation">Installation</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#running">Running</a> •
  <a href="#api-endpoints">API Endpoints</a>
</p>

---

## Features

- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Three permission levels (Admin, Editor, Reporter)
- **PostgreSQL Integration** - Robust relational database with transactions
- **RESTful API** - Clean, documented endpoints
- **Guard Protection** - Route-level authorization with custom decorators

---

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

---

## Installation

```bash
# Clone the repository
git clone https://github.com/Campus-Multiplataforma/campus-backend
cd campus-backend

# Install dependencies
npm install
```

---

## Configuration

Create a `.env` file in the root directory:

```env
DATABASE_HOST=your-host
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=cms_mvp
JWT_SECRET=your_secret_key_here
```

---

## Running

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:3001`

---

## API Endpoints

### Authentication

#### POST `/auth/login`
Authenticate a user and receive a JWT token.

**Request:**
```json
{
  "email": "editor@test.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "EDITOR"
}
```

---

### Articles

#### GET `/articles`
Retrieve all articles ordered by position.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Breaking News: Tech Innovation",
    "position": 0
  }
]
```

#### PATCH `/articles/reorder`
Reorder articles (Admin and Editor only).

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "articles": [
    { "id": "uuid-1", "position": 0 },
    { "id": "uuid-2", "position": 1 }
  ]
}
```

**Response:**
```json
[
  {
    "id": "uuid-1",
    "title": "Article Title",
    "position": 0
  }
]
```

---

## Project Structure

```
src/
├── auth/                  # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   ├── roles.guard.ts
│   └── roles.decorator.ts
├── articles/              # Articles module
│   ├── articles.controller.ts
│   ├── articles.service.ts
│   └── articles.module.ts
├── db/              # Database configuration
│   ├── database.service.ts
│   └── database.module.ts
├── app.module.ts          # Root module
└── main.ts                # Application entry point
```

---

## Role Permissions

| Role     | View Articles | Reorder Articles |
|----------|---------------|------------------|
| ADMIN    | ✓             | ✓                |
| EDITOR   | ✓             | ✓                |
| REPORTER | ✓             | ✗                |

---

## Technologies

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [Passport JWT](https://www.passportjs.org/) - Authentication middleware
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

---

## License

This project is MIT licensed.

# Sign Up Application

A full-stack, secure user registration and authentication application built with **React**, **Express.js**, and **MongoDB**.

---

## 📸 Application Preview

### Sign Up Page
![Sign Up Preview](screenshots/signup-preview.png)

### Log In Page
![Log In Preview](screenshots/login-preview.png)

---

## 🎨 Design Implementation

- **Heading:** Centered serif heading (`Playfair Display`).
- **Sub-link:** `"Already a member? Log In"` which routes dynamically to `/login`.
- **Underline Inputs:** Minimalist underline-only fields for Email and Password with smooth animated focus states.
- **Primary Button:** Full-width light-blue button with micro-animations on hover/press and inline loading spinner state.
- **Password Visibility:** Toggle button inside password field with SVG icons and ARIA accessibility labels.

---

## 🏗 Architecture & Features

- **Frontend (Client):**
  - Built with React 18 & Vite
  - React Router v6 for navigation (`/signup`, `/login`, `/dashboard`)
  - Real-time client-side validation (email format, minimum 8 characters with letter & number)
  - Accessible forms with ARIA attributes and error announcements
  - Token-based auth context with local storage persistence and route guards
- **Backend (Server):**
  - Express.js REST API
  - Secure password hashing using `bcryptjs` with salt rounds (cost 12)
  - JWT token generation & bearer authorization middleware
  - Server-side validation using `express-validator`
  - Robust security headers with `helmet`, configured `cors`, and IP rate-limiting with `express-rate-limit`
  - MongoDB Mongoose schema with unique indexes and duplicate key conflict handling (`409 Conflict`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Server Setup
```bash
cd signup-app/server
npm install
npm run dev
```
The server will start on port `5000` (or `PORT` specified in `.env`).

### 2. Client Setup
```bash
cd signup-app/client
npm install
npm run dev
```
The client will start on `http://localhost:5173`.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Registers new user & returns JWT | `201`, `400`, `409`, `429` |
| `POST` | `/api/auth/login` | Authenticates user & returns JWT | `200`, `400`, `401`, `429` |
| `GET` | `/api/auth/me` | Fetches authenticated user info | `200`, `401` |
| `GET` | `/api/health` | Service health check | `200` |

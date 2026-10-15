# 🚀 Meghnila Das | Full-Stack Portfolio

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A premium, production-ready full-stack portfolio built with the **MERN stack**, featuring a dynamic dual-theme system, advanced 3D motion, and a robust administrative backend.

---

## ✨ Key Features

- **🌓 Dual-Mode Design System**: 
  - **Dark Mode**: High-energy "Ember Orange & Cyan Teal" theme with deep black backgrounds.
  - **Light Mode**: Sleek "Ice Blue & Purple" aesthetic with vibrant, high-contrast typography.
- **🎨 Cinematic UI/UX**:
  - Interactive 3D Hero section using **React Three Fiber** and **Drei**.
  - Smooth scroll animations powered by **Framer Motion**.
  - Glassmorphism effects and custom-crafted SVG filters for depth.
- **🛠️ Robust Admin Panel**:
  - Secure JWT-based authentication.
  - Full CRUD operations for Projects, Skills, and Certificates.
  - Dynamic data management via a custom Redux store.
- **☁️ Cloud-Connected Backend**:
  - Automatic image handling via **Google Drive API** (OAuth2).
  - Production-ready Express.js server with MongoDB integration.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite)
- **Tailwind CSS v4** (Modern Utility-First Styling)
- **Framer Motion** (Production Animations)
- **React Three Fiber** (3D Visuals)
- **Redux Toolkit** (State Management)
- **Lucide React** (Iconography)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose**
- **JWT** (Security)
- **Google Drive API** (Media Storage)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Meghnila/Portfolio.git
cd Portfolio
```

### 2. Environment Setup
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_password
GDRIVE_CLIENT_ID=...
GDRIVE_CLIENT_SECRET=...
GDRIVE_REFRESH_TOKEN=...
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Install Dependencies
```bash
# Install backend deps
cd backend
npm install

# Install frontend deps
cd ../frontend
npm install
```

### 4. Run Development Servers
```bash
# In backend directory
npm start

# In frontend directory
npm run dev
```

---

## 📦 Deployment

### Vercel (Frontend)
The frontend is optimized for Vercel deployment with a custom `vercel.json` for routing.

### Render/Railway (Backend)
The backend can be deployed to any Node.js hosting service. Ensure all environment variables are synced.

---

## 👩‍💻 Author
**Meghnila Das**
- GitHub: [@Meghnila](https://github.com/Meghnila)
- Email: [meghniladas@gmail.com](mailto:meghniladas@gmail.com)

---
*Built with ❤️ and Precision.*


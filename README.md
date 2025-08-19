# 🚀 TypeScript Express Backend Scaffold  

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)  
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)](https://expressjs.com/)  
[![Swagger UI](https://img.shields.io/badge/docs-Swagger%20UI-green?logo=swagger)](/api-docs)  
[![Redoc](https://img.shields.io/badge/docs-Redoc-orange)](/docs)  
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  

A lightweight, production-ready **TypeScript + Express scaffold** for building REST APIs.  
This starter includes **Swagger UI**, **Redoc**, security middlewares, and caching — so you can kickstart APIs faster.  

---

## ✨ Features  

- ⚡ **Express + TypeScript** – clean, typed API backend  
- 📜 **API Documentation**  
  - `/api-docs` → Swagger UI (interactive)  
  - `/docs` → Redoc (static developer docs)  
  - `/openapi.json` → OpenAPI spec  
- 🔒 **Security**  
  - CORS with configurable whitelist  
  - Helmet for secure headers  
  - Rate limiting  
  - Cookie parser & secure cookies  
- 🚀 **Production Ready**  
  - `.env` support with dotenv  
  - Health check at `/health`  
  - Works on Vercel, Render, or any Node host  
- ⚡ **Performance**  
  - GZIP compression  
  - Cache-control for docs and static assets  

---

## 📂 Project Structure  

src/
├── config/
│ ├── swagger.ts # Swagger/OpenAPI config
│ ├── cors.ts # CORS setup
├── routes/
│ └── user.route.ts # Example route
├── app.ts # Main Express app
└── server.ts # Entry point


---

## 🚀 Getting Started  

### 1. Clone the Repo  

```bash
git clone https://github.com/onigbajumo/scafold-typscript-backend.git
cd YOUR_REPO_NAME

Install Dependencies
npm install

Run in Dev Mode
npm run dev

Build & Run Production
npm run build
npm start

📖 Example Endpoints


GET /openapi.json → OpenAPI spec

GET /api-docs → Swagger UI

GET /docs → Redoc

🤝 Contributing

Fork the repo

Create a new branch (feature/your-feature)

Commit changes

Push and open a PR

📜 License

This project is licensed under the MIT License – feel free to use it for personal or commercial projects.

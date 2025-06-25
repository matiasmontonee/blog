# 📝 Blog

Proyecto de un **Blog CRUD** con autenticación.

---

## 📋 Tecnologías utilizadas

| Capa       | Tecnología                                  |
|------------|---------------------------------------------|
| Frontend   | Vue 3, Vite, Bootstrap 5, Vue Router        |
| Backend    | Node.js, Express, mysql2, dotenv, bcrypt, jsonwebtoken |
| DB         | MySQL                                        |
| Auth       | JWT (jsonwebtoken), protección de rutas con middleware, bcrypt para hash |

---

## 🚀 Primeros pasos

1. **Clona este repositorio**  
   ```bash
   git clone https://github.com/matiasmontonee/blog.git
   cd blog

2. **Configura e inicia el backend**  
   ```bash
   cd backend
   npm install
   ```

   - Crea un archivo .env con:
   ```bash
   PORT=4000
   DB_HOST=localhost
   DB_USER=TU_USUARIO_MYSQL
   DB_PASS=TU_PASSWORD_MYSQL
   DB_NAME=blog
   JWT_SECRET=una_clave_secreta
   ```

   - Crea la base de datos ejecutando el archivo db/schema.sql

   - Inicia el servidor:
   ```bash
   node src/index
   ```

   - La API quedará en http://localhost:4000.

3. **Configura e inicia el frontend**  
   ```bash
   cd ../frontend
   npm install
   ```

   - Crea un archivo .env con:

   ```bash
   VITE_API_URL=http://localhost:4000
   ```

   - Inicia la app:
   ```bash
   npm run dev
   ```

   - Abre en tu navegador http://localhost:5173.
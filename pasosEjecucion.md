# Paso 1 
- abrir linea de comandos, ubicarnos en la carpeta del proyecto y escribir **npm install**

# Paso 2
**Despues de clonar el repositorio realizar**
- crear **.env** en la raiz del proyecto, con lo siguiente
- PORT=3000
- DB_HOST=localhost
- DB_USER=root
- DB_PASSWORD=tu_contraseña **completar con la contraseña que definimos en nuestra DB**
- DB_NAME=amigos_peludos

# Paso 3
Luego de configurar nuestro .env configuramos el entorno **cp .env.example .env**

# Paso 4
en la terminal ingresar **mysql -u root -p < .src/config/db/init.sql

# Paso 5
- Iniciar servidor **npm run dev** 

# Paso 6
- ir al navegador e ingresar en http://localhost:3000



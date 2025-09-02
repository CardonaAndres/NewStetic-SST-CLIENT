# Dockerfile para React con Vite

# Etapa 1: Build de la aplicación
FROM node:22-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias
RUN npm ci 

# Copiar el código fuente
COPY . .

# Build de la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con nginx
FROM nginx:alpine

# Copiar los archivos build desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx (opcional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 5001
EXPOSE 5001

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
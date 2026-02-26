# Etapa 1: Construir la aplicación
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Compilamos la app para producción
RUN npm run build --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:alpine
# Copiamos la app compilada al servidor Nginx
COPY --from=build /app/dist/lifegoals/browser /usr/share/nginx/html
# Exponemos el puerto 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
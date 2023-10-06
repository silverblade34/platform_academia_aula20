# Etapa 1: Generar los archivos de construcción (build) del proyecto Vue
FROM node:14 AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración y dependencias del proyecto
COPY package*.json ./
COPY vue.config.js ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Generar los archivos de construcción (dist)
RUN npm run build

# Etapa 2: Usar una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Eliminar la configuración por defecto de Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Copiar el archivo nginx.conf al directorio de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de construcción generados en la etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para que Nginx pueda escuchar
EXPOSE 80

# Comando para iniciar Nginx cuando se inicie el contenedor
CMD ["nginx", "-g", "daemon off;"]

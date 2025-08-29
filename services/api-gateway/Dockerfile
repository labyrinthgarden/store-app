FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copiar TODO incluyendo package.json
COPY . .

# Instalar dependencias y COMPILAR
RUN npm ci && npm run build

# Stage de producción
FROM node:18-alpine

WORKDIR /usr/src/app

# Copiar package.json e instalar solo producción
COPY package*.json ./
RUN npm ci --only=production

# Copiar solo los archivos compilados desde el builder
COPY --from=builder /usr/src/app/dist ./dist/

EXPOSE 3000

CMD ["node", "dist/main"]

# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Instalar servidor HTTP ligero (serve)
RUN npm install -g serve

# Copiar archivos compilados desde builder
COPY --from=builder /app/dist ./dist

# Exponer puerto
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Iniciar servidor
CMD ["serve", "-s", "dist", "-l", "3000"]

# services/cart/Dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /usr/src/app

# install dependencies (dev + prod)
COPY package*.json ./
RUN npm ci

# copy sources and build
COPY . .
RUN npm run build

# remove dev deps to reduce final image
RUN npm prune --production

# Final stage
FROM node:18-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# copy built files + prod node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000
CMD ["node", "dist/main.js"]

# 1. Base image with Node.js and dependencies
FROM node:18-alpine AS deps

# 2. Set working directory
WORKDIR /app

# 3. Copy only lock files and package.json to install deps first
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# 4. Install only production dependencies
RUN npm install --legacy-peer-deps

# 5. Copy rest of the app
COPY . .

# 6. Build the app for production (includes SSR)
RUN npm run build

# 7. Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Optional: reduce image size
RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

COPY --from=deps /app/public ./public
COPY --from=deps /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]

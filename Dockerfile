FROM node:22-slim

WORKDIR /app

COPY package*.json pnpm-lock*.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod --frozen-lockfile

COPY . .

RUN chown -R node:node /app

USER node

CMD ["pnpm", "start"]
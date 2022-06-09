FROM node:14-alpine as dependencies

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
RUN npm install

FROM node:14-alpine as builder
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN npm run next:build

FROM node:14-alpine as runner
WORKDIR /usr/src/app

# If you are using a custom next.config.js file, uncomment this line.

COPY --from=builder /usr/src/app/ecosystem.config.js ./
COPY --from=builder /usr/src/app/jsconfig.json ./
COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/postcss.config.js ./
COPY --from=builder /usr/src/app/tailwind.config.js ./
COPY --from=builder /usr/src/app/server.js ./

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/server ./server
COPY --from=builder /usr/src/app/styles ./styles
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000
CMD ["node", "server.js"]
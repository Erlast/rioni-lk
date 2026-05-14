FROM node:23.9.0 AS build-stage

WORKDIR /app
COPY package*.json ./
RUN yarn install
RUN yarn add esbuild
COPY . .
RUN yarn vite build

FROM nginx:1.25-alpine as production-stage

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/node_modules/flag-icons /usr/share/nginx/html/assets/flag-icons
COPY nginx.conf /etc/nginx/nginx.conf
COPY .htpasswd /etc/nginx/.htpasswd

EXPOSE 80
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN mkdir /etc/nginx/ssl

COPY ssl/selfsigned.crt /etc/nginx/ssl/selfsigned.crt
COPY ssl/selfsigned.key /etc/nginx/ssl/selfsigned.key

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
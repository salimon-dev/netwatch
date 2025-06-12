FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

FROM httpd:alpine

COPY ./http.conf /usr/local/apache2/conf/httpd.conf
COPY --from=builder /app/dist /usr/local/apache2/htdocs
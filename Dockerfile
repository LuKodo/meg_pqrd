FROM nginx:alpine-slim AS build

COPY ./dist /usr/share/nginx/html

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3075

CMD ["nginx", "-g", "daemon off;"]

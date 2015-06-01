FROM nginx:1.9.1

ADD ./dist /usr/share/nginx/html/
ADD ./nginx.conf /etc/nginx/nginx.conf
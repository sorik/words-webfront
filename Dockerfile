FROM nginx:1.7.1

ADD ./dist /usr/local/nginx/html/
ADD ./nginx.conf /etc/nginx.conf
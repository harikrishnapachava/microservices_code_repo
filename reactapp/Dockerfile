FROM nginx:1.15.2
LABEL maintainer="harikrishnacpachava@gmail.com"
RUN apt-get update
RUN apt-get install -y apt-utils

RUN apt-get install -y bzip2 curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

ARG PORT=80
ARG NODE_APP_URL=http://localhost:8080
ENV PORT=${PORT} NODE_APP_URL=${NODE_APP_URL} OUTPUT_DIR=/usr/share/nginx/html
EXPOSE ${PORT}

RUN mkdir -p /usr/local/reactapp
WORKDIR /usr/local/reactapp
RUN npm i phantomjs-prebuilt node-sass --no-save

# everything above mostlikely be used from cache
COPY nginx.conf /etc/nginx/nginx.conf
ADD . /usr/local/reactapp

RUN npm install && npm run build

CMD ["/usr/local/reactapp/run.sh"]
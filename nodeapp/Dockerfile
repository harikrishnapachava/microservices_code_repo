FROM node:10.8.0-slim
LABEL maintainer="harikrishnacpachava@gmail.com"

ARG PORT=80
ENV PORT=${PORT}
EXPOSE ${PORT}

RUN mkdir -p /usr/local/nodeapp
WORKDIR /usr/local/nodeapp
ADD package.json /usr/local/nodeapp
RUN npm install --unsafe-perm
ADD . /usr/local/nodeapp
RUN npm update --unsafe-perm
RUN npm run postinstall --unsafe-perm

CMD [ "npm", "start" ]

# FROM ubuntu:latest
# make sure apt is up to date
# RUN    apt-get -y update

# install nodejs and npm
# RUN    apt-get -y install nodejs
# RUN    apt-get -y install npm

#FROM nodesource/jessie:0.12.7
FROM node:latest

# make sure apt is up to date
RUN    apt-get -y update
ENV    VIRTUAL_HOST=twx.soyou.io
ENV    LETSENCRYPT_HOST=twx.soyou.io
ENV    LETSENCRYPT_EMAIL=contact@soyou.io
# cache package.json and node_modules to speed up builds
ADD     package.json package.json
RUN     npm install
RUN     npm install -g pm2@latest

# Bundle app source
COPY . /src
RUN cd /src; npm install --silent

#RUN cd /src; /bin/bash -c "source make-certs.sh"

# only use this line when use ubuntu:latest
# RUN ln  -s /usr/bin/nodejs /usr/bin/node

CMD ["pm2", "start", "/src/process.json", "--no-daemon"]
#CMD ["nodejs", "/src/server.js"]

EXPOSE 80
EXPOSE 443



FROM node:6.3.1



RUN mkdir -p /usr/src/apps

RUN mkdir -p /usr/src/apps/blobs
RUN mkdir -p /usr/src/apps/blobs/data
RUN mkdir -p /usr/src/apps/blobs/data/psp

RUN mkdir -p /usr/src/apps/psp


WORKDIR /usr/src/apps/psp

#installation pour le dev (à mettre en commentaire en prod puis à adapter dans package.json start)
RUN npm install -g nodemon

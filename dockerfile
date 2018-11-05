FROM node:10.9.0
# MAINTAINER ccc
COPY . /node/app
WORKDIR /node/app
RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm","run","debug"]
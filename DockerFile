FROM node:10
MAINTAINER bereket <bekigher@gmail.com> 
WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app/
CMD ["NPM","start"]
EXPOSE 3000
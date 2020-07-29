FROM node:10
MAINTAINER bereket <bekigher@gmail.com> 
WORKDIR /app
COPY package*.json /app/
RUN npm install
RUN npm install  @angular/cli
RUN npm install nodejs

COPY . /app/
CMD ["npm","start"]
EXPOSE 3000
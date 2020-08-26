FROM node:10
MAINTAINER bereket <bekigher@gmail.com> 
WORKDIR /app
COPY package*.json /app/
RUN npm install

# FROM nginx:alpine
COPY . /app/
CMD ["npm","start"]
EXPOSE 3000
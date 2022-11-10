FROM node:16.16.0 as build-stage
COPY package*.json ./
RUN ["npm", "install"]
RUN ["npm", "start"]
COPY . .
EXPOSE 4000
CMD [ "node", "./bin/www" ]
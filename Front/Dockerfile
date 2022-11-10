FROM node:16 AS build

WORKDIR /jenkins_home/workspace/Nct_Selly/Front

COPY package*.json ./

RUN ["npm", "install", "--legacy-peer-deps"]

COPY . .

RUN ["npm", "run", "build"]

RUN mkdir /app

WORKDIR /app

RUN mkdir ./build

COPY . ./build

EXPOSE 3000

CMD ["npm", "start"]
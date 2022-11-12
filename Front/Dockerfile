FROM node:16 AS build

WORKDIR /jenkins_home/workspace/Nct_Selly/Front

COPY package*.json ./

RUN ["npm", "install", "--legacy-peer-deps"]

COPY . .

RUN ["npm", "run", "build"]

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/defalut.conf

RUN mkdir /app

WORKDIR /app

RUN mkdir ./build

COPY --from=build /jenkins_home/workspace/Nct_Selly/Front/build ./build

COPY . ./build

COPY ./nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
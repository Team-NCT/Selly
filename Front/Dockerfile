FROM node:16 AS build

WORKDIR /jenkins_home/workspace/Nct_Selly/Front

COPY package*.json ./

RUN ["npm", "install", "--legacy-peer-deps"]

COPY . .

RUN ["npm", "run", "build"]

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

RUN mkdir /app

WORKDIR /app

RUN mkdir ./dist

COPY --from=build /jenkins_home/workspace/Nct_Selly/Front/dist ./dist

COPY . ./dist

COPY ./nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
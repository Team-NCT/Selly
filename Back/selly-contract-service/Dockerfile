FROM node:16
WORKDIR /jenkins_home/workspace/Nct_Selly/Blockchain
COPY package*.json ./
RUN npm install
RUN npm run build
COPY . .
EXPOSE 4000
CMD [ "node", "./bin/www" ]
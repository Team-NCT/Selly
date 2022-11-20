FROM node:16
WORKDIR /jenkins_home/workspace/Nct_Selly/Back
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "server.js" ]
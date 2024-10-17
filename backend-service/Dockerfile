FROM node:18.17.1-alpine3.17

WORKDIR /backend-service

COPY package*.json ./

RUN npm ci 

COPY src/ .

EXPOSE 3000

CMD ["npm", "run", "dev"]
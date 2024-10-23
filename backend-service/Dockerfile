FROM node:18-alpine

WORKDIR /backend-service

COPY package*.json ./

RUN npm ci 

COPY src/ .

EXPOSE 3000

CMD ["npm", "run", "dev"]

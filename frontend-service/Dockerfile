FROM node:alpine3.20

WORKDIR /frontend-service

COPY client/package.json client/package-lock.json* ./

RUN npm ci 

COPY client/ .

EXPOSE 5173

CMD ["npm", "run", "dev"]
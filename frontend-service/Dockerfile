FROM node:18.17.1-alpine3.17

WORKDIR /frontend-service

COPY client/package.json client/package-lock.json* ./

RUN npm ci 

COPY client/ .

EXPOSE 5173

CMD ["npm", "run", "dev"]
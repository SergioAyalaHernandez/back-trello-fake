
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=${PORT:-8084}

EXPOSE ${PORT}

CMD ["node", "index.js"]
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=${PORT:-3000}

EXPOSE ${PORT}

CMD ["ng serve"]
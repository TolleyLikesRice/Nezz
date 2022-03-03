FROM node:16

WORKDIR /usr/src/nezz

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "node", "app.js" ]
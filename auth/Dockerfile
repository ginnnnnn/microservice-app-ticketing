FROM node:alpine

WORKDIR /APP

COPY package.json .
RUN npm install --only=prod

COPY . .

CMD ["npm","start"]

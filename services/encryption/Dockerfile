FROM node:11.1.0
WORKDIR /app
COPY ./package* ./
RUN npm install
COPY . .
CMD [ "node", "index.js" ]
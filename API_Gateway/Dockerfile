FROM node:14

# Create app directory
WORKDIR /usr/src/app/api_gateway

COPY package.json /usr/src/app/api_gateway
COPY package-lock.json /usr/src/app/api_gateway

RUN npm ci

COPY . /usr/src/app/api_gateway


EXPOSE 3000

CMD [ "npm", "start" ]
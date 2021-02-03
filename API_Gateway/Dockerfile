FROM node:14

# Create app directory
WORKDIR /home/api_gateway/

COPY package.json /home/api_gateway/
COPY package-lock.json /home/api_gateway/
COPY wait-for-it.sh /home/api_gateway/

RUN npm ci

COPY . /home/api_gateway/


EXPOSE 3000

CMD [ "npm", "start" ]
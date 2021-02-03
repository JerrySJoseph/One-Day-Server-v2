FROM node:14

# Create app directory
WORKDIR /home/match_service/

COPY package.json /home/match_service/
COPY package-lock.json /home/match_service/
COPY wait-for-it.sh /home/match_service/

RUN npm ci

COPY . /home/match_service/


CMD [ "npm", "start" ]
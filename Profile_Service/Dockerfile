FROM node:14

# Create app directory
WORKDIR /home/profile_service/

COPY package.json /home/profile_service/
COPY package-lock.json /home/profile_service/
COPY wait-for-it.sh /home/profile_service/

RUN npm ci

COPY . /home/profile_service/


CMD [ "npm", "start" ]
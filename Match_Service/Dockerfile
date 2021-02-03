FROM node:latest

RUN mkdir -p usr/src/app/match_service
# Create app directory

WORKDIR /usr/src/app/match_service
# Install app dependencies

COPY package*.json usr/src/app/match_service

RUN npm install
# Copy app source code
COPY . /usr/src/app/match_service
#Expose port and start application
EXPOSE 3000

CMD [ "npm", "start" ]
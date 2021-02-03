FROM node:latest

RUN mkdir -p usr/src/app/profile_service
# Create app directory

WORKDIR /usr/src/app/profile_service
# Install app dependencies

COPY package*.json usr/src/app/profile_service

RUN npm install
# Copy app source code
COPY . /usr/src/app/profile_service
#Expose port and start application
EXPOSE 3000

CMD [ "npm", "start" ]
FROM node:latest

RUN mkdir -p usr/src/app
# Create app directory

WORKDIR /usr/src/app
# Install app dependencies
COPY package.json usr/src/app

RUN npm install
# Copy app source code
COPY . /usr/src/app
#Expose port and start application
EXPOSE 3000

CMD [ "npm", "start" ]
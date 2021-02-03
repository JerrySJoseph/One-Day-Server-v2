FROM node:latest

RUN mkdir -p usr/src/app/api_gateway
# Create app directory

WORKDIR /usr/src/app/api_gateway
# Install app dependencies

COPY package*.json usr/src/app/api_gateway

RUN npm install

# Copy app source code
COPY . /usr/src/app/api_gateway
#Expose port and start application

EXPOSE 3000

CMD [ "npm", "start" ]
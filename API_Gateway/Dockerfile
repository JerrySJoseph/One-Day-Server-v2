FROM node:latest

RUN mkdir -p /api_gateway
# Create app directory

WORKDIR /api_gateway
# Install app dependencies

COPY package.json /api_gateway
RUN ls


RUN npm ci


# Copy app source code
COPY . /api_gateway
#Expose port and start application

EXPOSE 3000

CMD [ "npm", "start" ]
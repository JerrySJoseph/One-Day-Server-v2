FROM node:latest

RUN mkdir -p /match_service
# Create app directory

WORKDIR /match_service
# Install app dependencies

COPY package.json /match_service

RUN npm ci


# Copy app source code
COPY . /match_service
#Expose port and start application
EXPOSE 3000

CMD [ "npm", "start" ]
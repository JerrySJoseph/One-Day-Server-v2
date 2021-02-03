FROM node:latest

RUN mkdir -p /profile_service
# Create app directory

WORKDIR /profile_service
# Install app dependencies

COPY package.json /profile_service

RUN ls

RUN npm install

# Copy app source code
COPY . /profile_service
#Expose port and start application
EXPOSE 3000

CMD [ "npm", "start" ]
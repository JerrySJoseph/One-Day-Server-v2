FROM node:14

RUN mkdir /usr/src/app
# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

RUN npm install --production
# If you are building your code for production
# RUN npm ci --only=production


EXPOSE 3000

CMD [ "npm", "start" ]
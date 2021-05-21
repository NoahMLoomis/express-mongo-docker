FROM node:14

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 4000
CMD [ "npm", "start" ]
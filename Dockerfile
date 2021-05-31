FROM node:16

# Create app directory
WORKDIR /usr/src/app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "node", "server.js" ]

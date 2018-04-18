FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 3000
CMD ["yarn", "run", "start-dev"]

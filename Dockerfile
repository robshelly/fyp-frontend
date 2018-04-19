FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

ARG jenkins_username
ARG jenkins_password
RUN sed -i s/USERNAME/$jenkins_username/g ./vars.js && \
    sed -i s/PASSWORD/$jenkins_password/g ./vars.js

EXPOSE 3000
CMD ["yarn", "run", "start-dev"]

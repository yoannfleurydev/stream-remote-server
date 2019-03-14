FROM node:8

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install
# If we are building our code for production
# RUN yarn install --prod

COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]

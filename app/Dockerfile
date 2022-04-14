FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


# install app dependencies
COPY --chown=node ./ ./

USER node

RUN yarn install

# start app
CMD ["yarn", "start"]

FROM node:10.13-alpine
WORKDIR /app
COPY . .
RUN yarn install && \
    yarn cache clean
CMD ["yarn", "mocha", "--opts", ".mocharc"]

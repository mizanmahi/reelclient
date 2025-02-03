
FROM node:20-alpine


WORKDIR /app


COPY package.json yarn.lock ./


RUN yarn install --frozen-lockfile


COPY . .


RUN yarn build


RUN yarn global add serve


EXPOSE 3000


CMD ["yarn", "dev"]

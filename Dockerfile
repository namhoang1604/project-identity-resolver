FROM node:20-alpine

# Set the default values for the build arguments
ARG PROTOCOL=http
ARG DOMAIN=localhost
ARG PORT=3333
ARG AVAILABLE_BUCKETS=verifiable-credentials,private-verifiable-credentials,epcis-events
ARG STORAGE_TYPE=local
ARG NODE_ENV=development

# Set the environment variables
ENV PROTOCOL=${PROTOCOL}
ENV DOMAIN=${DOMAIN}
ENV PORT=${PORT}
ENV AVAILABLE_BUCKETS=${AVAILABLE_BUCKETS}
ENV STORAGE_TYPE=${STORAGE_TYPE}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE ${PORT}

CMD [ "yarn", "start" ]
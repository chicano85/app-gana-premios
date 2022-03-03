FROM node:16-alpine

WORKDIR /app

# Install ssh and git. Git is for test
RUN apk update && apk upgrade && \
    apk add --no-cache git

# Install more dependencies
RUN apk add -t build-deps python3 build-base

# Run project in mode dev
ENTRYPOINT ["./docker/docker-entrypoint.sh"]
CMD ["dev"]

EXPOSE 4000
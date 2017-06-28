###########################################################
#
# Dockerfile for micro-dockerhub-hook
#
###########################################################

# Setting the base to nodejs 8
FROM mhart/alpine-node:8

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Installs docker
RUN apk add --update --no-cache docker py-pip
RUN apk add bash bash-doc bash-completion
RUN pip install docker-compose

# Extra tools for native dependencies
# RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT 3000
ENV TOKEN abc123
# ENV DEBUG DISABLE

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start

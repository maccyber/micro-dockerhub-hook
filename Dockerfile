###########################################################
#
# Dockerfile for micro-dockerhub-hook
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10

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
ENV WORKDIR /src
COPY . ${WORKDIR}

# Change working directory
WORKDIR "${WORKDIR}"

# Install dependencies
RUN npm install --production

# Env variables
ENV SERVER_PORT ${PORT}
# ENV TOKEN abc123
# ENV DEBUG DISABLE

EXPOSE ${PORT}

# Startup
ENTRYPOINT npm start

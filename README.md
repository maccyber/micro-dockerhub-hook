[![Build Status](https://travis-ci.org/maccyber/micro-dockerhub-hook.svg?branch=master)](https://travis-ci.org/maccyber/micro-dockerhub-hook)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Coverage Status](https://coveralls.io/repos/github/maccyber/micro-dockerhub-hook/badge.svg)](https://coveralls.io/github/maccyber/micro-dockerhub-hook)
[![Code Climate](https://codeclimate.com/github/maccyber/micro-dockerhub-hook/badges/gpa.svg)](https://codeclimate.com/github/maccyber/micro-dockerhub-hook)
[![Greenkeeper badge](https://badges.greenkeeper.io/maccyber/micro-dockerhub-hook.svg)](https://greenkeeper.io/)

# micro-dockerhub-hook

Automatic [docker](https://www.docker.com) deployment with [webhooks](https://docs.docker.com/docker-hub/builds/#webhooks).

micro-dockerhub-hook listens to incoming HTTP POST-requests from hub.docker.com and triggers your specified script(s).

## Features

* Lightweight
* Pretty simple setup process
* Can be runned in a docker container
* Supports updating multiple docker images
* Scripts can trigger docker or docker-compose
* Used in production
* Good logging

# Create a token
Create a secret token with ``openssl``, ``uuidgen`` or something else. Don't use any slashes since token is going to be used in the URL.

```sh
export TOKEN=$(uuidgen)
echo $TOKEN
```

# Installation alternatives

## 1. Run on host

### Install

Nodejs and npm must be installed.

```sh
git clone http://github.com/maccyber/micro-dockerhub-hook
cd micro-dockerhub-hook
npm i
```

### Edit config

See [config.js](config.js)

```sh
vim config.js
```

### Configure repos and scripts

See [scripts/index.js](scripts/index.js)

```sh
vim scripts/index.js
```

Use this format:
`'repo/image[:tag]': 'script.sh [parameter1 parameter2]',`

tag and parameters are optional.

Remember to `chmod +x script.sh`

### Start micro-dockerhub-hook
```sh
npm start
```

## 2. Run with docker-compose

Git clone
```sh
git clone http://github.com/maccyber/micro-dockerhub-hook
```

Add secret token in docker.env with
```sh
vim docker.env
```

Start with
```sh
docker-compose up -d
```

## 3. Run from docker hub

Git clone
```sh
git clone http://github.com/maccyber/micro-dockerhub-hook
```

Start with
```sh
docker run -d \
  -p 3000:3000 \
  -e TOKEN=${token} \
  -v ${PWD}/scripts:/src/scripts \
  -v /var/run/docker.sock:/var/run/docker.sock \
  --name micro-dockerhub-hook \
  maccyber/micro-dockerhub-hook
```

# Configuration on docker hub

Go to https://hub.docker.com/ -> your repo -> Webhooks

Add a webhook like on the following image.

![alt tag](http://bildr.no/image/cFIrR0Ir.jpeg)

Replace ``example.com`` with the domain of your server or it's ip address.

Replace ``abc123`` with your secret token.

docker-hook listens to port 3000 by default.

# Testing on local machine

Setup the development environment

```sh
git clone https://github.com/maccyber/micro-dockerhub-hook/
cd micro-dockerhub-hook
npm i
npm run dev
```

Run test with ```curl``` 

```sh
curl -i -d @test/routes/data/payload.json http://localhost:3000/$TOKEN
```

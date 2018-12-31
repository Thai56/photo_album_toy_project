#!/bin/bash
docker run -it -d \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 3001:3001 \
  --rm \
  react-web-image-front-end

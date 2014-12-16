#!/bin/bash
set -e
docker kill $(docker ps -a -q)
docker pull generaldoddi/tictactoe
docker run -p 80:8080 -d -e "NODE_ENV=commit" generaldoddi/tictactoe

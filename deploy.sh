#!/usr/bin/env bash
docker stop wx
docker rm wx
docker build -t wx-container .
docker run --name wx -p 8000:3000 --link db:db -d wx-container


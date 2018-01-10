#!/usr/bin/env bash
docker stop wx
docker rm wx
docker build -t wx-container .
docker run --name wx --network=webproxy -d wx-container


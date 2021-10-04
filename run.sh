#!/usr/bin/env bash

# Build client
cd client
npm run build

# Build and run server at port 8080
cd ../server
PORT=8080 npm run start

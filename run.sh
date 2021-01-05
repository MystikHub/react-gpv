#!/bin/bash

echo "If you'd like to see extra visualizations, please enter your github api token"
echo "This will be added to the .env file needed by the app"
echo "If you'd like to see limited visualizations, just press <Enter>"

read apiKey
echo "REACT_APP_GITHUB_API_TOKEN=$apiKey" > ./.env

docker build -t hutanus/sweng-github-access .
docker run -p 3000:3000 --rm -it hutanus/sweng-github-access

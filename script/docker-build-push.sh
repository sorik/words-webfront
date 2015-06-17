#! /bin/sh

echo ">> the current build number is $BUILD_NUMBER."
IMAGE_NAME=sorik/words-webfront:$BUILD_NUMBER

echo ">> building the image $IMAGE_NAME"
docker build -t $IMAGE_NAME .

#echo ">> pushing the image..."
#docker push $IMAGE_NAME

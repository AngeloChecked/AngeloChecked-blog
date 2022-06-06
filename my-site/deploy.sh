


sudo docker run --rm -it \
  -v $(pwd):/src \
  -v $HOME/.aws/credentials:/tmp/.aws/credentials:ro \
  klakegg/hugo:0.93.2 \
  deploy

exit 

sudo docker run --rm -it \
  -v $(pwd):/src \
  -v $HOME/.aws/credentials:/root/.aws/credentials:ro \
  --entrypoint="/bin/sh" \
  klakegg/hugo:0.93.2 

exit


sudo docker run -it --name=myubuntu ubuntu:latest bash

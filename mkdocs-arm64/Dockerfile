FROM aarch64/debian:stretch
MAINTAINER Bryce

RUN apt-get update \
 && apt-get install -y mkdocs git vim \
 && rm -rf /var/lib/apt/lists/*

EXPOSE 8000
CMD ["bash"]

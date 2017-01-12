FROM aarch64/debian:jessie
MAINTAINER Bryce Nordgren <bnordgren@gmail.com>

RUN apt-get update \
 && apt-get install -y gpsd \
 && rm -rf /var/lib/apt/lists/*

EXPOSE 2947


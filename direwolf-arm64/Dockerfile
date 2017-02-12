FROM aarch64/debian:jessie
MAINTAINER Bryce Nordgren <bnordgren@gmail.com>

RUN apt-get update \
 && apt-get install -y wget alsa-utils build-essential libasound2-dev libgps-dev \
 && rm -rf /var/lib/apt/lists/*

RUN wget -O /tmp/1.3.tar.gz https://github.com/wb2osz/direwolf/archive/1.3.tar.gz \
 && cd /tmp && tar zxf 1.3.tar.gz \
 && cd direwolf-1.3 \
 && make tocalls-symbols \
 && make \
 && make install \
 && make install-conf \
 && apt-get remove -y build-essential libasound2-dev libgps-dev \
# && apt-get autoremove -y \
 && rm -rf /tmp/direwolf-1.3 /tmp/1.3.tar.gz


EXPOSE 8000 8001


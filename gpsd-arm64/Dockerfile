FROM aarch64/debian:jessie
MAINTAINER Bryce Nordgren <bnordgren@gmail.com>

RUN apt-get update \
 && apt-get install -y wget scons libncurses5-dev python-dev pps-tools git-core build-essential libusb-1.0-0 libusb-1.0-0-dev libncurses5 libncurses5-dev libtinfo5 libtinfo-dev libcap2 libcap-dev bc \
 && cd /tmp \
 && wget http://download-mirror.savannah.gnu.org/releases/gpsd/gpsd-3.16.tar.gz \
 && tar xf gpsd-3.16.tar.gz \
 && cd gpsd-3.16 \
 && scons \
 && scons check \
 && scons install \
 && apt-get remove -y build-essential libusb-1.0-0-dev libncurses5-dev libtinfo-dev libcap-dev bc \
 && apt-get autoremove -y \
 && rm -rf /var/lib/apt/lists/*

EXPOSE 2947


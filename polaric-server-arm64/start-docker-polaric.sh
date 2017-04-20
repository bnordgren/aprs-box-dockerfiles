#!/bin/bash

MAP_DATA=/home/alarm/mapdata

MY_IP=`ip a show dev eth0 | awk '($1 == "inet") {split($2, fields, "/") ; print fields[1] }'`

docker run --name polaric --cap-add DAC_READ_SEARCH -p 80:80 --net aprs-box \
     -v $MAP_DATA:/var/cache/mapcache --rm \
     -e "MY_IP=$MY_IP" polaric-server-arm64

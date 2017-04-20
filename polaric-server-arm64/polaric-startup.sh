#!/bin/bash

rm -f /var/run/polaric-aprsd.pid
sed -i "s/%MY_IP%/$MY_IP/g" /etc/polaric-webapp/mapconfig.js
/etc/init.d/polaric-aprsd restart
apachectl -D FOREGROUND

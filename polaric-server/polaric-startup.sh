#!/bin/bash

rm -f /var/run/polaric-aprsd.pid
sed -i "s/%MY_IP%/$MY_IP/g" /etc/polaric-webapp/mapconfig.js
sed -i "s/%MYCALL%/$CALLSIGN/g" /etc/polaric-aprsd/aprsd-server.ini
/etc/init.d/polaric-aprsd restart
apachectl -D FOREGROUND

FROM aarch64/debian:jessie
MAINTAINER Bryce Nordgren <bnordgren@gmail.com>

# Set the user's callsign
# User must set something here.
# e.g. "ENV CALLSIGN AF7RQ"
ENV CALLSIGN AF7RQ

# Add the polaric repo and jessie-backports
RUN echo "deb http://aprs.no/debian-rep binary-dev/" > /etc/apt/sources.list.d/polaric.list \
 && echo "deb http://ftp.debian.org/debian/ jessie-backports main" >> /etc/apt/sources.list

# Add signing key for polaric repo
RUN gpg --keyserver pool.sks-keyservers.net --recv-keys 89E7229CFFD59B2F \
 && gpg --export --armor 3E61003E24632585EB3DFE3D89E7229CFFD59B2F | apt-key add -

# Get the webapp
RUN apt-get update \
 && echo polaric-aprsd	polaric-aprsd/callsign	string	${CALLSIGN} | debconf-set-selections \
 && apt-get install -y polaric-webapp polaric-webconfig-plugin \
 && rm -rf /var/lib/apt/lists/*

# Populate container with configuration and logo
COPY mapcache.xml mapconfig.js webappconfig.php /etc/polaric-webapp/
COPY polaric-startup.sh /usr/local/bin/
COPY logo.png /var/www/aprs/
COPY polaric-aprsd /etc/init.d/
COPY aprsd-server.ini /etc/polaric-aprsd/server.ini

EXPOSE 80 8081
CMD [ "/usr/local/bin/polaric-startup.sh" ]

FROM aarch64/debian:jessie
MAINTAINER Bryce Nordgren <bnordgren@gmail.com>
RUN apt-get update \
  && apt-get install -y \
    apache2 \
    gdal-bin \
    libapache2-mod-mapcache \
    libtiff5 \
    mapcache-tools  \
    sqlite3 \
  && rm -rf /var/lib/apt/lists/*
RUN mkdir -p /etc/mapcache
COPY mapcache.xml /etc/mapcache/mapcache.xml
COPY mapcache.conf /etc/apache2/mods-enabled/mapcache.conf
EXPOSE 80
VOLUME /var/cache/mapcache
CMD ["bash"]

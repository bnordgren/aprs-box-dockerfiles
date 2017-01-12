FROM aarch64/debian:jessie
MAINTAINER Bryce Nordgren <bnordgren@gmail.com>

# Need multiverse for mscorefonts (Ubuntu) 
#RUN apt-get update && \
#    apt-get install -y software-properties-common && \
#    apt-add-repository multiverse && \
#    apt-get update

# Need contrib for mscorefonts (Debian)
RUN sed -i '/deb/ s/$/ contrib/' /etc/apt/sources.list

# Processing requirements for TopOSM
RUN apt-get update \
    && apt-get install -y debconf-utils  \
    && echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula boolean true | debconf-set-selections \
    && apt-get install -y python-mapnik mapnik-utils gdal-bin gdal-contrib python-gdal \
       proj-bin proj-data python-pyproj python-numpy imagemagick \
       optipng git \
       wget libxml2-dev python-libxml2 \
       make htop python-cairo \
       osm2pgsql unzip python-pypdf \
       fonts-sil-gentium ttf-mscorefonts-installer \
       "ttf-adf-*" vim python-xattr python-lockfile python-pillow \
       python-pastescript python-webob \
    && rm -rf /var/lib/apt/lists/*

# Create a user to do all the work, check out the 
# current TopOSM code, and check out the Mapnik WMS
# server.
RUN useradd -g users -m -N -u 1000 toposm && \
    ( cd ~toposm ; git clone https://github.com/bnordgren/TopOSM.git ) && \
    ( cd ~toposm ; git clone https://github.com/bnordgren/OGCServer.git ; cd OGCServer ; python setup.py install) && \
    chown -R toposm.users ~toposm/TopOSM ~toposm/OGCServer

EXPOSE 8000
VOLUME ["/var/local/source","/var/local/rendered"]
CMD ["/bin/bash"]

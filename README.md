# aprs-box-dockerfiles
dockerfiles for aprs-box related software on armhf, aarch64/arm64 and amd64 

## Introduction
This information is as preliminary as the rest of the repository is. The intent is to produce Docker containers for ham radio
related software, focusing on the "APRS Box" concept. The main components are the Polaric server (map cache and web display) 
and direwolf (soundcard modem/TNC/digipeater). I intend to develop a gpsd container as well. The other containers (toposm, 
postgis) are what I used to produce the maps which wind up in the Polaric map cache. These are very specific to my application.
They may wind up on my embedded system (Odroid/Pi) if resources and performance prove adequate.

I have found that there is too much configuration to support a simple "docker pull <image>" operation. The intended use of this
repository is for the user to clone it, copy the `*.templ` template files to a file with the same name, but not ending in `.templ`,
customize these files to their liking, then build the container locally. You will have to edit the Dockerfile too, at least to 
select your platform, and possibly to put in your call sign. 

Support of multiple platforms is accomplished by changing the Dockerfile's "FROM" line to a Debian Jessie derivitive appropriate for that 
platform. A desktop machine would use the amd64 version, a raspberry pi would use Raspbian, a 64 bit ARM device would use 
aarch64/debian. These are all at the top of the Dockerfile, and commented out.

If you want the containers to start automatically, this happens outside of the containers. You need to understand the OS your 
host is running well enough to make that happen. Some of the subdirectories may have `*.service` files which you can use on 
systemd systems.

This is very much alpha-quality packaging. I'm not spending too much time trying to make it pretty, yet. 

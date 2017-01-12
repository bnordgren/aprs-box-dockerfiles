#!/bin/bash

/etc/init.d/polaric-aprsd start
apachectl -D FOREGROUND

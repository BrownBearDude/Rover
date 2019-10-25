@echo off
call clean.cmd
title Building with parcel. . .
echo Building with parcel. . .
call parcel build src/**/index.html
echo Done building.
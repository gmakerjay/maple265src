@echo off
cd /d %~dp0
set XMS=4G
set XMX=4G

java --enable-preview -server -Xms%XMS% -Xmx%XMX% -jar maplestory.jar

pause

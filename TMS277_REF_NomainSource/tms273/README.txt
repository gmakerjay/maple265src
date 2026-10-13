Before launching the server:
- make sure mariadb is installed on WSL and sql is imported
- make sure db path/credentials in center.properties is correct
- run addhosts.bat once as Admin (for game launcher).

Server launch order on Windows 11 + Ubuntu WSL:
1. Run 00_auth_launcher.bat.
2. Run 01_generate_credentials.bat.
3. Run 02_center.bat.
4. Run 03_login.bat.
5. Run 04_auction.bat.
6. Run 05_shop.bat.
7. Run 06_game0.bat.
8. Run 07_game1.bat.



Ubuntu-side dependencies needed:
- python3
- python3-cryptography
- libssl3 / libcrypto.so.3
- mariadb-server with database tms imported from sql/Tms.sql



Launching the game:
1. Copy the MXD.exe and msimg32.dll from /launcher to game directory
2. With auth_launcher running and hosts added, open the game through MXD.exe







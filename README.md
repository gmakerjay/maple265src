# Maple Coin v1.0
*A Java v179 Maple Story server emulator. This is an update from fork of the v176 SwordieMS.*

> **Project Information**
> 
>> **JDBC**: HikariCP.
> 
>> **Main Language**: Java 16.
> 
>> **Script Engine**: Python 2.7.2.

# Update Log
**02/03/2022**:
- Fixed Remove Friend/Account Friend When Target is Offline.
- Fixed Reject Friend When Target Offline.
- Fixed Convert Account Friend When Target Offline.
- Fixed Change Character Slot.
- Fixed Change PIC.
- Fixed Party Remote HP.
- Fixed Link Skill.
- Fixed Hyper Teleport Rock.
- Fixed Skills Delete.
- Added Auto Fix for Party Member Disconnected but still Online.
- Added Admin Login Mode. (Use: !toggleLoginMode)
- Added Special Event Command. (Use: !toggleEvent <FeverTime/MiracleTime/ExpRate/DropRate> <Enable/Disable>)
- Optimized GM Hide.
- You can set Link Skill without wait 24 hour.

**01/03/2022**:
- Fixed Party with ID = 0.
- Fixed Party Member join not same Party.
- Fixed Party Kick not update Data.
- Fixed Party Change Leader.
- Fixed Party Kick / Disband with offline character.
- Fixed Change Channel will make Party Null and Change Leader.
- Fixed Add Friend/Account Friend.
- Fixed Delete Friend/Account Friend.
- Fixed Add Friend/Account Friend When Target is Offline.
- Fixed Increase Friend Slot.
- Fixed Convert to Account Friend.
- Fixed Reject Friend/ Account Friend.
- Fixed Friend Group.
- Added Create Account.
- Added Delete Character.
- Clean some old db stuff.
- Optimize Create Character.
- Todo: Fix Remove Friend/Account Friend When Target is Offline And Fix Reject Friend When Target Offline.

**25/02/2022**:
- Fixed Throwing Star and Bullet group with old item when take from Trunk.
- Fixed Quest List, Quest Mapping.
___
**24/02/2022**:
- Fixed Party Load when login.
- Fixed Party wrong struct data.
- Fixed Cash Shop Put/Take Item.
___
**23/02/2022**:
- Added Reward System.
- Added Cash Shop. (Not handle Cash Shop action just Load).
- Added Pet Item.
- Fixed Update function for User, Account.
- Fixed Trunk Item can't take Equip.
- Fixed Trunk Item can't put Throwing Star.
- Fixed Time Struct.
- Merged with MapleCoin main source.
___
**22/02/2022**:
- Added Trunk Put/Get item.
- Added Mapping CashItemInfo.
- Added Shop Items.
___
**21/02/2022**:
- Added Function return SQL Syntax for beauty format.
- Added Insert/Update/Select/Delete for Trunk Class.
- Fixed Mapping Medals Class.
- Fixed Too many connections Error.
- Improved Select Function Struct for some class.
- Improved Quest Class Query Speed for faster enter game.
- Moved Load Character when CHAR_SELECT call.
___
**20/02/2022**:
- Add HikariCP and Insert, Delete, Update, Select Function in main class.
- Re-Test all system and fix bug before deploy to Server.
- TODO: Create UI for Server, Create New Character, Trunk, CashShop, Guild, Auction House, Improve Performance.
- TODO: Remove all hibernate stuff when hikari done.
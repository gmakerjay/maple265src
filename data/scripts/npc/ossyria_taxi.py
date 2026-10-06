fid = sm.getFieldID()

if fid == 211000000:
    maps = [211060000, 211040200, 211041400, 300000100]
    sel = sm.sendAskMenu("Where would you like to go?"
                         "\r\n#L0#Desolate Moor#l"
                         "\r\n#L1#Ice Valley II#l"
                         "\r\n#L2#Forest of Dead Trees IV#l"
                         "\r\n#L3#Small Forest#l")
    sm.warp(int(maps[int(sel)]), 0)
    sm.dispose()

elif fid == 300000100:
    maps = [211000000, 220000000]
    sel = sm.sendAskMenu("Where would you like to go?"
                         "\r\n#L0#El Nath#l"
                         "\r\n#L1#Ludibrium#l")
    sm.warp(int(maps[int(sel)]), 0)
    sm.dispose()

elif fid == 220000000:
    maps = [220050300, 300000100]
    sel = sm.sendAskMenu("Where would you like to go?"
                         "\r\n#L0#Path of Time#l"
                         "\r\n#L1#Small Forest#l")
    sm.warp(int(maps[int(sel)]), 0)
    sm.dispose()

elif fid == 240000000:
    maps = [240030000, 240040500]
    sel = sm.sendAskMenu("Where would you like to go?"
                         "\r\n#L0#Entrance to Dragon Forest#l"
                         "\r\n#L1#Entrance to Dragon Nest#l")
    sm.warp(int(maps[int(sel)]), 0)
    sm.dispose()

# back/shortcut part
currentMap = fid
dest = None
if currentMap == 220050300:
    dest = 220000000
elif currentMap == 105030000:
    dest = 105000000
elif currentMap == 105000000:
    dest = 105030000
elif currentMap == 211060000:
    dest = 211000000

if dest is not None:
    if sm.sendAskYesNo("Would you like to go to #m" + str(dest) + "#?"):
        sm.warp(dest, 0)

sm.dispose()
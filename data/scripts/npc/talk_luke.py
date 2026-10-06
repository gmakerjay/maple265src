Luke = 1040000

sm.sendSayOkay("Now, go find something to do so I can take my nap.")

if sm.hasQuest(32248):
    sm.setPlayerAsSpeaker()
    sm.sendSay("I'm looking for a hat... Seen it?")
    
    sm.setSpeakerID(Luke)
    sm.sendSay("Oh, is it yours? Here, take it.")
    
    sel = sm.sendNext("But...wait! Which one is it?\r\n\r\n#b#L0##v4033881# #t4033881##l\r\n#L1##v4033882# #t4033882##l\r\n#L2##v4033883# #t4033883##l")
    if sel == 0:
        sm.setSpeakerID(Luke)
        if sm.hasItem(4033881):
            sm.consumeItem(4033881)
        if sm.hasItem(4033882):
            sm.consumeItem(4033882)
        if sm.hasItem(4033883):
            sm.consumeItem(4033883)
        sm.giveItem(4033881)
        sm.sendNext("Here. Don't you EVER drop this again...")
    elif sel == 1:
        sm.setSpeakerID(Luke)
        if sm.hasItem(4033881):
            sm.consumeItem(4033881)
        if sm.hasItem(4033882):
            sm.consumeItem(4033882)
        if sm.hasItem(4033883):
            sm.consumeItem(4033883)
        sm.giveItem(4033882)
        sm.sendNext("Here. Don't you EVER drop this again...")
    elif sel == 2:
        sm.setSpeakerID(Luke)
        if sm.hasItem(4033881):
            sm.consumeItem(4033881)
        if sm.hasItem(4033882):
            sm.consumeItem(4033882)
        if sm.hasItem(4033883):
            sm.consumeItem(4033883)
        sm.giveItem(4033883)
        sm.sendNext("Here. Don't you EVER drop this again...")


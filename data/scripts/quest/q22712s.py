# Character field ID when accessed: 331001000
# ObjectID: 0
# ParentID: 22712
POWER_SWEAT = 2000040
JAY = 1531001
sm.setSpeakerID(JAY)
sm.setBoxChat()
sm.sendNext("Everything works fine.")
if sm.sendAskYesNo("We can call it a day now. I've prepared a cooling ion drink for you. Drink it and rest. I want to check if your fatigue level decreases normally."):
    if sm.canHold(POWER_SWEAT, 1):
        sm.sendNext("I've added the drink to your inventory. To drink it, double-click its icon like you would equip an item. We'll talk after all your physical indexes return to normal.")
        sm.giveItem(POWER_SWEAT)
        #TODO add effect ballon
        sm.playExclSoundWithDownBGM("Voice3.img/Kinesis/guide_07", 100)
        sm.chatScript("Open the inventory and use the item.")
        sm.startQuest(parentID)
    else:
        sm.sendSayOkay("Please make more space in your EQUIP inventory.") 
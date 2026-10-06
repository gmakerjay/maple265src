# ParentID: 23612
# ObjectID: 0
# Character field ID when accessed: 230050000
BIOLOGIST = 2300002

sm.setSpeakerID(BIOLOGIST)
sm.setBoxChat()    
sm.sendNext("That took longer than I expected. Is everything all right?")  

sm.setPlayerBoxChat()
sm.sendNext("(You explain that you were almost discovered by the Black Wings.)")

sm.setSpeakerID(BIOLOGIST)
sm.setBoxChat()    
sm.sendNext("Hum. You almost got caught at the end? Gelimer will go into flames when he finds out that he let you pass right in front of his eyes. Anyway, welcome back.")

if sm.sendAskYesNo("You've proven your bravery. Will you take what we have prepared?\r\n#b<Accept 3rd Job Advancement.>"):
    if sm.canHold(1142577):
            sm.jobAdvance(3611)
            sm.giveItem(1142577)
            sm.chatScript("<Captain Fredom> has been awarded.")
            sm.chatScript("Earned Forever Single title!")
            sm.completeQuest(parentID)
    else:
        sm.sendSayOkay("Please make more space in your EQUIP inventory.") 
    
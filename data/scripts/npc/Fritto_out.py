# Fritto Rewards:
from net.swordie.ms.constants import QuestConstants

FRITTO = 9001060

sm.setSpeakerID(FRITTO)
if chr.getFrittoEagle() is not None:
    point = int(sm.getQRValueByKey(15141, "point"))
    sm.flipDialogue()
    if sm.sendNext("You're one heck of a hunter! Good job!\r\n\r\n#b#L0#I'll send you back to where you were.#l#k") == 0:
        sm.flipDialogue()
        sm.sendSayOkay("I will send you back to your previous location.")
        sm.giveExp(point * 1000000)
        if point == 1000:
            sm.giveExp(500 * chr.getLevel())
            chr.addItemToInventory(2434636, 1, "day", 7)
        elif point >= 700:
            sm.giveExp(200 * chr.getLevel())
            chr.addItemToInventory(2434635, 1, "day", 7)
        elif point >= 300:
            sm.giveExp(100 * chr.getLevel())
            chr.addItemToInventory(2434634, 1, "day", 7)
        elif point >= 100:
            sm.giveExp(50 * chr.getLevel())
            chr.addItemToInventory(2434633, 1, "day", 7)
        sm.createQuestWithQRValue(15141, "point=0")
        if chr.getPreviousFieldID() != 993000200 and chr.getPreviousFieldID() != 993000300 and chr.getPreviousFieldID() != 993000400 and chr.getPreviousFieldID() != 993000601:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID())
        else:
            sm.warpInstanceOut(chr, 100000000)
        chr.setFrittoEagle(None)
elif chr.getFrittoEgg() is not None:
    stage = int(sm.getQRValueByKey(15042, "stage"))
    sm.flipDialogue()
    if sm.sendNext("You're one heck of a hunter! Good job!\r\n\r\n#b#L0#I'll send you back to where you were.#l#k") == 0:
        sm.flipDialogue()
        sm.sendSayOkay("I will send you back to your previous location.")
        if stage == 5:
            sm.giveExp(500 * chr.getLevel())
            chr.addItemToInventory(2434636, 1, "day", 7)
        elif stage == 4:
            sm.giveExp(200 * chr.getLevel())
            chr.addItemToInventory(2434635, 1, "day", 7)
        elif stage == 3:
            sm.giveExp(100 * chr.getLevel())
            chr.addItemToInventory(2434634, 1, "day", 7)
        elif stage == 2:
            sm.giveExp(50 * chr.getLevel())
            chr.addItemToInventory(2434633, 1, "day", 7)
        sm.createQuestWithQRValue(15042, "stage=0")
        if chr.getPreviousFieldID() != 993000200 and chr.getPreviousFieldID() != 993000300 and chr.getPreviousFieldID() != 993000400 and chr.getPreviousFieldID() != 993000601:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID())
        else:
            sm.warpInstanceOut(chr, 100000000)
        chr.setFrittoEgg(None)
elif chr.getFrittoDancing() is not None:
    score = int(sm.getQRValueByKey(15143, "score"))
    sm.flipDialogue()   
    if sm.sendNext("You're one heck of a hunter! Good job!\r\n\r\n#b#L0#I'll send you back to where you were.#l#k") == 0:
        sm.flipDialogue()
        sm.sendSayOkay("I will send you back to your previous location.")
        if score == 10:
            sm.giveExp(500 * chr.getLevel())
            chr.addItemToInventory(2434636, 1, "day", 7)
        elif score >= 8 and score < 10:
            sm.giveExp(200 * chr.getLevel())
            chr.addItemToInventory(2434635, 1, "day", 7)
        elif score >= 4 and score < 8:
            sm.giveExp(100 * chr.getLevel())
            chr.addItemToInventory(2434634, 1, "day", 7)
        elif score >= 2:
            sm.giveExp(50 * chr.getLevel())
            chr.addItemToInventory(2434633, 1, "day", 7)
        sm.createQuestWithQRValue(15143, "score=0")
        if chr.getPreviousFieldID() != 993000200 and chr.getPreviousFieldID() != 993000300 and chr.getPreviousFieldID() != 993000400 and chr.getPreviousFieldID() != 993000601:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID())
        else:
            sm.warpInstanceOut(chr, 100000000)
        chr.setFrittoDancing(None)
else:
    sm.flipDialogue() 
    if sm.sendNext("You're one heck of a hunter! Good job!\r\n\r\n#b#L0#I'll send you back to where you were.#l#k") == 0:
        sm.flipDialogue()
        sm.sendSayOkay("I will send you back to your previous location.")
        if chr.getPreviousFieldID() != 993000200 and chr.getPreviousFieldID() != 993000300 and chr.getPreviousFieldID() != 993000400 and chr.getPreviousFieldID() != 993000601:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID())
        else:
            sm.warpInstanceOut(chr, 100000000)
        chr.setFrittoDancing(None)
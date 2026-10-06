# Pollo Rewards:

from net.swordie.ms.constants import QuestConstants

POLLO = 9001059
if sm.hasQuest(QuestConstants.INFERNO_WOLF_DAMAGE_RECORD):
    damage = int(sm.getQRValueByKey(QuestConstants.INFERNO_WOLF_DAMAGE_RECORD, "damage"))

sm.setSpeakerID(POLLO)
if chr.getBountyHunting() is not None:
    sm.flipDialogue()
    if sm.sendNext("You're one heck of a hunter! Good job!\r\n\r\n#b#L0#I'll send you back to where you were.#l#k") == 0:
        sm.flipDialogue()
        sm.sendSayOkay("I will send you back to your previous location.")
        sm.giveExp(chr.getBountyHunting().getStage() * 100 * chr.getLevel())
        if chr.getPreviousFieldID() != 993000000 and chr.getPreviousFieldID() != 993000100 and chr.getPreviousFieldID() != 993000600:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID())
        else:
            sm.warpInstanceOut(chr, 100000000)
        chr.setBountyHunting(None)
elif chr.getDefenseTowerWave() is not None:
    sm.flipDialogue()
    if sm.sendNext("You're one heck of a hunter! Good job!\r\n\r\n#b#L0#I'll send you back to where you were.#l#k") == 0:
        sm.flipDialogue()
        sm.sendSayOkay("I will send you back to your previous location.")
        sm.giveExp(chr.getDefenseTowerWave().getWave() * 100 * chr.getLevel())
        if chr.getPreviousFieldID() != 993000000 and chr.getPreviousFieldID() != 993000100 and chr.getPreviousFieldID() != 993000600:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID())
        else:
            sm.warpInstanceOut(chr, 100000000)
        chr.setDefenseTowerWave(None)
else:
    sm.flipDialogue()
    sel = sm.sendNext("You're one heck of a hunter! Good job!\r\n\r\n#b#L0#Receive the Inferno Wolf Hunt reward.#l\r\n#L1#I'll send you back to where you were.#l#k\r\n\r\n#r(Make sure you have enough empty slots in USE tab!)#k")
    if sel == 0:
        if sm.getQRValue(QuestConstants.INFERNO_WOLF_MOB_DEAD) == "mobDead=1":
            sm.flipDialogue()
            sm.sendNext("You defeated the infamous #e#rInferno Wolf#k#n?! You must have some serious skills.")
            sm.flipDialogue()
            sm.sendSay("The #e#rInferno Wolf#k#n have been evading us for quite a while. I'm sure he'll be back one day... But thanks to you, he won't be harassing any travelers for a while!")
            sm.flipDialogue()
            sm.sendSay("Here's a small token of my gratitude.\r\n#v2434636# #b#z2434636##k\r\n\r\nI know it's not much, but it's just my way of sayign thanks!")
            sm.flipDialogue()
            sm.sendSay("It's impossible to get rid of the #e#rInferno Wolf#k#n forever. We'll meet up again if he ever decides to come back. Until then, farewell!")
            sm.giveExp(1000 * chr.getLevel())
            chr.addItemToInventory(2434636, 1, "day", 7)
            sm.createQuestWithQRValue(QuestConstants.INFERNO_WOLF_MOB_DEAD, "mobDead=0")
            sm.createQuestWithQRValue(QuestConstants.INFERNO_WOLF_DAMAGE_RECORD, "damage=0")
        else:
            sm.flipDialogue()
            sm.sendNext("I saw you fighting valiantly against the infamous #e#rInferno Wolf#k#n. You didn't seem the least bit intimidated.")
            sm.flipDialogue()
            sm.sendSay("With such superb hunters like yourself helping me with this, the #e#rInferno Wolf#k#n won't be lasting much longer.")
            if damage >= 700000000000:
                sm.flipDialogue()
                sm.sendSayOkay("You've dealt #e#bInsane#k#n damage to the Inferno Wolf! Here is your rewards:\r\n\r\n#b1. EXP\r\n2. #z2434635##k.\r\nThe amount you get is tied to your contribution.")
                sm.giveExp(50000 * chr.getLevel())
                chr.addItemToInventory(2434635, 1, "day", 7)
            elif damage >= 300000000000 and damage < 700000000000:
                sm.flipDialogue()
                sm.sendSayOkay("You've dealt #e#bDecent#k#n damage to the Inferno Wolf! Here is your rewards:\r\n\r\n#b1. EXP\r\n2. #z2434634##k.\r\nThe amount you get is tied to your contribution.")
                sm.giveExp(20000 * chr.getLevel())
                chr.addItemToInventory(2434634, 1, "day", 7)
            elif damage >= 100000000000 and damage < 300000000000:
                sm.flipDialogue()
                sm.sendSayOkay("You've dealt #e#bGood#k#n damage to the Inferno Wolf! Here is your rewards:\r\n\r\n#b1. EXP\r\n2. #z2434633##k.\r\nThe amount you get is tied to your contribution.")
                sm.giveExp(10000 * chr.getLevel())
                chr.addItemToInventory(2434633, 1, "day", 7)
            elif damage >= 1:
                sm.flipDialogue()
                sm.sendSayOkay("You've dealt #e#bAdequate#k#n damage to the Inferno Wolf!\r\nLet me give you some #bEXP#k first. The amount you get is tied to your contribution.")
            sm.createQuestWithQRValue(QuestConstants.INFERNO_WOLF_DAMAGE_RECORD, "damage=0")
        if chr.getPreviousFieldID() != 993000500 and chr.getPreviousFieldID() != 993000600:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID(), 0)
        else:
            sm.warpInstanceOut(chr, 100000000, 0)
    elif sel == 1:
        sm.flipDialogue()
        sm.sendSayOkay("I will send you back to your previous location.")
        if chr.getPreviousFieldID() != 993000000 and chr.getPreviousFieldID() != 993000100 and chr.getPreviousFieldID() != 993000500 and chr.getPreviousFieldID() != 993000600:
            sm.warpInstanceOut(chr, chr.getPreviousFieldID(), 0)
        else:
            sm.warpInstanceOut(chr, 100000000, 0)
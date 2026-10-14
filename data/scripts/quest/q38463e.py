# [Daily Quest] Peace in Arcana
TREE_SPIRITS = 3003322
COUPON = 2635512
EXP_REWARD = 170000000

sm.setSpeakerID(TREE_SPIRITS)
sm.sendNext("#b[Daily Quest] Peace in Arcana#k\r\nYou have successfully completed today's expedition! The forest spirits sing your praises.")
if sm.sendAskYesNo("You have not claimed your Arcana Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Arcana Daily Quest completion EXP can only be claimed once per day per world."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveExp(EXP_REWARD)
        sm.giveItem(COUPON, 20)
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 20. Please check your USE inventory.\r\n\r\n#r#e* You have received the Arcana Daily Quest completion EXP!*#n")
    else:
        sm.setSpeakerID(TREE_SPIRITS)
        sm.sendNext("Please make sure you have at least 1 empty slot in your #bUSE#k inventory.")
else:
    sm.setSpeakerID(TREE_SPIRITS)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

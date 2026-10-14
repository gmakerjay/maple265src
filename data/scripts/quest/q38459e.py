# [Daily Quest] A Night's Peace in Lachelein
GRAY_MASK = 3003209
COUPON = 2635511
EXP_REWARD = 130000000

sm.setSpeakerID(GRAY_MASK)
sm.sendNext("#b[Daily Quest] A Night's Peace in Lachelein#k\r\nYou have successfully completed today's mission. Your help brings much-needed quiet to the Dreaming City.")
if sm.sendAskYesNo("You have not claimed your Lachelein Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Lachelein Daily Quest completion EXP can only be claimed once per day per world."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveExp(EXP_REWARD)
        sm.giveItem(COUPON, 20)
        sm.setSpeakerID(GRAY_MASK)
        sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 20. Please check your USE inventory.\r\n\r\n#r#e* You have received the Lachelein Daily Quest completion EXP!*#n")
    else:
        sm.setSpeakerID(GRAY_MASK)
        sm.sendNext("Please make sure you have at least 1 empty slot in your #bUSE#k inventory.")
else:
    sm.setSpeakerID(GRAY_MASK)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

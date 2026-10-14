# [Daily Quest] Esfera Research Orders
OLLIE = 3003530
COUPON = 2635514
EXP_REWARD = 250000000

sm.setSpeakerID(OLLIE)
sm.sendNext("#b[Daily Quest] Esfera Research Orders#k\r\nYou have successfully completed today's reconnaissance orders! Your report will assist our command greatly.")
if sm.sendAskYesNo("You have not claimed your Esfera Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Esfera Daily Quest completion EXP can only be claimed once per day per world."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveExp(EXP_REWARD)
        sm.giveItem(COUPON, 20)
        sm.setSpeakerID(OLLIE)
        sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 20. Please check your USE inventory.\r\n\r\n#r#e* You have received the Esfera Daily Quest completion EXP!*#n")
    else:
        sm.setSpeakerID(OLLIE)
        sm.sendNext("Please make sure you have at least 1 empty slot in your #bUSE#k inventory.")
else:
    sm.setSpeakerID(OLLIE)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

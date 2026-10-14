# [Daily Quest] Save the Morass
JEAN = 3003432
COUPON = 2635513
EXP_REWARD = 210000000

sm.setSpeakerID(JEAN)
sm.sendNext("#b[Daily Quest] Save the Morass#k\r\nYou have successfully completed today's stabilization mission! Thank you for protecting the Swamp of Memory.")
if sm.sendAskYesNo("You have not claimed your Morass Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Morass Daily Quest completion EXP can only be claimed once per day per world."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveExp(EXP_REWARD)
        sm.giveItem(COUPON, 20)
        sm.setSpeakerID(JEAN)
        sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 20. Please check your USE inventory.\r\n\r\n#r#e* You have received the Morass Daily Quest completion EXP!*#n")
    else:
        sm.setSpeakerID(JEAN)
        sm.sendNext("Please make sure you have at least 1 empty slot in your #bUSE#k inventory.")
else:
    sm.setSpeakerID(JEAN)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

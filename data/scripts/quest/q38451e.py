# [Daily Quest] Vanishing Journey Research
RONA = 3003104
COUPON = 2635509
EXP_REWARD = 50000000

sm.setSpeakerID(RONA)
sm.sendNext("#b[Daily Quest] Vanishing Journey Research#k\r\nYou have successfully completed today's research mission! Your efforts have helped us immensely.")
if sm.sendAskYesNo("You have not claimed your Vanishing Journey Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Vanishing Journey Daily Quest completion EXP can only be claimed once per day per world."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveExp(EXP_REWARD)
        if sm.hasQuestCompleted(37620): # [Reverse City] Surviving in the Reversed City
            sm.giveItem(COUPON, 20)
            sm.setSpeakerID(RONA)
            sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 20 (+10 bonus for completing #b[Reverse City] Surviving in the Reversed City#k). Please check your USE inventory.\r\n\r\n#r#e* You have received the Vanishing Journey Daily Quest completion EXP!*#n")
        else:
            sm.giveItem(COUPON, 10)
            sm.setSpeakerID(RONA)
            sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 10. Please check your USE inventory.\r\n\r\n#r#e* You have received the Vanishing Journey Daily Quest completion EXP!*#n")
    else:
        sm.setSpeakerID(RONA)
        sm.sendNext("Please make sure you have at least 1 empty slot in your #bUSE#k inventory.")
else:
    sm.setSpeakerID(RONA)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

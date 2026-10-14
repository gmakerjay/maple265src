# [Daily Quest] Chu Chu's Finest Cuisine
MASTER_LYCK = 3003152
COUPON = 2635510
EXP_REWARD = 90000000

sm.setSpeakerID(MASTER_LYCK)
sm.sendNext("#b[Daily Quest] Chu Chu's Finest Cuisine#k\r\nYou have successfully completed today's culinary task! This will help our feast tremendously.")
if sm.sendAskYesNo("You have not claimed your Chu Chu Island Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Chu Chu Island Daily Quest completion EXP can only be claimed once per day per world."):
    if sm.getEmptyInventorySlots(2) >= 1:
        sm.completeQuest(parentID)
        sm.giveExp(EXP_REWARD)
        if sm.hasQuestCompleted(37726): # [Yum Yum] The Traveler and the Follower
            sm.giveItem(COUPON, 20)
            sm.setSpeakerID(MASTER_LYCK)
            sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 20 (+10 bonus for completing #b[Yum Yum] The Traveler and the Follower#k). Please check your USE inventory.\r\n\r\n#r#e* You have received the Chu Chu Island Daily Quest completion EXP!*#n")
        else:
            sm.giveItem(COUPON, 10)
            sm.setSpeakerID(MASTER_LYCK)
            sm.sendSayOkay("I have given you #b#i" + str(COUPON) + "# #z" + str(COUPON) + "##k x 10. Please check your USE inventory.\r\n\r\n#r#e* You have received the Chu Chu Island Daily Quest completion EXP!*#n")
    else:
        sm.setSpeakerID(MASTER_LYCK)
        sm.sendNext("Please make sure you have at least 1 empty slot in your #bUSE#k inventory.")
else:
    sm.setSpeakerID(MASTER_LYCK)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

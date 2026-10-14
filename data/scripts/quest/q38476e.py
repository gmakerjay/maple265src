# [Daily Quest] Limina Research
VELIVAH = 3003810
EXP_REWARD = 600000000

sm.setSpeakerID(VELIVAH)
sm.sendNext("#b[Daily Quest] Limina Research#k\r\nYou have successfully completed today's investigation at the edge of the world! Your efforts have kept the area secure.")
if sm.sendAskYesNo("You have not claimed your Limina Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Limina Daily Quest completion EXP can only be claimed once per day per world."):
    sm.completeQuest(parentID)
    sm.giveExp(EXP_REWARD)
    sm.setSpeakerID(VELIVAH)
    sm.sendSayOkay("#r#e* You have received the Limina Daily Quest completion EXP!*#n\r\nThank you for your service to the Alliance.")
else:
    sm.setSpeakerID(VELIVAH)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

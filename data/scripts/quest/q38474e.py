# [Daily Quest] Moonbridge Research
VELIVAH = 3003810
EXP_REWARD = 350000000

sm.setSpeakerID(VELIVAH)
sm.sendNext("#b[Daily Quest] Moonbridge Research#k\r\nYou have successfully completed today's investigation! Your assistance helps our alliance immensely.")
if sm.sendAskYesNo("You have not claimed your Moonbridge Daily Quest EXP reward today.\r\nWould you like to claim it now?\r\n\r\n#r#n* Moonbridge Daily Quest completion EXP can only be claimed once per day per world."):
    sm.completeQuest(parentID)
    sm.giveExp(EXP_REWARD)
    sm.setSpeakerID(VELIVAH)
    sm.sendSayOkay("#r#e* You have received the Moonbridge Daily Quest completion EXP!*#n\r\nThank you for your service to the Alliance.")
else:
    sm.setSpeakerID(VELIVAH)
    sm.sendNext("Let me know when you are ready to claim your rewards.")

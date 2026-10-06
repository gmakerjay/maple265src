# Blood Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2434533# #b#t2434533##k?")
if response:
    if sm.hasDamageSkin(2434533):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2434533)
        sm.chat("The Blood Damage Skin has been added to your account's damage skin collection.")
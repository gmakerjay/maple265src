# Princess No Damage Skin (Permanent)
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2432804# #b#t2432804##k?")
if response:
    if sm.hasDamageSkin(2432804):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2432804)
        sm.chat("The Princess No Damage Skin (Permanent) has been added to your account's damage skin collection.")
# Secret Damage Skin_Music 
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2434873# #b#t2434873##k?")
if response:
    if sm.hasDamageSkin(2434873):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2434873)
        sm.chat("The Secret Damage Skin_Music  has been added to your account's damage skin collection.")
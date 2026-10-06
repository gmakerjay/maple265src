# Cozy Christmas Damage Skin (30 Day)
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2436229# #b#t2436229##k?")
if response:
    if sm.hasDamageSkin(2436229):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2436229)
        sm.chat("The Cozy Christmas Damage Skin (30 Day) has been added to your account's damage skin collection.")
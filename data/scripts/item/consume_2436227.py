# Lucid Butterfly Damage Skin (30 Day)
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2436227# #b#t2436227##k?")
if response:
    if sm.hasDamageSkin(2436227):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2436227)
        sm.chat("The Lucid Butterfly Damage Skin (30 Day) has been added to your account's damage skin collection.")
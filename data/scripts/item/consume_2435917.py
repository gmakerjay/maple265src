# Secret Damage Skin(Mathematics)
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2435917# #b#t2435917##k?")
if response:
    if sm.hasDamageSkin(2435917):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2435917)
        sm.chat("The Secret Damage Skin(Mathematics) has been added to your account's damage skin collection.")
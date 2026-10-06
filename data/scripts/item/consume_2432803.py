# Princess No Damage Skin (30-Days)
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2432803# #b#t2432803##k?")
if response:
    if sm.hasDamageSkin(2432803):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2432803)
        sm.chat("The Princess No Damage Skin (30-Days) has been added to your account's damage skin collection.")
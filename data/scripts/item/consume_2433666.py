# Mashmellow Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2433666# #b#t2433666##k?")
if response:
    if sm.hasDamageSkin(2433666):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2433666)
        sm.chat("The Mashmellow Damage Skin has been added to your account's damage skin collection.")
# Lovely Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438239# #b#t2438239##k?")
if response:
    if sm.hasDamageSkin(2438239):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438239)
        sm.chat("The Lovely Damage Skin has been added to your account's damage skin collection.")
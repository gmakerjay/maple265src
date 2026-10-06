# Sleek Slither Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2630384# #b#t2630384##k?")
if response:
    if sm.hasDamageSkin(2630384):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2630384)
        sm.chat("The Sleek Slither Damage Skin has been added to your account's damage skin collection.")
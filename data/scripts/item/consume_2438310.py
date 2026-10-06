# Illium Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438310# #b#t2438310##k?")
if response:
    if sm.hasDamageSkin(2438310):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438310)
        sm.chat("The Illium Damage Skin has been added to your account's damage skin collection.")
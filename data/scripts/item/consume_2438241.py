# Bubble April Fools' Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438241# #b#t2438241##k?")
if response:
    if sm.hasDamageSkin(2438241):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438241)
        sm.chat("The Bubble April Fools' Damage Skin has been added to your account's damage skin collection.")
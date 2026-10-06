# Soft-serve Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2434951# #b#t2434951##k?")
if response:
    if sm.hasDamageSkin(2434951):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2434951)
        sm.chat("The Soft-serve Damage Skin has been added to your account's damage skin collection.")
# Alicia's Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2432465# #b#t2432465##k?")
if response:
    if sm.hasDamageSkin(2432465):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2432465)
        sm.chat("The Alicia's Damage Skin has been added to your account's damage skin collection.")
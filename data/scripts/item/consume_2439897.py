# Valentine Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2439897# #b#t2439897##k?")
if response:
    if sm.hasDamageSkin(2439897):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2439897)
        sm.chat("The Valentine Damage Skin has been added to your account's damage skin collection.")
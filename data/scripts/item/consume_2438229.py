# Blackheart Day Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438229# #b#t2438229##k?")
if response:
    if sm.hasDamageSkin(2438229):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438229)
        sm.chat("The Blackheart Day Damage Skin has been added to your account's damage skin collection.")
# Gummy Bear Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438920# #b#t2438920##k?")
if response:
    if sm.hasDamageSkin(2438920):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438920)
        sm.chat("The Gummy Bear Damage Skin has been added to your account's damage skin collection.")
# Gentle Springtime Breeze Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438171# #b#t2438171##k?")
if response:
    if sm.hasDamageSkin(2438171):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438171)
        sm.chat("The Gentle Springtime Breeze Damage Skin has been added to your account's damage skin collection.")
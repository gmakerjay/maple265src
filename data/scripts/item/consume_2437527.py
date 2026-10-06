# Slime and Mushroom Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2437527# #b#t2437527##k?")
if response:
    if sm.hasDamageSkin(2437527):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2437527)
        sm.chat("The Slime and Mushroom Damage Skin has been added to your account's damage skin collection.")
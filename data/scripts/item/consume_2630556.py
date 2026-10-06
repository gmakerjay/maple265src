# Pixel Full of Hearts Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2630556# #b#t2630556##k?")
if response:
    if sm.hasDamageSkin(2630556):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2630556)
        sm.chat("The Pixel Full of Hearts Damage Skin has been added to your account's damage skin collection.")
# XOXO Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438292# #b#t2438292##k?")
if response:
    if sm.hasDamageSkin(2438292):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438292)
        sm.chat("The XOXO Damage Skin has been added to your account's damage skin collection.")
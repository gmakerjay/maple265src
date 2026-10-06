# AbsoLab Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2436682# #b#t2436682##k?")
if response:
    if sm.hasDamageSkin(2436682):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2436682)
        sm.chat("The AbsoLab Damage Skin has been added to your account's damage skin collection.")
# White Heaven Rainbow Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438750# #b#t2438750##k?")
if response:
    if sm.hasDamageSkin(2438750):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438750)
        sm.chat("The White Heaven Rainbow Damage Skin has been added to your account's damage skin collection.")
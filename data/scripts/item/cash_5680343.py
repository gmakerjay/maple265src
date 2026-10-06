# Star Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v5680343# #b#t5680343##k?")
if response:
    if sm.hasDamageSkin(5680343):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(5680343)
        sm.chat("The 노히메 데미지스킨 Damage Skin has been added to your account's damage skin collection.")
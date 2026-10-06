# Scorching Heat Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v5680395# #b#t5680395##k?")
if response:
    if sm.hasDamageSkin(5680395):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(5680395)
        sm.chat("The Scorching Heat Damage Skin has been added to your account's damage skin collection.")

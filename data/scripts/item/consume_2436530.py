# Festival Tortoise Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2436530# #b#t2436530##k?")
if response:
    if sm.hasDamageSkin(2436530):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2436530)
        sm.chat("The Festival Tortoise Damage Skin has been added to your account's damage skin collection.")
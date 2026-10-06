# Keyboard Warrior Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2432526# #b#t2432526##k?")
if response:
    if sm.hasDamageSkin(2432526):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2432526)
        sm.chat("The Keyboard Warrior Damage Skin has been added to your account's damage skin collection.")
# Black Rose Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2437238# #b#t2437238##k?")
if response:
    if sm.hasDamageSkin(2437238):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2437238)
        sm.chat("The Black Rose Damage Skin has been added to your account's damage skin collection.")
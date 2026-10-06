# Detective Yettson and Peplock Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2439926# #b#t2439926##k?")
if response:
    if sm.hasDamageSkin(2439926):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2439926)
        sm.chat("The Detective Yettson and Peplock Damage Skin has been added to your account's damage skin collection.")
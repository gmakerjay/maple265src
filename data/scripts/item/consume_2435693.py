# Heroes Luminous Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2435693# #b#t2435693##k?")
if response:
    if sm.hasDamageSkin(2435693):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2435693)
        sm.chat("The Heroes Luminous Damage Skin has been added to your account's damage skin collection.")
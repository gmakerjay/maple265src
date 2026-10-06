# Modern Art Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2631037# #b#t2631037##k?")
if response:
    if sm.hasDamageSkin(2631037):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2631037)
        sm.chat("The Modern Art Damage Skin has been added to your account's damage skin collection.")
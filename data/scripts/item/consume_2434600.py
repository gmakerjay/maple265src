# Gourmet Damage Skin (7 Days)
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2434600# #b#t2434600##k?")
if response:
    if sm.hasDamageSkin(2434600):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2434600)
        sm.chat("The Gourmet Damage Skin (7 Days) has been added to your account's damage skin collection.")
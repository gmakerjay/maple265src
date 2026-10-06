# Snowfield Monster Damage Skin (30 Day)
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2435961# #b#t2435961##k?")
if response:
    if sm.hasDamageSkin(2435961):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2435961)
        sm.chat("The Snowfield Monster Damage Skin (30 Day) has been added to your account's damage skin collection.")
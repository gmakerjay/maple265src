# Damage Skin Coupon
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2435005# #b#t2435005##k?")
if response:
    if sm.hasDamageSkin(2435005):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2435005)
        sm.chat("The Damage Skin Coupon has been added to your account's damage skin collection.")
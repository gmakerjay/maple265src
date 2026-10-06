# Damage Skin - Springtime Breeze
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2433107# #b#t2433107##k?")
if response:
    if sm.hasDamageSkin(2433107):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2433107)
        sm.chat("The Damage Skin - Springtime Breeze has been added to your account's damage skin collection.")
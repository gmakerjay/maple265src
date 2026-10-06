# Lovely Damage Skin

sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2433903# #b#t2433903##k?")
if response:
    if sm.hasDamageSkin(2433903):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2433903)
        sm.chat("The Lovely Damage Skin has been added to your account's damage skin collection.")
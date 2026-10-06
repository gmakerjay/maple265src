# Secret Damage Skin_Special Character 
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2434877# #b#t2434877##k?")
if response:
    if sm.hasDamageSkin(2434877):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2434877)
        sm.chat("The Secret Damage Skin_Special Character  has been added to your account's damage skin collection.")
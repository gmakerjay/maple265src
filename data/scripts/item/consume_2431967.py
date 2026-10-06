# Kritias Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2431967# #b#t2431967##k?")
if response:
    if sm.hasDamageSkin(2431967):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2431967)
        sm.chat("The Kritias Damage Skin has been added to your account's damage skin collection.")
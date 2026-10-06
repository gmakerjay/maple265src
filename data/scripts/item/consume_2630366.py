# New Year Golden Piggy Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2630366# #b#t2630366##k?")
if response:
    if sm.hasDamageSkin(2630366):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2630366)
        sm.chat("The New Year Golden Piggy Damage Skin has been added to your account's damage skin collection.")
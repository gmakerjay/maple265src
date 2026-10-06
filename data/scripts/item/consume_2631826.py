# Chug Boat Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2631826# #b#t2631826##k?")
if response:
    if sm.hasDamageSkin(2631826):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2631826)
        sm.chat("The Chug Boat Damage Skin has been added to your account's damage skin collection.")
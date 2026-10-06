# 12th Anniversary Maple Leaf Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2435408# #b#t2435408##k?")
if response:
    if sm.hasDamageSkin(2435408):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2435408)
        sm.chat("The 12th Anniversary Maple Leaf Damage Skin has been added to your account's damage skin collection.")
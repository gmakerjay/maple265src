# 네네치킨 데미지스킨 Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2433655# #b#t2433655##k?")
if response:
    if sm.hasDamageSkin(2433655):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2433655)
        sm.chat("The 네네치킨 데미지스킨 Damage Skin has been added to your account's damage skin collection.")
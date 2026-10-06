sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2435023# #b#t2435023##k?")
if response:
    if sm.hasDamageSkin(2435023):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2435023)
        sm.chat("The 메리 크리스마스 데미지 스킨 Damage Skin has been added to your account's damage skin collection.")
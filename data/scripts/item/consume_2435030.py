# 크리스마스 전구 데미지 스킨 Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2435030# #b#t2435030##k?")
if response:
    if sm.hasDamageSkin(2435030):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
        #sm.dispose()
    else:
        sm.addDamageSkin(2435030)
        sm.chat("The 크리스마스 전구 데미지 스킨 Damage Skin has been added to your account's damage skin collection.")
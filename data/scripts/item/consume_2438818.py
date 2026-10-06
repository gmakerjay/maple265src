# Japanese Kanji Character Damage Skin
sm.setSpeakerID(9010000)
sm.flipDialogue()
response = sm.sendAskYesNo("Would you like to replace the #v"+str(sm.getActivatedDamageSkin())+"# #b#t"+str(sm.getActivatedDamageSkin())+"##k\r\nthat is currently active with the new #v2438818# #b#t2438818##k?")
if response:
    if sm.hasDamageSkin(2438818):
        sm.sendSayOkay("You already have this damage skin. Please try another.")
    else:
        sm.addDamageSkin(2438818)
        sm.chat("The Japanese Kanji Character Damage Skin has been added to your account's damage skin collection.")
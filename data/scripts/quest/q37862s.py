OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Erda ở đây không quá bất ổn, nhưng...")
sm.sendNext("#face0# Vẫn còn rất nhiều nhện của Will ở đây. Có lẽ chúng ta nên diệt bớt chúng đi.")
if sm.sendAskYesNo("#face0# Hãy săn 200 #bAraneas#k, tôi tin tuởng ở bạn!"):
    sm.startQuest(parentID)
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Bạn chưa sẵn sàng hả?")

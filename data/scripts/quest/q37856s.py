OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Để xem... Ở đây ghi là chúng ta cần #btrích Erda từ Erda#k rồi tiêm nó vào Erda bị méo mó. Hả.")
sm.setPlayerBoxChat()
sm.sendNext("Ý anh ấy là chúng ta phải tiêm Erda đã ổn định vào những cái bị méo mó.")
sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Nếu vậy thì chắc chúng ta nên đánh bọn quái gần đây và thu thập vài #bErda Fragments#k")
if sm.sendAskYesNo("#face0# Vậy hãy lấy 10 mảnh Erda từ bọn #bBellalion#k đó."):
    sm.startQuest(parentID)
else:
    sm.setSpeakerID(OLLIE)
    sm.setBoxChat()
    sm.sendNext("#face0# Hử? Có gì không ổn à?")

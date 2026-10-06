MELANGE = 3003501

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# Hmm... Bạn có cảm thấy vậy không? Chúng ta đang tiến gần hơn đến #rCánh Cổng#k.")
sm.setPlayerBoxChat()
sm.sendNext("...!")
sm.setSpeakerID(MELANGE)
sm.setBoxChat()
sm.sendNext("#face0# Đừng lo lắng. Chúng ta vẫn còn cơ hội.")
sm.sendNext("#face0# Nhưng trước đó, vẫn còn một điều chúng ta cần phải học. Tôi vừa mới nhắc đến. Bạn chưa quên đâu, phải không?")
sm.sendNext("#face0# Mục tiêu của #rBlack Mage#k.")
if sm.sendAskYesNo("#face0# Đây có lẽ là ký ức cuối cùng. Cũng như trước, hãy tiêu diệt những tên Executor. Săn khoảng 200 #bDark Executor#k là được."):
    sm.startQuest(parentID)
else:
    sm.sendNext("#face0# Bạn không thấy chúng ta đang rất gấp sao.")
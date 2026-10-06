# [Ellinel Fairy Academy] Bạn có thể làm được

FANZY = 1500010 # ID NPC
YOU_CAN_DO_IT = 32102 # ID NHIỆM VỤ

sm.setSpeakerID(FANZY)
sm.sendNext("Bạn đang hỏi chúng ta ở đâu sao? Bạn đi theo tôi mà không biết tôi đang đi đâu à? Đây là con đường rừng dẫn đến #bHọc viện Tiên nữ Ellinel#k.")

sm.setPlayerAsSpeaker()
sm.sendSay("Học viện Tiên nữ Ellinel?")

sm.setSpeakerID(FANZY)
sm.sendSay("Đúng vậy. #bEllinel#k là một học viện nơi các tiên nữ nhí học phép thuật.")

sm.setPlayerAsSpeaker()
sm.sendSay("Nhưng tại sao nó lại được giấu sâu trong rừng như vậy?")

sm.setSpeakerID(FANZY)
sm.sendSay("Bạn có biết rằng #bEllinia#k từng là thị trấn của tiên nữ không? Vài trăm năm trước, sau một cuộc chiến với Black Mage, con người đã đến và giành lại thị trấn, và nó trở thành #bEllinia#k mà chúng ta biết bây giờ.")

sm.setPlayerAsSpeaker()
sm.sendSay("Vậy thì điều đó có nghĩa là tiên nữ cũng sống bên ngoài Ellinia.")

sm.setSpeakerID(FANZY)
sm.sendSay("Một số tiên nữ thì ổn với con người, nhưng một số khác thì rất không thích. Ở #bHọc viện Tiên nữ Ellinel#k cũng vậy. Họ không muốn giao thiệp với con người, và vì thế họ đã biến mất vào rừng. Đó là lý do tại sao ngôi trường nằm ở rất xa, bên kia hồ.")

sm.setPlayerAsSpeaker()
sm.sendSay("Bạn nghĩ Cootie bị bắt bởi những tiên nữ ghét con người sao?")

sm.setSpeakerID(FANZY)
response = sm.sendAskAccept("Rất có thể. Tôi biết tôi đã nghĩ đến việc dùng nó làm cột cào móng vài lần. Sư phụ #bGrendel#k và tôi đã cố gắng làm thân với các tiên nữ, nhưng họ không chịu lắng nghe. Tôi nghĩ chúng ta nên dùng những phương pháp... mạnh bạo hơn.\r\n#b #h0##k, để tôi hỏi... bạn có bơi giỏi không?")

if response:
    sm.sendNext("Sao bạn không bơi qua đó đi! Cho chúng tôi thấy bạn dũng cảm thế nào, meo...\r\n#b (Băng qua hồ về phía bên phải.)#k")
    sm.startQuestNoCheck(YOU_CAN_DO_IT)
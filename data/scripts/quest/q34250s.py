# Bắt đầu [Morass] Kẻ Thù Bất Ngờ 1

FLYING_FISH = 3003409

sm.setPlayerBoxChat()
sm.sendNext("Xenoroid đang làm gì ở đây?!")
sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#Các Erda ở đây #bbiến hình theo ký ức của người khác.#k\r\nĐó là một kỹ thuật sinh tồn. Chúng có thể biến thành nỗi sợ lớn nhất của kẻ thù nếu cần thiết.")
sm.sendNext("#face0#Vì vậy, những gì bạn thấy ở đây là từ đâu đó trong ký ức của chính bạn.")
sm.setPlayerBoxChat()
sm.sendNext("Nếu mọi thứ đều biến hình, vậy còn bạn thì sao?")
sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#Tôi đã học được hình dạng này ở Đảo Chu Chu.\r\nLà một con cá bay, tôi có thể dễ dàng di chuyển cả trên không và trên biển. Hơn nữa, tôi thích vẻ ngoài này!\r\nNó đẹp mà, phải không?")
sm.sendNext("#face0#Chu Chu là một nơi thú vị ngay cả đối với tôi.\r\nMột con cá có cánh cũng kỳ lạ như một Crilia vậy.")
sm.setPlayerBoxChat()
sm.sendNext("Thực ra, cá bay có nguồn gốc từ Thế giới Maple.")
sm.setNpcBoxChat(FLYING_FISH)
sm.sendNext("#face0#Bạn biết đấy, có khá nhiều quái vật đang theo dõi chúng ta.\r\nBạn nên giảm bớt số lượng của chúng một chút trước khi chúng ta tiếp tục.")
sm.setPlayerBoxChat()
sm.sendNext("Well, that was an abrupt change of topic...")
sm.setNpcBoxChat(FLYING_FISH)
if sm.sendAskYesNo("#face0#Tôi nghĩ 200 con là đủ."):
    sm.startQuest(34250)
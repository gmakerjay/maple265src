# Kết thúc [Morass] Lời Đồn Đáng Sợ 3

RESEARCHER = 3003425
ARKARIUM = 3003403

sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("Bạn đến trễ. Tôi đã tìm bạn khắp nơi. Tôi lo lắng có chuyện gì đó đã xảy ra.")
sm.setNpcBoxChat(RESEARCHER)
sm.sendNext("Đức Cha Tối Cao đã đến và đi thẳng tới đài quan sát rồi...\r\nTôi nghĩ bạn sẽ đến cùng với ngài ấy chứ.")
sm.setPlayerBoxChat()
sm.sendNext("#b(Đức Cha Tối Cao?)#k")
sm.setNpcBoxChat(RESEARCHER)
if sm.sendAskYesNo("Dù sao thì, bạn nên đi gặp ngài ấy."):
	sm.setNpcBoxChat(RESEARCHER)
	sm.sendNext("Bạn chưa từng gặp Đức Cha Tối Cao trước hôm nay, đúng không Shey?")
	sm.setPlayerBoxChat()
	sm.sendNext("Chưa.")
	sm.warpInstanceIn(chr, 450006130, 1, False)
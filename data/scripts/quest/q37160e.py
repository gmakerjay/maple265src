# id 37160 ([Elodin] Ruenna's Feathered Nuisance), field 101082000
sm.lockInGameUI(True, False)
sm.removeAdditionalEffect()
sm.blind(1, 255, 0, 0, 0, 0)
sm.sendDelay(500)
sm.forcedFlip(True)
sm.sendDelay(500)
sm.blind(1, 150, 0, 0, 0, 1300)
sm.sendDelay(1000)
sm.forcedFlip(True)
sm.sendDelay(500)
sm.forcedAction(10, 0)
sm.playSound("Sound/Reactor.img/2002001/0/Hit", 200)
sm.sendDelay(1000)
sm.playSound("Sound/SoundEff.img/Elodin/scream_close", 200)
sm.setSpeakerID(1501003) # Baby Bird
sm.setParam(5)
sm.setSpeakerID(1501010) # Baby Bird
sm.sendNext("Squawk!")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Ôi! Tôi cứ tưởng cậu là đồ yếu đuối chứ không phải đồ bắt nạt.")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Sao cậu lại đánh tôi?!")
sm.setParam(3)
sm.sendSay("Đừng làm cái trò ồn ào kinh khủng đó nữa!")
sm.createQuestWithQRValue(37150, "00=h0;01=h1;02=h0;03=h2")
sm.sendDelay(1000)
sm.setParam(5)
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendNext("Sao bạn dám đánh chim của tôi?! Bạn! Một người hoàn toàn xa lạ! Trong nhà của #etôi#n! Thật là vô văn minh!")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("Có lẽ tôi nên đi...")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Còn anh! Tôi đang cố ngủ! Tôi nên nhốt anh vào lồng và đắp chăn cho anh như một con vẹt bình thường!")
sm.setSpeakerID(1501010) # Baby Bird
sm.sendSay("*khịt mũi*")
sm.setParam(3)
sm.sendSay("Sao anh chưa làm thế?")
sm.setParam(5)
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Dù đôi khi có thể rất khó chịu, nhưng tôi là bạn của rừng. Tôi không muốn đối xử tệ với bạn bè của mình.")
sm.setParam(3)
sm.sendSay("......")
sm.sendDelay(1000)
sm.showFadeTransition(0, 1000, 3000)
sm.zoomCamera(0, 1000, 2147483647, 2147483647, 2147483647)
sm.moveCamera(True, 0, 0, 0)
sm.sendDelay(300)
sm.removeOverlapScreen(1000)
sm.moveCamera(True, 0, 0, 0)
sm.lockInGameUI(False, True)
sm.completeQuest(parentID)

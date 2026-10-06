# id 37162 ([Elodin] Mood Lighting), field 101082000
sm.setSpeakerID(1501001) # Ruenna the Fairy
sm.setParam(4)
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendNext("Bạn đã lấy hết chưa?")
sm.sendSay("Nhiêu đây là đủ để tôi bật đèn lại rồi.")
sm.lockInGameUI(True, False)
sm.removeAdditionalEffect()
sm.blind(0, 0, 0, 0, 0, 1000)
sm.showFadeTransition(0, 1000, 3000)
sm.zoomCamera(0, 1000, 2147483647, 2147483647, 2147483647)
sm.moveCamera(True, 0, 0, 0)
sm.sendDelay(300)
sm.removeOverlapScreen(1000)
sm.moveCamera(True, 0, 0, 0)
sm.lockInGameUI(False, True)
sm.setParam(5)
sm.setSpeakerID(1501010) # Baby Bird
sm.sendNext("Cô ấy là người nói rằng ánh sáng trong rừng đẹp hơn.")
sm.setSpeakerID(1501013) # Ruenna the Fairy
sm.sendSay("Tôi có thể nghe thấy bạn.")
sm.setParam(3)
sm.sendSay("......")
sm.completeQuest(37162)

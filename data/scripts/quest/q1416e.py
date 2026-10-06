#   [Job Adv] (Lv.30)   Way of the Mage IL
sm.lockInGameUI(True, False)
sm.removeEscapeButton()
darkMarble = 4031013
job = "Pháp Sư (Băng, Sét)" # Đã dịch: Mage (Ice, Lightning)

sm.setSpeakerID(1032001) # Grendel the Really Old
if sm.hasItem(darkMarble, 30):
    sm.sendNext("Ta rất ấn tượng, ngươi đã vượt qua thử thách. Chỉ một số ít có đủ tài năng.\r\n"
                "Ngươi đã chứng minh được mình xứng đáng, ta sẽ rèn luyện thân thể ngươi trở thành một #b"+ job +"#k.")
else:
    sm.sendSayOkay("Ngươi chưa thu thập đủ #t"+ darkMarble+"#s, ta sẽ đợi.")
    sm.lockInGameUI(False, False)
    #sm.dispose()

sm.completeQuestNoRewards(parentID)
sm.jobAdvance(220) # Pháp Sư IL
sm.sendNext("Ngươi giờ đã là một #b"+ job +"#k.")
sm.showEffect("Effect/BasicEff.img/JobChanged", 0, 0, 0, -2, -2, False, 0)
sm.lockInGameUI(False, False)
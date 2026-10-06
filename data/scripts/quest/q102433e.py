# [Tera Blink] The Next Big Step, 2nd Job Advancement!
SPIEGELMANN = 9063175

sm.closeUI(1562)
sm.createQuestWithQRValue(parentID, "step=done")
sm.completeQuest(parentID)
sm.levelUntil(50)
sm.createQuestWithQRValue(parentID, "step=done;exp=1")
sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# Bạn cảm thấy thế nào sau khi hoàn thành #b2nd Job Advancement#k? Tuy vẫn còn sớm, nhưng đây chắc chắn là một bước tiến lớn.")
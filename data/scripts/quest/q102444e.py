# [Tera Blink] Who's the Boss of the Monsters?
SPIEGELMANN = 9063175

sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# Chúng có thể rất mạnh mẽ, nhưng bạn đã thấy những phần thưởng mà chúng mang lại chưa? Tôi chắc chắn rằng sự hào hứng của bạn sẽ vượt qua mọi nỗi sợ hãi!")
sm.levelUntil(140)
sm.createQuestWithQRValue(parentID, "step=done;eliteMob=1;exp=1")
sm.completeQuest(parentID)
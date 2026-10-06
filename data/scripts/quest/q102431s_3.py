# [Tera Blink] Allies Have Your Back
SPIEGELMANN = 9063175

sm.closeUI(1561)
sm.closeUI(1562)
sm.createQuestWithQRValue(102431, "petPotionHP=1;step=done;petEquip=1;petBuff=1;petPotion=1;petFood=1")
sm.closeUI(0)
sm.closeUI(1562)
sm.openUI(1561)
sm.removeBlowWeather()
sm.blowWeather(5120243, "Bạn đã hoàn thành việc thiết lập và cho thú cưng ăn xong. Hãy nói chuyện với Spiegelmann để tiếp tục nhiệm vụ tiếp theo!", 4)
sm.completeQuest(102431)
sm.createQuestWithQRValue(102431, "petPotionHP=1;step=done;petEquip=1;petBuff=1;petPotion=1;petFood=1;exp=1")
sm.setSpeakerID(SPIEGELMANN)
sm.setBoxChat()
sm.sendNext("#face0# #bThú cưng#k giờ sẽ dùng các hiệu ứng tăng cường và thuốc cho bạn. À, và nếu nó đói, nhớ cho nó ăn #bPet Food#k mà tôi đã đưa cho bạn nhé!")
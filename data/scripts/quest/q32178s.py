frostWitchBarbara = 1510008
noraTheExplorer = 1510007

sm.setSpeakerID(frostWitchBarbara)
sm.sendNext("Gì cơ? Ngươi còn có chuyện gì muốn nói với ta nữa à?")

sm.setSpeakerID(noraTheExplorer)
sm.sendNext("Bà ơi, cháu có một câu hỏi.")

sm.setSpeakerID(frostWitchBarbara)
sm.sendNext("Ngươi muốn biết gì? Ngươi tò mò bà già này khi nào sẽ chết sao? "
            "Nếu ngươi còn nhắc đến chuyện đánh bại hay đại loại thế một lần nữa trước mặt ta, nhóc con, "
            "ta sẽ hủy hoại cái miệng của ngươi trước tiên.")

sm.setSpeakerID(noraTheExplorer)
sm.sendNext("Không... Ý cháu là những con chim cánh cụt, chó malamute và hải cẩu ở đây đang nghi ngờ bà. "
            "Có phải do phép thuật của bà mà các sông băng đang tan chảy và mực nước biển dâng cao không?")

sm.setSpeakerID(frostWitchBarbara)
sm.sendNext("Phép thuật? Đó là cái gì? Ngươi ăn nó à?")

sm.setPlayerAsSpeaker()
sm.sendNext("Cũng có tin đồn rằng bà ấy đang tiến hành một số thí nghiệm với lũ trẻ.")

sm.setSpeakerID(frostWitchBarbara)
sm.sendNext("CÁI GÌ?! Câm miệng! Ngươi nghĩ cái quái gì mà ta lại làm chuyện đó với những sinh vật nhỏ bé đáng yêu này?!")

sm.sendNext("Những đứa trẻ tội nghiệp này đã mất nhà và cha mẹ khi sông băng tan chảy."
            "Nếu không ai chăm sóc chúng, không thể tưởng tượng được chúng sẽ ra sao!"
            "Chúng trôi dạt trên biển một cách đáng thương, và ta đã vớt chúng lên để chăm sóc.")

sm.setSpeakerID(noraTheExplorer)
sm.sendNext("Bà đã nuôi dưỡng lũ trẻ sao?")

sm.setSpeakerID(frostWitchBarbara)
sm.sendNext("Ta chỉ chăm sóc chúng tạm thời thôi..")

sm.sendNext("Người ta nói, chim cánh cụt nên lớn lên cùng chim cánh cụt, "
            "và hải cẩu cần lớn lên cùng hải cẩu. "
            "Sau khi chữa lành cho một đứa bé, và nếu nó có vẻ đã hồi phục đủ, "
            "ta sẽ bí mật đưa nó về với đồng loại vào ban đêm.")

sm.setPlayerAsSpeaker()
sm.sendNext("Nhưng tại sao bà lại làm những điều đó bất chấp mọi hiểu lầm chứ?...")

sm.setSpeakerID(frostWitchBarbara)
sm.sendNext("Hừm.. Cái miệng của ngươi.. Nói nhiều như vậy có ích gì cho ngươi? "
            "Nếu ngươi có thời gian để nói, thì câm miệng lại và làm giúp ta một việc.")
sm.startQuest(32178)
sm.completeQuest(32178)
# Nora the Explorer (1514002) | Vịnh của Nora

if not sm.hasMobsInField():
    sm.sendNext("Bạn phải bình tĩnh... thật bình tĩnh... Cha và Mẹ ơi, xin hãy ban cho con sức mạnh...")

    sm.sendSay("Hả? Quái vật biến mất rồi! Chúng đã đi đâu mất rồi?")

    sm.sendSay("Chiến binh dũng cảm! Bạn đã cứu tôi! Tôi không biết phải cảm ơn bạn thế nào nhưng... Cảm ơn bạn rất nhiều.")

    sm.sendSay("Tên tôi là #bNora#k, một nhà Khảo cổ học.\r\n\r\n"
                "Tôi đến Rien vì tôi quan tâm đến Vùng Biển Riena."
                "Tôi đang nghiên cứu về hóa thạch bí ẩn được tìm thấy ở đây, nhưng nó bắt đầu cử động và tấn công tôi."
                "Lúc đó tôi đã rất sợ hãi.")

    sm.sendSay("Nhưng tại sao bạn lại ở đó, chiến binh dũng cảm?")

    sm.setPlayerAsSpeaker()
    sm.sendSay("#b(Tôi nói với Nora rằng tôi đang tìm kiếm một phù thủy để giúp đỡ cư dân ở đây.)#k")

    sm.setSpeakerID(parentID)
    sm.sendSay("Một phù thủy? Bạn đang nói rằng sự xuất hiện của quái vật và mực nước biển dâng cao đều do phù thủy gây ra sao?")

    sm.sendSay("Không đời nào. "
                "Những hóa thạch này rơi ra khi băng vĩnh cửu bắt đầu tan chảy do nhiệt độ tăng và khi nền đá móng bị ảnh hưởng bởi những quặng khoáng chất có sức mạnh ma thuật."
                "Điều đó có nghĩa là, những con quái vật này xuất hiện một cách tự nhiên. Chúng không được ai triệu hồi cả.")

    sm.sendSay("Còn về mực nước biển dâng cao... Liệu đó có thực sự là việc của phù thủy không? Liệu có lý do nào khác đằng sau không?")

    sm.sendSay("Tôi có một việc muốn nhờ bạn. Tôi có thể đi cùng bạn khi bạn điều tra khu vực này không? Làm ơn hãy nhận tôi làm đồng nghiệp của bạn!")

    sm.setPlayerAsSpeaker()
    sm.sendSay("#b(Kiến thức của học giả trẻ tuổi này sẽ rất hữu ích khi giải quyết vấn đề.)")

    sm.setSpeakerID(parentID)
    sm.sendSay("Cảm ơn bạn! Bạn sẽ không hối hận đâu.\r\n"
                "(Bạn sẽ được chuyển đến Đài quan sát thứ nhất.)")

    #sm.completeQuest(32170) # [Riena Strait] Nerd Rescue
    #sm.startQuestNoCheck(32194) # Seems to be a quest needed  'in progress'  to make nora appear in other maps
    sm.createQuestWithQRValue(32194, "1")

    sm.warpInstanceOut(chr, 141010000,0) # Trạm Băng 1
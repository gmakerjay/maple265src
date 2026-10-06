# id 32109 ([Ellinel Fairy Academy] Cootie's Suggestion), field 101072000
sm.setSpeakerID(1500001) # Hiệu trưởng Ivana
res = sm.sendNext("Bạn nghĩ BẠN có thể tìm thấy những đứa trẻ mất tích sao? Bạn định làm điều đó như thế nào?#b\r\n#L0# Hãy tìm kiếm xung quanh hồ. #l\r\n#L1#Sao chúng ta không dùng phép thuật?#l#l\r\n#L2#Tôi muốn xem xét các phòng của lũ trẻ.#l")
if res == 0:
    sm.sendNext("Hồ đã được tìm kiếm hơn mười lần rồi. Không còn gì ở đó để tìm nữa đâu. ")
elif res == 1:
    sm.sendNext("Phép thuật không hoạt động như thế.")
elif res == 2:
    sm.sendNext("Tôi không thích ý tưởng bạn lảng vảng xung quanh lắm, nhưng bạn có thể làm điều đó.")
    sm.completeQuest(parentID)
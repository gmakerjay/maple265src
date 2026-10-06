# id 4 (in00), field 101081300
if sm.hasQuestCompleted(37158):
    sm.warp(101082000)
else:
    sm.setSpeakerType(8)
    sm.setParam(2)
    sm.sendNext("Nhưng trong đó tối đen như mực. Tôi không thể tự ý bước vào được.")

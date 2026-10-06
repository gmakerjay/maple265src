from net.swordie.ms.enums import QuestStatus
from net.swordie.ms.client.character.quest import Quest
from net.swordie.ms.constants import GameConstants
from net.swordie.ms.enums import ChatType
from net.swordie.ms.util import Util
from java.time import LocalDate
from java.time.temporal import ChronoField

if not sm.hasMobsInField():
    quest = chr.getQuestById(GameConstants.MONSTER_PARK_EXP_QUEST)
    if quest is None:
        quest = Quest(GameConstants.MONSTER_PARK_EXP_QUEST, QuestStatus.STARTED)
        quest.setQrValue("0")
        chr.addQuest(quest)
    quest.setQrValue(str(int(quest.getQRValue())))

    fieldID = sm.getFieldID()

    if fieldID / 1000000 == 952 or fieldID / 1000000 == 953 or fieldID / 1000000 == 954:
        if "1" not in sm.getQRValueByKey(18805, "clear"):
            if sm.canHold(4310020, 20):
                sm.setQRValueByKey(18805, "clear", "1")
                sm.giveItem(4310020, 20)
                chr.chatMessage(ChatType.GameDesc, "Bạn nhận được " + str(long(quest.getQRValue())) + " EXP từ Monster Park và nhận thêm 20 x Monster Park Commemorative Coins cho lần đầu tiên trong ngày thành công hoàn thành.")
                sm.giveExpNoAffectedByExpRate(long(quest.getQRValue()))
                sm.warpInstanceOut(chr, 951000000) #Monster Park
                sm.stopEvents()
            else:
                sm.chat("Hãy kiểm tra lại túi ETC để nhận phần thưởng 20 x Monster Park Commemorative Coins.")
        else:
            dow = LocalDate.now().get(ChronoField.DAY_OF_WEEK) + 1
            if dow == 8:
                dow = 1

            dayItem = {
                2: 2434746,  # Thứ 2
                3: 2434747,  # Thứ 3
                4: 2434748,  # Thứ 4
                5: 2434749,  # Thứ 5
                6: 2434750,  # Thứ 6
                7: 2434751,  # Thứ 7
                1: 2434745,  # Chủ nhật
            }.get(dow)

            if dayItem is not None and sm.canHold(dayItem):
                sm.giveItem(dayItem, 1)
                chr.chatMessage(ChatType.GameDesc, "Bạn nhận được " + str(long(quest.getQRValue())) + " EXP từ Monster Park.")
                sm.giveExpNoAffectedByExpRate(long(quest.getQRValue()))
                sm.warpInstanceOut(chr, 951000000) #Monster Park
                sm.stopEvents()
            else:
                sm.chat("Bạn không đủ ô chứa trong túi USE để nhận quà theo ngày.")
    else:
        sm.chat("Lỗi không xác định đã xảy ra, vui lòng báo cho đội ngũ GM.")
else:
    sm.chat("Hãy tiêu diệt tất cả quái vật để sang bản đồ tiếp theo.")


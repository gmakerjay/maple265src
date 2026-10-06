from net.swordie.ms.constants import QuestConstants

JAKE = 1052006
SUBWAY_TRANSTICKET = 2030028

sm.setSpeakerID(JAKE)
response = sm.sendAskYesNo("Ai đó! Bất cứ ai! Cứu tôi với!")

if response:
    sm.sendNext("Một quý cô đã đi theo một nhóm người đáng ngờ vào Tàu điện ngầm. Họ trông rất nguy hiểm. "
                "Bạn có thể đi vào #bCông trường Xây dựng Tàu điện ngầm#k và đảm bảo cô ấy vẫn ổn không?")

    sm.sendNext("Mau đến Quầy Vé Tàu điện ngầm!")

    if not sm.canHold(SUBWAY_TRANSTICKET):
        sm.sendSayOkay("Vui lòng dọn chỗ trong túi đồ 'sử dụng'.")
        #sm.dispose()

    sm.giveItem(SUBWAY_TRANSTICKET)
    sm.startQuest(parentID)
    sm.showFieldEffect("Map/Effect.img/crossHunter/chapter/start1")
    sm.createQuestWithQRValue(QuestConstants.SILENT_CRUSADE_WANTED_TAB_1, "")
    sm.createQuestWithQRValue(QuestConstants.SILENT_CRUSADE_WANTED_TAB_2, "")
    sm.createQuestWithQRValue(QuestConstants.SILENT_CRUSADE_WANTED_TAB_3, "")
    sm.createQuestWithQRValue(QuestConstants.SILENT_CRUSADE_WANTED_TAB_4, "")

else:
    sm.sendSayOkay("Thật sao?")
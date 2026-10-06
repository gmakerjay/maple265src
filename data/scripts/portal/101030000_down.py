# Portal to enter Ellinel Fairy Academy

FANZY = 1040002 # NPC ID
FAIRYNAPPERS = 32101 # QUEST ID
MIDSUMMER_NIGHTS_FOREST_PATH_TO_ELLINEL = 101074000 # MAP ID
MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE = 101070000 # MAP ID

sm.setSpeakerID(FANZY)

if sm.hasQuest(FAIRYNAPPERS) or sm.hasQuestCompleted(FAIRYNAPPERS):
    response = sm.sendAskYesNo("Bạn có muốn vào #e#b[Chuỗi nhiệm vụ: Học viện Tiên nữ Ellinel]#k#n không?")
    if response:
        sm.warp(MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE)
else:
    sm.sendSayOkay("Chúng ta vẫn còn việc phải làm, nhớ không?\r\n\r\n#b(Bạn phải nói chuyện với Fanzy và hoàn thành nhiệm vụ của anh ấy để vào.)#k")
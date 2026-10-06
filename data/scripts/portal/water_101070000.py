# Midsummer Night's Forest: Ellinel Lake Shore's Water Portal Script

YOU_CAN_DO_IT = 32102 # QUEST ID
MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE = 101070000 # MAP ID
MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE_VER2 = 101070001 # MAP ID

if sm.hasQuest(YOU_CAN_DO_IT):
    sm.removeEscapeButton()
    sm.setPlayerAsSpeaker()
    sm.sendNext("Ugh! Tại sao tôi cảm thấy... nặng nề thế này?! Mỗi... bước... lại... khó khăn hơn!\r\n\r\nARGH!")
else:
    sm.warp(MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE)

sm.warp(MIDSUMMER_NIGHTS_FOREST_ELLINEL_LAKE_SHORE_VER2)

OLLIE = 3003500

sm.setSpeakerID(OLLIE)
sm.setBoxChat()
sm.sendNext("#face0# Đầu tiên, chúng ta cần tìm một pháo sáng.")
sm.sendNext("#face0# Ôi trời. Nhiều rùa quá. Chúng ta sẽ phải lục soát từng con một, phải không?")
if sm.sendAskYesNo("#face0# Anh có thể săn bọn #bAhtuin#k và mang #bpháo sáng#k về được không? Tôi sẽ để mắt đến pháo sáng từ con tàu."):
    sm.startQuest(parentID)
    sm.createQuestWithQRValue(34560, "40=h0;41=h0;42=h1;77=h0;78=h0")
    sm.startNavigation(parentID, 450007010)
else:
    sm.sendNext("#face0# Bạn còn đang chờ gì vậy?")
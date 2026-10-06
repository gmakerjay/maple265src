# [Riena Strait] A Warrior's Pride

PUTAN = 1510000

sm.setSpeakerID(PUTAN)
response = sm.sendAskYesNo("Tôi nghĩ chúng ta cần phải đến nhà của phù thủy Barbara. Tất cả chúng ta đều cần phải đi. Hừm hừm.. Tôi nghĩ sẽ rất tuyệt nếu bạn đi cùng chúng tôi.\r\n\r\n"
            "#b#e(Chấp nhận sẽ tự động chuyển bạn đi.)#n#k")

if response:
    sm.warpInstanceIn(chr, 141040003, 0)
    sm.createQuestWithQRValue(parentID, "1")
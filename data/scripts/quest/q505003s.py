from net.swordie.ms.constants import QuestConstants
from net.swordie.ms.util import Util

sm.setSpeakerID(9010106)
sm.flipDialogue()
#if chr.getParty() is None:
#    if sm.sendAskYesNo("#r#eMột trận quyết đấu với rồng#n#k đang chờ bạn! Hãy cẩn thận, hắn rất to lớn. Bạn có muốn #b#etham gia Legion Raid#n#k không?"):
#        sm.warpInstanceIn(chr, 921172000, False)
#else:
#    sm.sendSayOkay("Vui lòng rời tổ đội để tham gia Legion Raid.")
sm.sendNext("Hệ thống #bLegion Raid#k đã chuyển sang tự động hoá không cần tham gia nữa.\r\nBạn sẽ được dịch chuyển đến bản đồ để thực hiện nhiệm vụ #b[Legion] Weekly Dragon Extermination#k!")
sm.warp(921172200, 0)
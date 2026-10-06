# [Riena Strait] Maybe I Shouldn't have gotten a boat
from net.swordie.ms.constants import WzConstants

lumber = 4030022

sm.setSpeakerID(1510005) # Daichi

sm.sendNext("Bạn đã thu thập đủ tất cả gỗ chưa?\r\n\r\n"
            "#b#v"+ str(lumber) +"##t"+ str(lumber) +"##k\r\n\r\n")
sm.completeQuestNoRewards(32164) # [Riena Strait] Gỗ Tốt 1
sm.completeQuestNoRewards(32165) # [Riena Strait] Gỗ Tốt 2
sm.completeQuestNoRewards(32166) # [Riena Strait] Gỗ Tốt 3
sm.completeQuest(parentID)
sm.sendSayOkay("Cảm ơn, Chiến binh Dũng cảm. Tôi có thể thấy bạn khá tài năng trong việc điều khiển thuyền đấy.\r\n\r\n#b"
               "(Nói chuyện với Putan để bắt đầu nhiệm vụ.)")

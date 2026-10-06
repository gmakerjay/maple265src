# Created by MechAviv
# Quest ID :: 25560
# Chứa Đựng Bóng Tối
from net.swordie.ms.enums import UIType


sm.curNodeEventEnd(True)
sm.setTemporarySkillSet(0)
sm.setInGameDirectionMode(True, True, False, False)
sm.sendDelay(1000)


sm.setSpeakerID(0)
sm.removeEscapeButton()
sm.flipDialoguePlayerAsSpeaker()
sm.setSpeakerType(3)
sm.sendNext("Đây là cách Black Mage đã hiểu về thế giới sao? Giờ đây ta thấy mọi người khác đều ở dưới ta!")


sm.setSpeakerID(0)
sm.removeEscapeButton()
sm.flipDialoguePlayerAsSpeaker()
sm.setSpeakerType(3)
sm.sendSay("Linh hồn ta suýt chút nữa đã bị mất đi vì sức mạnh của bóng tối. Ta thấy được sự hấp dẫn của nó, nhưng ta sẽ không để nó làm xói mòn toàn bộ bản thể của ta. Ta sẽ học cách khai thác nó, và biến nó thành của riêng ta.")


sm.setSpeakerID(0)
sm.removeEscapeButton()
sm.flipDialoguePlayerAsSpeaker()
sm.setSpeakerType(3)
sm.sendSay("Nhưng trước hết, ta phải thành thạo ma thuật mới của mình. Những vũ khí Ánh Sáng cũ của ta giờ sẽ trở thành công cụ của Bóng Tối.")


sm.giveAndEquip(1212001)
sm.giveAndEquip(1352400)
sm.giveItem(2001502, 30)
sm.giveItem(2001506, 30)
sm.startQuest(25560)
sm.completeQuest(25560)
sm.setSpeakerID(0)
sm.removeEscapeButton()
sm.flipDialoguePlayerAsSpeaker()
sm.setSpeakerType(3)
sm.sendSay("Phải, cảm giác thật tuyệt khi có vũ khí trong tay một lần nữa. Giờ thì, ta sẽ thử nghiệm sức mạnh mới của mình lên ai trước đây...")


sm.sendDelay(900)


sm.progressMessageFont("Tăng cấp độ để tăng chỉ số của bạn. Phím tắt [S] / Phím phụ [C]")
sm.sendDelay(1500)


sm.openUI(UIType.UI_STAT)
sm.sendDelay(900)


sm.setTemporarySkillSet(0)
sm.setInGameDirectionMode(False, True, False, False)
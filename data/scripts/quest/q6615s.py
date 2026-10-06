# Teaching Link Skill
from net.swordie.ms.constants import SkillConstants

SKILL_NAME = SkillConstants.getLinkSkillByJob(chr.getJob())

sm.setSpeakerID(9010023)
sm.removeEscapeButton()
sm.sendNext("Bạn có thể truyền Kỹ năng Liên kết là #b#e#q" + str(SKILL_NAME) + "##n#k cho một nhân vật khác trong cùng thế giới.\r\nHãy đăng nhập vào nhân vật bạn muốn học kỹ năng này và sử dụng kỹ năng #b#e#q1251##n#k.")
sm.openUI(155)
sm.startQuest(parentID)
sm.completeQuest(parentID)
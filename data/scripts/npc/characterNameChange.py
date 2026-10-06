# ParentID: 9062010
# Mr. Newname - Character Name Change
from net.swordie.ms.enums import UIType

if sm.sendNext("Hello! I'm #bMr. Newname#k. I can help you change your name! Do you need my help?\r\n\r\n#b#L0#Change Character Name#l\r\n#L1#End Conversation#l#k") == 0:
    if sm.hasItem(5532781) or chr.getUser().getMaplePoints() >= 15000:
        sm.openUI(UIType.UI_NAMECHANGE)
    else:
        sm.chat("You don't have character name change coupon or 15,000 maple points.")
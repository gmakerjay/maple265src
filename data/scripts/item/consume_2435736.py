sm.setSpeakerID(2140001)
sm.flipDialogue()
if sm.sendAskYesNo("Bạn có muốn kích hoạt Đá Huyền Bí ngay bây giờ không?\r\n\r\n#b(Nếu bạn nhấn OK, bạn sẽ bắt đầu ghi nhận kinh nghiệm săn bắn.)#k"):
    sm.createQuestWithQRValue(1472, "on=1;u=0;exp=0")
    sm.createQuestWithQRValue(1473, "itemID=" + str(parentID))
    sm.openUIWithOption(1128, parentID)
    sm.consumeItem(parentID)
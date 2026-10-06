MELANGE = 3003501

sm.setSpeakerID(MELANGE)
sm.setBoxChat()
if sm.getEmptyInventorySlots(1) >= 1:
    sm.sendNext("#face0#Bạn đã đánh bại #rWill (Hard)#k và nhận được danh hiệu True Abyss.")
    sm.giveItem(1143105)
    sm.completeQuest(34591)
else:
    sm.sendSayOkay("Vui lòng đảm bảo rằng bạn có đủ chỗ trong kho EQUIP của mình và nói chuyện lại với tôi.")
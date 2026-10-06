# Sol Erda
if chr.getSolErda() < 20 or chr.getLevel() < 260:
    chr.addSolErda(1)
    sm.consumeItem(parentID)
else:
    sm.setSpeakerID(9010000)
    sm.sendNext("Bạn không thể sử dụng vật phẩm này")
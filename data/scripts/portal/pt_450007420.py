if chr.getField().getMobs().size() == 0:
    chr.getInstance().stopEvents()
    sm.warp(450007430)
else:
    sm.chat("Cánh cổng này đã bị khoá.")
if sm.getInstance() is not None:
    if sm.getInstance().hasProperty("juliet5clear"):
        sm.warp(926110400)
    else:
        sm.chat("Cánh cổng này đã bị khoá.")
else:
    sm.warp(261000021)
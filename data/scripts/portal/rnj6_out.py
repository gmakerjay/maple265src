if sm.getInstance() is not None:
    if sm.getInstance().hasProperty("romeo5clear"):
        sm.warp(926100400)
    else:
        sm.chat("Cánh cổng này đã bị khoá.")
else:
    sm.warp(926100700)

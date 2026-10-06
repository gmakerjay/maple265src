if sm.getInstance() is not None:
    if sm.hasItem(4001133) and not sm.getInstance().hasProperty("romeo4door1"):
        sm.consumeItem(4001133)
        sm.getInstance().addProperty("romeo4door1", 926100201)
        sm.increaseReactorState(reactor.getTemplateId(), 0)
    else:
        sm.chat("Cánh cổng này đã bị khoá.")
else:
    sm.warp(261000021)


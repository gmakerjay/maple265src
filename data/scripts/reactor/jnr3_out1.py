if sm.hasItem(4001133) and not sm.getInstance().hasProperty("juliet4door1"):
    sm.consumeItem(4001133)
    instance.addProperty("juliet4door1", 926110201)
    sm.increaseReactorState(reactor.getTemplateId(), 0)
else:
    sm.chat("Cánh cổng này đã bị khoá.")

chr.chatMessage(str(reactor.getHitCount()))
reactor.incHitCount()
if reactor.getHitCount() >= reactor.getMaxHitCount():
    sm.removeReactor()

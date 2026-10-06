if sm.hasQuest(3706) and sm.hasItem(4001094) and sm.getReactorState(2406000) == 0:
    sm.changeReactorState(2406000, 1)
    sm.consumeItem(4001094)

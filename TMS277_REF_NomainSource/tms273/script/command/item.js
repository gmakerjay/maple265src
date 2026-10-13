if (stage.isGm()) {
    // map.showTimer(1000)
    // stage.showSystemMessage(
    // stage.getItemBySlot(2, 1).getItemId())
    for (let i = 1; i <= 4; i ++) {
        let e = stage.getItemBySlot(1, i);
        stage.showSystemMessage(`${i}: ${e ? e.getItemId() : 0}`)

    }
    // map.startEvent();
    // stage.showSystemMessage(map.getId())
} 
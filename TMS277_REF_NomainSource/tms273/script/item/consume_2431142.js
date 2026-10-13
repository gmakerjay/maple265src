/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
let casule = []
for (let i = 1; i <= 50; i++) {
    casule.push(util.makeDrop(2637120, 1, 1, 999999, true));
}
map.dropIndieItemsEx(0, stage.getPosX(), stage.getPosY(), 0, 0, 0, casule);
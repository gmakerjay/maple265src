/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */
 
let jiangli = 4001715
let casule = []
for (let i = 1; i <= 50; i++) {
    casule.push(util.makeDrop(jiangli, 1, 1, 999999, false));
}
map.dropIndieItemsEx(0, stage.getPosX(), stage.getPosY(), 0, 0, 0, casule);
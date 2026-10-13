/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


start();

function start() {
    let level = stage.getSkillLevel(400001059);
    if (level == 0) {
        stage.gainVCore(10000031, true);

        stage.loseItem(ctx.getDataId(), 1);
    } else if (level == 25) {
        npc.say("你已經學習至滿級了。");
    } else {
        stage.gainVCore(10000031, true);
        stage.loseItem(ctx.getDataId(), 1);
    }
}


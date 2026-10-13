/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let event = ctx.getEvent("party_prison_break");
if (event != null) {
    switch (map.getId()) {
        case 921160100:
            map.blowWeather(5120053, "噓！必須悄悄地避開障礙物，從塔裡出去。", 10);
            break;
        case 921160200:
            map.blowWeather(5120053, "必須消滅所有警衛。否則他們會叫來其他警衛。", 10);
            break;
        case 921160300:
            map.blowWeather(5120053, "為了防止有人接近監獄，他們建造了迷宮。請尋找通往空中監獄的門！", 10);
            break;
        case 921160400:
            map.blowWeather(5120053, "必須消滅所有警衛。否則他們會叫來其他警衛。", 10);
            break;
        case 921160500:
            map.blowWeather(5120053, "這是最後的障礙物。請通過障礙物，到空中監獄來。", 10);
            break;
        case 921160600:
            map.blowWeather(5120053, "請消滅警衛，找到監獄鑰匙，開啟監獄門。", 10);
            break;
        case 921160700:
            map.blowWeather(5120053, "請消滅看守，讓我們重獲自由！！！！", 10);
            if (event.getVariable("npc") == null) {
                event.setVariable("npc", stage.spawnTempNpc(9020006, -1888, -181, 1));
                var mobs = map.makeMob(9300454);
                mobs.changeHp(2 * 1E11);
                map.spawnMob(mobs, -555, -181);
            }
            break;
    }
}
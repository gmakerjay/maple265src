// Created by MetaMS
// ID:[450013750]
// MapName:不存在的空間
// 不存在的空間


if (npc.ui(1).npcFlip().meFlip().askYesNo("是否離開？ #b(如果點擊「是」，將前往巨人的心臟。) ")) {
        /* Response is Yes */
        stage.changeMap(450012500, 1);
}
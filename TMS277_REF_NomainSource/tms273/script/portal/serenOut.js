if (npc.ui(1).npcFlip().meFlip().askYesNo("是否離開？ #b(如果點擊「是」，將前往賽蓮入口處。) ")) {
    /* Response is Yes */
    stage.changeMap(410000670, 1);
}
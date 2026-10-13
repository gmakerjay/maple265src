// Created by MetaMS

let EXIT_MAP = 993225000;

if (npc.askYesNo("你要現在就離開這裏嗎？")) {
        dir.setVansheeMode(false);
        dir.block().setInGameDirectionMode();
        stage.changeMap(EXIT_MAP, 0);
}
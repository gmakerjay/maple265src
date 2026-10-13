// Created by MetaMS
// ID:[105200700]
// MapName:南部庭園<混沌>
// 南部庭園<混沌>

if (map.getActiveMobCount() > 0) {
        stage.showScriptProgressMsg("需要全打好在庭園內的所有因符，才可以移動至下一個地方。");
        stage.showSystemMessage("首先把打好庭園內的因符。");
} else if (npc.me().askYesNo("那就移動吧！")) {
        /* Response is Yes */
        usr.playPortalSE();
        stage.changeMap(map.getId() + 10, 0);
} else {
        /* Response is No */
        npc.me().say("稍微準備好後再移動吧。");
}
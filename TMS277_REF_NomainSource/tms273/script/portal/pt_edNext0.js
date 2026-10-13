// Created by MetaMS
// ID:[993241100]
// MapName:太陽的禮拜堂舊址
// 太陽的禮拜堂舊址

let event = stage.getEvent();
if (event != null && "1".equals(event.getVariable("CLEAR"))) {
        switch (map.getId()) {
                case 993241100:
                        usr.playPortalSE();
                        stage.changeMap(993240005, 0);
                        break;
                case 993241200:
                        usr.playPortalSE();
                        stage.changeMap(993240007, 0);
                        break;
                case 993241300:
                        usr.playPortalSE();
                        stage.changeMap(993240021, 0);
                        break;
                case 993241400:
                        usr.playPortalSE();
                        stage.changeMap(993240011, 0);
                        break;
                case 993241500:
                        usr.playPortalSE();
                        stage.changeMap(993240022, 0);
                        break;
                case 993241600:
                        usr.playPortalSE();
                        stage.changeMap(993240014, 0);
                        break;
        }
} else {
        stage.showSystemMessage("正在進行戰鬥，想要退場的話，請點擊離開按鈕。");
}

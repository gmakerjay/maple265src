// Created by MetaMS
// ID:[811000100]
// MapName:本堂1樓
// 本堂1樓

if (map.getActiveMobCount() <= 0) {
        let portal = 0;
        switch (map.getId()) {
                case 811000100:
                        portal = 2;
                        break;
        }
        stage.showSystemMessage("移動到下一層. ");
        usr.playPortalSE();
        stage.changeMap(map.getId() + 100, portal);
}
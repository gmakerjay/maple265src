// Created by MetaMS
// ID:[811000100]
// MapName:本堂1樓
// 本堂1樓

let portal = 2;
switch (map.getId()) {
        case 811000200:
                portal = 12;
                break;
}
usr.playPortalSE();
stage.changeMap(map.getId() - 100, portal);
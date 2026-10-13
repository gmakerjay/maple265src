// Created by MetaMS
// MapName:培羅德

let event = stage.getEvent("boss_beidler_normal");
if (event != null) {
        let mapInfo = event.getVariable("GiantBossMap");
        let copiedObject = Object.assign({}, mapInfo);
        if (!(map.getId() in copiedObject)) {
                copiedObject[map.getId()] = "1";
        }
        stage.setFieldVariable(String(map.getId()), mapInfo[map.getId()]);
        if (map.getId() == 863010410 || map.getId() == 863010310) {
                if (map.getActiveMobCount() <= 0) {
                        stage.showPortalEffect("open", 2);
                        stage.showPortalEffect("clear", 2);
                }
        }
        if (map.getId() == 863010240) {
                if ("1".equals(event.getVariable("Hip_Clear"))) {
                        stage.showPortalEffect("clear1", 2);
                        stage.showPortalEffect("clear2", 2);
                }
        }
        stage.showGiantBossMap(copiedObject);
}
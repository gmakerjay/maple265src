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
        if (map.getId() == 863010600) {
                if ("1".equals(event.getVariable("Head_1"))) {
                        stage.showPortalEffect("phase2-1", 2);
                        stage.showPortalEffect("phase2-2", 2);
                }
                if ("1".equals(event.getVariable("Head_2"))) {
                        stage.showPortalEffect("phase3", 2);
                }
        }
        stage.showGiantBossMap(copiedObject);

}
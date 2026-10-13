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

        if (map.getId() == 863010330) {
                if ("1".equals(event.getVariable("RArm_Clear"))) {
                        stage.showPortalEffect("phase3", 2);
                        stage.showPortalEffect("clear", 2);
                }
        }
        if (map.getId() == 863010430) {
                if ("1".equals(event.getVariable("LArm_Clear"))) {
                        stage.showPortalEffect("phase3", 2);
                        stage.showPortalEffect("clear", 2);
                }
        }
        stage.showGiantBossMap(copiedObject);

}
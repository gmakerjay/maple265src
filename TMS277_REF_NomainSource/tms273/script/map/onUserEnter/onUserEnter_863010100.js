// Created by MetaMS
// ID:[863010100]
// MapName:往培羅德

eff.set(true).value(300).showTrembleEffect();
let event = stage.getEvent("boss_beidler_normal");
if (event != null) {
        let mapInfo = event.getVariable("GiantBossMap");
        let copiedObject = Object.assign({}, mapInfo);
        if (!(map.getId() in copiedObject)) {
                copiedObject[map.getId()] = "1";
        }
        stage.setFieldVariable(String(map.getId()), mapInfo[map.getId()]);
        stage.setFieldVariable("clearType", "1");
        if ("1".equals(event.getVariable("First"))) {
                stage.showPortalEffect("open", 2);
        }
        stage.showGiantBossMap(copiedObject);
}
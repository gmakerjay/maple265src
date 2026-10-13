// Created by MetaMS
// ID:[871100000]
// MapName:小蘑菇屋

eff.uol("BgmWz2.img/myHome_room").changeBGM();

eff.key("weather00").duration(2000).setFieldWeather();
eff.key("weather01").duration(2000).setFieldWeather();
eff.key("weather02").duration(2000).setFieldWeather();
eff.key("weather03").duration(2000).setFieldWeather();
eff.key("weather04").duration(2000).setFieldWeather();
eff.key("weather05").duration(2000).setFieldWeather();
if (map.getMyHomeOwner() == stage.getAccountId()) {
        if (stage.isQuestCompleted(64601) && !stage.isQuestStarted(64605) && !stage.isQuestCompleted(64605)) {
                if (!stage.isQuestCompleted(64603)) {
                        let entity_3 = stage.spawnTempNpc(9400923, -160, 100, 0);
                        stage.setNpcSpecialAction(entity_3, "summon", 0, false);
                        stage.addTempValue("entity_3", entity_3);
                }
                if (!stage.isQuestCompleted(64604)) {
                        let entity_4 = stage.spawnTempNpc(9400922, -60, 100, 1);
                        stage.setNpcSpecialAction(entity_4, "summon", 0, false);
                        stage.addTempValue("entity_4", entity_4);
                }
                if (!stage.isQuestCompleted(64602)) {
                        let entity_5 = stage.spawnTempNpc(9400924, -10, 100, 1);
                        stage.setNpcSpecialAction(entity_5, "summon", 0, false);
                        stage.addTempValue("entity_5", entity_5);
                }
        }
        let hide = stage.getIntQuestRecordExShare(500767, "managerHide");
        if (hide == 0) {
                let x = stage.getIntQuestRecordExShare(500767, "managerXpos");
                let y = stage.getIntQuestRecordExShare(500767, "managerYpos");
                let managerFlip = stage.getIntQuestRecordExShare(500767, "managerFlip") == 1 ? 0 : 1;
                let entity_0 = stage.spawnTempNpc(9400930, x, y, managerFlip);
                stage.setNpcSpecialAction(entity_0, "summon", 0, false);
                stage.addTempValue("entity_0", entity_0);
        }
}
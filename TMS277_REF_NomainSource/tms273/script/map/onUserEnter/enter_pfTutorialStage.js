// Created by MetaMS
// Event:Platformer

let event = stage.getEvent("platformer");
if (event != null) {
        stage.applySkillBuff(80001965, 1);
        event.setVariable("st", new Date().getTime());
        stage.updateQuestRecordEx(34500, "time", "10000000");
        stage.updateQuestRecordEx(34500, "type", "1");
        stage.showPlatformerTimer(2, 10000000, 10000000, 34500);
        eff.uol("event/start").showScreenAutoLetterBox();
        eff.uol("Sound/MiniGame.img/multiBingo/start").volume(100).playSoundEffect();
}
let phase = parseInt(map.getId() % 1000 / 10);
switch (phase) {
        case 4:
        case 6:
                cam.level(3).setPutlooseLevel();
                cam.y(200).setRelMove();
                break;
        case 5:
                cam.level(3).setPutlooseLevel();
                cam.y(-100).setRelMove();
                break;
        case 8:
                event.startTimer("summon_obstacle", 100);
                cam.delay(1000).x(400).y(350).setRelMove();
                break;
        case 9:
                cam.delay(1000).x(400).y(350).setRelMove();
                break;
        default:
                cam.level(5).setPutlooseLevel();
                cam.delay(1000).x(400).setRelMove();
                break;
}
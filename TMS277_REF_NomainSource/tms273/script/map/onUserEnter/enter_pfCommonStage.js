// Created by MetaMS
// Event:Platformer

let event = stage.getEvent("platformer");
if (event != null) {
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
                cam.level(5).setPutlooseLevel();
                cam.y(-100).setRelMove();
                break;
        case 8:
                event.startTimer("summon_obstacle", 100);
                cam.level(5).setPutlooseLevel();
                break;
        case 9:
                cam.delay(1000).x(400).y(350).setRelMove();
                break;
        case 10:
        case 11:
        case 18:
                break;
        case 14:
        case 29:
        case 30:
        case 31:
                cam.level(3).setPutlooseLevel();
                cam.delay(1000).x(0).y(-50).setRelMove();
                break;
        case 15:
        case 24:
        case 38:
                cam.level(5).setPutlooseLevel();
                cam.delay(1000).x(400).y(350).setRelMove();
                break;
        case 16:
        case 27:
                cam.level(3).setPutlooseLevel();
                cam.delay(1000).x(0).y(350).setRelMove();
                break;
        case 20:
        case 22:
        case 28:
        case 33:
        case 35:
        case 37:
        case 39:
                cam.level(5).setPutlooseLevel();
                cam.y(-50).setRelMove();
                break;
        case 23:
                cam.level(5).setPutlooseLevel();
                cam.delay(1000).x(300).y(200).setRelMove();
                break;
        case 32:
                cam.level(5).setPutlooseLevel();
                cam.delay(1000).x(100).setRelMove();
                break;
        case 34:
                cam.level(5).setPutlooseLevel();
                cam.delay(1000).y(350).setRelMove();
                break;
        case 40:
                cam.level(5).setPutlooseLevel();
                cam.y(-50).setRelMove();
                break;
        default:
                cam.level(5).setPutlooseLevel();
                cam.delay(1000).x(400).setRelMove();
                break;
}
// Created by MetaMS
// Event:Platformer

stage.teleportToPortalId(3, 0);
eff.uol("Sound/Ambience.img/warning").volume(100).playSoundEffect();
stage.setUserEmotionLocal(5, 2000, false);
let phase = parseInt(map.getId() % 1000 / 10);
switch (phase) {
        case 9:
        case 10:
        case 14:
        case 20:
        case 24:
        case 28:
        case 29:
        case 30:
        case 33:
        case 38:
        case 39:
        case 40:
                map.setFootholdMan(1);
                break;
}
// Created by MetaMS
// ID:[970072000]
// MapName:烏勒斯

dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
dir.duration(800).scale(4000).timePos(800).x(stage.getPosX()).y(stage.getPosY()).setCameraZoom();
dir.setDelay(3000);
dir.back(true).setCameraMove();
dir.setFadeDelay(700);
stage.showUrusResultUI();

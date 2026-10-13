/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let event = stage.getEvent();
if (event != null) {
    if (stage.getCharacterId() == party.getLeaderId()) {
        let map_stage = parseInt((map.getId() - 920010000) / 100);
        let map_judge = event.getVariable(`stage_${map_stage}_clear`);
        if (map_judge) {
            let maps = event.getMap(920010100);
            let members = event.getVariable("members");
            for (let i in members) {
                members[i].changeMap(maps, 0);
            }
        } else {
            stage.showBalloonMsg("#b在完成任務前,不能亂跑~", 250, 10);
        }
    }
}
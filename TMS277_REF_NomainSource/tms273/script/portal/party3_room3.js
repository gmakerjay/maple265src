/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let event = stage.getEvent();
if (event != null) {
    if (stage.getCharacterId() == party.getLeaderId()) {
        let maps = event.getMap(920010400);
        let map_stage = parseInt((maps.getId() - 920010000) / 100);
        let map_judge = event.getVariable(`stage_${map_stage}_clear`);
        switch (map_judge) {
            case null:
                let members = event.getVariable("members");
                for (let i in members) {
                    members[i].changeMap(maps, 0);
                }
                break;

            default:
                stage.showBalloonMsg("#b這個任務已完成了 ! 不能再進入了~", 250, 10);
                break;
        }
    } else {
        stage.showBalloonMsg("#b請讓隊長來進行處理~", 250, 10);
    }
}
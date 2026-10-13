execute();

function execute() {
    if (stage.getChannelId() != 1) {
        npc.meFlip().say("清前往1頻道參與！");
    } else {
        let event = ctx.getEvent("server_monster");
        //event.startTimer("game", 1);
        if (event !== null) {
            let stat = parseInt(event.getVariable('stat'));
            switch (stat) {
                case 1:
                    let members = event.getVariable("members");
                    let judge = true;
                    for (let i in members) {
                        if (members[i].getCharacterId() === stage.getCharacterId()) {
                            judge = false;
                            break;
                        }
                    }
                    if (!judge) {
                        npc.meFlip().say("請勿重複進入!");
                    } else {
                        members.push(stage);
                        stage.setEvent(event);
                        stage.setReviveCount(5);
                        stage.changeMap(993141000, 0);
                    }
                    break;
            }
        }
    }

}
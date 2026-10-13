/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *
 */
let event = ctx.getEvent("party_prison_break");
if (event != null) {
    if (stage.hasItem(4001008, 10)) {
        if (stage.getCharacterId() == party.getLeaderId()) {
            if (npc.meFlip().askYesNo("恭喜逃脫了監獄!一起領獎吧!") == 1) {
                stage.removeItemAll(4001008);
                let members = event.getVariable("members");
                for (let i in members) {
                    members[i].runScript("expand/menu/組隊副本獎勵/逃脫");
                }
            }
        }
    } else {
        npc.meFlip().say("擊敗看守阿尼!逃脫監獄吧!")
    }
}
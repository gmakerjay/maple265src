// Created by MetaMS
// PQ:party2

let event = stage.getEvent("pq_party2");
if (event != null) {
        let complete = event.getVariable("5stageclear");
        if (complete != null && complete) {
                usr.playPortalSE();
                stage.changeMap(922010900, 0);
        } else {
                ctx.portalBlock();
        }
}
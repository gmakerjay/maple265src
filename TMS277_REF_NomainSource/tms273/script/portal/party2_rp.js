// Created by MetaMS
// PQ:party2

let event = stage.getEvent("pq_party2");
if (event != null) {
        let pt = event.getVariable(ctx.getEntityName());
        let ptStage = parseInt(ctx.getEntityName().substring(2, 3));
        let ptIdx = parseInt(ctx.getEntityName().substring(2, 4));
        if ("1".equals(pt)) {
                stage.teleportToPortalId(ptStage + 2);
                map.showObjectEffect("an" + ctx.getEntityName().substring(2, 4));
        } else {
                stage.showSystemMessage("不正確的組合!");
                stage.teleportToPortalId(13);
        }
}
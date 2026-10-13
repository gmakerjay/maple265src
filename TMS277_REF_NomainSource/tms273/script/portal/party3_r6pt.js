/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */

let event = stage.getEvent();
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

    if (event.getVariable("stage_6_" + (ctx.getEntityName().substring(2, 5)) + "").equals("1")) {
        stage.teleportToPortalId(parseInt(ctx.getEntityName().substring(3, 4)) + 5);
        map.showObjectEffect("an" + ctx.getEntityName().substring(3, 5));
    }
}
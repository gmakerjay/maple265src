let skin = getskin(ctx.getDataId());
if (skin != null) {
    stage.updateDamageSkin(skin, ctx.getDataId());
    stage.loseItem(ctx.getDataId(), 1);
} else {
    npc.meFlip().say("#bitemid:#r" + ctx.getDataId() + " #d該傷害不存在!");
}

function getskin(itemid) {
    let ret = db.select("SELECT `id` FROM `zdata_damageskin` WHERE `itemid` = '" + itemid + "' LIMIT 0,1;");
    if (ret.length > 0) {
        return ret[0].get("id");
    } else {
        return null;
    }
}
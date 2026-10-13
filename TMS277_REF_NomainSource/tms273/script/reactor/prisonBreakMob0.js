/*
 * Copyright (c) 2024. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * 
 */
let event = ctx.getEvent("party_prison_break");
if (event != null) {
    map.dropItems(ctx.getEntityPosX(), ctx.getEntityPosY(),
        [
            4001528, 999999]
    );
}

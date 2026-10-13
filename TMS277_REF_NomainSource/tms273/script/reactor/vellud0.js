// Created by MetaMS
// ID:[863010700]
// MapName:培羅德的心臟

let event = stage.getEvent("boss_beidler_normal");
if (event != null) {
        if (event.getVariable("Drop") == null) {
                event.setVariable("Drop", "o");
                map.dropItems(ctx.getEntityPosX(), ctx.getEntityPosY(),
                        [
                                 
                        
        4310097, 1000000,//贝勒德币
		4310097, 1000000,//贝勒德币
        1132243, 50000,//1132243	低级贝勒德刻印腰带
        1122264, 50000,//1122264	低级贝勒德刻印吊坠
        1113072, 50000,//1113072	低级贝勒德戒指
        1032220, 50000//1032220	低级贝勒德耳环

                        ]);
        }
}
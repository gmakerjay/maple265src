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
		4310097, 1000000,//贝勒德币
		4310097, 60000,//贝勒德币
		4310097, 60000,//贝勒德币
		1032221, 35000,//中级贝勒德耳环
    	1122265, 35000,//中级贝勒德刻印吊坠
    	1132244, 35000,//中级贝勒德刻印腰带
    	1113073, 35000,//中级贝勒德戒指
        1032222, 8000,//高级贝勒地耳环
        1122266, 8000,//高级贝勒地项链
        1132245, 8000, //高级贝勒地腰带
		1113074, 8000,//高级贝勒德戒指
                        
                        ]);
        }
}
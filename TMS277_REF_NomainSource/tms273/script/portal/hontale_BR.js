// Created by MetaMS
// ID:[240060002]
// MapName:試煉之穴1
// 試煉之穴1

let eventName;
let key;
let nextField;
switch (map.getId()) {
        case 240060000:
                key = "boss1";
                eventName = "boss_hontale_normal";
                nextField = 240060100;
                break;
        case 240060100:
                key = "boss2";
                eventName = "boss_hontale_normal";
                nextField = 240060200;
                break;
        case 240060001:
                key = "boss1";
                eventName = "boss_hontale_chaos";
                nextField = 240060101;
                break;
        case 240060101:
                key = "boss2";
                eventName = "boss_hontale_chaos";
                nextField = 240060201;
                break;
        case 240060002:
                key = "boss1";
                eventName = "boss_hontale_easy";
                nextField = 240060102;
                break;
        case 240060102:
                key = "boss2";
                eventName = "boss_hontale_easy";
                nextField = 240060300;
                break;
}
let event = stage.getEvent(eventName);
if (event != null && event.getVariable(key)) {
        if (stage.getCharacterId() == party.getLeaderId()) {
                map.transferTo(nextField, 0);
        } else {
                ctx.portalBlock("請讓組隊長通過。");
        }
} else {
        stage.showSystemMessage("現在無法啟動傳點.");
}
// Created by MetaMS
// ID:[5680733]
// MapName:和平的潛水艇
// 整形欄位擴充券


if (npc.askAccept("點擊接受時，可擴充1格美容相簿的整形欄位。\r\n\r\n要#e立即使用1個#t5680733#並擴充1格整形欄位嗎？#r#n\r\n\r\n（包含免費提供的3個欄位在內，欄位最多可使用102格。）")) {
        /* Response is Yes */
        ctx.consume();
        stage.increaseMannequin(1);
        npc.say("已擴充1格整形欄位，可以繼續保管模特兒了~！");
} else {
        /* Response is No */
        npc.say("如果您改變心意的話，隨時都可以再來找我。");
}
stage.exclRequest();

function chatEnd() {
        stage.exclRequest();
}
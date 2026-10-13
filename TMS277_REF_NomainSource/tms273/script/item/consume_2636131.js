// Created by MetaMS
// ID:[2636131]
// Name:貓貓蟲咖波聊天貼圖(嘿嘿這該怎麼辦呢)

if (stage.gainChatEmoticon(10310006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2636342]
// Name:貓貓蟲咖波聊天貼圖(盯～)

if (stage.gainChatEmoticon(10310008)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
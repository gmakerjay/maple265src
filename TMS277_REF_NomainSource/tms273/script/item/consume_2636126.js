// Created by MetaMS
// ID:[2636126]
// Name:貓貓蟲咖波聊天貼圖(不用了沒關係)

if (stage.gainChatEmoticon(10310001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2634173]
// Name:綠水靈聊天貼圖

if (stage.gainChatEmoticonGroup(1024)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
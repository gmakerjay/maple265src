// Created by MetaMS
// ID:[2637164]
// Name:石靈聊天貼圖

if (stage.gainChatEmoticonGroup(1025)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
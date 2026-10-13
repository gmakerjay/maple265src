// Created by MetaMS
// ID:[2637395]
// Name:露希妲聊天貼圖

if (stage.gainChatEmoticonGroup(1012)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
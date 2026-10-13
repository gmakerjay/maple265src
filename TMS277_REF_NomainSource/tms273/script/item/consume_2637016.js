// Created by MetaMS
// ID:[2637016]
// Name:皮卡啾聊天貼圖交換券

if (stage.gainChatEmoticonGroup(1016)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
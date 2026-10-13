// Created by MetaMS
// ID:[2634167]
// Name:皮卡啾聊天貼圖

if (stage.gainChatEmoticonGroup(1022)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
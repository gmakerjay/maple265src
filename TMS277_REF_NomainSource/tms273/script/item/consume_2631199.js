// Created by MetaMS
// ID:[2631199]
// Name:黑色皮卡啾聊天貼圖交換券(不要不要！)

if (stage.gainChatEmoticon(10040006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
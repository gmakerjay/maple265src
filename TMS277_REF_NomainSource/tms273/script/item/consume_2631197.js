// Created by MetaMS
// ID:[2631197]
// Name:黑色皮卡啾聊天貼圖交換券(沮喪)

if (stage.gainChatEmoticon(10040004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
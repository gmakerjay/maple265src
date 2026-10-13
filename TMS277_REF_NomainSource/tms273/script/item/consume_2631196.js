// Created by MetaMS
// ID:[2631196]
// Name:黑色皮卡啾聊天貼圖交換券(生氣)

if (stage.gainChatEmoticon(10040003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
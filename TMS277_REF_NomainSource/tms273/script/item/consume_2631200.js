// Created by MetaMS
// ID:[2631200]
// Name:石靈聊天貼圖交換券(嘆氣)

if (stage.gainChatEmoticon(10050001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
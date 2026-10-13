// Created by MetaMS
// ID:[2631203]
// Name:石靈聊天貼圖交換券(升等)

if (stage.gainChatEmoticon(10050004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
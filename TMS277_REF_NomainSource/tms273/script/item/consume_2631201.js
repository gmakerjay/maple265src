// Created by MetaMS
// ID:[2631201]
// Name:石靈聊天貼圖交換券(看不見)

if (stage.gainChatEmoticon(10050002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
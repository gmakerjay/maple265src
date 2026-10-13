// Created by MetaMS
// ID:[2633281]
// Name:露緹露緹聊天貼圖交換券(讚讚)

if (stage.gainChatEmoticon(10190003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
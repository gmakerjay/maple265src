// Created by MetaMS
// ID:[2633279]
// Name:露緹露緹聊天貼圖交換券(嗚嗚)

if (stage.gainChatEmoticon(10190001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2631211]
// Name:露希妲聊天貼圖交換券(夢中相見)

if (stage.gainChatEmoticon(10070004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
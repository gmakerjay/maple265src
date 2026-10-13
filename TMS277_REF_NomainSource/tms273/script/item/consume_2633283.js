// Created by MetaMS
// ID:[2633283]
// Name:露緹露緹聊天貼圖交換券(我會成為你的倚靠)

if (stage.gainChatEmoticon(10190005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
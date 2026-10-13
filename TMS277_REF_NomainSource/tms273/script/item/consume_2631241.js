// Created by MetaMS
// ID:[2631241]
// Name:雪吉拉聊天貼圖交換券(愛心)

if (stage.gainChatEmoticon(10010005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
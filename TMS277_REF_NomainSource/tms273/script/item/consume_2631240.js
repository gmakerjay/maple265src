// Created by MetaMS
// ID:[2631240]
// Name:雪吉拉聊天貼圖交換券(你好)

if (stage.gainChatEmoticon(10010004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
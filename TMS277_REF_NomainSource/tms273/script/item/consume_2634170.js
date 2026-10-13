// Created by MetaMS
// ID:[2634170]
// Name:雪吉拉聊天貼圖

if (stage.gainChatEmoticonGroup(1023)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
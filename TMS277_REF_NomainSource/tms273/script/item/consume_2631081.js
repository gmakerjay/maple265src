// Created by MetaMS
// ID:[2631081]
// Name:雪吉拉聊天貼圖交換券

if (stage.gainChatEmoticonGroup(1001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
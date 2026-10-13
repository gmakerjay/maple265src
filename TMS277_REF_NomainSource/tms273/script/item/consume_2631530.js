// Created by MetaMS
// ID:[2631530]
// Name:黑啾聊天貼圖交換券

if (stage.gainChatEmoticon(10040001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
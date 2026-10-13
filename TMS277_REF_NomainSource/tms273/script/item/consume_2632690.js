// Created by MetaMS
// ID:[2632690]
// Name:皮卡啾聊天貼圖(你好)

if (stage.gainChatEmoticon(10160002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2632691]
// Name:皮卡啾聊天貼圖(呼呼呼)

if (stage.gainChatEmoticon(10160003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
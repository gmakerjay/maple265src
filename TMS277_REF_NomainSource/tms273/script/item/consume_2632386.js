// Created by MetaMS
// ID:[2632386]
// Name:耶誕皮卡啾聊天貼圖(肉肉好吃)

if (stage.gainChatEmoticon(10170001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
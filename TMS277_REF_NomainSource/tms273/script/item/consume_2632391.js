// Created by MetaMS
// ID:[2632391]
// Name:耶誕皮卡啾聊天貼圖(呵呵呵)

if (stage.gainChatEmoticon(10170006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
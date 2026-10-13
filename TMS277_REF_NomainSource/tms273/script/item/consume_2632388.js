// Created by MetaMS
// ID:[2632388]
// Name:耶誕皮卡啾聊天貼圖(是特別禮物)

if (stage.gainChatEmoticon(10170003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
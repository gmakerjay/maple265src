// Created by MetaMS
// ID:[2632389]
// Name:耶誕皮卡啾聊天貼圖(打呼)

if (stage.gainChatEmoticon(10170004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
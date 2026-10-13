// Created by MetaMS
// ID:[2632703]
// Name:耶誕皮卡啾聊天貼圖交換券

if (stage.gainChatEmoticonGroup(1017)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
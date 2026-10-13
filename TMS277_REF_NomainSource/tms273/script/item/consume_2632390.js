// Created by MetaMS
// ID:[2632390]
// Name:耶誕皮卡啾聊天貼圖(有這種事)

if (stage.gainChatEmoticon(10170005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
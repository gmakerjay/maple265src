// Created by MetaMS
// ID:[2632689]
// Name:皮卡啾聊天貼圖(軟軟)

if (stage.gainChatEmoticon(10160001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
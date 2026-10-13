// Created by MetaMS
// ID:[2631087]
// Name:皮卡啾聊天貼圖交換券(應援)

if (stage.gainChatEmoticon(10030005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
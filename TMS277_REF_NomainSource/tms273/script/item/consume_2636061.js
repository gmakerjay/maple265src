// Created by MetaMS
// ID:[2636061]
// Name:砂兔聊天貼圖(嗚嗚想哭)

if (stage.gainChatEmoticon(10300005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
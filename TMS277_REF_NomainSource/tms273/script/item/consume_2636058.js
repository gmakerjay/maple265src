// Created by MetaMS
// ID:[2636058]
// Name:砂兔聊天貼圖(你說什麼)

if (stage.gainChatEmoticon(10300002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
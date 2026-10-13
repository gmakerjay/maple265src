// Created by MetaMS
// ID:[2636062]
// Name:砂兔聊天貼圖(遊刃有餘)

if (stage.gainChatEmoticon(10300006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
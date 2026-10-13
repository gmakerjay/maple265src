// Created by MetaMS
// ID:[2636060]
// Name:砂兔聊天貼圖(有夠無聊啊)

if (stage.gainChatEmoticon(10300004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
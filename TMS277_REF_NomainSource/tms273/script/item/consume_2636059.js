// Created by MetaMS
// ID:[2636059]
// Name:砂兔聊天貼圖(走吧走吧)

if (stage.gainChatEmoticon(10300003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
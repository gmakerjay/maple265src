// Created by MetaMS
// ID:[2632075]
// Name:阿戴爾聊天貼圖交換券(我最耀眼)

if (stage.gainChatEmoticon(10140002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
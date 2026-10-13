// Created by MetaMS
// ID:[2632142]
// Name:阿戴爾聊天貼圖交換券(讚讚！恭喜！)

if (stage.gainChatEmoticon(10140003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
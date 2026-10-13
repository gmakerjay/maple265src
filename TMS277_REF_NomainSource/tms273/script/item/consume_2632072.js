// Created by MetaMS
// ID:[2632072]
// Name:阿戴爾聊天貼圖交換券(嘀嘀咕咕好吃)

if (stage.gainChatEmoticon(10140002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
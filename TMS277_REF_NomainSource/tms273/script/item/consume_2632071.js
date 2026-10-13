// Created by MetaMS
// ID:[2632071]
// Name:阿戴爾聊天貼圖交換券(歪頭)

if (stage.gainChatEmoticon(10140001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
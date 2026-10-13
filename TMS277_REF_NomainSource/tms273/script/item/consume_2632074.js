// Created by MetaMS
// ID:[2632074]
// Name:阿戴爾聊天貼圖交換券(內心一陣火)

if (stage.gainChatEmoticon(10140001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2631242]
// Name:雪吉拉聊天貼圖交換券(拍手)

if (stage.gainChatEmoticon(10010006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
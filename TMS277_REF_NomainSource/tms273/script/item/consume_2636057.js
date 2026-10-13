// Created by MetaMS
// ID:[2636057]
// Name:砂兔聊天貼圖(我們是夢幻搭檔)

if (stage.gainChatEmoticon(10300001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
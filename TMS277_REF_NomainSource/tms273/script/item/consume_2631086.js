// Created by MetaMS
// ID:[2631086]
// Name:皮卡啾聊天貼圖交換券(聽音樂) 

if (stage.gainChatEmoticon(10030004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
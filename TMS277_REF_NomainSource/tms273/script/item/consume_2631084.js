// Created by MetaMS
// ID:[2631084]
// Name:皮卡啾聊天貼圖交換券(感激) 

if (stage.gainChatEmoticon(10030002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
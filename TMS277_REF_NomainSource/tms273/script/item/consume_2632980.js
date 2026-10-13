// Created by MetaMS
// ID:[2632980]
// Name:貓貓蟲咖波聊天貼圖交換券(發亮) 

if (stage.gainChatEmoticon(10180002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
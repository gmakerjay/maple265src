// Created by MetaMS
// ID:[2632981]
// Name:貓貓蟲咖波聊天貼圖交換券(喔喔！) 

if (stage.gainChatEmoticon(10180003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
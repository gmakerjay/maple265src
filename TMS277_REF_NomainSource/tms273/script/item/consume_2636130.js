// Created by MetaMS
// ID:[2636130]
// Name:貓貓蟲咖波聊天貼圖(咖波心情真好~)

if (stage.gainChatEmoticon(10310005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
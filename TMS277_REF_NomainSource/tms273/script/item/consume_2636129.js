// Created by MetaMS
// ID:[2636129]
// Name:貓貓蟲咖波聊天貼圖(興奮到模糊)

if (stage.gainChatEmoticon(10310004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
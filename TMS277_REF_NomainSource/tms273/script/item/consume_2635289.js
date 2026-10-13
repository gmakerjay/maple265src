// Created by MetaMS
// ID:[2635289]
// Name:那因哈特聊天貼圖交換券(沉思時間)

if (stage.gainChatEmoticon(10290004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
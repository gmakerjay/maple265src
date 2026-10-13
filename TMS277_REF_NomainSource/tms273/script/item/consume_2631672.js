// Created by MetaMS
// ID:[2631672]
// Name:幻影俠盜&艾麗亞動物聊天貼圖交換券(棉被外很危險)

if (stage.gainChatEmoticon(10080003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
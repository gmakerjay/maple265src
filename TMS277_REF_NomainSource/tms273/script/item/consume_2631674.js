// Created by MetaMS
// ID:[2631674]
// Name:幻影俠盜&艾麗亞動物聊天貼圖交換券(哎呀這個要買)

if (stage.gainChatEmoticon(10080005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
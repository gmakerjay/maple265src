// Created by MetaMS
// ID:[2631210]
// Name:露希妲聊天貼圖交換券(淚眼汪汪)

if (stage.gainChatEmoticon(10070003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
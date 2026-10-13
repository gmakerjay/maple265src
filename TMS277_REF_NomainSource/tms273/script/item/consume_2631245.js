// Created by MetaMS
// ID:[2631245]
// Name:企鵝王聊天貼圖交換券(害羞)

if (stage.gainChatEmoticon(10020003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
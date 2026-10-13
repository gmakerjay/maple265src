// Created by MetaMS
// ID:[2632692]
// Name:企鵝王聊天貼圖(憂鬱)

if (stage.gainChatEmoticon(10150001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
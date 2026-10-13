// Created by MetaMS
// ID:[2632694]
// Name:企鵝王聊天貼圖(咦)

if (stage.gainChatEmoticon(10150003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
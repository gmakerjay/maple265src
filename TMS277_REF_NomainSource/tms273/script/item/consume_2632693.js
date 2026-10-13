// Created by MetaMS
// ID:[2632693]
// Name:企鵝王聊天貼圖(你說什麼？)

if (stage.gainChatEmoticon(10150002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
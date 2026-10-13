// Created by MetaMS
// ID:[2631082]
// Name:企鵝王聊天貼圖交換券

if (stage.gainChatEmoticonGroup(1002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
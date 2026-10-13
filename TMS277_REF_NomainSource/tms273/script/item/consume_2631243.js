// Created by MetaMS
// ID:[2631243]
// Name:企鵝王聊天貼圖交換券(奔跑中)

if (stage.gainChatEmoticon(10020001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
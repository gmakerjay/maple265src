// Created by MetaMS
// ID:[2631244]
// Name:企鵝王聊天貼圖交換券(苦惱)

if (stage.gainChatEmoticon(10020002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
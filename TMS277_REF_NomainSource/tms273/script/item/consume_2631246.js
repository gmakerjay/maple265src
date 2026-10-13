// Created by MetaMS
// ID:[2631246]
// Name:企鵝王聊天貼圖交換券(冷清)

if (stage.gainChatEmoticon(10020004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2631089]
// Name:黑色皮卡啾聊天貼圖交換券(吐舌)

if (stage.gainChatEmoticon(10040001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
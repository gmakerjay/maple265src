// Created by MetaMS
// ID:[2634467]
// Name:啾啾艾爾蘭調皮蛋聊天貼圖交換券(做得真好～)

if (stage.gainChatEmoticon(10260002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2631088]
// Name:皮卡啾聊天貼圖交換券(呼叫)

if (stage.gainChatEmoticon(10030006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
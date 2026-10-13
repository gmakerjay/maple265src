// Created by MetaMS
// ID:[2634471]
// Name:啾啾艾爾蘭調皮蛋聊天貼圖交換券(滾滾發呆～)

if (stage.gainChatEmoticon(10260006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
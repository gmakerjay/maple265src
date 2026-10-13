// Created by MetaMS
// ID:[2635287]
// Name:那因哈特聊天貼圖交換券(歡迎來到耶雷弗)

if (stage.gainChatEmoticon(10290002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
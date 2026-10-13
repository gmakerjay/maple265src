// Created by MetaMS
// ID:[2635286]
// Name:那因哈特聊天貼圖交換券(火冒三丈)

if (stage.gainChatEmoticon(10290001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
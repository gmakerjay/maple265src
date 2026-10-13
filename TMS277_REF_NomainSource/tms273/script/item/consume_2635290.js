// Created by MetaMS
// ID:[2635290]
// Name:那因哈特聊天貼圖交換券(打瞌睡)

if (stage.gainChatEmoticon(10290005)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
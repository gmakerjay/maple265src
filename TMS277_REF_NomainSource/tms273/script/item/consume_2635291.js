// Created by MetaMS
// ID:[2635291]
// Name:那因哈特聊天貼圖交換券(無奈搖頭)

if (stage.gainChatEmoticon(10290006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
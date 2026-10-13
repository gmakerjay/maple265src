// Created by MetaMS
// ID:[2635288]
// Name:那因哈特聊天貼圖交換券(可洛納懷疑)

if (stage.gainChatEmoticon(10290003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
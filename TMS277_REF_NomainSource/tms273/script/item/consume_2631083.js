// Created by MetaMS
// ID:[2631083]
// Name:皮卡啾聊天貼圖交換券(我可愛吧？) 

if (stage.gainChatEmoticon(10030001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2635023]
// Name:超級偶像天使破壞者聊天室貼圖交換券(開始舞台！)

if (stage.gainChatEmoticon(10280001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
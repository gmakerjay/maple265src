// Created by MetaMS
// ID:[2635025]
// Name:超級偶像天使破壞者聊天室貼圖交換券(特製愛心光束)

if (stage.gainChatEmoticon(10280003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
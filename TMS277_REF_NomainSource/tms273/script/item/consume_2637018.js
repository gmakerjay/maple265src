// Created by MetaMS
// ID:[2637018]
// Name:綠水靈聊天貼圖交換券

if (stage.gainChatEmoticonGroup(1024)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
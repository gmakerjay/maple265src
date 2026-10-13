// Created by MetaMS
// ID:[2632754]
// Name:皮卡啾v2聊天貼圖交換券

if (stage.gainChatEmoticon(10160003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
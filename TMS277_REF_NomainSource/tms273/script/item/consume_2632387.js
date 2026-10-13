// Created by MetaMS
// ID:[2632387]
// Name:耶誕皮卡啾聊天貼圖(跑吧！)

if (stage.gainChatEmoticon(10170002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
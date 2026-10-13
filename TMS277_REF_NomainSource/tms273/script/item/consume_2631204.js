// Created by MetaMS
// ID:[2631204]
// Name:小精靈聊天貼圖交換券(傷心)

if (stage.gainChatEmoticon(10060001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
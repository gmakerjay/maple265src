// Created by MetaMS
// ID:[2631697]
// Name:小小精靈聊天表情

if (stage.gainChatEmoticonGroup(1011)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
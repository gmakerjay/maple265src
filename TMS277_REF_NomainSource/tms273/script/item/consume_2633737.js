// Created by MetaMS
// ID:[2633737]
// Name:龍魔導士&寶貝龍動物聊天貼圖交換券(哈欠)

if (stage.gainChatEmoticon(10200001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
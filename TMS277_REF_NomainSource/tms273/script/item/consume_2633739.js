// Created by MetaMS
// ID:[2633739]
// Name:龍魔導士&寶貝龍動物聊天貼圖交換券(超開心)

if (stage.gainChatEmoticon(10200003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
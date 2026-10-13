// Created by MetaMS
// ID:[2634715]
// Name:喜愛冒險者的糖果聊天貼圖交換券(幸會呀冒險者~)

if (stage.gainChatEmoticon(10270002)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
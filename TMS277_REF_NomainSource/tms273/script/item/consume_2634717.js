// Created by MetaMS
// ID:[2634717]
// Name:喜愛冒險者的糖果聊天貼圖交換券(加油冒險者！)

if (stage.gainChatEmoticon(10270004)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
// Created by MetaMS
// ID:[2634719]
// Name:喜愛冒險者的糖果聊天貼圖交換券(緊急事件～)

if (stage.gainChatEmoticon(10270006)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
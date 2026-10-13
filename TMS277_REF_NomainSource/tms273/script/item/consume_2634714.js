// Created by MetaMS
// ID:[2634714]
// Name:喜愛冒險者的糖果聊天貼圖交換券(吐舌～)

if (stage.gainChatEmoticon(10270001)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
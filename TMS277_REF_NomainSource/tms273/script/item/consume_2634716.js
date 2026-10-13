// Created by MetaMS
// ID:[2634716]
// Name:喜愛冒險者的糖果聊天貼圖交換券(帥喔冒險者！)

if (stage.gainChatEmoticon(10270003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
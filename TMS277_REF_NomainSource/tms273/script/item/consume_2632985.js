// Created by MetaMS
// ID:[2632985]
// Name:貓貓蟲咖波聊天貼圖交換券(抖抖抖) 

if (stage.gainChatEmoticon(10180007)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
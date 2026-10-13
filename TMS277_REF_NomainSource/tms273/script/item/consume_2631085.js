// Created by MetaMS
// ID:[2631085]
// Name:皮卡啾聊天貼圖交換券(肚子餓) 

if (stage.gainChatEmoticon(10030003)) {
        stage.showSystemMessage("聊天表情發放完畢。");
        ctx.consume();
} else {
        stage.dropAlertNotice("無法使用。");
}
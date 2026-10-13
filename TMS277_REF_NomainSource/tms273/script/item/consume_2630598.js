// Created by MetaMS
// ID:[2630598]
// MapName:Unknown
// 舒適的菇菇小屋設計圖


let types = [2, 3, 4];
if (ctx.addHomeDrawing(types)) {
        ctx.consume();
        stage.showSystemMessage("已增加舒適的菇菇小屋設計圖！");
} else {
        stage.dropAlertNotice("只有在我的小屋裏面才能使用");
}

function chatEnd() {
        stage.exclRequest();
}
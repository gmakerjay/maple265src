// Created by MetaMS
// ID:[2630598]
// MapName:Unknown
// 舒適的菇菇小屋設計圖


let count = 6;
if (ctx.addHomeStorageSlot(count)) {
        ctx.consume();
        stage.showSystemMessage("已增加家具欄6格！");
} else {
        stage.dropAlertNotice("只有在我的小屋裏面才能使用");
}
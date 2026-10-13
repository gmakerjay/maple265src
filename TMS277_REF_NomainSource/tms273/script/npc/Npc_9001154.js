// Created by MetaMS
// [排行榜]  |  [9001154]
// MapName:激鬥陣地入口

let count = stage.getIntWorldShareRecord(256, "count");
if (count < 5) {
        stage.showProgressMessageFont("<戰鬥吧！必須進行傳說的回歸5次之後才能查看排行。", 3, 22, 0, 0);//unk:[byte]0
        stage.showSystemMessage("<戰鬥吧！必須進行傳說的回歸5次之後才能查看排行。");
        stage.showSystemMessage("目前遊戲次數：" + count);
} else {
        stage.showSystemMessage("排名分數需花費10分鐘以上才會反映上去。");
        stage.openUI(1285);
}
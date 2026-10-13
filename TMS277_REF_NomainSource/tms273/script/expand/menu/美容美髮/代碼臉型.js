/*
 * Copyright (c) 2025. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */

/**
 * 自選臉型-新端腳本修改 幾里 315342975
 **/

var item = 5152053; //所需物品

let res;
let isAngel = false;
let isBeta = false;
if (stage.getJob() == 6512) {
    isAngel = npc.askAngelicBuster() != 0;
} else if (stage.getJob() == 10112) {
    isBeta = npc.askMenu("請選擇：\r\n#b#L0#神之子：阿爾法#l\r\n#L1#神之子：貝塔#l") != 0;
}
let selection = npc.askMenu("您好，請選擇你需要的服務。\r\n查詢臉型網站 可以在群里輸入  代碼 查詢\r\n#b#L0#自選臉型,自己填臉型代碼（使用#v" + item + "#）");
if (selection == 0) {
    let number = npc.defNum(3000).minNum(3000).maxNum(99999).askNumber("請填寫臉型代碼（請再三確認過後再填寫！）")
    //if(!npc.isFaceValid(number)){
    hairs = [number];
    res = npc.showType(0).styles(hairs).cardId(item).askAvatar("我能把你現在的發型變成全新的發型。你對現在的發型不厭倦嗎?,我幫你換發型。慢慢挑選你想要的發型吧~");
    selection = res[0];
    let buy = res[1];

    if (stage.hasItem(item, 1)) {
        stage.loseItem(item, 1);
        if (!isAngel) {
            stage.setFace(hairs[selection]);
        } else {
            stage.setFace(hairs[selection]);
        }
        npc.next().say("完成了,享受你的新臉型吧!,如果造型沒發生變化，小退即可哦");
    } else {
        npc.next().say("呃……你好像沒有#v" + item + "#啊？很抱歉，沒有#v" + item + "#的話，我不能給你做頭髮。");
    }

}

/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 */


marinStart();

function marinStart() {
    let txt = "造型改造中心\r\n\r\n";
    txt += "請輸入你想變更的髮型或者臉型ID\r\n";
    txt += "如果不知道代碼的前往代碼查詢網獲取\r\n";
    txt += "#L0#改造臉型#l\t\t#L1#改造髮型#l\t\t#L2#代碼查詢#l\r\n ";
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 2:
            stage.dropAlertNotice("自行前往代碼查詢頁面")
            break;

        case 1:
            txt = "請輸入你想醫美的#b 髮型 or 臉型#k ID\r\n\r\n選到滿意的造型後要輸入[ #r變更#k ]即可生效\r\n\r\n";
            num = npc.meFlip().minNum(20000).maxNum(70000).defNum(0).askNumber(txt);
            if (!ismarin('hair', num)) {
                npc.meFlip().say("抱歉..該造型不存在或不能裝扮異性造型");
                return;
            }
            res = npc.showType(0).styles([num, stage.getHair()]).cardId(5150215).askAvatar("我能把你現在的發型變成全新的發型。你對現在的發型不厭倦嗎?,我幫你換發型。慢慢挑選你想要的發型吧~");
            stage.setHair(num);
            stage.loseItem(ctx.getDataId(), 1);
            npc.meFlip().say("變更成功!!")
            break;
        case 0:
            txt = "請輸入你想醫美的#b 髮型 or 臉型#k ID\r\n\r\n";
            num = npc.meFlip().minNum(20000).maxNum(70000).defNum(0).askNumber(txt);
            if (!ismarin('face', num)) {
                npc.meFlip().say("抱歉..該造型不存在或不能裝扮異性造型");
                return;
            }
            res = npc.showType(0).styles([num, stage.getFace()]).cardId(5152286).askAvatar("我能把你現在的發型變成全新的臉型。你對現在的發型不厭倦嗎?,我幫你換發型。慢慢挑選你想要的臉型吧~");
            stage.setFace(num);
            stage.loseItem(ctx.getDataId(), 1);
            npc.meFlip().say("變更成功!!")
            break;
    }
}


function ismarin(name, id) {
    var ret = db.select("SELECT COUNT(*) as count FROM `marin_profiling` WHERE `" + name + "` = '" + id + "';");
    if (ret[0].get('count') > 0) {
        return true;
    } else {
        return false;
    }
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    const finalString = finalStringArray.slice(0, totalLength).join("");
    return finalString;
}
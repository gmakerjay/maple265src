/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */


let marin = [1404017, 1212115, 1213017, 1214017, 1222109, 1242116, 1252093, 1262017, 1302333, 1312199, 1322250, 1332274, 1362135, 1372222, 1382259, 1402251, 1403017, 1412177, 1422184, 1432214, 1442268, 1452252, 1462239, 1472261, 1482216, 1492231, 1522138, 1532144, 1542108, 1552110, 1582017, 1592019];

marinStart();

function marinStart() {
    let txt = "以下裝備任選一件\r\n\r\n";
    for (let i in marin) {
        txt += "#L" + i + "##v" + marin[i] + "##z" + marin[i] + "##l\r\n";
    }
    sel = npc.askMenu(txt);

    txt = "是否要兌換 #i" + marin[sel] + "# 道具呢？\r\n";
    if (npc.meFlip().askYesNo(txt) !== 1) return;

    let Equip = util.makeItem(marin[sel], 1);
    stage.gainItem(Equip);
    stage.loseItem(ctx.getDataId(), 1);
    npc.meFlip().say("兌換成功");
}
/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */

let bute = [1092088, 1092089, 1099011, 1099012, 1098006, 1352013, 1342095, 1352113, 1352209, 1352219, 1352229, 1352239, 1352249, 1352259, 1352269, 1352279, 1352289, 1352299, 1352410, 1352510, 1352610, 1352711, 1352819, 1352831, 1352867, 1352909, 1352919, 1352938, 1352948, 1352978, 1352981,
    1352990, 1353010, 1353105, 1353105, 1353205, 1353306, 1353405, 1353505, 1353606, 1353707, 1353807, 1353900, 1354007, 1354017, 1354027, 1354037, 1552133, 1099015];

marinStart();

function marinStart() {
    txt = "請選擇您想兌換的裝備\r\n\r\n";
    for (let i in bute) {
        txt += "#L" + i + "##i" + bute[i] + ":##z" + bute[i] + "##l\r\n";
    }
    sel = npc.meFlip().askMenu(txt);

    if (!stage.hasItem(ctx.getDataId(), 15)) {
        stage.dropAlertNotice("抱歉..你沒有15個碎片");
        return;
    }
    stage.gainItem(bute[sel], 1);
    stage.loseItem(ctx.getDataId(), 15);
    stage.dropAlertNotice("恭喜您兌換成功");
}

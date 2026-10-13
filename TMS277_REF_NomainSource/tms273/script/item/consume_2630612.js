execute();

function execute() {
    let txt = "\r\n";
    txt += "#L0#15 個碎片兌換#i5060048##l\r\n";
    txt += "#L1#50 個碎片兌換#i2636688# x 10#l\r\n";
    txt += "#L2#150個碎片兌換#i2539001##l\r\n";
    let sel = npc.meFlip().askMenu(txt);

    txt = "\r\n";
    switch (sel) {
        case 0:
            txt += "每 15 個碎片兌換 #i5060048# x 1\r\n";
            txt += "目前最高兌換數量 " + parseInt(stage.getItemQuantity(ctx.getDataId()) / 15) + " 個\r\n";
            break;
        case 1:
            txt += "每 50 個碎片兌換 #i2636688# x 10\r\n";
            txt += "目前最高兌換數量 " + parseInt(stage.getItemQuantity(ctx.getDataId()) / 50) + " 個\r\n";
            break;
        case 2:
            txt += "每 150 個碎片兌換 #i2539001# x 1\r\n";
            txt += "目前最高兌換數量 " + parseInt(stage.getItemQuantity(ctx.getDataId()) / 150) + " 個\r\n";
            break;
    }
    txt += "請再下列輸入你想兌換的數量\r\n";
    txt += "\r\n ";
    let num = npc.me().minNum(1).maxNum(9999).defNum(1).askNumber(txt);

    let count = 0;
    switch (sel) {
        case 0:
            if (!stage.hasItem(ctx.getDataId(), num * 15)) {
                npc.meFlip().say("真可惜..你並沒有那麼多碎片");
                return;
            }
            count = num * 15;
            break;
        case 1:
            if (!stage.hasItem(ctx.getDataId(), num * 50)) {
                npc.meFlip().say("真可惜..你並沒有那麼多碎片");
                return;
            }
            count = num * 50;
            break;
        case 2:
            if (!stage.hasItem(ctx.getDataId(), num * 150)) {
                npc.meFlip().say("真可惜..你並沒有那麼多碎片");
                return;
            }
            count = num * 150;
            break;
    }
    while (count >= 20000) {
        stage.loseItem(ctx.getDataId(), 20000);
        count -= 20000;
    }
    stage.loseItem(ctx.getDataId(), count);
    switch (sel) {
        case 0:
            stage.gainItem(5060048, num);
            break;
        case 1:
            let Icount = num * 10;
            while (Icount >= 20000) {
                stage.gainItem(2636688, 20000);
                Icount -= 20000;
            }
            stage.gainItem(2636688, Icount);
            break;
        case 2:
            stage.gainItem(2539001, num);
            break;
    }
}
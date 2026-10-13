marinStart();

function marinStart() {
    txt = "請選擇你要使用的功能:\r\n\r\n";
    txt += "#L0#打開儲藏倉庫#l\r\n\r\n";
    txt += "#L1#存入道具至儲藏倉庫#l\r\n\r\n";
    txt += "#L999##r抽獎倉庫#l\r\n";
    sel = npc.meFlip().askMenu(txt);

    switch (sel) {
        case 0:
            txt = "請選擇你想查看的類型\r\n\r\n";
            txt += "#L2#消耗欄目#l\t#L4#其他欄目#l\r\n\r\n"
            txt += "#L5#特殊欄目#l\t#L1#裝備欄目#l\r\n\r\n"
            cul = npc.meFlip().askMenu(txt);

            txt = "#b親愛的玩家 #r" + stage.getCharacterName() + "#b 你好,歡迎光臨 '儲藏倉庫' 您在近期背包不足不能獲取的物品都會存入這裡,那麼請在下面選擇你所需要領取的道具吧!\r\n";

            txt += "#r只會顯示最近獲得的前1000條記錄\r\n";
            var group = G_ware(false, cul);
            if (group.length <= 0) {
                txt += "\r\n\r\n\t\t\t#r抱歉..倉庫沒有任何物品\r\n";
                npc.meFlip().say(txt);
                return;
            }
            for (var i in group) {
                txt += "#d#L" + i + "##i" + group[i].itemid + ":##z" + group[i].itemid + "# x " + group[i].itemnum + "#l\r\n";
            }
            pos = npc.meFlip().askMenu(txt);

            var group = G_ware(false, cul);
            txt = "請輸入你想取出的數量\r\n\r\n";
            txt += "#i" + group[pos].itemid + ":##z" + group[pos].itemid + "# 倉庫數量 : " + group[pos].itemnum + "\r\n";
            num = npc.meFlip().minNum(1).maxNum(group[pos].itemnum).defNum(1).askNumber(txt);
            var group = G_ware(false, cul);
            if (parseInt(group[pos].itemnum) - num > 0) {
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+-" + num + " WHERE `id` = " + group[pos].id + ";";
            } else {
                var sql = "DELETE FROM `marin_warehouse` WHERE `id` = " + group[pos].id + ";";

            }
            db.update(sql);
            stage.gainItem(group[pos].itemid, num);
            stage.dropAlertNotice("領取成功");
            break;

        case 1:
            txt = "";
            txt += "請選擇你要存入的型別:\r\n\r\n";
            //txt += "#b#L0#存入 (角色 特殊欄位)#l　";
            //txt += "#r#L3#存入 (賬號 特殊欄位)#l\r\n\r\n";
            //txt += "#b#L1#存入 (角色 消耗欄位)#l　";
            //txt += "#r#L4#存入 (賬號 消耗欄位)#l\r\n\r\n";
            //txt += "#b#L2#存入 (角色 其他欄位)#l\r\n\r\n";
            txt += "#r#L5#存入 (賬號 其他欄位)#l\r\n\r\n";

            url = npc.meFlip().askMenu(txt);

            txt = "#b請選擇你要存入的道具:\r\n"
            switch (url) {
                case 0:
                case 3:
                    var judge = false;
                    for (var i = 1; i <= 128; i++) {
                        var Equip = stage.getItemBySlot(5, i);
                        if (Equip == null) continue;
                        if (Equip.getExpireDate() != 3439728000000 && Equip.getExpireDate() != 3439756800000) continue;
                        txt += "#b#L" + i + "##i" + Equip['itemId'] + ":##z" + Equip['itemId'] + "# 擁有 " + stage.getItemQuantity(Equip['itemId']) + " 個#l\r\n";
                        judge = true;
                    }
                    break;
                case 1:
                case 4:
                    var judge = false;
                    for (var i = 1; i <= 128; i++) {
                        var Equip = stage.getItemBySlot(2, i);
                        if (Equip == null) continue;
                        if (Equip.getExpireDate() != 3439728000000 && Equip.getExpireDate() != 3439756800000) continue;
                        txt += "#b#L" + i + "##i" + Equip['itemId'] + ":##z" + Equip['itemId'] + "# 擁有 " + stage.getItemQuantity(Equip['itemId']) + " 個#l\r\n";
                        judge = true;
                    }
                    break;
                case 2:
                case 5:
                    var judge = false;
                    for (var i = 1; i <= 128; i++) {
                        var Equip = stage.getItemBySlot(4, i);
                        if (Equip == null) continue;
                        if (Equip.getExpireDate() != 3439728000000 && Equip.getExpireDate() != 3439756800000) continue;
                        txt += "#b#L" + i + "##i" + Equip['itemId'] + ":##z" + Equip['itemId'] + "# 擁有 " + stage.getItemQuantity(Equip['itemId']) + " 個#l\r\n";
                        judge = true;
                    }
                    break;
            }
            if (!judge) {
                txt += "\r\n\r\n#r\t\t當前欄位沒有任何物品\r\n";
                npc.meFlip().say(txt);
                return;
            }
            pos = npc.meFlip().askMenu(txt);

            txt = "#b請輸入你想存入的數量:\r\n"
            switch (url) {
                case 0:
                case 3:
                    var Equip = stage.getItemBySlot(5, pos);
                    break;
                case 1:
                case 4:
                    var Equip = stage.getItemBySlot(2, pos);
                    break;
                case 2:
                case 5:
                    var Equip = stage.getItemBySlot(4, pos);
                    break;
            }
            txt += "#d#i" + Equip['itemId'] + ":##z" + Equip['itemId'] + "# 擁有 #r" + stage.getItemQuantity(Equip['itemId']) + "#d\r\n\r\n\r\n ";
            num = npc.meFlip().minNum(1).maxNum(stage.getItemQuantity(Equip['itemId'])).defNum(1).askNumber(txt);

            switch (url) {
                case 0:
                case 3:
                    var woretype = 5;
                    var Equip = stage.getItemBySlot(5, pos);
                    break;
                case 1:
                case 4:
                    var woretype = 2;
                    var Equip = stage.getItemBySlot(2, pos);
                    break;
                case 2:
                case 5:
                    var woretype = 4;
                    var Equip = stage.getItemBySlot(4, pos);
                    break;
            }
            switch (url) {
                case 0:
                case 1:
                case 2:
                    Insert(true, woretype, Equip['itemId'], num);
                    break;
                case 3:
                case 4:
                case 5:
                    Insert(false, woretype, Equip['itemId'], num);
                    break;
            }
            stage.loseItem(Equip['itemId'], num);
            stage.dropAlertNotice("存入成功");
            break;

        case 999:
            txt = "#b親愛的玩家 #r" + stage.getCharacterName() + "#b 你好,歡迎光臨 '抽獎倉庫' 您在近期背包不足不能獲取的物品都會存入這裡,那麼請在下面選擇你所需要領取的道具吧!\r\n";

            txt += "#r只會顯示最近獲得的前1000條記錄\r\n";
            var group = G_ware(false, sel);
            if (group.length <= 0) {
                txt += "\r\n\r\n\t\t\t#r抱歉..倉庫沒有任何物品\r\n";
                npc.meFlip().say(txt);
                return;
            }
            for (var i in group) {
                txt += "#d#L" + i + "##i" + group[i].itemid + ":##z" + group[i].itemid + "# x " + group[i].itemnum + "#l\r\n";
            }
            pos = npc.meFlip().askMenu(txt);

            var group = G_ware(false, sel);
            txt = "請輸入你想取出的數量\r\n\r\n";
            txt += "#i" + group[pos].itemid + ":##z" + group[pos].itemid + "# 倉庫數量 : " + group[pos].itemnum + "\r\n";
            num = npc.meFlip().minNum(1).maxNum(group[pos].itemnum).defNum(1).askNumber(txt);
            var group = G_ware(false, sel);
            if (parseInt(group[pos].itemnum) - num > 0) {
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+-" + num + " WHERE `id` = " + group[pos].id + ";";
            } else {
                var sql = "DELETE FROM `marin_warehouse` WHERE `id` = " + group[pos].id + ";";

            }
            db.update(sql);
            stage.gainItem(group[pos].itemid, num);
            stage.dropAlertNotice("領取成功");
            break;
    }
}


function G_ware(ver, type) {
    switch (ver) {
        case true:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `cid` = '" + stage.getCharacterId() + "' AND `type` = '" + type + "' AND `stat` = '" + 0 + "' LIMIT 0,1000;";
            break;
        case false:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `aid` = '" + stage.getAccountId() + "' AND `type` = '" + type + "' AND `stat` = '" + 1 + "' LIMIT 0,1000;";
            break;
    }
    var ret = db.select(sql);
    var A = [];
    for (var i in ret) {
        var B = [];
        B['id'] = ret[i].get("id");
        B['aid'] = ret[i].get('aid');
        B['aname'] = ret[i].get('aname');
        B['cid'] = ret[i].get('cid');
        B['cname'] = ret[i].get('cname');
        B['type'] = ret[i].get('type');
        B['itemid'] = ret[i].get('itemid');
        B['itemnum'] = ret[i].get('itemnum');
        A.push(B);
    }
    return A;
}

function Insert(ver, type, itemid, num) {
    switch (ver) {
        case true:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `cid` = '" + stage.getCharacterId() + "' AND `type` = '" + type + "' AND `itemid` = '" + itemid + "' AND `stat` = '" + 0 + "' LIMIT 0,1;";
            var ret = db.select(sql);
            if (ret.length <= 0) {
                var sql = "INSERT INTO `marin_warehouse`(`cid`, `cname`, `type`, `itemid`, `itemname`, `itemnum`, `stat`) VALUES (" + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + type + ", " + itemid + ", '" + util.getItemName(itemid) + "', " + num + ",0);";
                db.insert(sql);
            } else {
                var sid = ret[0].get("id");
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+" + num + " WHERE `id` = " + sid + ";";
                db.update(sql);
            }
            break;
        default:
            var sql = "SELECT * FROM `marin_warehouse` WHERE `aid` = '" + stage.getAccountId() + "' AND `type` = '" + type + "' AND `itemid` = '" + itemid + "' AND `stat` = '" + 1 + "' LIMIT 0,1;";
            var ret = db.select(sql);
            if (ret.length <= 0) {
                var sql = "INSERT INTO `marin_warehouse`(`aid`, `aname`, `cid`, `cname`, `type`, `itemid`, `itemname`, `itemnum`, `stat`) VALUES (" + stage.getAccountId() + ", 'NULL'," + stage.getCharacterId() + ", '" + stage.getCharacterName() + "', " + type + ", " + itemid + ", '" + util.getItemName(itemid) + "', " + num + ",1);";
                db.insert(sql);
            } else {
                var sid = ret[0].get("id");
                var sql = "UPDATE `marin_warehouse` SET `itemnum` = itemnum+" + num + " WHERE `id` = " + sid + ";";
                db.update(sql);
            }
            break;
    }
}
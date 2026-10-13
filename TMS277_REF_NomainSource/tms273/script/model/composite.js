module.exports = {
    0: function (npc, stage) {
        let icon = [
            ["三角", "#fUI/StatusBar.img/base/iconMemo#"],
            ["獎杯", "#fUI/UIAchievement.img/achievement/pages/main/achievementForm/basic/difficultyIcon/unique#"],
            ["王冠", "#fUI/GuildMark/Mark/Etc/00009023/11#"],
            ["大錘", "#fEffect/CharacterEff.img/MeisterEff/Equipment/10#"],
            ["翅膀", "#fEffect/ItemEff.img/1102982/effect/proneStab/1#"],
            ["奔跑", "#fEffect/ItemEff.img/1103020/effect/move/1#"],
            ["翅膀", "#fEffect/ItemEff.img/1102982/effect/default/4#"]
        ]
        let title = [['#r消耗欄', 2, true], ['#r設置欄', 3, true], ['#r其他欄', 4, true], ['#r特殊欄', 5, true]];//true=開啟疊加 false=禁止疊加
        let prohibit = [2048717];//禁止重疊的物品加入到這裏
        let txt = "\t\t\t #d" + icon[1][1] + " 重疊中心 " + icon[1][1] + "\r\n\r\n";
        txt += " #d" + Series(1) + "　#b整理道具重疊 ! 數量類型物品都可以進行重疊\r\n";
        txt += " #d" + Series(2) + "　#b但是限製了重疊的數量 不能超過 #r5000 #d類型如下\r\n";
        txt += " #d" + Series(3) + "　#b [ #r消耗欄 ] [ #r設置欄 ] [ #r裝飾欄 ] [ #r其他欄 ]\r\n\r\n";
        for (let i in title) {
            if (!title[i][2]) continue;
            txt += "#L" + i + "#" + icon[0][1] + " " + title[i][0] + "#l ";
        }
        txt += "\r\n ";
        let sel = npc.meFlip().askMenu(txt);

        txt = "\t\t\t #d" + icon[1][1] + " 重疊中心 " + icon[1][1] + "\r\n\r\n";
        txt += " #d" + Series(1) + "　#b整理道具重疊 ! 數量類型物品都可以進行重疊\r\n";
        txt += " #d" + Series(2) + "　#b但是限製了重疊的數量 不能超過 #r9999 #d類型如下\r\n";
        txt += " #d" + Series(3) + "　#b [ #r消耗欄 ] [ #r設置欄 ] [ #r裝飾欄 ] [ #r其他欄 ]\r\n\r\n";
        txt += "\t\t　#b確定要重疊　" + title[sel][0] + "#b　的物品嗎?\r\n\r\n ";
        npc.meFlip().next().say(txt);

        txt = "\t\t\t #d" + icon[1][1] + " 重疊中心 " + icon[1][1] + "\r\n\r\n";
        let Group = [];
        for (let i = 1; i <= 128; i++) {
            let Equip = stage.getItemBySlot(title[sel][1], i);
            if (Equip == null) continue;
            if (prohibit.indexOf(Equip['itemId']) > -1) continue;
            let TemporaryGroup = [];
            TemporaryGroup['position'] = i;
            TemporaryGroup['item'] = Equip['itemId'];
            TemporaryGroup['quantity'] = Equip['quantity'];
            Group.push(TemporaryGroup);
        }
        let Rank = union(Group);
        for (let i in Rank) {
            for (let u = 0; u <= 128; u++) {
                let uEquip = stage.getItemBySlot(title[sel][1], u);
                if (uEquip == null) continue;
                if (Rank[i].position === u) continue;
                if (Rank[i].quantity > 9999) continue;
                if (uEquip['itemId'] === Rank[i].item) {
                    stage.removeItemBySlot(title[sel][1], u);
                }
            }
            if (Rank[i].quantity > 9999) {
                txt += "　" + icon[0][1] + "#d　超出重疊範圍 ! 　#b#z" + Rank[i].item + "#\r\n";
                continue;
            }
            Equip = stage.getItemBySlot(title[sel][1], Rank[i].position);
            Equip['quantity'] = Rank[i].quantity;
            stage.updateItemBySlot(title[sel][1], Rank[i].position);
            txt += "　" + icon[0][1] + "#r　成功重疊物品 ! 　#g#z" + Rank[i].item + "#\r\n";
        }
        txt += "\r\n";
        txt += "　" + icon[0][1] + "　#r恭喜..重疊結束 \r\n";
        npc.meFlip().say(txt);
		return;
    },
    13: function (npc, stage) {
        let txt = "\t\t\t\t\t#r萌獸進化#b\r\n\r\n";
        txt += "需進化的萌獸必須在背包內 (#r僅限 SS 級別以下 #b)\r\n";
        txt += "進化時將消耗 #r100億 #b楓幣\r\n";
        txt += "\r\n";
        if (npc.meFlip().askYesNo(txt) !== 1) return;

        let judge = false;
        txt = "< #b排序位置 1 - 128 > #r進化消耗 100 億楓幣#k\r\n";
        for (let i = 1; i <= 128; i++) {
            let Equip = stage.getItemBySlot(2, i);
            if (Equip == null) continue;
            if (Equip['familiar'] <= 0) continue;
            if (Equip['level'] >= 4) continue;
            let MFname = (Equip['grade'] === 1 ? "#d特殊" : Equip['grade'] === 2 ? "#b稀有" : Equip['grade'] === 3 ? "#b罕見" : Equip['grade'] === 4 ? "#r傳說" : "#d普通")
            txt += "#L" + i + "##i" + Equip['itemId'] + "# [ " + MFname + "#k ]#l　";
            judge = true;
        }
        if (!judge) {
            txt += "\r\n\t\t#r真可惜..你的背包內沒有萌獸...!";
            npc.meFlip().say(txt);
            return;
        }
        let url = npc.meFlip().askMenu(txt);
        txt = "\r\n";
        Equip = stage.getItemBySlot(2, url);
        txt += "確認進化 #i" + Equip['itemId'] + "# 所在位置 [ " + url + " ] 的萌獸嗎?\r\n";
        if (npc.meFlip().askYesNo(txt) !== 1) return;

        if (!stage.hasMesos(100 * 1E8)) {
            npc.meFlip().say("真可惜...你沒有 100 億楓幣");
            return;
        }
        stage.loseMesos(100 * 1E8);
        Equip['grade'] = 4;
        Equip['level'] = 5;
        stage.updateItemBySlot(2, url);
        npc.meFlip().say("恭喜..進化成功");
    }
}

function union(arr) {
    arr = arr || [];
    var tmp = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        var obj = arr[i];
        if (obj.item in tmp) {
            tmp[obj.item].quantity += obj.quantity;
        } else {
            tmp[obj.item] = obj;
        }
    }

    var result = [];
    for (var key in tmp) {
        result.push(tmp[key]);
    }

    return result;
}

function Series(int) {
    return "#fUI/Basic/LevelNo/" + int + "#";
}

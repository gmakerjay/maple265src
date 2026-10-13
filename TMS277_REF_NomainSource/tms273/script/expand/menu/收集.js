/* 腳本定製 技術顧問 50009219 */


var Icon = "#fUI/ChatEmoticon.img/1004/icon#";
var IconA = "#fUI/ChatEmoticon.img/1003/icon#";
var IconB = "#fUI/ChatEmoticon.img/1002/icon#";
var IconC = "#fUI/ChatEmoticon.img/1007/icon#";
var IconD = "#fUI/ChatEmoticon.img/1001/icon#";
var IconI = "#fUI/ChatEmoticon.img/1000/icon#";
var IconF = "#fUI/EventShop.img/AllianceShop/GradeBuyer/3#";
var IconE = "#fUI/EventShop.img/AllianceShop/GradeBuyer/4#";
var IconG = "#fUI/EventShop.img/AllianceShop/GradeBuyer/1#";
var IconH = "#fUI/EventShop.img/AllianceShop/GradeBuyer/0#";
var xueren = "#fMap/MapHelper.img/weather/5000days/0#";//白雪人
var xueren1 = "#fMap/MapHelper.img/weather/5000days/1#";
var xueren2 = "#fMap/MapHelper.img/weather/5000days/2#";
var xueren3 = "#fMap/MapHelper.img/weather/5000days/3#";
var huahua = "#fMap/MapHelper.img/weather/rose/0#";
var tz15 = "#fCharacter/PetEquip/01802554.img/info/iconRaw#"; //紅星
var 星星1 = "#fEffect/ItemEff.img/1102987/effect/default/0#";//品克繽環
var 小雞 = "#fEffect/CharacterEff/1112908/0/1#";
var tz16 = "#fCharacter/PetEquip/01802555.img/info/iconRaw#"; //紅星
var tz17 = "#fCharacter/PetEquip/01802553.img/info/iconRaw#"; //紅星
var tz18 = "#fCharacter/PetEquip/01802560.img/info/iconRaw#"; //紅星
let monster = require('constant/model_monster');
let ismonster = [];
execute();

function execute() {
    let txt = "\t\t" + tz15 + "#e#d 星語谷野外BOSS中心 " + tz15 + "\r\n\r\n#n#r";
    txt += "#r活動規則：#l\r\n";
    txt += "擊殺野外BOSS，完成的的種類越多排名越高，每周日可以領取當周排名獎勵：#l\r\n";
    txt += "#L0#" + tz16 + " 野外BOSS懸賞中心#l";
    txt += "#L1# 查詢個人擊殺信息 " + tz16 + "#l\r\n\r\n";
    txt += "#L2#" + tz17 + "#b 查詢本周擊殺排行#l";
    txt += "#L3# 領取上周排行獎品 " + tz17 + "#l\r\n\r\n";
    txt += "\t\t\t#r#L4#" + tz18 + " 每周獎品清單 " + tz18 + "#l\r\n\r\n";
    let sel = npc.askMenu(txt);

    switch (sel) {
        case 0:
            if (stage.getChannelId() !== 1) {
                npc.meFlip().say("請前往 1 頻道進行挑戰！");
                return;
            }
            let event = ctx.getEvent('alice_server_monster');
            for (let i in monster) {
                ismonster[i] = event.getVariable('monster_' + i);
            }

            while (true) {
                let txt = "\r\n";
                for (let i in monster) {
                    if (ismonster[i] == "true") {
                        txt += "#b#L" + i + "#" + marinstring(" ", 12, monster[i].name.toString()) + " #g#e■#k#n#l\r\n";
                    } else {
                        txt += "#b#L" + i + "#" + marinstring(" ", 12, monster[i].name.toString()) + " #r#e■#k#n";
                        txt += "[ #r" + marinstring(" ", 12, (String(event.getVariable('name_' + i))).toString()) + "#k ]　#d倒計時 #b" + formatCountdown(Number(event.getVariable('date_' + i))) + "#k";
                        txt += "#l\r\n";
                    }
                }
                let sel_0 = npc.meFlip().askMenu(txt);
                if (ismonster[sel_0] == "false") {
                    txt = "\r\n";
                    txt += "當前野圖怪物已擊殺！請等待倒計時結束再挑戰\r\n";
                    npc.meFlip().say(txt);
                } else {
                    if (npc.meFlip().askYesNo("是否立即去挑戰當前野生頭目？")) {
                        let car_count = event.getMap(monster[sel_0].map).getPlayerCount();
                        if (car_count > 0) {
                            npc.meFlip().say("抱歉..該圖已有玩家正在挑戰了!");
                            return;
                        }
                        ctx.makeEvent("alice_monster", false, [stage, monster[sel_0].map, [sel_0, monster[sel_0].hp, monster[sel_0].xy, monster[sel_0].reward.equip, monster[sel_0].reward.specequip]]);
                    }
                }
            }
            break;

        case 1:
            Group = G_collect(stage.getCharacterId());
            txt = "\t\t#v3996147##e#d 星語谷野外BOSS中心 #v3996145#\r\n\r\n#n";
            txt += "　#v4000429##b 下列所示玩家自身收集信息\r\n\r\n";
            if (Group.length > 0) {
                for (i in Group) {
                    txt += "" + Group[i].itname + " x " + Group[i].sum + "\r\n";
                }
            } else {
                txt += "#e#r抱歉..你並沒有收集任何物品\r\n";
            }
            npc.say(txt);
            break;

        case 2:
            Group = G_Week(true);//true = 本周 false = 上周
            txt = "\t\t#v3996147##e#d 星語谷野外BOSS中心 #v3996145#\r\n\r\n#n";
            txt += "#d\t排序\t\t角色\t\t\t上繳數量\r\n";
            if (Group.length <= 0) {
                player.dropAlertNotice("暫無排名信息\r\n\r\n你還未上交齊 15 種不同材料");
                return;
            }
            for (i in Group) {
                txt += " #L" + Group[i].cid + "#" + Con(parseInt(Number(i) + 1)) + "\t\t";
                txt += "#b" + marinstring(" ", 20, String(Group[i].cname).toString())
                txt += "#r" + Group[i].count
                txt += "#l\r\n";
            }
            pos = npc.askMenu(txt);

            txt = "\r\n\t\t\t#v4034142##r 本周排行中心 #k#v4034142#\r\n\r\n";
            Group = G_collect(pos);
            txt += "　" + Series(1) + "#b 下列所示屬玩家 : #r" + Group[0].cname + " #r\r\n\r\n";
            for (i in Group) {
                txt += "#i" + Group[i].itid + "# ";
            }
            npc.say(txt);
            break;

        case 3:
            stage.runScript('expand/menu/領獎功能/野外BOSS排行')
            break;

        case 4:
            txt = "\r\n\t\t\t #v3996147##r#e 每周獎品清單 #k#v3996145#\r\n\r\n#n";
            txt += "\t\t\t\t\t\t" + Con(1) + "#r#e豪華真實之力 100個+1W抵用+10E金幣\r\n ";
            txt += "\t\t\t\t\t #r#e勇奪頭彩\r\n";
            txt += "\t\t\t   " + Con(2) + " " + Con(3) + " " + Con(4) + " " + Con(5) + "#b豪華真實之力 50個+5000抵用+5E金\r\n";
            txt += "\t\t\t\t  激流勇進\r\n";
            txt += "\t\t\t " + Con(6) + " " + Con(7) + " " + Con(8) + " " + Con(9) + " " + Con(10) + "#g豪華真實之力 20個+5000抵用+5E金\r\n";
            txt += "\t\t\t\t  #g麥芒針鋒\r\n";
            // txt += " 　 " + Con(11) + " " + Con(12) + " " + Con(13) + " " + Con(14) + " " + Con(15) + " " + Con(16) + " " + Con(17) + " " + Con(18) + " " + Con(19) + " " + Con(20) + "\r\n#v2614079#*10";
            // txt += "\t\t\t\t  #d積極向上\r\n\r\n";
            // txt += "\t\t\t#e#r21- #g100#r 安慰獎 - \r\n#k#n";
            npc.say(txt);
            break;
    }
}

function G_Week(Vis) {
    if (Vis) {
        var ret = db.select("SELECT charid, charname, SUM(point) AS count FROM zsf_collect WHERE lasttime >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) AND lasttime < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY) GROUP BY charid, charname ORDER BY count DESC LIMIT 1000; ");
    } else {
        var ret = db.select("SELECT SUM(point) AS count, `charid`, `charname` FROM `zsf_collect` WHERE YEARWEEK(date_format(lasttime, '%Y-%m-%d')) = YEARWEEK(now()) - 1 GROUP BY `charid` ORDER BY `count` DESC LIMIT 0, 1000;");
    }
    Collect = [];
    for (let i in ret) {
        Sinle = ret[i];
        TemporaryGroup = [];
        TemporaryGroup['count'] = Sinle.get('count');
        TemporaryGroup['cid'] = Sinle.get('charid');
        TemporaryGroup['cname'] = Sinle.get('charname');
        Collect.push(TemporaryGroup);
    }
    return Collect;
}

function G_collect(id) {
    var ret = db.select("SELECT id, charid, charname, item, itemname, sum(points) as sum FROM `zsf_collect` WHERE `charid` = '" + id + "' GROUP BY `itemname` LIMIT 1000;");
    var Collect = [];
    for (i in ret) {
        var Sinle = ret[i];
        var TemporaryGroup = [];
        TemporaryGroup['id'] = Sinle.get('id');
        TemporaryGroup['cid'] = Sinle.get('charid');
        TemporaryGroup['cname'] = Sinle.get('charname');
        TemporaryGroup['itid'] = Sinle.get('item');
        TemporaryGroup['itname'] = Sinle.get('itemname');
        TemporaryGroup['sum'] = Sinle.get('sum');
        TemporaryGroup['time'] = Sinle.get('lasttime');
        Collect.push(TemporaryGroup);
    }
    return Collect;
}

function formatCountdown(endTimestamp) {
    let now = new Date().getTime();
    let diff = endTimestamp - now;

    if (diff <= 0) {
        return "";
    } else if (diff >= 60 * 1000) {
        return marinstring(" ", 3, Math.floor(diff / 60000).toString()) + "#d 分鐘";
    } else {
        return marinstring(" ", 3, Math.floor(diff / 1000).toString()) + "#d 秒";
    }
}

function marinstring(charToFill, totalLength, originalString) {
    const lengthOfDoubleByteChars = (originalString.match(/[\u4E00-\u9FA5]/g) || []).length;
    const length = originalString.length + lengthOfDoubleByteChars;
    const charactersToFill = charToFill.repeat(totalLength - length);
    return originalString + charactersToFill;
}


function Series(int) {
    return "#fUI/Basic/LevelNo/" + int + "#";
}

function Con(x) {
    return "#fUI/UIWindow8/HundredShooting/number/" + x + "#";
}
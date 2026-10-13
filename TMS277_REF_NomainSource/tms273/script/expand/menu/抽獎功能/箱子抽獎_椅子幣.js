/**
 * 抽獎
 *
 * 機制說明： 抽獎首先會生成0-100的隨機數，獎品裏面幾率大於這個數的才會進入最終獎池，最終獲得的獎品將在最終獎池裡面隨機獲得一個。
 *
 **/
const chairList = require('constant/chair');

let types = 4009485;// 1=點券 2=抵用 3=金幣 4=餘額 物品ID=材料抽獎（梅花7）
let needNum = 1;//需要數量
let title = "";
let haveMoney = 0;

//獎品
let laba = 100;//公告喇叭需要的幾率

const listShow = [
    [3010631, '金龍魚椅子', '特級'],
    [3018074, '黃金樹', '特級'],
    [3010845, '小金豬椅子', '特級'],
    [3018308, '黃金豬椅子', '特級'],
    [3018363, '星源號起航椅子', '一級'],
    [3018182, '（限定）喵星許願瓶椅子', '一級'],
    [3018614, '冰封雪龍椅子', '一級'],
    [3016209, '熊娃娃櫥窗椅子', '一級'],
    [3012037, '永恆真愛椅子（雙人版）', '一級'],
    [3015798, '世界最強戰鬥力椅子', '一級'],
    [3014020, '決戰巔峰者', '一級'],
    [3018245, '企鵝王滑梯椅子', '一級'],
    [3018196, '動物朋友大逃亡椅子', '一級'],
    [3018052, '集裝箱咖啡廳椅子', '一級'],
    [3018538, '阿黛爾的朋友們和舞會椅子（維羅妮卡）', '一級'],
    [3018758, '完美戰術性接力椅子 Ver.3 (90天)', '一級'],
    [3012039, '銀冬水晶樹雙人椅子', '一級'],
    [3015897, '金幣噴泉椅子', '一級'],
    [3015972, '小樹滑冰椅子', '一級'],
    [3018528, '阿黛爾的朋友們和舞會椅子（傑羅姆）', '一級'],
    [3018757, '偉大戰術性接力椅子 Ver.3 (90天)', '一級'],
    [3018381, '黑檀木椅子', '一級'],
    [3018022, '月光城堡椅子', '一級'],
    [3018613, '一起去看流星雨椅子', '一級'],
    [3015754, '曉月光斬椅', '一級'],
    [3018464, '完美戰術性接力椅子Ver.2', '一級'],
    [3015885, '傾向椅子_領導力_4', '一級'],
    [3018637, '喵星人罐頭椅子', '一級'],
    [3018896, '傳說回歸椅', '一級'],
    [3016207, '狗狗的繽紛泡泡多人椅子', '一級'],
    [3018599, '聯盟競技場第1季椅子：选手', '一級'],
    [3016100, '青春樂隊！大家的演唱會', '一級'],
    [3016219, '水上滑滑梯多人椅子', '一級'],
    [3018197, '南瓜糖果盒椅子', '一級'],
    [3018227, '登上冰淇淋冰川椅子', '一級'],
    [3015813, '玻璃之城椅子', '一級'],
    [3015836, '冒險王魅力椅(五段)', '一級'],
    [3018257, '完美戰術性接力椅子', '一級'],
    [3015193, '被馴服的鯨魚椅子', '一級'],
    [3018268, '冰雕天馬椅子', '一級'],
    [3018837, '坐火車飛馳椅子', '一級'],
    [3018333, '武陵高手品克繽椅', '一級'],
    [3015051, '巨無霸國際巨星', '一級'],
    [3018806, '死亡之刃祭壇', '一級'],
    [3015760, '新年森林晚會椅子', '一級'],
    [3018167, '白色之矛椅子', '二級'],
    [3016212, '月影椅子', '二級'],
    [3016222, '螢光仲夏夜椅子', '二級'],
    [3018141, '阿布魯極光椅', '二級'],
    [3018659, '冬日銀鈴鐺', '二級'],
    [3018754, '月夜行車椅子', '二級'],
    [3018286, '超級巨星品克繽椅子', '二級'],
    [3018440, '午夜銀河', '二級'],
    [3018365, '沙灘砸西瓜椅子', '二級'],
    [3015439, '木偶戲椅子', '二級'],
    [3018592, '滿園秋意椅子', '二級'],
    [3015842, '宇宙光線槍椅子', '二級'],
    [3018058, '今年我做主！', '二級'],
    [3018179, '精靈屋', '二級'],
    [3018384, '光與電的對決', '二級'],
    [3015867, '靈魂的重量椅子', '二級'],
    [3018045, '光明神座', '二級'],
    [3018230, '黑魔法師椅子', '二級'],
    [3015637, '路西德的花', '二級'],
    [3018316, '不萊梅樂隊椅子', '二級'],
    [3016215, '貓咪樂園多人椅子', '二級'],
    [3018844, '悠遠旋律', '二級'],
    [3018656, '銀河玻璃瓶椅子', '二級'],
    [3010838, '冰城堡椅子', '二級'],
    [3015648, '怦然心動椅子(女)', '二級'],
    [3018894, '里斯托尼亞噴泉椅子', '二級'],
    [3018500, '霧提督帆船椅子', '二級'],
    [3018199, '路西德蹺蹺板椅子', '二級'],
    [3015854, '怦然心動椅子(男)', '二級'],
    [3018585, '粉色芒草捉迷藏椅子', '二級'],
    [3015857, '冰凍星球椅', '二級'],
    [3018349, '輪滑椅子：頂級', '二級'],
    [3010832, '太陽椅子', '二級'],
    [3015855, '怦然心動椅子(女)', '二級'],
    [3018587, '冒險島進行曲椅子', '二級'],
    [3018802, '萬有引力定律發現椅子', '二級'],
    [3018860, '狐仙休息椅子', '二級'],
    [3015433, '冰雪企鵝王', '二級'],
    [3018195, '巨大夜光鵝椅子', '二級'],
    [3015801, '飛躍之翼椅子', '二級'],
    [3018173, '迷你水晶花園椅', '二級'],
    [3018258, '海上明燈13號', '二級'],
    [3018124, '快槍手椅子（1天）', '二級'],
    [3016217, '冥府巴士多人椅子', '二級'],
    [3016204, '跳跳蹦床多人椅子', '二級'],
    [3016227, '冰淇淋販售車多人椅子', '二級'],
    [3016211, '拉麵屋多人椅子', '二級'],
    [3016229, '反轉星球多人椅子', '二級'],
    [3016224, '晾衣服的好日子多人椅子', '二級'],
    [3016228, '松球床多人椅子', '二級'],
    [3019172, '萌萌龍椅子', '龍'],
    [3017105, '春節龍椅子', '龍'],
    [3019114, '傳奇青龍椅', '龍'],
    [3010539, '紅色龍椅', '龍'],
    [3010917, '紅色龍椅', '龍'],
    [3010429, '紅色龍椅子', '龍'],
    [3010436, '邪惡黑龍椅子', '龍'],
    [3010046, '紅龍椅', '龍'],
    [3010546, '邪惡黑龍椅子', '龍'],
    [3010299, '小幼龍椅子', '龍'],
    [3010540, '藍色龍椅', '龍'],
    [3010918, '藍色龍椅', '龍'],
    [3010430, '藍色龍椅子', '龍'],
    [3010047, '藍龍椅', '龍'],
    [3010137, '神龍椅子', '龍'],
    [3010311, '黑龍椅子', '龍'],
    [3018078, '豌豆馬卡龍椅子', '龍'],
    [3018816, '机械發條龍椅子', '龍'],

];
const typeList = [
    ['特級椅子', '特級'],
    ['一級椅子', '一級'],
    ['二級椅子', '二級'],
];

function start() {


    while (true) {

        title = "";
        haveMoney = parseInt(stage.getItemQuantity(types));
        let str = "#b┏              #fUI/GuildMark/Mark/Etc/00009023/10#   #r#e椅子幣轉蛋#b#n   #fUI/GuildMark/Mark/Etc/00009023/10#          ┓#k\r\n\r\n";
        str += ("#b擁有椅子幣 #v" + types + "##r " + haveMoney + " #b個.\r\n每次需要消耗 #r" + needNum + " #b個\r\n#v4001680#產出方式：#r雜貨商店，跳跳，控制之神等")
        str += "\r\n#r椅子收藏為賬號為單位(全角色可消耗一定金幣取出):"
        str += "\r\n#k已收藏過的(普通級)椅子不會在抽到\r\n"
        str += "\r\n#e#k獎品展示(普通級椅子不展示):\r\n"


        for (let i in typeList) {
            let typeName = typeList[i][0];
            let level = typeList[i][1];
            str += `\r\n#e#r${typeName}:\r\n`
            let itemList = listShow.filter(item => {
                return item[2] == level
            })
            for (let j in itemList) {
                str += "#v" + itemList[j][0] + "#"
            }
        }


        //str += "\r\n#k如果你足夠幸運，還能抽到2-3個箱子，是否抽獎？"
        let YN = npc.askYesNo(str);
        if (YN == 1) {
            let canGet = false;
            if (haveMoney >= needNum && stage.canHold(3016224, 1)) {
                stage.loseItem(types, needNum);
                canGet = true;
            }
            if (canGet) {
                // 獲取玩家已收藏的椅子
                let collectedItems = db.select(`SELECT 收藏_椅子圖鑑表_收集.itemid
                                                FROM 收藏_椅子圖鑑表_收集
                                                WHERE 收藏_椅子圖鑑表_收集.accountid = ${stage.getAccountId()}`);

                let collectedItemIds = [];
                for (let i in collectedItems) {
                    collectedItemIds.push(collectedItems[i].get('itemid'));
                }

                // = collectedItems.map(item => item.get('itemid'));
                // let collectedItemIdsList = collectedItemIds.length > 0 ? `AND 收藏_椅子圖鑑表.itemid NOT IN (${collectedItemIds.join(',')})` : '';


                //抽獎
                let highRand = 0.03;
                if (stage.isGm()) {
                    // highRand = 1;
                }
                // let listReal = [];
                let highFlg = false;
                // let highFlg = Math.random() < highRand;
                // if (highFlg) {
                // let setb = new Set(collectedItemIds);
                let listReal = chairList.list.filter(item => !collectedItemIds.includes(item)); 
                // let listReal = chairList.list.filter(item => !setb.has(item));

                // ['一級椅子', '一級'],
                // ['二級椅子', '二級'],
                // listReal = npc.customSqlResult(`SELECT 收藏_椅子圖鑑表.*
                // FROM 收藏_椅子圖鑑表
                // LEFT JOIN 收藏_椅子圖鑑表_收集 ON 收藏_椅子圖鑑表.itemid = 收藏_椅子圖鑑表_收集.itemid
                //     AND 收藏_椅子圖鑑表_收集.accountid = ${player.getAccountId()}
                // WHERE 收藏_椅子圖鑑表.level IN ('一級', '二級','普通1', '普通2', '普通3', '普通4') ${collectedItemIdsList}`);
                //   AND 收藏_椅子圖鑑表_收集.itemid IS NULL;`);
                // } else {
                //     let normal = ['一級', '二級','普通1', '普通2', '普通3', '普通4'];
                //     let randomElement = normal[Math.floor(Math.random() * normal.length)];

                //     listReal = npc.customSqlResult(`SELECT 收藏_椅子圖鑑表.*
                //     FROM 收藏_椅子圖鑑表
                //     WHERE 收藏_椅子圖鑑表.level = '${randomElement}' ${collectedItemIdsList}`);
                // } 
                if (listReal.length == 0) {

                    stage.gainItem(types, 1);
                    npc.say("椅子轉蛋機有點疲憊，請重新搖獎");
                    return;
                }


                let finalItemInfo = listReal[Math.floor(Math.random() * listReal.length)];
                let can = false;
                while (!can) {
                    try {
                        util.makeItem(finalItemInfo, 1)
                        can = true;
                    } catch (e) {
                        finalItemInfo = listReal[Math.floor(Math.random() * listReal.length)];
                    } 
                }

                // if (finalItems[random1][2] <= laba)
                //     player.gainGachaponItem("[" + title + "初級名椅錄]", finalItems[random1][0], finalItems[random1][1], 1);
                // else
                try {

                    // player.showSystemMessage(finalItemInfo);
                    let finalReward = util.makeItem(finalItemInfo, 1);
                    finalReward.setAttribute(8);
                    stage.gainItem(finalReward);
                    插入图鉴收集表(finalItemInfo, highFlg);
                    let levelResult = db.select(`select *
                                                 FROM 收藏_椅子圖鑑表
                                                 where itemid = ${finalItemInfo}`);
                    // player.showSystemMessage(levelResult);
                    levelResult = levelResult[0]
                    switch (levelResult.get('level')) {
                        case '特級':
                        case '一級':
                            let str = `[${levelResult.get('level')}椅子獎池]: 恭喜玩家 <` + stage.getCharacterName() + ">獲得一級椅子 " + finalReward.getCharacterName() + "！！！"
                            sh.broadcastWeatherEffectNotice(299, str, 10000);
                        case '二級':
                            util.broadcastGachaponMsg(`[${stage.getCharacterName()}]`, `我從[${levelResult.get('level')}椅子池]中獲得了<${{}}>，大家一起恭喜我吧!`, finalReward);
                            break;
                    }
                    npc.say(`抽取成功！獲得#r${levelResult.get('level').substring(0, 2)}椅子\r\n#b#v${levelResult.get('itemid')}:i##z${levelResult.get('itemid')}:i#` + " x " + 1);
                } catch (e) { 
                    stage.showSystemMessage(e)
                    stage.gainItem(types, 1);
                    npc.say("椅子轉蛋機有點疲憊，請重新搖獎");
                }
            } else {
                npc.say("您的" + title + "不足或背包不足！無法抽取");
            }

        }
    }
}

function 插入图鉴收集表(itemid, highFlg) {
    if (highFlg) {
        let checkResult = db.select(`select * from 收藏_椅子圖鑑表_收集 where itemid = ${itemid} and accountid = ${stage.getAccountId()}`);
        if (checkResult.length > 0) {
            return;
        }
    }
    let sql = `insert into 收藏_椅子圖鑑表_收集(itemid, accountid, paytime) values(${itemid},${stage.getAccountId()},now())`;
    db.insert(sql);
}
start();
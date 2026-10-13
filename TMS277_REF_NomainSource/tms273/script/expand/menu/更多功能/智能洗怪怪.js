const list1 = [
    [40001, '力量:+20'],
    [40002, '敏捷:+20'],
    [40003, '智力:+20'],
    [40004, '運氣+20'],
    [40005, '最大血量:+300'],
    [40006, '最大魔量:+300'],
    [40007, '敏捷 : +1'],
    [40008, '敏捷 : +1'],
    [40009, '移動速度:+10'],
    [40010, '跳躍力:+10'],
    [40011, '物理攻擊力:+20'],
    [40012, '魔法攻擊力:+20'],
    [40013, '防禦力:+300'],
    [40014, '防禦力:+300'],
    [40015, '爆擊率:+20%'],
    [40016, '傷害:+20%'],
    [40017, '全屬性:+20'],
    [40018, '站立時4秒內恢復血量20'],
    [40019, '站立時4秒內恢復魔量20'],
    [40020, '力量:+14%'],
    [40021, '敏捷:+14%'],
    [40022, '智力:+14%'],
    [40023, '運氣+14%'],
    [40024, '最大血量:+14%'],
    [40025, '最大魔量:+14%'],
    [40026, '敏捷 : +1%'],
    [40027, '敏捷 : +1%'],
    [40028, '物理攻擊力:+14%'],
    [40029, '魔法攻擊力:+14%'],
    [40030, '防禦力:+14%'],
    [40031, '防禦力:+14%'],
    [40032, '攻擊時有3%機率恢復血量50'],
    [40033, '攻擊時有3%機率恢復魔量50'],
    [40034, '攻擊時有12%機率發動3級的中毒效果'],
    [40035, '攻擊時有12%機率發動3級的暈眩效果'],
    [40036, '攻擊時有12%機率發動3級的緩慢效果'],
    [40037, '攻擊時有12%機率發動3級的暗黑效果'],
    [40038, '攻擊時有12%機率發動3級的冰結效果'],
    [40039, '攻擊時有12%機率發動3級的封印效果'],
    [40040, '攻擊時無視怪物的防禦力45%'],
    [40041, '按角色攻擊力的90%來追加怪怪攻擊力'],
    [40042, '按角色全屬性的90%來追加怪怪攻擊力'],
    [40043, 'BUFF技能持續時間增加50%。'],
    [40044, '被動技能等級增加2'],
];

const list2 = [
    [40001, '力量:+20'],
    [40002, '敏捷:+20'],
    [40003, '智力:+20'],
    [40004, '運氣+20'],
    [40005, '最大血量:+300'],
    [40006, '最大魔量:+300'],
    [40007, '敏捷 : +1'],
    [40008, '敏捷 : +1'],
    [40009, '移動速度:+10'],
    [40010, '跳躍力:+10'],
    [40011, '物理攻擊力:+20'],
    [40012, '魔法攻擊力:+20'],
    [40013, '防禦力:+300'],
    [40014, '防禦力:+300'],
    [40015, '爆擊率:+20%'],
    // [40016, '傷害:+20%'],
    [40017, '全屬性:+20'],
    [40018, '站立時4秒內恢復血量20'],
    [40019, '站立時4秒內恢復魔量20'],
    [40020, '力量:+14%'],
    [40021, '敏捷:+14%'],
    [40022, '智力:+14%'],
    [40023, '運氣+14%'],
    [40024, '最大血量:+14%'],
    [40025, '最大魔量:+14%'],
    [40026, '敏捷 : +1%'],
    [40027, '敏捷 : +1%'],
    [40028, '物理攻擊力:+14%'],
    [40029, '魔法攻擊力:+14%'],
    [40030, '防禦力:+14%'],
    [40031, '防禦力:+14%'],
    [40032, '攻擊時有3%機率恢復血量50'],
    [40033, '攻擊時有3%機率恢復魔量50'],
    [40034, '攻擊時有12%機率發動3級的中毒效果'],
    [40035, '攻擊時有12%機率發動3級的暈眩效果'],
    [40036, '攻擊時有12%機率發動3級的緩慢效果'],
    [40037, '攻擊時有12%機率發動3級的暗黑效果'],
    [40038, '攻擊時有12%機率發動3級的冰結效果'],
    [40039, '攻擊時有12%機率發動3級的封印效果'],
    [40040, '攻擊時無視怪物的防禦力45%'],
    [40041, '按角色攻擊力的90%來追加怪怪攻擊力'],
    [40042, '按角色全屬性的90%來追加怪怪攻擊力'],
    [40043, 'BUFF技能持續時間增加50%。'],
    [40044, '被動技能等級增加2'],
    [40016, '#r最終傷害增加 25%#k'], 
];

// if (stage.isGm()) {
//     list2 = [
//         [40007, '敏捷 : +1'],
//         [40008, '敏捷 : +1'], 
//         [40015, '爆擊率:+20%'],
//         [40030, '防禦力:+14%'],
//         [40031, '防禦力:+14%'],
//         [40045, '#r最終傷害增加 25%#k'], 
//     ];
// }
var list;
var todoList = [];

function start() {
    let str = `歡迎使用智能洗萌獸功能\r\n`;
    str += `需將怪怪卡升至SS滿經驗,並封印為怪怪卡放置在第一格,後可使用本功能\r\n`;
    str += `\r\n#L0#準備好了開始智能洗怪怪#l\r\n`;
    if (npc.askMenu(str) != 0) {
        return;
    }
    doStart()
}

function doStart() {
    let hasMf = stage.getItemQuantity(5743003);
    let item2 = stage.getItemBySlot(2, 1);
    if (!item2 || !item2.getLevel() != 5 || !item2.getGrade() != 4) {
        npc.say('第一格不是滿級萌獸');
        return;
    } 
    list = [2871658, 2871709].includes(item2.getDataId()) ? list2 : list1;
    str = `當前信息:\r\n#v${item2.getDataId()}##z${item2.getDataId()}# `;
    str += `剩餘#v5743003:i# x ${hasMf}\r\n`;
    if (todoList.length > 0) {
        str += `洗鍊目標: 至少${todoList[1]}條 ${todoList[0][1]}\r\n\r\n`;
    }
    str += `\r\n`;
    let options = [info.getOption1(), info.getOption2(), info.getOption3(), ];
    // stage.showSystemMessage(options);
    if (options[0] >= 40000) {
        str += `詞條1: ${list.find(ele => (ele[0] == options[0]))[1]}\r\n`;
    } 
    if (options[1] >= 40000) {
        str += `詞條2: ${list.find(ele => (ele[0] == options[1]))[1]}\r\n`;
    } 
    if (options[2] >= 40000) {
        str += `詞條3: ${list.find(ele => (ele[0] == options[2]))[1]}\r\n`;
    } 
    if (checkOption(options)) {
        npc.say('以滿足設定目標,無法繼續洗鍊');
        return;
    }
    str += `#L0#洗鍊一次,需要一個怪怪魔方#l\r\n`;
    if (todoList.length == 0) {
        str += `#L1#設定洗鍊目標#l\r\n`;

    }
    str += `#L2#100連洗,需要100個怪怪魔方#l\r\n`;
    let sel = npc.askMenu(str);
    switch (sel) {
        case 0:
            if (hasMf < 1) {
                npc.say('魔方不足');
                return;
            }
            stage.loseItem(5743003, 1);
            let randList = [];
            for (let i = 0; i < 3; i++) {
                let randomIndex = Math.floor(Math.random() * list.length);
                stage.showSystemMessage(list.length);
                randList.push(list[randomIndex]);
            }
            info.setOption1(randList[0][0]);
            info.setOption2(randList[1][0]);
            info.setOption3(randList[2][0]);
            item2.setFamiliarInfo(info);
            stage.updateItem(2, item2);
            stage.showSystemMessage('洗鍊成功');
            doStart();
            break;
        case 1:
            str = `可指定某詞條至少出現指定次數為洗鍊目標,請選擇目標詞條\r\n`;
            for (let i in list) {
                str += `#L${i}#${list[i][1]}#l\r\n`;
            }
            let selOption = npc.askMenu(str);
            let selOptionTimes = npc.askMenu('請指定該詞條至少出現的次數\r\n#L1#1次#l\r\n#L2#2次#l\r\n#L3#3次#l\r\n');
            todoList.push(list[selOption]);
            todoList.push(selOptionTimes);
            doStart();
            break;
        case 2:
            let resList = doTimes(100);
            if (!resList) {
                return;
            }
            stage.loseItem(5743003, resList[1]);
            info.setOption1(resList[0][0][0]);
            info.setOption2(resList[0][1][0]);
            info.setOption3(resList[0][2][0]);
            item2.setFamiliarInfo(info);
            stage.updateItem(2, item2);
            stage.showSystemMessage(`100連結束,本次消耗魔方 x ${resList[1]}`);
            doStart();
            break;
    }
}

function checkOption(options) {
    if (todoList.length == 0) {
        return false;
    }
    if (options.filter(ele => ele == todoList[0][0]).length >= todoList[1]) {
        return true;
    }
    return false;
}

function doTimes(times) {
    if (!stage.hasItem(5743003, 100)) {
        npc.say('魔方不足');
        return;
    }
    
    let randList = [];
    let doTimes = 0;
    for (let j = 0; j < times; j++) {
        doTimes++;
        randList =[];
        for (let i = 0; i < 3; i++) {
            let randomIndex = Math.floor(Math.random() * list.length);
            randList.push(list[randomIndex]);
        }
        // stage.showSystemMessage('洗鍊 ' + [randList[0][0], randList[1][0], randList[2][0]]);
        if (checkOption([randList[0][0], randList[1][0], randList[2][0]])) {
            stage.showSystemMessage('洗出來了');
            break;
        }
    } 
    return [randList, doTimes];
}
start();
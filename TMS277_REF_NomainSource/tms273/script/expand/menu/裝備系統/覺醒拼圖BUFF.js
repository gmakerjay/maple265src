let log = require('check_log')

let listPKBA = [1680563, 1680564, 1680565, 1680566, 1680567, 1680568, 1680569, 1680570, 1680571, 1680572, 1680573, 1680574];
let listPKBB = [1680587, 1680588, 1680589, 1680590, 1680591, 1680592, 1680593, 1680594, 1680595, 1680596, 1680598, 1680597];
 

function start () { 
    let info = {};
    for (let i = -1400; i >= -1411; i--) {
        let e = stage.getItemBySlot(-14, i);
        if (e) {
            let itemId = e.getItemId();
            if (listPKBA.includes(itemId)) {
                if (info['A']) {
                    info['A'] ++;
                } else {
                    info['A'] = 1;
                }
            } else if (listPKBB.includes(itemId)) {
                if (info['B']) {
                    info['B'] ++;
                } else {
                    info['B'] = 1;
                }
            }
        }
    }
    let skillA = 0;
    let skillB = 0;
    if (info['A'] && info['A'] >= 3) {
        skillA = Math.floor(info['A'] / 3) + 1;
    }
    if (info['B'] && info['B'] >= 3) {
        skillB = Math.floor(info['B'] / 3) + 1;
    }
    let skillLevel = Math.max(skillA, skillB)

    skillLevel += log.getPQLog(stage, db, '累充25000技能領取') > 0 ? 2 : 0;
    skillLevel += log.getPQLog(stage, db, '累充50000技能領取') > 0 ? 3 : 0;


   stage.changeSkillLevel(80002932, skillLevel);


    npc.say('激活成功')
    
    
     
}

start();
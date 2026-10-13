/**
 * 等級禮包
 **/
let log = require('check_log');
var tt = "#fEffect/CharacterEff/1082565/0/0#"; //餅乾兔子
// 每個階段禮包所需的等級
var condition = [150, 200, 210, 220, 230, 250, 260, 270, 300];

const list = [
    [150, "expand/menu/新人福利/等級禮包/150等級獎勵"],
    [200, "expand/menu/新人福利/等級禮包/200等級獎勵"],
    [210, "expand/menu/新人福利/等級禮包/210等級獎勵"],
    [220, "expand/menu/新人福利/等級禮包/220等級獎勵"],
    [230, "expand/menu/新人福利/等級禮包/230等級獎勵"],
    [250, "expand/menu/新人福利/等級禮包/250等級獎勵"],
    [260, "expand/menu/新人福利/等級禮包/260等級獎勵"],
    [270, "expand/menu/新人福利/等級禮包/270等級獎勵"],
	[300, "expand/menu/新人福利/等級禮包/300等級獎勵"],
]

function start() {
    let sel = "等級禮包(正在補充)，當前等級 #r" + stage.getLevel() + "\r\n";
    for (var i = 0; i < condition.length; i++) {
        if (log.getPQLog(stage, db, `${condition[i]}等級獎勵`) > 0) {
            sel += "#d#L" + (i) + "#" + tt + " [#r已領取#d]等級福利禮包 #r\t\t\t" + condition[i] + "#l\r\n";
        } else {
            sel += "#d#L" + (i) + "#" + tt + " [未領取]等級福利禮包 #r\t\t\t" + condition[i] + "#l\r\n";
        }
    }
    let selected = npc.askMenu(sel);

    stage.runScript(list[selected][1]);
}


start();
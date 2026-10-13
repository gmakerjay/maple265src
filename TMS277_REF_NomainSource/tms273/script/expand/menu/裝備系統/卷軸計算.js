function start() {
    let e = stage.getItemBySlot(1, 1);
    if (e == null) {
        npc.say("請將裝備放在物品欄第一格");
        return;
    }

    let newE = util.makeItem(e.getItemId(), 1);
    newE.setChuc(e.getChuc());
    newE.setExGradeOption(e.getExGradeOption());

    let cuc = e.getCuc(); // 強化次數
    let safeDiv = (num) => (cuc > 0 ? (num / cuc).toFixed(2) : "0.00");

    let statList = [
        ["力量", e.getBaseStr() - newE.getBaseStr()],
        ["敏捷", e.getBaseDex() - newE.getBaseDex()],
        ["智力", e.getBaseInt() - newE.getBaseInt()],
        ["運氣", e.getBaseLuk() - newE.getBaseLuk()],
        ["物攻", e.getPad() - newE.getPad()],
        ["魔攻", e.getMad() - newE.getMad()]
    ];

    let str = `#v${e.getItemId()}# #z${e.getItemId()}# \r\n`;
    str += `強化次數: #r${cuc}#k\r\n\r\n`;

    for (let [label, value] of statList) {
        str += `${label}: #r${value}#k 均: #r${safeDiv(value)}#k\r\n`;
    }

    npc.say(str);
}

start();

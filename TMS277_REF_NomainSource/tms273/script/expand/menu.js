let menu = [
    [
        ["返回主城", 0],
        ["萬能傳送", 1],
        ["每日任務", 2],
        ["個人信息", 3],
        ["首領中心", 4],
        ["副本中心", 5],
        ["在線獎勵", 6],
        ["背包管理", 7]
    ],
    [
        ["贊助系統", 8],
        ["月卡系統", 9],
        ["抽獎中心", 10],
        ["暖暖中心", 11],
        ["商店大全", 12],
        ["交易中心", 13],
        ["職業中心", 14],
        ["萌新專區", 15],
        ["超級樂透", 16],
        ["更多功能", 17],
        ["金幣系統", 18],
        ["裝備系統", 19]
    ]
]

execute();

function execute() {
    let txt = "";
    
    // 标题
    txt += "\t#face5##r#e<楓之谷>歡迎你！#n#k\r\n";
    txt += "\r\n";
    txt += "#fc0xF0FF8238#";
    
    // 第一组菜单 - 每行4个，共2行
    for (let i = 0; i < menu[0].length; i++) {
        let menuItem = menu[0][i];
        txt += "#L" + menuItem[1] + "#" + menuItem[0] + "#l";
        
        // 每4个换行，但不是最后一个选项后
        if (i % 4 === 3 && i !== menu[0].length - 1) {
            txt += "\r\n";
        }
    }
    
    // 简单分隔线
    txt += "\r\n";
    txt += "#fc0xF08041D9#";
    
    // 第二组菜单 - 每行4个，计算换行
    for (let i = 0; i < menu[1].length; i++) {
        let menuItem = menu[1][i];
        txt += "#L" + menuItem[1] + "#" + menuItem[0] + "#l";
        
        // 每4个换行，但不是最后一个选项后
        if (i % 4 === 3 && i !== menu[1].length - 1) {
            txt += "\r\n";
        }
    }
    
    // 单独添加管理员测试在最下面中间
    txt += "\r\n\r\n"; // 添加两个空行
    txt += "               #L20##e管理員測試#l";
    
    // 货币信息 - 修复排版
    txt += "\r\n\r\n";
    txt += "  #fs12##r楓之幣:#r" + getHyPay(1);
    txt += "     #r累充:#r" + getHyPay(3);
    txt += "\r\n";
    txt += "  #r抵用券:#r" + stage.getCurrency(2);
    txt += "  #r樂豆:#r" + stage.getCurrency(1);
    
    // 显示菜单
    let sel = npc.meFlip().askMenu(txt);
    
    // 处理选择
    if (sel == 0) {
        if (map['id'] == 100000000) {
            npc.meFlip().say("你已經在主城了！");
            return;
        }
        stage.changeMap(410004000, 0);
    } else if (sel == 20) {
        // 管理员测试单独处理
        stage.runScript("expand/menu/管理員測試");
    } else {
        // 计算菜单项位置
        let menuGroup = 0;
        let menuIndex = sel;
        
        if (sel > 7) {
            menuGroup = 1;
            menuIndex = sel - 8;
        }
        
        let scriptName = menu[menuGroup][menuIndex][0];
        stage.runScript("expand/menu/" + scriptName);
    }
}

function getHyPay(type) {
    let accName = getAccountName();
    let sql = "SELECT * FROM hypay WHERE accname = '" + accName + "'";
    let push = db.select(sql);
    
    if (push.length > 0) {
        let result = push[0];
        if (type == 1) {
            return result.get("pay");
        } else if (type == 2) {
            return result.get("payUsed");
        } else if (type == 3) {
            return result.get("payReward");
        }
    } else {
        db.insert("INSERT INTO `hypay` (`accname`, `name`) VALUES ('" + accName + "', '" + stage.getCharacterName() + "')");
        return getHyPay(1);
    }
    return 0;
}

function getAccountName() {
    let sql = "SELECT name FROM account WHERE id = " + stage.getAccountId() + " LIMIT 1";
    let push = db.select(sql);
    
    if (push.length > 0) {
        return push[0].get("name");
    }
    return "";
}
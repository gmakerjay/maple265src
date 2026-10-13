
let itemid = 1432152

const newItem = util.makeItem(itemid, 1);

    newItem.setChuc(17); // 星级
    newItem.setPad(999); // 基础物理攻击+20
    newItem.setMad(999); // 基础魔法攻击+20
	newItem.setBaseStr(999);
    newItem.setBaseDex(999);
    newItem.setBaseInt(999);
    newItem.setBaseLuk(999);

    // 5. 配置潜能（核心：最多3条潜能，部分私服支持6条需确认）
    newItem.setOption1(40292); // 第1条潜能
    newItem.setOption2(40292); // 第2条潜能
    newItem.setOption3(40292); // 第3条潜能
	
    //注意：若私服不支持6条潜能，需删除4-6，否则会报错
   newItem.setOption4(40292); 
    newItem.setOption5(40292);
    newItem.setOption6(40292);
	newItem.setGrade(20);//潜能等级
    newItem.setAttribute(8)//不可交易
	stage.gainItem(newItem);
	
	
/* 40041 str
   40042 dex   
   40043 int
   40044 luk
   40045 最大hp
   40046 最大mp
   40051 物理攻擊
   40052 魔法攻擊
   40055 暴擊幾率
   40056 暴擊傷害
   40070 總傷害
   40086 全屬性
   40291 無視防禦35
   40292 無視防禦
   40601 boss傷害40
   40602 boss35
   40603 boss30
	*/
	
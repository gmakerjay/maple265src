
var price =  50000000; 
var maxLevel = 15;

var typeList = Array(

Array(80000400,15,"力量"),
Array(80000401,15,"敏捷"),
Array(80000402,15,"智力"),
Array(80000403,15,"运气"),
Array(80000404,15,"血量"),
Array(80000405,15,"魔量"),
Array(80000406,10,"特数量"),
//Array(80000407,5,"移动速度") ,
//Array(80000408,5,"跳跃力") ,
Array(80000409,15,"暴击率"),
Array(80000410,15,"暴击伤害"),
Array(80000412,15,"无视防御"),
Array(80000413,15,"伤害"),
Array(80000414,15,"首领怪伤害"),
Array(80000422,15,"普通伤害"),
Array(80000416,15,"状态异常抗性"),
Array(80000419,15,"攻击力/魔力"), 
Array(80000420,15,"获得经验值"), 
Array(80000421,15,"神秘力量")
);

var point = Array(
Array(1 ,price),//
Array(2 ,price),//
Array(3 ,price),//
Array(4 ,price),//
Array(5 ,price),//
Array(6 ,price),//
Array(7 ,price),//
Array(8 ,price),//
Array(9 ,price),//
Array(10 ,price),//
Array(11 ,price),//
Array(12 ,price),//
Array(13 ,price),//
Array(14 ,price),//
Array(15,price)//

);

 		
var text ="请选择你要升级的#r[超级属性]#k：(请勿使用面板上重置功能)\r\n";
text += "每升一级需要枫币 #r["+price/10000+"]#k万  最高" + maxLevel + "级\r\n"
var level = 0;
var flag = false;
for(var i=0;i<typeList.length;i++){
	level = stage.getSkillLevel(typeList[i][0]);
	//if(typeList[i][1]!=level){
		let desc = level<15?"可提升":"已满级"
		text +="#L"+i+"#"+typeList[i][2]+"  等级：#r["+level+"]#k " + desc + " #l\r\n";
		flag = true;
	//}
}
if(flag){
	
	let sel = npc.askMenu(text);
	let selLevel = stage.getSkillLevel(typeList[sel][0]);
	if(selLevel < maxLevel){
		let num = npc.askNumber("您想提升多少级呢？每级花费" + price/10000 + "万",1,1,maxLevel - selLevel)
		let fee = num * price
		let yes = npc.askYesNo("是否确定升级"+typeList[sel][2] + "吗，您选择提升#b["  + num + "]#k级\r\n需要花费枫币 #r[" + fee/10000 +"]#k万" );
		if(yes==1){
			var level =stage.getSkillLevel(typeList[sel][0]);
			if(stage.getMesos()(fee)){
				stage.setSkillLevel(typeList[sel][0], level+num,level+num,false);
				stage.loseMesos(fee);
				npc.say(typeList[sel][2]+"升级到:#r["+(level+num)+"]#k消耗了枫币 x "+fee/10000+"万");
				stage.runScript("超级属性")
			}else{
				npc.say("需要枫币 x "+fee/10000+"万，您枫币不足，请查看余额");
			}
			
		}
	} else {
		npc.say("该等级已满。");
		stage.runScript("超级属性")
	}
	
	
}else{
	npc.say("您已经不需要升级了。");
}
     			 



 
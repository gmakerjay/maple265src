
 
var itemList = Array(
    1213022,
1292022,
1592022,
1282040,
1272040,
1582044,
1552130,
1542128,
1252106,
1532157,
1522152,
1492245,
1482232,
1472275,
1462252,
1442285,
1432227,
1452266,
1214022,
1422197,
1412189,
1402268,
1382274,
1372237,
1362149,
1332289,
1322264,
1312213,
1302355,
1262051,
1242141,
1232122,
1222122,
1212129
    );
     
    var text = "";
    for(var i=0; i<itemList.length; i++) {
        text+="#L"+i+"##v"+itemList[i]+":i##z"+itemList[i]+"##l\r\n";
    }
    var selection = npc.askMenu("請選擇你要武器類型：\r\n#r"+text); 
    var itemid = itemList[selection];
    var yes = npc.askYesNo("您是否確定選擇#v"+itemid+"#?");
    if(yes ==1){
        let e = util.makeItem(itemid, 1)
        
        e.setGrade(20);
        
                e.setOption1(40603);
                e.setOption2(42051);
                e.setOption3(40052);
        if (stage.gainItem(e)) {
            stage.loseItem(2439614, 1);
                util.broadcastWorldChatMsg(0x15, "[未解封的創世武器]"+stage.getCharacterName()+" 獲得 "+util.getItemName(itemid)+" 恭喜他/她。");

                        // npc.broadcastPlayerNotice(0x15,"[未解封的創世武器]"+player.getName()+" 獲得 "+player.makeItemWithId(itemid).getItemName()+" 恭喜他/她。"); 
            npc.say("恭喜您，獲得了"+1+"個#r#z"+itemid+"#");  
        } else {
            npc.say("背包空間不足");
        }
         
    }
    
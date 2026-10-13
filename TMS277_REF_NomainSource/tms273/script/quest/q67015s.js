// Created by MetaMS
// Quest ID:67015
// [星夜馬戲團] 盧公的動態視力修煉場介紹


npc.id(9401993).next().say("歡迎！\r\n從今天開始，#b動態視力修煉場#k開放了，有興趣嗎？");
npc.id(9401993).next().say("嗯，雖然我之前說的是修練場，\r\n但如果慶典少了#r娛樂項目#k，不覺得很可惜嗎？！\r\n所以我特別製作了#b有助於修練的#k #r有趣的遊戲#k！");
if (npc.id(9401993).askYesNo("要了解一下你#r盧公的動態視力修煉場#k嗎？#k")) {
        /* Response is Yes */
        npc.id(9401993).next().say("你做得很好！\r\n我來告訴你#b動態視力修煉場#k的修煉方法。\r\n只要在出現的目標中找到#r蟠猴#k，然後瞄準#b仙桃#k就可以了。\r\n我藏了很多#b和蟠猴類似的其他目標#k，你要好好觀察並瞄準！");
        npc.id(9401993).next().say("還有，\r\n努力修煉成長後，一定會遇到#b武陵桃園#k的#r蟠猴#k們，把仙桃偷走了！一定要好好教訓他們！");
        npc.me().next().say("當然了！！我會努力修煉！\r\n不過有修煉獎勵嗎！？#i3801303#");
        npc.id(9401993).next().say("當然！\r\n只要參加，就會以#r基本獎勵#k提供#i2638170:##t2638170:#。\r\n\r\n另外，根據你的#r實力#k，我會提供#b額外獎勵#k#i2638170:##t2638170:#，所以你努力修煉吧！");
        npc.id(9401993).next().say("如果成為盧公的#r弟子#k鍛鍊動態視力！\r\n你的角色將能建立#r變強的基礎#k，所以要認真修煉。");
        npc.id(9401993).next().say("對了，\r\n動態視力修煉場只有收集完#r每日幻想硬幣#k的修煉生才能使用，而且#b一天只能修煉一次#k，請參考。");
        npc.id(9401993).next().say("另外，#b動態視力修煉場#k\r\n只營運到#r2024年11月26日23時59分 #k為止，請參考。\r\n如果想使用動態視力修煉場，就來找我吧。");
        /* Update Quest RecordEx | Id:504627 | Name: Unknown | Data: "mapTuto2=1;start=1;burn=1;s1=2;lv=3;s2=2;s3=2;s4=2;s5=2;s6=2;mapTuto=1;event=1;week=3;first=1" */
//stage.updateQuestRecordEx(504627, "mapTuto2=1;start=1;burn=1;s1=2;lv=3;s2=2;s3=2;s4=2;s5=2;s6=2;mapTuto=1;event=1;week=3;first=1");
        npc.completeQuest();
} else {
        /* Response is No */
        npc.id(9401993).say("看來你現在更想玩別的吧？\r\n如果想知道關於#r盧公的動態修練場#k的事，隨時可以再來找我！");
}
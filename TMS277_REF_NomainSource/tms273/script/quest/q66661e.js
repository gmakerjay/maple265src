// Created by MetaMS
// Quest ID:66661
// [公會城] 另一能量礦石的行蹤


npc.id(9401592).ui(1).next().say("#face0#啊，你來了啊，#h0#。\r\n現在開始簡單說明一下#b委託給你的調查#k。");
npc.id(9401592).ui(1).next().say("#face0#調查秘密據點，即#b公會城每週任務#k，每週可以進行1次。\r\n請每週在\r\n#r貪婪的秘密據點#k消滅克雷德的手下們#b5000隻#k。");
npc.id(9401592).ui(1).next().say("#face0#任務完成後，我們將把那裡調查的東西累積在#fc0xFFEDAEFF#能量礦石#k上。\r\n當然，也準備了#fc0xFFABF200#約定的謝禮#k。");
npc.ui(1).npcFlip().meFlip().next().say("這是我應該做的事情…… 還準備了謝禮，非常感謝。\r\n沒有其他的事情要做嗎？");
npc.id(9401592).ui(1).next().say("#face1#是，這樣已足夠。");
npc.id(9401592).ui(1).next().say("#face1#這是對離開公會城管理人，欣然接受危險請求的#h0#的一點小心意。請務必收下。");
npc.id(9401592).ui(1).next().say("#face0#和我對話後，將會借助#fc0xFFEDAEFF#能量礦石的力量#k，幫助你更安全地移動到那裡。");
npc.id(9401592).ui(1).next().say("#face0#另外，進行狀況可於#e公會城資訊 UI的#b我的公會城活動#k項目#n確認。\r\n還有什麼好奇的地方嗎？");
npc.ui(1).npcFlip().meFlip().next().say("還有額外執行任務的方法嗎？");
npc.id(9401592).ui(1).next().say("#face0#當然。但是… 只限#b#e1次#n#k，而且需要額外的費用來準備。\r\n啊。大概#e#b150楓葉點數#k#n應該就可以了。\r\n");
npc.ui(1).npcFlip().meFlip().next().say("啊，原來如此！ 謝謝。");
npc.id(9401592).ui(1).next().say("#face1#這是我該說的話。非常感謝。請隨時注意身體健康，#h0#。");
npc.ui(1).npcFlip().meFlip().next().say("不客氣。");
npc.completeQuest();
stage.showSystemMessage("現在開始可以進行公會城每週任務。");
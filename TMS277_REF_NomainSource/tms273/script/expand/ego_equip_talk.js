let sel = parseInt(Math.random() * 35);
/* Update Quest RecordEx | Id:41902 | Name: Unknown | Data: "number=30" */
stage.updateQuestRecordEx(41902, "number", String(sel));
switch (sel) {
        case 1:
                npc.ui(0).id(2400010).next().say("我最喜歡的……？嗯……我最喜歡草莓蛋糕了。想跟我一起吃的話……如果是你我可以考慮。");
                npc.ui(0).id(2400009).next().say("我也要，我也要！我也很喜歡草莓蛋糕！");
                npc.ui(0).id(2400010).next().say("#face0#不要！除非是和阿爾法兩個人……不，不然我就不去。");
                break;
        case 2:
                npc.ui(0).id(2400010).next().say("對拉比斯怎麼看啊？嗯……塊頭大的傻子？");
                npc.ui(0).id(2400009).next().say("#face2#拉茲麗，你太過分了。你讓我心碎。");
                npc.ui(0).id(2400010).next().say("啊，那邊有看起來非常可口的肉！");
                npc.ui(0).id(2400009).next().say("肉？！哪裡？哪裡？");
                npc.ui(0).id(2400010).next().say("哼，還真是個傻瓜。");
                break;
        case 3:
                npc.ui(0).id(2400010).next().say("#face1#你那樣盯著我幹嘛，人家會害羞的。");
                break;
        case 4:
                npc.ui(0).id(2400010).next().say("為什麼選擇阿爾法？那是……沒，沒有為什麼，只是隨便挑的而已。不是因為喜歡你才那樣做的，不要誤會！");
                break;
        case 5:
                npc.ui(0).id(2400010).next().say("#face1#我不喜歡夜晚，感覺一到晚上就剩自己一個人。不過現在還好，已經不是一個人了。");
                npc.ui(0).id(2400009).next().say("好的好的，有我在你可以放心。");
                npc.ui(0).id(2400010).next().say("#face0#我不是對你說！");
                break;
        case 7:
                npc.ui(0).id(2400010).next().say("你問我對阿爾法怎麼看啊？什麼怎麼看？啊，阿爾法什麼的我一點都不喜歡！");
                npc.ui(0).id(2400005).npcFlip().next().say("嗯哼？");
                npc.ui(0).id(2400010).next().say("#face1#那，那也並不代表我討厭……");
                break;
        case 8:
                npc.ui(0).id(2400010).next().say("#face0#你說我在生氣？不不，只是對天氣不滿意而已。不是因為你好久沒跟我搭話我才這樣的！");
                break;
        case 9:
                npc.ui(0).id(2400009).next().say("我最喜歡的……那當然是肉啊！味道也好，對身體也棒！");
                npc.ui(0).id(2400006).npcFlip().next().say("我也很喜歡肉，真的很好吃。");
                npc.ui(0).id(2400009).next().say("那我們一起去吃肉吧！我烤得非常好吃！");
                break;
        case 10:
                npc.ui(0).id(2400009).next().say("你問我對拉茲麗怎麼看啊？拉茲麗……太可怕了，一發火就像魔女一樣。你看你看，現在……嘻！");
                break;
        case 12:
                npc.ui(0).id(2400009).next().say("拉茲麗這傢伙，好像蠻喜歡你！我怎麼知道的？因為我們曾經是一個人，所以不說我也能知道。");
                npc.ui(0).id(2400010).next().say("#face1#別瞎說，沒有這回事！");
                break;
        case 14:
                npc.ui(0).id(2400009).next().say("心情不好的時候還是吃東西最爽。吧唧吧唧！");
                npc.ui(0).id(2400006).npcFlip().next().say("那麼心情好的時候呢？");
                npc.ui(0).id(2400009).next().say("心情好的時候，也還是吃東西最爽。吧唧吧唧！");
                npc.ui(0).id(2400006).npcFlip().next().say("那麼心情不好呢？");
                npc.ui(0).id(2400009).next().say("心情不好的時候也是吃東西……");
                npc.ui(0).id(2400010).next().say("那就是說一天到晚都是吃啊！");
                break;
        case 15:
                npc.ui(0).id(2400009).next().say("你問我在想什麼？其實我很認真的……什麼都沒想？");
                break;
        case 16:
                npc.ui(0).id(2400009).next().say("因為大家都太安靜，我就來活躍一下氣氛吧，作為活躍分子我也有自己的使命感！不是單純的因為無聊。……是真的！");
                break;
        case 17:
                npc.ui(0).id(2400009).next().say("抓住首領怪的話，能獲得更多wp。當然得抓住它才能獲得，得抓住… ");
                npc.ui(0).id(2400005).npcFlip().next().say("#face0#一段就夠了，一段！ ");
                break;
        case 18:
                npc.ui(0).id(2400009).next().say("你成長了我們也才能進化，所以要多吃點肉，味道又好對身體也好……啊，不是這個嗎？");
                break;
        case 20:
                npc.ui(0).id(2400009).next().say("喜歡看書嗎？我一翻書就會犯困……不知道神殿的書架上有沒有漫畫書？");
                break;
        case 21:
                npc.ui(0).id(2400009).next().say("當達到110、120、130、140、150、170、180級時，可以提升武器等級。當然，如果你不願意，可以以後再選擇。");
                npc.ui(0).id(2400010).npcFlip().next().say("你好像跟以前有點不一樣啊？");
                npc.ui(0).id(2400009).next().say("你好像在誘導我聽取你的說明啊？");
                npc.ui(0).id(2400006).npcFlip().next().say("...",);
                break;
        case 22:
                npc.ui(0).id(2400009).next().say("有沒有點過潛能變更按鈕？不知道會變成什麼樣，讓我非常緊張啊！",);
                npc.ui(0).id(2400010).npcFlip().next().say("萬一潛能不好怎麼辦？");
                npc.ui(0).id(2400009).next().say("沒關係，我向來對任何事情都信心十足！只要點出來好屬性為止!");
                npc.ui(0).id(2400005).npcFlip().next().say("#face7#你那不是破罐子破摔嘛……");
                break;
        case 23:
                npc.ui(0).id(2400009).next().say("神官當中有個叫戴爾羅的傢伙，年紀雖輕倒挺聰明的？好像對專業技術知道的不少。");
                break;
        case 24:
                npc.ui(0).id(2400010).next().say("在WEAPON UI上只能強化武器。這裡原本就是武器的空間，其他防具啊飾品啊什麼的，照原來的方法在裝備欄上強化去吧。");
                break;
        case 25:
                npc.ui(0).id(2400010).next().say("使用切換功能可以更有效率地戰鬥。我，我不是想和你們對戰，千萬不要誤會。");
                break;
        case 26:
                npc.ui(0).id(2400010).next().say("聽說使用幸運道具卷軸就可以產生套裝效果。不過，我其實並不喜歡隸屬於哪裡。");
                break;
        case 27:
                npc.ui(0).id(2400010).next().say("多攢些硬幣交給神官們，他們會很高興的。對於窮人來說這可是一筆財富啊。");
                npc.ui(0).id(2400005).npcFlip().next().say("#face11#你說話太過分了？");
                npc.ui(0).id(2400010).next().say("#face2#我，我不是那個意思……");
                npc.ui(0).id(2400005).npcFlip().next().say("#face10#也對，你說的沒錯。我的確是個窮鬼。");
                npc.ui(0).id(2400010).next().say("#face2#不，不是那樣的……我不管啦，傻瓜！");
                break;
        case 28:
                npc.ui(0).id(2400010).next().say("你知道金標騎士防具套嗎？聽說鏡世界的首領怪們擁有配方，你要不去弄過來配方製作套裝？雖然這不太現實，不過這套裝備對你很合適也說不定，哼。");
                break;
        case 29:
                npc.ui(0).id(2400009).next().say("魔量藥水一點都不好喝，不用吃魔量藥水可真是萬幸啊。");
                npc.ui(0).id(2400010).npcFlip().next().say("這世上竟然還存在你不喜歡的食品啊？");
                npc.ui(0).id(2400009).next().say("#face2#必須的！你把我當成什麼了？");
                npc.ui(0).id(2400010).npcFlip().next().say("貪嘴的傻子。");
                npc.ui(0).id(2400009).next().say("#face2#你，是不是有點太過直率了！");
                break;
        case 30:
                npc.ui(0).id(2400010).next().say("我們當然是用雙手武器，就是要雙手恭敬地對待。");
                npc.ui(0).id(2400005).npcFlip().next().say("#face7#原來雙手武器是這個意思啊？！");
                break;
        case 31:
                npc.ui(0).id(2400010).next().say("收集女神的眼淚就可以學到新的技能。……不過，我不太想和他們在一起。");
                break;
        case 32:
                npc.ui(0).id(2400010).next().say("你們長得倒挺像，不過還是有很多不同點。雖然美髮和美容誰都可以做，但是每個人都追求一下自己的個性，豈不是更好？");
                break;
        case 34:
        default:
                npc.ui(0).id(2400009).next().say("#face1#但是，我有沒有說過wp只能在鏡世界裡獲得？");
                npc.ui(0).id(2400005).npcFlip().next().say("#face7#什麼？在鏡世界中即便獲得自由也不能獲得這個嗎？");
                npc.ui(0).id(2400010).next().say("wp是散佈在鏡世界中的時間之力，所以當然只能在鏡世界中獲得，不是嗎？在楓之谷世界，只有軍團長級的BOSS才擁有wp。");
                npc.ui(0).id(2400009).next().say("還有，很遺憾肉裡邊沒有包含(？)wp。");
                npc.ui(0).id(2400006).npcFlip().next().say("太遺憾了……");
                npc.ui(0).id(2400005).npcFlip().next().say("#face7#遺憾什麼？");
                break;

}






















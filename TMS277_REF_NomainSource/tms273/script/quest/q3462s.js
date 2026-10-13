// Created by MetaMS
// Quest ID:3462
// [拉圖斯]混沌之光

npc.id(2041021).next().say("看到了，我看到了！這～樣的光從鐘塔最下層咚！掉落。");
dir.setInGameCurNodeEventEnd(true);
//stage.setTemporarySkillSet(0);
dir.lockUI().setInGameDirectionMode();
usr.reverse(true).mode(-83).uol("Effect/Direction18.img/StarForce/Scene1").showReservedEffect();
dir.setDelay(5000);
dir.setFadeDelay(700);
//stage.setTemporarySkillSet(0);
dir.block().setInGameDirectionMode();
npc.id(2041021).next().say("當然相當快速的從時間之空隙消失，我不太清楚那是什麼。那到底是什麼呢？你不好奇嗎？");
if (npc.me().askAccept("（要不要聽聽看是什麼事？） ")) {
        /* Response is Yes */
        npc.startQuest();
        npc.id(2041021).noEsc().next().say("這裡，#m220050300#下是沒有盡頭的深邃時間的次元。至於光去哪裡，實際上根本不可能找。最好找找看有沒有可以當作線索的東西。");
        npc.id(2041021).say("來#b#m220050300##k和#e幽靈獵人巴柏#n見面吧！和他談論混沌之光的線索。");
} else {
        /* Response is No */
        npc.id(2041021).next().say("你是個缺乏好奇心的人。真的不想知道嗎？真的？");
}
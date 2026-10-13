var pp = "#fUI/UIWindowPL.img/PieceReward_Clover/Tab/line#";//  超細黃白分割 4
var qie = "#fMap/MapHelper.img/weather/5000days/3#"
var xueren = "#fMap/MapHelper.img/weather/5000days/0#";
var xueren1 = "#fMap/MapHelper.img/weather/5000days/1#";
var xueren2 = "#fMap/MapHelper.img/weather/5000days/2#";
var xueren3 = "#fMap/MapHelper.img/weather/snowbear/5#";
var 小雞1 = "#fEffect/SetEff.img/138/effect/4#";
var 小雞 = "#fEffect/CharacterEff.img/1022223/3/0#";
var 彩光3 = "#fMap/MapHelper.img/weather/popcornTime/0#"; //彩光1
var yunyun = "#fEffect/ItemEff/1070069/effect/walk1/6#"
var icon1 = "#fMap/MapHelper.img/weather/2011Haloween/4#";
var icon2 = "#fMap/MapHelper.img/weather/2011Haloween/6#";
var icon3 = "#fMap/MapHelper.img/weather/2011Haloween/7#";
var icon4 = "#fMap/MapHelper.img/weather/2011Haloween/7#";
var icon5 = "#fMap/MapHelper.img/weather/CN_GMskill/5#";
var ttt1 = "#fUI/ChatEmoticon.img/1003/10030003/effect/0#";//"+ttt+"//美化1
var ttt2 = "#fUI/ChatEmoticon.img/1003/10030001/effect/0#";//"+ttt+"//美化1
var date = new Date();
var hour = date.getHours();//小時
var minute = date.getMinutes();//分鐘


var Icon = Array(
    Array("星星", "#fEtc/ChatEmoticon/expression/1/0#"),
    Array("兔子", "#fEffect/CharacterEff/1112960/0/1#"),
    Array("星空", "#fUI/GuildMark/BackGround/00001013/16#"),
    Array("骷髏", "#fUI/GuildMark/Mark/Etc/00009000/15#"),
    Array("紅心", "#fUI/GuildMark/Mark/Etc/00009001/1#"),
    Array("白臉", "#fUI/GuildMark/Mark/Etc/00009002/4#"),
    Array("皇冠", "#fUI/GuildMark/Mark/Etc/00009004/3#"),
    Array("紅燈", "#fUI/GuildMark/Mark/Etc/00009020/1#"),
    Array("王冠", "#fUI/GuildMark/Mark/Etc/00009023/11#"),
    Array("水滴", "#fEffect/BasicEff/MainNotice/Gamsper/Notify/4#"),
    Array("紅旗", "#fEffect/BasicEff/MainNotice/BlockBuster/Default/3#"),
    Array("紅心", "#fEffect/CharacterEff/1112905/0/0#"),
    Array("雲朵", "#fEffect/ItemEff/1102877/effect/default/1#"),
    Array("翅膀", "#fEffect/ItemEff/1102874/effect/ladder/0#"),
    Array("箭矢", "#fEffect/ItemEff/1112003/0/2#"),
    Array("黃鴨", "#fEffect/ItemEff/1004122/effect/default/8#")
);

RuinStart();


function RuinStart() {


    txt = "#e#d\t\t" + icon5 + " 星語谷福利中心 " + icon5 + "\r\n\r\n#n";
    txt += `\t#e#g當前服務器時間：#b${date.getMonth() + 1}月${date.getDate()}日 ${hour}點${minute}分 #n#k\r\n`;
    txt += "#b#L1##b本月贊助紅包領取#l  \r\n";
    txt += "#b#L2##b紅包刮刮樂#l  \r\n";
    txt += "#b#L3##b常駐禮包#l  \r\n";
    if (stage.isGm()) {
        txt += "#b#L6##b國慶禮包#l  \r\n";
    }
    txt += "#b#L5##b周末整點禮物(21~22點)#l  \r\n";
    let sel = npc.askMenu(txt);
    switch (sel) {

        case 0:
            stage.runScript("expand/menu/卡珊德拉/活動入口")
            break;
        case 1:
            stage.runScript("expand/menu/卡珊德拉/累充紅包");
            break;
        case 2:
            stage.runScript("expand/menu/卡珊德拉/累充小紅包");
            break;
        case 3:
            stage.runScript("expand/menu/卡珊德拉/常駐禮包");
            break;
        case 5:
            stage.runScript('expand/menu/卡珊德拉/九點福利');
            break;
        case 6:
            stage.runScript("expand/menu/卡珊德拉/國慶禮包");
            break;
    }
}

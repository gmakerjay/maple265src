var payUtils = require('model/payUtils');


var GC1 = "#fEffect/CharacterEff.img/1082700/2/0#";
var SW1 = "#fEffect/CharacterEff.img/1112960/0/0#";
var SW2 = "#fEffect/CharacterEff.img/1112960/0/1#";
var SW3 = "#fEffect/CharacterEff.img/1112960/0/2#";
var SW4 = "#fEffect/CharacterEff.img/1112960/0/3#";

var XC01 = "#fUI/NameTag.img/292/w#";
var XC02 = "#fUI/NameTag.img/292/c#";
var XC03 = "#fUI/NameTag.img/292/e#";

var selStr = "";


function start() {
    let currentLevel = stage.getSkillLevel(80000616);
    let str = "#b#e神器BUFF - 財神之力#k#n\r\n";
    str += `此BUFF會根據角色穿戴的神器自動適應。\r\n`;
    str += `穿戴#r2/4/5#k件神器時會自動激活#r1/2/3級#kBUFF#k。\r\n`;
    str += `#r1級#b\r\n`;
    str += `全屬性/攻擊/魔攻+30。\r\n`;
    str += `#r2級#b\r\n`;
    str += `全屬性/攻擊/魔攻+60。爆傷+10%。\r\n`;
    str += `#r3級#b\r\n`;
    str += `全屬性/攻擊/魔攻+90。爆傷+10%。最終傷害+5%。\r\n`;

    npc.say(str);
}

start();
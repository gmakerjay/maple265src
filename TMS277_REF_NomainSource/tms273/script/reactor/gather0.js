/*
 * NeroMS MapleStory server emulator written in Java
 * Copyright (C) 2017-2018  Jackson
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 *
 * @author Jackson
 */

//4022022     4022022
let herbalism = [Array(4022000, 4022001),
        Array(4022002, 4022003),
        Array(4022004, 4022005),
        Array(4022006, 4022007),
        Array(4022008, 4022009),
        Array(4022010, 4022011),
        Array(4022012, 4022013),
        Array(4022014, 4022015),
        Array(4022016, 4022017),
        Array(4022018, 4022019),
        Array(4022020, 4022021),
        Array(4022000, 4022021, 4022002, 4022003, 4022004, 4022005, 4022006, 4022007, 4022008, 4022009, 4022010, 4022011, 4022012, 4022013, 4022014, 4022015, 4022016, 4022017, 4022018, 4022019, 4022020, 4022021),
        Array(4022000, 4022021, 4022002, 4022003, 4022004, 4022005, 4022006, 4022007, 4022008, 4022009, 4022010, 4022011, 4022012, 4022013, 4022014, 4022015, 4022016, 4022017, 4022018, 4022019, 4022020, 4022021),
        Array(4022000, 4022021, 4022002, 4022003, 4022004, 4022005, 4022006, 4022007, 4022008, 4022009, 4022010, 4022011, 4022012, 4022013, 4022014, 4022015, 4022016, 4022017, 4022018, 4022019, 4022020, 4022021, 4023000, 4023021, 4023002, 4023003, 4023004, 4023005, 4023006, 4023007, 4023008, 4023009, 4023010, 4023011, 4023012, 4023013, 4023014, 4023015, 4023016, 4023017, 4023018, 4023019, 4023020, 4023021)];

let mining = [Array(4020004, 4010004),
        Array(4020001, 4010005),
        Array(4010001, 4020005),
        Array(4010000, 4010003),
        Array(4004002, 4010002, 4020003),
        Array(4010006, 4020006),
        Array(4020002, 4020007),
        Array(4004000, 4020000),
        Array(4004004, 4020008),
        Array(4004001, 4004003, 4010007),
        Array(4010008),
        Array(4005000, 4005001, 4005002, 4005003, 4005004,
                4011000, 4011001, 4011002, 4011003, 4011004, 4011005, 4011006, 4011007, 4011008, 4011009, 4011010,
                4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008),
        Array(4004000, 4004001, 4004002, 4004003, 4004004,
                4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007, 4010008,
                4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008
        ),
        Array(4004000, 4004001, 4004002, 4004003, 4004004,
                4005000, 4005001, 4005002, 4005003, 4005004,
                4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007, 4010008,
                4011000, 4011001, 4011002, 4011003, 4011004, 4011005, 4011006, 4011007, 4011008, 4011009, 4011010,
                4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008,
                4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008
        )];
let posX = ctx.getEntityPosX();
let posY = ctx.getEntityPosY();
let craftId = parseInt(ctx.getDataId() / 100000) == 1 ? 92000000 : 92010000;
let type = parseInt(ctx.getDataId() % 10);
let dropList;
if (craftId == 92000000) { //藥草
        dropList = herbalism[type];
} else {
        dropList = mining[type];
}
let count = 0;
let result = [];
while (count < Math.min(dropList.length, 5)) {
        if (Math.random() * 100 < 80) {
                count++;
                result.push(dropList[parseInt(Math.random() * dropList.length)], 1000000);
        }
}
if (craftId == 92000000) {
        result.push(4032933, 1000);
}

if (result.length > 0) {
        map.dropItems(stage.getCharacterId(), posX, posY, 0, 0, 0, result);
}
stage.addMakingSkillExp(craftId, 20);
stage.modifyFatigue(1);
__int64 __fastcall CSecondaryStat::DecodeForRemote(__int64 a1, __int64 a2, __int64 a3)
{
  sub_140625780(mask);
  CInPacket::DecodeBuffer(iPacket, mask, 0x84u);
  if ( getBuffStat(mask, 94) ) // Speed
  {
    v4 = CInPacket::Decode1(iPacket, v3);
    sub_141430080(a1, v4);
  }
  if ( getBuffStat(mask, 108) ) // ComboCounter
  {
    v6 = CInPacket::Decode1(iPacket, v5);
    sub_141194420(a1, v6);
  }
  if ( getBuffStat(mask, 109) ) // BlessedHammer
  {
    v8 = CInPacket::Decode2(iPacket, v7);
    sub_141193C40(a1, v8);
    v10 = CInPacket::Decode4(iPacket, v9);
    sub_14119D950(a1, v10);
  }
  if ( getBuffStat(mask, 111) )
  {
    v12 = CInPacket::Decode2(iPacket, v11);
    sub_14119BD30(a1, v12);
    v14 = CInPacket::Decode4(iPacket, v13);
    sub_1411A5300(a1, v14);
  }
  if ( getBuffStat(mask, 372) ) // ElementalCharge
  {
    v16 = CInPacket::Decode2(iPacket, v15);
    sub_141195550(a1, v16);
  }
  if ( getBuffStat(mask, 104) )
  {
    v18 = CInPacket::Decode2(iPacket, v17);
    sub_14119B280(a1, v18);
    v20 = CInPacket::Decode4(iPacket, v19);
    sub_1411A48B0(a1, v20);
  }
  if ( getBuffStat(mask, 187) )
  {
    v22 = CInPacket::Decode2(iPacket, v21);
    sub_141196540(a1, v22);
    v24 = CInPacket::Decode4(iPacket, v23);
    sub_1411A0110(a1, v24);
  }
  if ( getBuffStat(mask, 223) ) // Shock
  {
    v26 = CInPacket::Decode1(iPacket, v25);
    sub_14119A680(a1, v26);
  }
  if ( getBuffStat(mask, 107) )
  {
    v28 = CInPacket::Decode2(iPacket, v27);
    sub_141194C30(a1, v28);
    v30 = CInPacket::Decode4(iPacket, v29);
    sub_14119E8B0(a1, v30);
  }
  if ( getBuffStat(mask, 106) )
  {
    v32 = CInPacket::Decode2(iPacket, v31);
    sub_14119A050(a1, v32);
    v34 = CInPacket::Decode4(iPacket, v33);
    sub_1411A36E0(a1, v34);
  }
  if ( getBuffStat(mask, 119) )
  {
    v36 = CInPacket::Decode2(iPacket, v35);
    sub_14119BD00(a1, v36);
    v38 = CInPacket::Decode4(iPacket, v37);
    sub_1411A52D0(a1, v38);
  }
  if ( getBuffStat(mask, 219) )
  {
    v40 = CInPacket::Decode2(iPacket, v39);
    sub_14119BCD0(a1, v40);
    v42 = CInPacket::Decode4(iPacket, v41);
    sub_1411A52A0(a1, v42);
  }
  if ( getBuffStat(mask, 120) )
  {
    v44 = CInPacket::Decode2(iPacket, v43);
    sub_141194930(a1, v44);
    v46 = CInPacket::Decode4(iPacket, v45);
    sub_14119E5E0(a1, v46);
  }
  if ( getBuffStat(mask, 121) )
  {
    v48 = CInPacket::Decode2(iPacket, v47);
    sub_14119AAA0(a1, v48);
    v50 = CInPacket::Decode4(iPacket, v49);
    sub_1411A4100(a1, v50);
  }
  if ( getBuffStat(mask, 218) )
  {
    v52 = CInPacket::Decode2(iPacket, v51);
    sub_141199390(a1, v52);
    v54 = CInPacket::Decode4(iPacket, v53);
    sub_1411A2AB0(a1, v54);
  }
  if ( getBuffStat(mask, 203) )
  {
    v56 = CInPacket::Decode2(iPacket, v55);
    sub_14119B670(a1, v56);
    v58 = CInPacket::Decode4(iPacket, v57);
    sub_1411A4C70(a1, v58);
  }
  if ( getBuffStat(mask, 206) ) // Team
  {
    v60 = CInPacket::Decode1(iPacket, v59);
    sub_14119B490(a1, v60);
  }
  if ( getBuffStat(mask, 204) )
  {
    v62 = CInPacket::Decode2(iPacket, v61);
    sub_141194FE0(a1, v62);
    v64 = CInPacket::Decode4(iPacket, v63);
    sub_14119EBE0(a1, v64);
  }
  if ( getBuffStat(mask, 205) )
  {
    v66 = CInPacket::Decode2(iPacket, v65);
    sub_14119B610(a1, v66);
    v68 = CInPacket::Decode4(iPacket, v67);
    sub_1411A4C10(a1, v68);
  }
  if ( getBuffStat(mask, 105) ) // Poison
  {
    v70 = CInPacket::Decode2(iPacket, v69);
    sub_1411991E0(a1, v70);
  }
  if ( getBuffStat(mask, 105) )
  {
    v72 = CInPacket::Decode2(iPacket, v71);
    sub_1411991E0(a1, v72);
    v74 = CInPacket::Decode4(iPacket, v73);
    sub_1411A2900(a1, v74);
  }
  if ( getBuffStat(mask, 114) )
  {
    v76 = CInPacket::Decode2(iPacket, v75);
    sub_14119A2F0(a1, v76);
    v78 = CInPacket::Decode4(iPacket, v77);
    sub_1411A3950(a1, v78);
  }
  if ( getBuffStat(mask, 97) )
    sub_141194B40(a1, 1);
  if ( getBuffStat(mask, 103) )
    sub_14119AB30(a1, 1);
  if ( getBuffStat(mask, 122) )
  {
    v80 = CInPacket::Decode2(iPacket, v79);
    sub_141198610(a1, v80);
    v82 = CInPacket::Decode4(iPacket, v81);
    sub_1411A1DC0(a1, v82);
  }
  if ( getBuffStat(mask, 140) )
  {
    v84 = CInPacket::Decode2(iPacket, v83);
    sub_1411963C0(a1, v84);
  }
  if ( getBuffStat(mask, 128) )
  {
    v86 = CInPacket::Decode2(iPacket, v85);
    sub_141193040(a1, v86);
    v88 = CInPacket::Decode4(iPacket, v87);
    sub_14119CD50(a1, v88);
  }
  if ( getBuffStat(mask, 274) )
  {
    v90 = CInPacket::Decode2(iPacket, v89);
    sub_1411980A0(a1, v90);
    v92 = CInPacket::Decode4(iPacket, v91);
    sub_1411A1880(a1, v92);
  }
  if ( getBuffStat(mask, 275) )
  {
    v94 = CInPacket::Decode2(iPacket, v93);
    sub_141198070(a1, v94);
    v96 = CInPacket::Decode4(iPacket, v95);
    sub_1411A1850(a1, v96);
  }
  if ( getBuffStat(mask, 129) )
  {
    v98 = CInPacket::Decode4(iPacket, v97);
    sub_141198B20(a1, v98);
  }
  if ( getBuffStat(mask, 135) )
  {
    v100 = CInPacket::Decode2(iPacket, v99);
    sub_141193490(a1, v100);
    v102 = CInPacket::Decode4(iPacket, v101);
    sub_14119D1A0(a1, v102);
  }
  if ( getBuffStat(mask, 141) )
  {
    v104 = CInPacket::Decode2(iPacket, v103);
    sub_1411934C0(a1, v104);
    v106 = CInPacket::Decode4(iPacket, v105);
    sub_14119D1D0(a1, v106);
  }
  if ( getBuffStat(mask, 150) )
  {
    v108 = CInPacket::Decode2(iPacket, v107);
    sub_141195160(a1, v108);
    v110 = CInPacket::Decode4(iPacket, v109);
    sub_14119ED60(a1, v110);
  }
  if ( getBuffStat(mask, 142) )
  {
    v112 = CInPacket::Decode2(iPacket, v111);
    sub_141199CF0(a1, v112);
    v114 = CInPacket::Decode4(iPacket, v113);
    sub_1411A3380(a1, v114);
  }
  if ( getBuffStat(mask, 144) )
  {
    v116 = CInPacket::Decode4(iPacket, v115);
    sub_141199C30(a1, v116);
  }
  if ( getBuffStat(mask, 145) )
  {
    v118 = CInPacket::Decode4(iPacket, v117);
    sub_141199BD0(a1, v118);
  }
  if ( getBuffStat(mask, 146) )
  {
    v120 = CInPacket::Decode4(iPacket, v119);
    sub_141194E20(a1, v120);
  }
  if ( getBuffStat(mask, 147) )
  {
    v122 = CInPacket::Decode4(iPacket, v121);
    sub_141194E90(a1, v122);
  }
  if ( getBuffStat(mask, 148) )
  {
    v124 = CInPacket::Decode2(iPacket, v123);
    sub_1411950D0(a1, v124);
    v126 = CInPacket::Decode4(iPacket, v125);
    sub_14119ECD0(a1, v126);
  }
  if ( getBuffStat(mask, 149) )
    sub_141195100(a1, 1);
  if ( getBuffStat(mask, 160) )
  {
    v128 = CInPacket::Decode2(iPacket, v127);
    sub_141199AB0(a1, v128);
    v130 = CInPacket::Decode4(iPacket, v129);
    sub_1411A31A0(a1, v130);
  }
  if ( getBuffStat(mask, 858) )
  {
    v132 = CInPacket::Decode2(iPacket, v131);
    sub_141199A80(a1, v132);
    v134 = CInPacket::Decode4(iPacket, v133);
    sub_1411A3170(a1, v134);
  }
  if ( getBuffStat(mask, 162) )
  {
    v136 = CInPacket::Decode2(iPacket, v135);
    sub_14119B0A0(a1, v136);
    v138 = CInPacket::Decode4(iPacket, v137);
    sub_1411A46D0(a1, v138);
  }
  if ( getBuffStat(mask, 163) )
  {
    v140 = CInPacket::Decode2(iPacket, v139);
    sub_14119B070(a1, v140);
    v142 = CInPacket::Decode4(iPacket, v141);
    sub_1411A46A0(a1, v142);
  }
  if ( getBuffStat(mask, 164) )
  {
    v144 = CInPacket::Decode2(iPacket, v143);
    sub_141195D30(a1, v144);
    v146 = CInPacket::Decode4(iPacket, v145);
    sub_14119F930(a1, v146);
  }
  if ( getBuffStat(mask, 166) )
  {
    v148 = CInPacket::Decode4(iPacket, v147);
    sub_141198040(a1, v148);
  }
  if ( getBuffStat(mask, 169) )
    sub_1411961B0(a1, 1);
  if ( getBuffStat(mask, 170) )
  {
    v150 = CInPacket::Decode2(iPacket, v149);
    sub_141196330(a1, v150);
    v152 = CInPacket::Decode4(iPacket, v151);
    sub_14119FF00(a1, v152);
  }
  if ( getBuffStat(mask, 220) )
  {
    v154 = CInPacket::Decode2(iPacket, v153);
    sub_141196300(a1, v154);
    v156 = CInPacket::Decode4(iPacket, v155);
    sub_14119FED0(a1, v156);
  }
  if ( getBuffStat(mask, 201) )
  {
    v158 = CInPacket::Decode2(iPacket, v157);
    sub_14119BDC0(a1, v158);
    v160 = CInPacket::Decode4(iPacket, v159);
    sub_1411A5390(a1, v160);
  }
  if ( getBuffStat(mask, 173) )
  {
    v162 = CInPacket::Decode2(iPacket, v161);
    sub_1411952B0(a1, v162);
    v164 = CInPacket::Decode4(iPacket, v163);
    sub_14119EEB0(a1, v164);
  }
  if ( getBuffStat(mask, 175) )
  {
    v166 = CInPacket::Decode2(iPacket, v165);
    sub_141195E80(a1, v166);
    v168 = CInPacket::Decode4(iPacket, v167);
    sub_14119FA80(a1, v168);
  }
  if ( getBuffStat(mask, 189) )
    sub_14119AB00(a1, 1);
  if ( getBuffStat(mask, 177) )
    sub_141193940(a1, 1);
  if ( getBuffStat(mask, 190) )
  {
    v170 = CInPacket::Decode2(iPacket, v169);
    sub_141198190(a1, v170);
    v172 = CInPacket::Decode4(iPacket, v171);
    sub_1411A1970(a1, v172);
  }
  if ( getBuffStat(mask, 291) )
    sub_141193C70(a1, 1);
  if ( getBuffStat(mask, 199) )
  {
    v174 = CInPacket::Decode2(iPacket, v173);
    sub_14142FB40(a1, v174);
    v176 = CInPacket::Decode4(iPacket, v175);
    sub_141430440(a1, v176);
  }
  if ( getBuffStat(mask, 207) )
  {
    v178 = CInPacket::Decode2(iPacket, v177);
    sub_141195C40(a1, v178);
    v180 = CInPacket::Decode4(iPacket, v179);
    sub_14119F840(a1, v180);
  }
  if ( getBuffStat(mask, 214) )
  {
    v182 = CInPacket::Decode2(iPacket, v181);
    sub_141194B70(a1, v182);
    v184 = CInPacket::Decode4(iPacket, v183);
    sub_14119E7F0(a1, v184);
  }
  if ( getBuffStat(mask, 222) )
  {
    v186 = CInPacket::Decode2(iPacket, v185);
    sub_141192B30(a1, v186);
    v188 = CInPacket::Decode4(iPacket, v187);
    sub_14119C840(a1, v188);
  }
  if ( getBuffStat(mask, 156) )
  {
    v190 = CInPacket::Decode2(iPacket, v189);
    sub_141196810(a1, v190);
    v192 = CInPacket::Decode4(iPacket, v191);
    sub_1411A0380(a1, v192);
  }
  if ( getBuffStat(mask, 227) )
    sub_141196990(a1, 1);
  if ( getBuffStat(mask, 234) )
  {
    v194 = CInPacket::Decode2(iPacket, v193);
    sub_141194F50(a1, v194);
    v196 = CInPacket::Decode4(iPacket, v195);
    sub_14119EB50(a1, v196);
  }
  if ( getBuffStat(mask, 238) )
  {
    v198 = CInPacket::Decode4(iPacket, v197);
    sub_14119AF20(a1, v198);
    v200 = CInPacket::Decode4(iPacket, v199);
    sub_1411A4550(a1, v200);
  }
  if ( getBuffStat(mask, 240) )
  {
    v202 = CInPacket::Decode2(iPacket, v201);
    sub_141195B80(a1, v202);
    v204 = CInPacket::Decode4(iPacket, v203);
    sub_14119F780(a1, v204);
  }
  if ( getBuffStat(mask, 248) )
  {
    v206 = CInPacket::Decode2(iPacket, v205);
    sub_141195A00(a1, v206);
    v208 = CInPacket::Decode4(iPacket, v207);
    sub_14119F600(a1, v208);
  }
  if ( getBuffStat(mask, 253) )
  {
    v210 = CInPacket::Decode2(iPacket, v209);
    sub_141194C90(a1, v210);
    v212 = CInPacket::Decode4(iPacket, v211);
    sub_14119E910(a1, v212);
  }
  if ( getBuffStat(mask, 273) )
  {
    v214 = CInPacket::Decode2(iPacket, v213);
    sub_141198E50(a1, v214);
    v216 = CInPacket::Decode4(iPacket, v215);
    sub_1411A25A0(a1, v216);
  }
  if ( getBuffStat(mask, 255) )
  {
    v218 = CInPacket::Decode2(iPacket, v217);
    sub_141197A40(a1, v218);
    v220 = CInPacket::Decode4(iPacket, v219);
    sub_1411A1280(a1, v220);
  }
  if ( getBuffStat(mask, 290) )
  {
    v222 = CInPacket::Decode2(iPacket, v221);
    sub_14119BA90(a1, v222);
    v224 = CInPacket::Decode4(iPacket, v223);
    sub_1411A5060(a1, v224);
  }
  if ( getBuffStat(mask, 302) )
  {
    v226 = CInPacket::Decode2(iPacket, v225);
    sub_14119BA60(a1, v226);
    v228 = CInPacket::Decode4(iPacket, v227);
    sub_1411A5030(a1, v228);
  }
  if ( getBuffStat(mask, 256) )
  {
    v230 = CInPacket::Decode2(iPacket, v229);
    sub_14119BB20(a1, v230);
    v232 = CInPacket::Decode4(iPacket, v231);
    sub_1411A50F0(a1, v232);
  }
  if ( getBuffStat(mask, 261) )
  {
    v234 = CInPacket::Decode4(iPacket, v233);
    sub_1411993F0(a1, v234);
  }
  if ( getBuffStat(mask, 469) ) // PinkbeanRollingGrade
  {
    v236 = CInPacket::Decode1(iPacket, v235);
    sub_1411990F0(a1, v236);
  }
  if ( getBuffStat(mask, 264) )
  {
    v238 = CInPacket::Decode2(iPacket, v237);
    sub_141196CF0(a1, v238);
    v240 = CInPacket::Decode4(iPacket, v239);
    sub_1411A0830(a1, v240);
  }
  if ( getBuffStat(mask, 265) )
  {
    v242 = CInPacket::Decode2(iPacket, v241);
    sub_14119B1F0(a1, v242);
    v244 = CInPacket::Decode4(iPacket, v243);
    sub_1411A4820(a1, v244);
  }
  if ( getBuffStat(mask, 268) )
  {
    v246 = CInPacket::Decode2(iPacket, v245);
    sub_141197140(a1, v246);
    v248 = CInPacket::Decode4(iPacket, v247);
    sub_1411A0B00(a1, v248);
  }
  if ( getBuffStat(mask, 271) )
  {
    v250 = CInPacket::Decode2(iPacket, v249);
    sub_141197380(a1, v250);
    v252 = CInPacket::Decode4(iPacket, v251);
    sub_1411A0BF0(a1, v252);
  }
  if ( getBuffStat(mask, 292) )
  {
    v254 = CInPacket::Decode2(iPacket, v253);
    sub_141197560(a1, v254);
    v256 = CInPacket::Decode4(iPacket, v255);
    sub_1411A0DA0(a1, v256);
  }
  if ( getBuffStat(mask, 294) )
  {
    v258 = CInPacket::Decode2(iPacket, v257);
    sub_14119AF80(a1, v258);
  }
  if ( getBuffStat(mask, 293) )
  {
    v260 = CInPacket::Decode2(iPacket, v259);
    sub_141197AA0(a1, v260);
    v262 = CInPacket::Decode4(iPacket, v261);
    sub_1411A12E0(a1, v262);
  }
  if ( getBuffStat(mask, 300) )
  {
    v264 = CInPacket::Decode2(iPacket, v263);
    sub_141199B70(a1, v264);
    v266 = CInPacket::Decode4(iPacket, v265);
    sub_1411A3260(a1, v266);
  }
  if ( getBuffStat(mask, 301) )
  {
    v268 = CInPacket::Decode2(iPacket, v267);
    sub_14119ACE0(a1, v268);
    v270 = CInPacket::Decode4(iPacket, v269);
    sub_1411A4340(a1, v270);
  }
  if ( getBuffStat(mask, 303) )
  {
    v272 = CInPacket::Decode2(iPacket, v271);
    sub_14119B040(a1, v272);
    v274 = CInPacket::Decode4(iPacket, v273);
    sub_1411A4670(a1, v274);
  }
  if ( getBuffStat(mask, 304) )
  {
    v276 = CInPacket::Decode2(iPacket, v275);
    sub_14119ABC0(a1, v276);
    v278 = CInPacket::Decode4(iPacket, v277);
    sub_1411A4220(a1, v278);
  }
  if ( getBuffStat(mask, 306) )
  {
    v280 = CInPacket::Decode2(iPacket, v279);
    sub_141199270(a1, v280);
    v282 = CInPacket::Decode4(iPacket, v281);
    sub_1411A2990(a1, v282);
  }
  if ( getBuffStat(mask, 539) )
  {
    v284 = CInPacket::Decode2(iPacket, v283);
    sub_141195DC0(a1, v284);
    v286 = CInPacket::Decode4(iPacket, v285);
    sub_14119F9C0(a1, v286);
  }
  if ( getBuffStat(mask, 307) )
  {
    v288 = CInPacket::Decode2(iPacket, v287);
    sub_141192AD0(a1, v288);
    v290 = CInPacket::Decode4(iPacket, v289);
    sub_14119C7E0(a1, v290);
  }
  if ( getBuffStat(mask, 315) )
  {
    v292 = CInPacket::Decode2(iPacket, v291);
    sub_14119AB60(a1, v292);
    v294 = CInPacket::Decode4(iPacket, v293);
    sub_1411A41C0(a1, v294);
  }
  if ( getBuffStat(mask, 165) )
  {
    v296 = CInPacket::Decode2(iPacket, v295);
    sub_1411967E0(a1, v296);
    v298 = CInPacket::Decode4(iPacket, v297);
    sub_1411A0350(a1, v298);
  }
  if ( getBuffStat(mask, 298) )
  {
    v300 = CInPacket::Decode2(iPacket, v299);
    sub_14119AAD0(a1, v300);
    v302 = CInPacket::Decode4(iPacket, v301);
    sub_1411A4130(a1, v302);
  }
  if ( getBuffStat(mask, 311) )
  {
    v304 = CInPacket::Decode2(iPacket, v303);
    sub_1411985E0(a1, v304);
    v306 = CInPacket::Decode4(iPacket, v305);
    sub_1411A1D90(a1, v306);
  }
  if ( getBuffStat(mask, 312) )
  {
    v308 = CInPacket::Decode2(iPacket, v307);
    sub_141196420(a1, v308);
    v310 = CInPacket::Decode4(iPacket, v309);
    sub_14119FFF0(a1, v310);
  }
  if ( getBuffStat(mask, 313) )
  {
    v312 = CInPacket::Decode2(iPacket, v311);
    sub_14119B730(a1, v312);
    v314 = CInPacket::Decode4(iPacket, v313);
    sub_1411A4D30(a1, v314);
  }
  if ( getBuffStat(mask, 314) )
  {
    v316 = CInPacket::Decode2(iPacket, v315);
    sub_1411945D0(a1, v316);
    v318 = CInPacket::Decode4(iPacket, v317);
    sub_14119E2E0(a1, v318);
  }
  if ( getBuffStat(mask, 314) )
  {
    v1447 = MEMORY[0x7FF952B74220]();
    v320 = CInPacket::Decode4(iPacket, v319);
    sub_1411A78B0(a1, (v320 + v1447));
  }
  if ( getBuffStat(mask, 316) )
  {
    v322 = CInPacket::Decode2(iPacket, v321);
    sub_141196BA0(a1, v322);
    v324 = CInPacket::Decode4(iPacket, v323);
    sub_1411A06E0(a1, v324);
  }
  if ( getBuffStat(mask, 317) )
  {
    v326 = CInPacket::Decode2(iPacket, v325);
    sub_141196C90(a1, v326);
    v328 = CInPacket::Decode4(iPacket, v327);
    sub_1411A07D0(a1, v328);
  }
  if ( getBuffStat(mask, 318) )
  {
    v330 = CInPacket::Decode2(iPacket, v329);
    sub_141196BD0(a1, v330);
    v332 = CInPacket::Decode4(iPacket, v331);
    sub_1411A0710(a1, v332);
  }
  if ( getBuffStat(mask, 319) )
  {
    v334 = CInPacket::Decode2(iPacket, v333);
    sub_141196B70(a1, v334);
    v336 = CInPacket::Decode4(iPacket, v335);
    sub_1411A06B0(a1, v336);
  }
  if ( getBuffStat(mask, 320) )
  {
    v338 = CInPacket::Decode2(iPacket, v337);
    sub_141195EB0(a1, v338);
    v340 = CInPacket::Decode4(iPacket, v339);
    sub_14119FAB0(a1, v340);
  }
  if ( getBuffStat(mask, 321) )
  {
    v342 = CInPacket::Decode2(iPacket, v341);
    sub_141195EE0(a1, v342);
    v344 = CInPacket::Decode4(iPacket, v343);
    sub_14119FAE0(a1, v344);
  }
  if ( getBuffStat(mask, 322) )
    sub_14119BAF0(a1, 1);
  if ( getBuffStat(mask, 323) )
  {
    v346 = CInPacket::Decode2(iPacket, v345);
    sub_1411966F0(a1, v346);
    v348 = CInPacket::Decode4(iPacket, v347);
    sub_1411A0260(a1, v348);
  }
  if ( getBuffStat(mask, 233) )
  {
    v350 = CInPacket::Decode2(iPacket, v349);
    sub_141194A20(a1, v350);
    v352 = CInPacket::Decode4(iPacket, v351);
    sub_14119E6A0(a1, v352);
  }
  if ( getBuffStat(mask, 295) )
  {
    v354 = CInPacket::Decode2(iPacket, v353);
    sub_141192E60(a1, v354);
    v356 = CInPacket::Decode4(iPacket, v355);
    sub_14119CB70(a1, v356);
  }
  if ( getBuffStat(mask, 174) )
  {
    v358 = CInPacket::Decode2(iPacket, v357);
    sub_141198B80(a1, v358);
    v360 = CInPacket::Decode4(iPacket, v359);
    sub_1411A2330(a1, v360);
  }
  if ( getBuffStat(mask, 328) )
  {
    v362 = CInPacket::Decode2(iPacket, v361);
    sub_141193B80(a1, v362);
    v364 = CInPacket::Decode4(iPacket, v363);
    sub_14119D890(a1, v364);
  }
  if ( getBuffStat(mask, 152) )
  {
    v366 = CInPacket::Decode2(iPacket, v365);
    sub_14119BF10(a1, v366);
    v368 = CInPacket::Decode4(iPacket, v367);
    sub_1411A54E0(a1, v368);
  }
  if ( getBuffStat(mask, 154) )
  {
    v370 = CInPacket::Decode2(iPacket, v369);
    sub_1411974D0(a1, v370);
    v372 = CInPacket::Decode4(iPacket, v371);
    sub_1411A0D10(a1, v372);
  }
  if ( getBuffStat(mask, 329) )
  {
    v374 = CInPacket::Decode2(iPacket, v373);
    sub_141196C30(a1, v374);
    v376 = CInPacket::Decode4(iPacket, v375);
    sub_1411A0770(a1, v376);
  }
  if ( getBuffStat(mask, 330) )
  {
    v378 = CInPacket::Decode2(iPacket, v377);
    sub_141192FE0(a1, v378);
    v380 = CInPacket::Decode4(iPacket, v379);
    sub_14119CCF0(a1, v380);
  }
  if ( getBuffStat(mask, 331) )
  {
    v382 = CInPacket::Decode4(iPacket, v381);
    sub_1411981C0(a1, v382);
    v384 = CInPacket::Decode4(iPacket, v383);
    sub_1411A19A0(a1, v384);
  }
  if ( getBuffStat(mask, 331) )
  {
    v1448 = MEMORY[0x7FF952B74220]();
    v386 = CInPacket::Decode4(iPacket, v385);
    sub_1411AAFD0(a1, (v386 + v1448));
  }
  if ( getBuffStat(mask, 333) )
  {
    v388 = CInPacket::Decode2(iPacket, v387);
    sub_14119B910(a1, v388);
    v390 = CInPacket::Decode4(iPacket, v389);
    sub_1411A4F10(a1, v390);
  }
  if ( getBuffStat(mask, 334) )
  {
    v392 = CInPacket::Decode2(iPacket, v391);
    sub_14119B010(a1, v392);
    v394 = CInPacket::Decode4(iPacket, v393);
    sub_1411A4640(a1, v394);
  }
  if ( getBuffStat(mask, 335) ) // ReturnTeleport
  {
    v396 = CInPacket::Decode1(iPacket, v395);
    sub_141199C90(a1, v396);
    v398 = CInPacket::Decode4(iPacket, v397);
    sub_1411A3320(a1, v398);
  }
  if ( getBuffStat(mask, 339) )
  {
    v400 = CInPacket::Decode2(iPacket, v399);
    sub_1411940C0(a1, v400);
    v402 = CInPacket::Decode4(iPacket, v401);
    sub_14119DDD0(a1, v402);
  }
  if ( getBuffStat(mask, 345) )
  {
    v404 = CInPacket::Decode2(iPacket, v403);
    sub_141198CD0(a1, v404);
    v406 = CInPacket::Decode4(iPacket, v405);
    sub_1411A2480(a1, v406);
  }
  if ( getBuffStat(mask, 347) ) // FireBomb
  {
    v408 = CInPacket::Decode1(iPacket, v407);
    sub_141195FA0(a1, v408);
    v410 = CInPacket::Decode4(iPacket, v409);
    sub_14119FBA0(a1, v410);
  }
  if ( getBuffStat(mask, 349) ) // SurplusSupply
  {
    v412 = CInPacket::Decode1(iPacket, v411);
    sub_14119B400(a1, v412);
  }
  if ( getBuffStat(mask, 352) )
  {
    v414 = CInPacket::Decode2(iPacket, v413);
    sub_141198970(a1, v414);
    v416 = CInPacket::Decode4(iPacket, v415);
    sub_1411A2120(a1, v416);
  }
  if ( getBuffStat(mask, 383) )
  {
    v418 = CInPacket::Decode2(iPacket, v417);
    sub_141198850(a1, v418);
    v420 = CInPacket::Decode4(iPacket, v419);
    sub_1411A2000(a1, v420);
  }
  if ( getBuffStat(mask, 353) )
  {
    v422 = CInPacket::Decode2(iPacket, v421);
    sub_141192B00(a1, v422);
    v424 = CInPacket::Decode4(iPacket, v423);
    sub_14119C810(a1, v424);
  }
  if ( getBuffStat(mask, 354) )
  {
    v426 = CInPacket::Decode2(iPacket, v425);
    sub_141194960(a1, v426);
    v428 = CInPacket::Decode4(iPacket, v427);
    sub_14119E610(a1, v428);
  }
  if ( getBuffStat(mask, 355) )
  {
    v430 = CInPacket::Decode2(iPacket, v429);
    sub_14119B220(a1, v430);
    v432 = CInPacket::Decode4(iPacket, v431);
    sub_1411A4850(a1, v432);
  }
  if ( getBuffStat(mask, 356) )
  {
    v434 = CInPacket::Decode2(iPacket, v433);
    sub_141195A60(a1, v434);
    v436 = CInPacket::Decode4(iPacket, v435);
    sub_14119F660(a1, v436);
  }
  if ( getBuffStat(mask, 357) )
  {
    v438 = CInPacket::Decode2(iPacket, v437);
    sub_141195A30(a1, v438);
    v440 = CInPacket::Decode4(iPacket, v439);
    sub_14119F630(a1, v440);
  }
  if ( getBuffStat(mask, 361) )
  {
    v442 = CInPacket::Decode2(iPacket, v441);
    sub_14119B7C0(a1, v442);
    v444 = CInPacket::Decode4(iPacket, v443);
    sub_1411A4DC0(a1, v444);
  }
  if ( getBuffStat(mask, 362) )
  {
    v446 = CInPacket::Decode2(iPacket, v445);
    sub_141199210(a1, v446);
    v448 = CInPacket::Decode4(iPacket, v447);
    sub_1411A2930(a1, v448);
  }
  if ( getBuffStat(mask, 363) )
  {
    v450 = CInPacket::Decode2(iPacket, v449);
    sub_141194660(a1, v450);
    v452 = CInPacket::Decode4(iPacket, v451);
    sub_14119E370(a1, v452);
  }
  if ( getBuffStat(mask, 364) )
  {
    v454 = CInPacket::Decode2(iPacket, v453);
    sub_141195520(a1, v454);
    v456 = CInPacket::Decode4(iPacket, v455);
    sub_14119F120(a1, v456);
  }
  if ( getBuffStat(mask, 366) )
  {
    v458 = CInPacket::Decode2(iPacket, v457);
    sub_141196450(a1, v458);
    v460 = CInPacket::Decode4(iPacket, v459);
    sub_1411A0020(a1, v460);
  }
  if ( getBuffStat(mask, 375) )
  {
    v462 = CInPacket::Decode2(iPacket, v461);
    sub_1411998D0(a1, v462);
    v464 = CInPacket::Decode4(iPacket, v463);
    sub_1411A2FC0(a1, v464);
  }
  if ( getBuffStat(mask, 197) )
  {
    v466 = CInPacket::Decode2(iPacket, v465);
    sub_141193970(a1, v466);
    v468 = CInPacket::Decode4(iPacket, v467);
    sub_14119D680(a1, v468);
  }
  if ( getBuffStat(mask, 385) )
  {
    v470 = CInPacket::Decode2(iPacket, v469);
    sub_141199450(a1, v470);
    v472 = CInPacket::Decode4(iPacket, v471);
    sub_1411A2B70(a1, v472);
  }
  if ( getBuffStat(mask, 389) )
    sub_14119B9D0(a1, 1);
  if ( getBuffStat(mask, 390) )
  {
    v474 = CInPacket::Decode4(iPacket, v473);
    sub_141196D50(a1, v474);
  }
  if ( getBuffStat(mask, 390) )
  {
    v476 = CInPacket::Decode4(iPacket, v475);
    sub_1411AFC80(a1, v476);
  }
  if ( getBuffStat(mask, 370) )
  {
    v478 = CInPacket::Decode4(iPacket, v477);
    sub_14119FF30(a1, v478);
    v1449 = MEMORY[0x7FF952B74220]();
    v480 = CInPacket::Decode4(iPacket, v479);
    sub_1411AFB00(a1, (v480 + v1449));
  }
  if ( getBuffStat(mask, 295) ) // AntiMagicShell
  {
    v1445 = CInPacket::Decode1(iPacket, v481) != 0;
    sub_141191250(a1, v1445);
    v483 = CInPacket::Decode4(iPacket, v482);
    sub_1411A6140(a1, v483);
    if ( sub_1414288E0(a1) )
    {
      v1450 = sub_1414288E0(a1);
      v484 = MEMORY[0x7FF952B74220]();
      sub_1411A6140(a1, (v484 + v1450));
    }
  }
  if ( getBuffStat(mask, 178) )
  {
    v486 = CInPacket::Decode4(iPacket, v485);
    sub_141194AB0(a1, v486);
    v488 = CInPacket::Decode4(iPacket, v487);
    sub_14119E730(a1, v488);
  }
  if ( getBuffStat(mask, 406) )
  {
    v490 = CInPacket::Decode4(iPacket, v489);
    sub_14119AEF0(a1, v490);
    v492 = CInPacket::Decode4(iPacket, v491);
    sub_1411A4520(a1, v492);
  }
  if ( getBuffStat(mask, 406) )
  {
    v494 = CInPacket::Decode4(iPacket, v493);
    sub_1411B09D0(a1, v494);
  }
  if ( getBuffStat(mask, 407) )
  {
    v496 = CInPacket::Decode2(iPacket, v495);
    sub_141195970(a1, v496);
    v498 = CInPacket::Decode4(iPacket, v497);
    sub_14119F570(a1, v498);
  }
  if ( getBuffStat(mask, 452) )
  {
    v500 = CInPacket::Decode4(iPacket, v499);
    sub_141198130(a1, v500);
    v502 = CInPacket::Decode4(iPacket, v501);
    sub_1411A1910(a1, v502);
  }
  if ( getBuffStat(mask, 412) )
  {
    v504 = CInPacket::Decode2(iPacket, v503);
    sub_141194480(a1, v504);
    v506 = CInPacket::Decode4(iPacket, v505);
    sub_14119E190(a1, v506);
  }
  if ( getBuffStat(mask, 348) )
  {
    v508 = CInPacket::Decode2(iPacket, v507);
    sub_141196660(a1, v508);
    v510 = CInPacket::Decode4(iPacket, v509);
    sub_1411A01D0(a1, v510);
  }
  if ( getBuffStat(mask, 428) )
  {
    v512 = CInPacket::Decode2(iPacket, v511);
    sub_1411944E0(a1, v512);
    v514 = CInPacket::Decode4(iPacket, v513);
    sub_14119E1F0(a1, v514);
  }
  if ( getBuffStat(mask, 429) )
  {
    v516 = CInPacket::Decode2(iPacket, v515);
    sub_1411972F0(a1, v516);
    v518 = CInPacket::Decode4(iPacket, v517);
    sub_1411A0B90(a1, v518);
  }
  if ( getBuffStat(mask, 437) )
  {
    v520 = CInPacket::Decode2(iPacket, v519);
    sub_141193D60(a1, v520);
    v522 = CInPacket::Decode4(iPacket, v521);
    sub_14119DA70(a1, v522);
  }
  if ( getBuffStat(mask, 516) )
  {
    v524 = CInPacket::Decode2(iPacket, v523);
    sub_14119B790(a1, v524);
    v526 = CInPacket::Decode4(iPacket, v525);
    sub_1411A4D90(a1, v526);
  }
  if ( getBuffStat(mask, 517) )
  {
    v528 = CInPacket::Decode2(iPacket, v527);
    sub_141195640(a1, v528);
    v530 = CInPacket::Decode4(iPacket, v529);
    sub_14119F240(a1, v530);
  }
  if ( getBuffStat(mask, 518) )
  {
    v532 = CInPacket::Decode2(iPacket, v531);
    sub_141197D10(a1, v532);
    v534 = CInPacket::Decode4(iPacket, v533);
    sub_1411A1550(a1, v534);
  }
  if ( getBuffStat(mask, 519) )
  {
    v536 = CInPacket::Decode2(iPacket, v535);
    sub_141193FD0(a1, v536);
    v538 = CInPacket::Decode4(iPacket, v537);
    sub_14119DCE0(a1, v538);
  }
  if ( getBuffStat(mask, 520) )
  {
    v540 = CInPacket::Decode2(iPacket, v539);
    sub_141197E90(a1, v540);
    v542 = CInPacket::Decode4(iPacket, v541);
    sub_1411A16D0(a1, v542);
  }
  if ( getBuffStat(mask, 521) )
  {
    v544 = CInPacket::Decode2(iPacket, v543);
    sub_1411939A0(a1, v544);
    v546 = CInPacket::Decode4(iPacket, v545);
    sub_14119D6B0(a1, v546);
  }
  if ( getBuffStat(mask, 434) )
  {
    v548 = CInPacket::Decode2(iPacket, v547);
    sub_141194B10(a1, v548);
    v550 = CInPacket::Decode4(iPacket, v549);
    sub_14119E790(a1, v550);
  }
  if ( getBuffStat(mask, 435) )
  {
    v552 = CInPacket::Decode2(iPacket, v551);
    sub_141193010(a1, v552);
    v554 = CInPacket::Decode4(iPacket, v553);
    sub_14119CD20(a1, v554);
  }
  if ( getBuffStat(mask, 447) )
  {
    v556 = CInPacket::Decode2(iPacket, v555);
    sub_141195F10(a1, v556);
    v558 = CInPacket::Decode4(iPacket, v557);
    sub_14119FB10(a1, v558);
  }
  if ( getBuffStat(mask, 263) )
  {
    v560 = CInPacket::Decode2(iPacket, v559);
    sub_1411975C0(a1, v560);
    v562 = CInPacket::Decode4(iPacket, v561);
    sub_1411A0E00(a1, v562);
  }
  if ( getBuffStat(mask, 480) )
  {
    v564 = CInPacket::Decode2(iPacket, v563);
    sub_1411983A0(a1, v564);
    v566 = CInPacket::Decode4(iPacket, v565);
    sub_1411A1B50(a1, v566);
  }
  if ( getBuffStat(mask, 487) )
  {
    v568 = CInPacket::Decode4(iPacket, v567);
    sub_1411976B0(a1, v568);
    v570 = CInPacket::Decode4(iPacket, v569);
    sub_1411A0EF0(a1, v570);
  }
  if ( getBuffStat(mask, 488) )
  {
    v572 = CInPacket::Decode2(iPacket, v571);
    sub_141193B50(a1, v572);
    v574 = CInPacket::Decode4(iPacket, v573);
    sub_14119D860(a1, v574);
  }
  if ( getBuffStat(mask, 488) )
  {
    v576 = CInPacket::Decode4(iPacket, v575);
    sub_1411AF590(a1, v576);
  }
  if ( getBuffStat(mask, 493) )
  {
    v578 = CInPacket::Decode2(iPacket, v577);
    sub_141195D60(a1, v578);
    v580 = CInPacket::Decode4(iPacket, v579);
    sub_14119F960(a1, v580);
  }
  if ( getBuffStat(mask, 498) )
  {
    v582 = CInPacket::Decode4(iPacket, v581);
    sub_141192A40(a1, v582);
  }
  if ( getBuffStat(mask, 505) )
  {
    v584 = CInPacket::Decode4(iPacket, v583);
    sub_141199540(a1, v584);
  }
  if ( getBuffStat(mask, 503) )
  {
    v586 = CInPacket::Decode4(iPacket, v585);
    sub_141199690(a1, v586);
  }
  if ( getBuffStat(mask, 504) )
  {
    v588 = CInPacket::Decode4(iPacket, v587);
    sub_1411995D0(a1, v588);
  }
  if ( getBuffStat(mask, 741) )
  {
    v590 = CInPacket::Decode4(iPacket, v589);
    sub_14119A140(a1, v590);
  }
  if ( getBuffStat(mask, 791) )
  {
    v592 = CInPacket::Decode2(iPacket, v591);
    sub_141193DC0(a1, v592);
    v594 = CInPacket::Decode4(iPacket, v593);
    sub_14119DAD0(a1, v594);
  }
  if ( getBuffStat(mask, 744) )
  {
    v596 = CInPacket::Decode4(iPacket, v595);
    sub_1411946C0(a1, v596);
  }
  if ( getBuffStat(mask, 276) )
  {
    v598 = CInPacket::Decode2(iPacket, v597);
    sub_1411965D0(a1, v598);
    v600 = CInPacket::Decode4(iPacket, v599);
    sub_1411A01A0(a1, v600);
  }
  if ( getBuffStat(mask, 277) )
  {
    v602 = CInPacket::Decode2(iPacket, v601);
    sub_14119B130(a1, v602);
    v604 = CInPacket::Decode4(iPacket, v603);
    sub_1411A4760(a1, v604);
  }
  if ( getBuffStat(mask, 278) )
  {
    v606 = CInPacket::Decode2(iPacket, v605);
    sub_141197B00(a1, v606);
    v608 = CInPacket::Decode4(iPacket, v607);
    sub_1411A1340(a1, v608);
  }
  if ( getBuffStat(mask, 279) )
  {
    v610 = CInPacket::Decode2(iPacket, v609);
    sub_14119B550(a1, v610);
    v612 = CInPacket::Decode4(iPacket, v611);
    sub_1411A4B50(a1, v612);
  }
  if ( getBuffStat(mask, 280) )
  {
    v614 = CInPacket::Decode2(iPacket, v613);
    sub_141194300(a1, v614);
    v616 = CInPacket::Decode4(iPacket, v615);
    sub_14119E010(a1, v616);
  }
  if ( getBuffStat(mask, 511) )
  {
    v618 = CInPacket::Decode2(iPacket, v617);
    sub_14119AFE0(a1, v618);
    v620 = CInPacket::Decode4(iPacket, v619);
    sub_1411A4610(a1, v620);
  }
  if ( getBuffStat(mask, 449) )
  {
    v622 = CInPacket::Decode4(iPacket, v621);
    sub_141198E80(a1, v622);
    v624 = CInPacket::Decode4(iPacket, v623);
    sub_1411A25D0(a1, v624);
  }
  if ( getBuffStat(mask, 906) )
  {
    v626 = CInPacket::Decode4(iPacket, v625);
    sub_141194570(a1, v626);
  }
  if ( getBuffStat(mask, 908) )
  {
    v628 = CInPacket::Decode2(iPacket, v627);
    sub_1411945A0(a1, v628);
    v630 = CInPacket::Decode4(iPacket, v629);
    sub_14119E2B0(a1, v630);
  }
  if ( getBuffStat(mask, 905) )
  {
    v632 = CInPacket::Decode2(iPacket, v631);
    sub_14119A530(a1, v632);
    v634 = CInPacket::Decode4(iPacket, v633);
    sub_1411A3B90(a1, v634);
  }
  if ( getBuffStat(mask, 528) )
  {
    v636 = CInPacket::Decode4(iPacket, v635);
    sub_141198430(a1, v636);
    v638 = CInPacket::Decode4(iPacket, v637);
    sub_1411A1BE0(a1, v638);
  }
  if ( getBuffStat(mask, 529) )
  {
    v640 = CInPacket::Decode4(iPacket, v639);
    sub_141197770(a1, v640);
  }
  if ( getBuffStat(mask, 527) )
  {
    v642 = CInPacket::Decode4(iPacket, v641);
    sub_14119BFA0(a1, v642);
  }
  if ( getBuffStat(mask, 401) )
  {
    v644 = CInPacket::Decode2(iPacket, v643);
    sub_14142F8A0(a1, v644);
    v646 = CInPacket::Decode4(iPacket, v645);
    sub_1414301D0(a1, v646);
  }
  if ( getBuffStat(mask, 544) )
  {
    v648 = CInPacket::Decode2(iPacket, v647);
    sub_141198CA0(a1, v648);
    v650 = CInPacket::Decode4(iPacket, v649);
    sub_1411A2450(a1, v650);
  }
  if ( getBuffStat(mask, 543) )
  {
    v652 = CInPacket::Decode2(iPacket, v651);
    sub_141195E20(a1, v652);
    v654 = CInPacket::Decode4(iPacket, v653);
    sub_14119FA20(a1, v654);
  }
  if ( getBuffStat(mask, 542) )
  {
    v656 = CInPacket::Decode2(iPacket, v655);
    sub_141198D00(a1, v656);
    v658 = CInPacket::Decode4(iPacket, v657);
    sub_1411A24B0(a1, v658);
  }
  if ( getBuffStat(mask, 541) )
  {
    v660 = CInPacket::Decode2(iPacket, v659);
    sub_1411962A0(a1, v660);
    v662 = CInPacket::Decode4(iPacket, v661);
    sub_14119FE70(a1, v662);
  }
  if ( getBuffStat(mask, 110) )
  {
    v664 = CInPacket::Decode2(iPacket, v663);
    sub_141193C10(a1, v664);
    v666 = CInPacket::Decode4(iPacket, v665);
    sub_14119D920(a1, v666);
  }
  if ( getBuffStat(mask, 548) )
  {
    v668 = CInPacket::Decode2(iPacket, v667);
    sub_141194600(a1, v668);
    v670 = CInPacket::Decode4(iPacket, v669);
    sub_14119E310(a1, v670);
  }
  if ( getBuffStat(mask, 549) )
  {
    v672 = CInPacket::Decode2(iPacket, v671);
    sub_1411958E0(a1, v672);
    v674 = CInPacket::Decode4(iPacket, v673);
    sub_14119F4E0(a1, v674);
  }
  if ( getBuffStat(mask, 550) )
  {
    v676 = CInPacket::Decode2(iPacket, v675);
    sub_141199780(a1, v676);
    v678 = CInPacket::Decode4(iPacket, v677);
    sub_1411A2EA0(a1, v678);
  }
  if ( getBuffStat(mask, 551) )
  {
    v680 = CInPacket::Decode2(iPacket, v679);
    sub_141198C10(a1, v680);
    v682 = CInPacket::Decode4(iPacket, v681);
    sub_1411A23C0(a1, v682);
  }
  if ( getBuffStat(mask, 552) )
  {
    v684 = CInPacket::Decode2(iPacket, v683);
    sub_1411946F0(a1, v684);
    v686 = CInPacket::Decode4(iPacket, v685);
    sub_14119E400(a1, v686);
  }
  if ( getBuffStat(mask, 553) )
  {
    v688 = CInPacket::Decode2(iPacket, v687);
    sub_1411939D0(a1, v688);
    v690 = CInPacket::Decode4(iPacket, v689);
    sub_14119D6E0(a1, v690);
  }
  if ( getBuffStat(mask, 554) )
  {
    v692 = CInPacket::Decode2(iPacket, v691);
    sub_141193A00(a1, v692);
    v694 = CInPacket::Decode4(iPacket, v693);
    sub_14119D710(a1, v694);
  }
  if ( getBuffStat(mask, 555) )
  {
    v696 = CInPacket::Decode2(iPacket, v695);
    sub_141193A30(a1, v696);
    v698 = CInPacket::Decode4(iPacket, v697);
    sub_14119D740(a1, v698);
  }
  if ( getBuffStat(mask, 556) )
  {
    v700 = CInPacket::Decode2(iPacket, v699);
    sub_141196870(a1, v700);
    v702 = CInPacket::Decode4(iPacket, v701);
    sub_1411A03E0(a1, v702);
  }
  if ( getBuffStat(mask, 546) )
  {
    v704 = CInPacket::Decode2(iPacket, v703);
    sub_141197B60(a1, v704);
    v706 = CInPacket::Decode4(iPacket, v705);
    sub_1411A13A0(a1, v706);
  }
  if ( getBuffStat(mask, 557) )
  {
    v708 = CInPacket::Decode2(iPacket, v707);
    sub_141193F40(a1, v708);
    v710 = CInPacket::Decode4(iPacket, v709);
    sub_14119DC50(a1, v710);
  }
  if ( getBuffStat(mask, 557) )
  {
    v1451 = MEMORY[0x7FF952B74220]();
    v712 = CInPacket::Decode4(iPacket, v711);
    sub_1411A7220(a1, (v712 + v1451));
  }
  if ( getBuffStat(mask, 558) )
  {
    v714 = CInPacket::Decode4(iPacket, v713);
    sub_1411950A0(a1, v714);
    v716 = CInPacket::Decode4(iPacket, v715);
    sub_14119ECA0(a1, v716);
  }
  if ( getBuffStat(mask, 559) )
  {
    v718 = CInPacket::Decode2(iPacket, v717);
    sub_141196690(a1, v718);
    v720 = CInPacket::Decode4(iPacket, v719);
    sub_1411A0200(a1, v720);
  }
  if ( getBuffStat(mask, 560) )
  {
    v722 = CInPacket::Decode2(iPacket, v721);
    sub_141197B30(a1, v722);
    v724 = CInPacket::Decode4(iPacket, v723);
    sub_1411A1370(a1, v724);
  }
  if ( getBuffStat(mask, 570) )
  {
    v726 = CInPacket::Decode2(iPacket, v725);
    sub_14119AD70(a1, v726);
    v728 = CInPacket::Decode4(iPacket, v727);
    sub_1411A43D0(a1, v728);
  }
  if ( getBuffStat(mask, 575) )
  {
    v730 = CInPacket::Decode2(iPacket, v729);
    sub_1411944B0(a1, v730);
    v732 = CInPacket::Decode4(iPacket, v731);
    sub_14119E1C0(a1, v732);
  }
  if ( getBuffStat(mask, 576) )
  {
    v734 = CInPacket::Decode2(iPacket, v733);
    sub_141196570(a1, v734);
    v736 = CInPacket::Decode4(iPacket, v735);
    sub_1411A0140(a1, v736);
  }
  if ( getBuffStat(mask, 577) )
  {
    v738 = CInPacket::Decode2(iPacket, v737);
    sub_14119A980(a1, v738);
    v740 = CInPacket::Decode4(iPacket, v739);
    sub_1411A3FE0(a1, v740);
  }
  if ( getBuffStat(mask, 587) )
  {
    v742 = CInPacket::Decode2(iPacket, v741);
    sub_141193E80(a1, v742);
    v744 = CInPacket::Decode4(iPacket, v743);
    sub_14119DB90(a1, v744);
  }
  if ( getBuffStat(mask, 558) )
  {
    v1452 = MEMORY[0x7FF952B74220]();
    v746 = CInPacket::Decode4(iPacket, v745);
    sub_1411A8270(a1, (v746 + v1452));
  }
  if ( getBuffStat(mask, 599) )
    sub_141198400(a1, 1);
  if ( getBuffStat(mask, 286) )
  {
    v748 = CInPacket::Decode2(iPacket, v747);
    sub_1411964E0(a1, v748);
    v750 = CInPacket::Decode4(iPacket, v749);
    sub_1411A00B0(a1, v750);
  }
  if ( getBuffStat(mask, 617) )
  {
    v752 = CInPacket::Decode2(iPacket, v751);
    sub_14119A740(a1, v752);
    v754 = CInPacket::Decode4(iPacket, v753);
    sub_1411A3DA0(a1, v754);
  }
  if ( getBuffStat(mask, 620) )
  {
    v756 = CInPacket::Decode2(iPacket, v755);
    sub_141193820(a1, v756);
    v758 = CInPacket::Decode4(iPacket, v757);
    sub_14119D530(a1, v758);
  }
  if ( getBuffStat(mask, 621) )
  {
    v760 = CInPacket::Decode2(iPacket, v759);
    sub_1411937F0(a1, v760);
    v762 = CInPacket::Decode4(iPacket, v761);
    sub_14119D500(a1, v762);
  }
  if ( getBuffStat(mask, 622) )
  {
    v764 = CInPacket::Decode2(iPacket, v763);
    sub_141193730(a1, v764);
    v766 = CInPacket::Decode4(iPacket, v765);
    sub_14119D440(a1, v766);
  }
  if ( getBuffStat(mask, 623) )
  {
    v768 = CInPacket::Decode2(iPacket, v767);
    sub_141193850(a1, v768);
    v770 = CInPacket::Decode4(iPacket, v769);
    sub_14119D560(a1, v770);
  }
  if ( getBuffStat(mask, 624) )
    sub_141193880(a1, 1);
  if ( getBuffStat(mask, 625) )
  {
    v772 = CInPacket::Decode2(iPacket, v771);
    sub_141195A90(a1, v772);
    v774 = CInPacket::Decode4(iPacket, v773);
    sub_14119F690(a1, v774);
  }
  if ( getBuffStat(mask, 626) )
  {
    v776 = CInPacket::Decode2(iPacket, v775);
    sub_141195AC0(a1, v776);
    v778 = CInPacket::Decode4(iPacket, v777);
    sub_14119F6C0(a1, v778);
  }
  if ( getBuffStat(mask, 627) )
  {
    v780 = CInPacket::Decode2(iPacket, v779);
    sub_141195B20(a1, v780);
    v782 = CInPacket::Decode4(iPacket, v781);
    sub_14119F720(a1, v782);
  }
  if ( getBuffStat(mask, 628) )
  {
    v784 = CInPacket::Decode2(iPacket, v783);
    sub_141195B50(a1, v784);
    v786 = CInPacket::Decode4(iPacket, v785);
    sub_14119F750(a1, v786);
  }
  if ( getBuffStat(mask, 632) )
  {
    v788 = CInPacket::Decode2(iPacket, v787);
    sub_141199060(a1, v788);
    v790 = CInPacket::Decode4(iPacket, v789);
    sub_1411A27B0(a1, v790);
  }
  if ( getBuffStat(mask, 637) )
  {
    v792 = CInPacket::Decode2(iPacket, v791);
    sub_141198460(a1, v792);
    v794 = CInPacket::Decode4(iPacket, v793);
    sub_1411A1C10(a1, v794);
  }
  if ( getBuffStat(mask, 642) )
  {
    v796 = CInPacket::Decode2(iPacket, v795);
    sub_141192C80(a1, v796);
    v798 = CInPacket::Decode4(iPacket, v797);
    sub_14119C990(a1, v798);
  }
  if ( getBuffStat(mask, 611) )
  {
    v800 = CInPacket::Decode2(iPacket, v799);
    sub_141193A90(a1, v800);
    v802 = CInPacket::Decode4(iPacket, v801);
    sub_14119D7A0(a1, v802);
  }
  if ( getBuffStat(mask, 612) )
  {
    v804 = CInPacket::Decode2(iPacket, v803);
    sub_141193A60(a1, v804);
    v806 = CInPacket::Decode4(iPacket, v805);
    sub_14119D770(a1, v806);
  }
  if ( getBuffStat(mask, 613) )
  {
    v808 = CInPacket::Decode2(iPacket, v807);
    sub_141194EF0(a1, v808);
    v810 = CInPacket::Decode4(iPacket, v809);
    sub_14119EAF0(a1, v810);
  }
  if ( getBuffStat(mask, 614) )
  {
    v812 = CInPacket::Decode2(iPacket, v811);
    sub_141194EC0(a1, v812);
    v814 = CInPacket::Decode4(iPacket, v813);
    sub_14119EAC0(a1, v814);
  }
  if ( getBuffStat(mask, 650) )
  {
    v816 = CInPacket::Decode2(iPacket, v815);
    sub_141197C80(a1, v816);
    v818 = CInPacket::Decode4(iPacket, v817);
    sub_1411A14C0(a1, v818);
  }
  if ( getBuffStat(mask, 651) )
  {
    v820 = CInPacket::Decode2(iPacket, v819);
    sub_14119C090(a1, v820);
    v822 = CInPacket::Decode4(iPacket, v821);
    sub_1411A5660(a1, v822);
  }
  if ( getBuffStat(mask, 454) )
  {
    v824 = CInPacket::Decode2(iPacket, v823);
    sub_141199480(a1, v824);
    v826 = CInPacket::Decode4(iPacket, v825);
    sub_1411A2BA0(a1, v826);
  }
  if ( getBuffStat(mask, 660) )
  {
    v828 = CInPacket::Decode2(iPacket, v827);
    sub_141197C20(a1, v828);
    v830 = CInPacket::Decode4(iPacket, v829);
    sub_1411A1460(a1, v830);
  }
  if ( getBuffStat(mask, 662) )
  {
    v832 = CInPacket::Decode2(iPacket, v831);
    sub_141199F60(a1, v832);
    v834 = CInPacket::Decode4(iPacket, v833);
    sub_1411A35F0(a1, v834);
  }
  if ( getBuffStat(mask, 663) )
  {
    v836 = CInPacket::Decode2(iPacket, v835);
    sub_141199F30(a1, v836);
    v838 = CInPacket::Decode4(iPacket, v837);
    sub_1411A35C0(a1, v838);
  }
  if ( getBuffStat(mask, 664) )
  {
    v840 = CInPacket::Decode2(iPacket, v839);
    sub_141194CF0(a1, v840);
    v842 = CInPacket::Decode4(iPacket, v841);
    sub_14119E970(a1, v842);
  }
  if ( getBuffStat(mask, 665) )
  {
    v844 = CInPacket::Decode2(iPacket, v843);
    sub_141193340(a1, v844);
    v846 = CInPacket::Decode4(iPacket, v845);
    sub_14119D050(a1, v846);
  }
  if ( getBuffStat(mask, 666) )
  {
    v848 = CInPacket::Decode2(iPacket, v847);
    sub_1411932E0(a1, v848);
    v850 = CInPacket::Decode4(iPacket, v849);
    sub_14119CFF0(a1, v850);
  }
  if ( getBuffStat(mask, 667) )
  {
    v852 = CInPacket::Decode2(iPacket, v851);
    sub_141193250(a1, v852);
    v854 = CInPacket::Decode4(iPacket, v853);
    sub_14119CF60(a1, v854);
  }
  if ( getBuffStat(mask, 668) )
  {
    v856 = CInPacket::Decode2(iPacket, v855);
    sub_141193280(a1, v856);
    v858 = CInPacket::Decode4(iPacket, v857);
    sub_14119CF90(a1, v858);
  }
  if ( getBuffStat(mask, 669) )
  {
    v860 = CInPacket::Decode2(iPacket, v859);
    sub_1411932B0(a1, v860);
    v862 = CInPacket::Decode4(iPacket, v861);
    sub_14119CFC0(a1, v862);
  }
  if ( getBuffStat(mask, 670) )
  {
    v864 = CInPacket::Decode2(iPacket, v863);
    sub_141193310(a1, v864);
    v866 = CInPacket::Decode4(iPacket, v865);
    sub_14119D020(a1, v866);
  }
  if ( getBuffStat(mask, 671) )
  {
    v868 = CInPacket::Decode2(iPacket, v867);
    sub_141196B40(a1, v868);
    v870 = CInPacket::Decode4(iPacket, v869);
    sub_1411A0680(a1, v870);
  }
  if ( getBuffStat(mask, 672) )
  {
    v872 = CInPacket::Decode2(iPacket, v871);
    sub_1411977A0(a1, v872);
    v874 = CInPacket::Decode4(iPacket, v873);
    sub_1411A0FE0(a1, v874);
  }
  if ( getBuffStat(mask, 673) )
  {
    v876 = CInPacket::Decode2(iPacket, v875);
    sub_14119C1E0(a1, v876);
    v878 = CInPacket::Decode4(iPacket, v877);
    sub_1411A57B0(a1, v878);
  }
  if ( getBuffStat(mask, 674) )
  {
    v880 = CInPacket::Decode2(iPacket, v879);
    sub_141198BB0(a1, v880);
    v882 = CInPacket::Decode4(iPacket, v881);
    sub_1411A2360(a1, v882);
  }
  if ( getBuffStat(mask, 679) )
  {
    v884 = CInPacket::Decode2(iPacket, v883);
    sub_141192EC0(a1, v884);
    v886 = CInPacket::Decode4(iPacket, v885);
    sub_14119CBD0(a1, v886);
  }
  if ( getBuffStat(mask, 680) )
  {
    v888 = CInPacket::Decode2(iPacket, v887);
    sub_14119C060(a1, v888);
    v890 = CInPacket::Decode4(iPacket, v889);
    sub_1411A5630(a1, v890);
  }
  if ( getBuffStat(mask, 691) )
  {
    v892 = CInPacket::Decode2(iPacket, v891);
    sub_141194BD0(a1, v892);
    v894 = CInPacket::Decode4(iPacket, v893);
    sub_14119E850(a1, v894);
  }
  if ( getBuffStat(mask, 678) )
  {
    v896 = CInPacket::Decode2(iPacket, v895);
    sub_14119A350(a1, v896);
    v898 = CInPacket::Decode4(iPacket, v897);
    sub_1411A39B0(a1, v898);
  }
  if ( getBuffStat(mask, 694) )
  {
    v900 = CInPacket::Decode2(iPacket, v899);
    sub_141195880(a1, v900);
    v902 = CInPacket::Decode4(iPacket, v901);
    sub_14119F480(a1, v902);
  }
  if ( getBuffStat(mask, 701) )
  {
    v904 = CInPacket::Decode2(iPacket, v903);
    sub_1411987F0(a1, v904);
    v906 = CInPacket::Decode4(iPacket, v905);
    sub_1411A1FA0(a1, v906);
  }
  if ( getBuffStat(mask, 702) )
  {
    v908 = CInPacket::Decode2(iPacket, v907);
    sub_141198670(a1, v908);
    v910 = CInPacket::Decode4(iPacket, v909);
    sub_1411A1E20(a1, v910);
  }
  if ( getBuffStat(mask, 719) )
  {
    v912 = CInPacket::Decode2(iPacket, v911);
    sub_141192800(a1, v912);
    v914 = CInPacket::Decode4(iPacket, v913);
    sub_14119C540(a1, v914);
  }
  if ( getBuffStat(mask, 721) )
  {
    v916 = CInPacket::Decode2(iPacket, v915);
    sub_14119C150(a1, v916);
    v918 = CInPacket::Decode4(iPacket, v917);
    sub_1411A5720(a1, v918);
  }
  if ( getBuffStat(mask, 729) )
  {
    v920 = CInPacket::Decode2(iPacket, v919);
    sub_141192650(a1, v920);
    v922 = CInPacket::Decode4(iPacket, v921);
    sub_14119C390(a1, v922);
  }
  if ( getBuffStat(mask, 730) )
  {
    v924 = CInPacket::Decode2(iPacket, v923);
    sub_1411926B0(a1, v924);
    v926 = CInPacket::Decode4(iPacket, v925);
    sub_14119C3F0(a1, v926);
  }
  if ( getBuffStat(mask, 731) )
  {
    v928 = CInPacket::Decode2(iPacket, v927);
    sub_141192680(a1, v928);
    v930 = CInPacket::Decode4(iPacket, v929);
    sub_14119C3C0(a1, v930);
  }
  if ( getBuffStat(mask, 751) )
  {
    v932 = CInPacket::Decode2(iPacket, v931);
    sub_14119B940(a1, v932);
    v934 = CInPacket::Decode4(iPacket, v933);
    sub_1411A4F40(a1, v934);
  }
  if ( getBuffStat(mask, 753) )
  {
    v936 = CInPacket::Decode2(iPacket, v935);
    sub_141196B10(a1, v936);
    v938 = CInPacket::Decode4(iPacket, v937);
    sub_1411A0650(a1, v938);
  }
  if ( getBuffStat(mask, 761) )
  {
    v940 = CInPacket::Decode2(iPacket, v939);
    sub_141196120(a1, v940);
    v942 = CInPacket::Decode4(iPacket, v941);
    sub_14119FD20(a1, v942);
  }
  if ( getBuffStat(mask, 762) )
  {
    v944 = CInPacket::Decode2(iPacket, v943);
    sub_141196930(a1, v944);
    v946 = CInPacket::Decode4(iPacket, v945);
    sub_1411A04A0(a1, v946);
  }
  if ( getBuffStat(mask, 130) )
  {
    v948 = CInPacket::Decode2(iPacket, v947);
    sub_1411970E0(a1, v948);
    v950 = CInPacket::Decode4(iPacket, v949);
    sub_1411A0AA0(a1, v950);
  }
  if ( getBuffStat(mask, 195) )
  {
    v952 = CInPacket::Decode2(iPacket, v951);
    sub_14119B4F0(a1, v952);
    v954 = CInPacket::Decode4(iPacket, v953);
    sub_1411A4AF0(a1, v954);
  }
  if ( getBuffStat(mask, 378) )
  {
    v956 = CInPacket::Decode2(iPacket, v955);
    sub_1411942D0(a1, v956);
    v958 = CInPacket::Decode4(iPacket, v957);
    sub_14119DFE0(a1, v958);
  }
  if ( getBuffStat(mask, 193) )
  {
    v960 = CInPacket::Decode4(iPacket, v959);
    sub_141193CA0(a1, v960);
  }
  if ( getBuffStat(mask, 765) )
  {
    v962 = CInPacket::Decode2(iPacket, v961);
    sub_141197D40(a1, v962);
    v964 = CInPacket::Decode4(iPacket, v963);
    sub_1411A1580(a1, v964);
  }
  if ( getBuffStat(mask, 766) )
  {
    v966 = CInPacket::Decode2(iPacket, v965);
    sub_14119B760(a1, v966);
    v968 = CInPacket::Decode4(iPacket, v967);
    sub_1411A4D60(a1, v968);
  }
  if ( getBuffStat(mask, 770) )
  {
    v970 = CInPacket::Decode2(iPacket, v969);
    sub_141192F80(a1, v970);
    v972 = CInPacket::Decode4(iPacket, v971);
    sub_14119CC90(a1, v972);
  }
  if ( getBuffStat(mask, 450) )
  {
    v974 = CInPacket::Decode4(iPacket, v973);
    sub_141196270(a1, v974);
    v976 = CInPacket::Decode4(iPacket, v975);
    sub_14119FE40(a1, v976);
  }
  if ( getBuffStat(mask, 688) )
  {
    v978 = CInPacket::Decode4(iPacket, v977);
    sub_141197B90(a1, v978);
    v980 = CInPacket::Decode4(iPacket, v979);
    sub_1411A13D0(a1, v980);
  }
  if ( getBuffStat(mask, 484) )
  {
    v982 = CInPacket::Decode4(iPacket, v981);
    sub_141197710(a1, v982);
    v984 = CInPacket::Decode4(iPacket, v983);
    sub_1411A0F50(a1, v984);
  }
  if ( getBuffStat(mask, 792) )
  {
    v986 = CInPacket::Decode2(iPacket, v985);
    sub_141194540(a1, v986);
    v988 = CInPacket::Decode4(iPacket, v987);
    sub_14119E250(a1, v988);
  }
  if ( getBuffStat(mask, 795) )
  {
    v990 = CInPacket::Decode2(iPacket, v989);
    sub_141196000(a1, v990);
    v992 = CInPacket::Decode4(iPacket, v991);
    sub_14119FC00(a1, v992);
  }
  if ( getBuffStat(mask, 793) )
  {
    v994 = CInPacket::Decode2(iPacket, v993);
    sub_141196480(a1, v994);
    v996 = CInPacket::Decode4(iPacket, v995);
    sub_1411A0050(a1, v996);
  }
  if ( getBuffStat(mask, 794) )
  {
    v998 = CInPacket::Decode2(iPacket, v997);
    sub_141194AE0(a1, v998);
    v1000 = CInPacket::Decode4(iPacket, v999);
    sub_14119E760(a1, v1000);
  }
  if ( getBuffStat(mask, 759) )
  {
    v1002 = CInPacket::Decode2(iPacket, v1001);
    sub_141196510(a1, v1002);
    v1004 = CInPacket::Decode4(iPacket, v1003);
    sub_1411A00E0(a1, v1004);
  }
  if ( getBuffStat(mask, 796) )
  {
    v1006 = CInPacket::Decode2(iPacket, v1005);
    sub_14119B9A0(a1, v1006);
    v1008 = CInPacket::Decode4(iPacket, v1007);
    sub_1411A4FA0(a1, v1008);
  }
  if ( getBuffStat(mask, 797) )
  {
    v1010 = CInPacket::Decode2(iPacket, v1009);
    sub_14119BA00(a1, v1010);
    v1012 = CInPacket::Decode4(iPacket, v1011);
    sub_1411A5000(a1, v1012);
  }
  if ( getBuffStat(mask, 787) )
  {
    v1014 = CInPacket::Decode2(iPacket, v1013);
    sub_141197470(a1, v1014);
    v1016 = CInPacket::Decode4(iPacket, v1015);
    sub_1411A0CB0(a1, v1016);
  }
  if ( getBuffStat(mask, 798) )
  {
    v1018 = CInPacket::Decode2(iPacket, v1017);
    sub_1411994B0(a1, v1018);
    v1020 = CInPacket::Decode4(iPacket, v1019);
    sub_1411A2BD0(a1, v1020);
  }
  if ( getBuffStat(mask, 809) )
  {
    v1022 = CInPacket::Decode2(iPacket, v1021);
    sub_141198820(a1, v1022);
    v1024 = CInPacket::Decode4(iPacket, v1023);
    sub_1411A1FD0(a1, v1024);
  }
  if ( getBuffStat(mask, 812) )
  {
    v1026 = CInPacket::Decode2(iPacket, v1025);
    sub_141192A70(a1, v1026);
    v1028 = CInPacket::Decode4(iPacket, v1027);
    sub_14119C780(a1, v1028);
  }
  if ( getBuffStat(mask, 920) )
  {
    v1030 = CInPacket::Decode4(iPacket, v1029);
    sub_141192CB0(a1, v1030);
    v1032 = CInPacket::Decode4(iPacket, v1031);
    sub_14119C9C0(a1, v1032);
  }
  if ( getBuffStat(mask, 443) )
  {
    v1034 = CInPacket::Decode4(iPacket, v1033);
    sub_141195910(a1, v1034);
  }
  if ( getBuffStat(mask, 826) )
  {
    v1036 = CInPacket::Decode2(iPacket, v1035);
    sub_141195310(a1, v1036);
    v1038 = CInPacket::Decode4(iPacket, v1037);
    sub_14119EF40(a1, v1038);
  }
  if ( getBuffStat(mask, 235) )
  {
    v1040 = CInPacket::Decode2(iPacket, v1039);
    sub_141192B60(a1, v1040);
    v1042 = CInPacket::Decode4(iPacket, v1041);
    sub_14119C870(a1, v1042);
  }
  if ( getBuffStat(mask, 340) )
  {
    v1044 = CInPacket::Decode2(iPacket, v1043);
    sub_141195BE0(a1, v1044);
    v1046 = CInPacket::Decode4(iPacket, v1045);
    sub_14119F7E0(a1, v1046);
  }
  if ( getBuffStat(mask, 806) )
  {
    v1048 = CInPacket::Decode2(iPacket, v1047);
    sub_141199E10(a1, v1048);
    v1050 = CInPacket::Decode4(iPacket, v1049);
    sub_1411A34A0(a1, v1050);
  }
  if ( getBuffStat(mask, 807) )
  {
    v1052 = CInPacket::Decode2(iPacket, v1051);
    sub_141199DB0(a1, v1052);
    v1054 = CInPacket::Decode4(iPacket, v1053);
    sub_1411A3440(a1, v1054);
  }
  if ( getBuffStat(mask, 808) )
  {
    v1056 = CInPacket::Decode2(iPacket, v1055);
    sub_141199DE0(a1, v1056);
    v1058 = CInPacket::Decode4(iPacket, v1057);
    sub_1411A3470(a1, v1058);
  }
  if ( getBuffStat(mask, 831) )
  {
    v1060 = CInPacket::Decode2(iPacket, v1059);
    sub_14119B2B0(a1, v1060);
    v1062 = CInPacket::Decode4(iPacket, v1061);
    sub_1411A48E0(a1, v1062);
  }
  if ( getBuffStat(mask, 832) )
  {
    v1064 = CInPacket::Decode2(iPacket, v1063);
    sub_141199990(a1, v1064);
    v1066 = CInPacket::Decode4(iPacket, v1065);
    sub_1411A3080(a1, v1066);
  }
  if ( getBuffStat(mask, 838) )
  {
    v1068 = CInPacket::Decode2(iPacket, v1067);
    sub_1411963F0(a1, v1068);
    v1070 = CInPacket::Decode4(iPacket, v1069);
    sub_14119FFC0(a1, v1070);
  }
  if ( getBuffStat(mask, 861) )
  {
    v1072 = CInPacket::Decode2(iPacket, v1071);
    sub_14119A4A0(a1, v1072);
    v1074 = CInPacket::Decode4(iPacket, v1073);
    sub_1411A3B00(a1, v1074);
  }
  if ( getBuffStat(mask, 862) )
  {
    v1076 = CInPacket::Decode2(iPacket, v1075);
    sub_141194180(a1, v1076);
    v1078 = CInPacket::Decode4(iPacket, v1077);
    sub_14119DE90(a1, v1078);
  }
  if ( getBuffStat(mask, 842) )
  {
    v1080 = CInPacket::Decode2(iPacket, v1079);
    sub_141193AF0(a1, v1080);
    v1082 = CInPacket::Decode4(iPacket, v1081);
    sub_14119D800(a1, v1082);
  }
  if ( getBuffStat(mask, 842) )
  {
    v1084 = CInPacket::Decode4(iPacket, v1083);
    sub_1411AF560(a1, v1084);
  }
  if ( getBuffStat(mask, 850) )
  {
    v1086 = CInPacket::Decode2(iPacket, v1085);
    sub_141193AC0(a1, v1086);
    v1088 = CInPacket::Decode4(iPacket, v1087);
    sub_14119D7D0(a1, v1088);
  }
  if ( getBuffStat(mask, 843) )
  {
    v1090 = CInPacket::Decode2(iPacket, v1089);
    sub_141193B20(a1, v1090);
    v1092 = CInPacket::Decode4(iPacket, v1091);
    sub_14119D830(a1, v1092);
  }
  if ( getBuffStat(mask, 847) )
  {
    v1094 = CInPacket::Decode2(iPacket, v1093);
    sub_14119A080(a1, v1094);
    v1096 = CInPacket::Decode4(iPacket, v1095);
    sub_1411A3710(a1, v1096);
  }
  if ( getBuffStat(mask, 848) )
  {
    v1098 = CInPacket::Decode2(iPacket, v1097);
    sub_14119A0B0(a1, v1098);
    v1100 = CInPacket::Decode4(iPacket, v1099);
    sub_1411A3740(a1, v1100);
  }
  if ( getBuffStat(mask, 849) )
  {
    v1102 = CInPacket::Decode2(iPacket, v1101);
    sub_14119A0E0(a1, v1102);
    v1104 = CInPacket::Decode4(iPacket, v1103);
    sub_1411A3770(a1, v1104);
  }
  if ( getBuffStat(mask, 854) )
  {
    v1106 = CInPacket::Decode2(iPacket, v1105);
    sub_1411947B0(a1, v1106);
    v1108 = CInPacket::Decode4(iPacket, v1107);
    sub_14119E490(a1, v1108);
  }
  if ( getBuffStat(mask, 856) )
  {
    v1110 = CInPacket::Decode2(iPacket, v1109);
    sub_141193DF0(a1, v1110);
    v1112 = CInPacket::Decode4(iPacket, v1111);
    sub_14119DB00(a1, v1112);
  }
  if ( getBuffStat(mask, 125) )
  {
    v1114 = CInPacket::Decode2(iPacket, v1113);
    sub_14119AFB0(a1, v1114);
    v1116 = CInPacket::Decode4(iPacket, v1115);
    sub_1411A45E0(a1, v1116);
  }
  if ( getBuffStat(mask, 857) )
  {
    v1118 = CInPacket::Decode2(iPacket, v1117);
    sub_14119AA40(a1, v1118);
    v1120 = CInPacket::Decode4(iPacket, v1119);
    sub_1411A40A0(a1, v1120);
  }
  if ( getBuffStat(mask, 859) )
  {
    v1122 = CInPacket::Decode2(iPacket, v1121);
    sub_1411989A0(a1, v1122);
    v1124 = CInPacket::Decode4(iPacket, v1123);
    sub_1411A2150(a1, v1124);
  }
  if ( getBuffStat(mask, 860) )
  {
    v1126 = CInPacket::Decode2(iPacket, v1125);
    sub_141192E00(a1, v1126);
    v1128 = CInPacket::Decode4(iPacket, v1127);
    sub_14119CB10(a1, v1128);
  }
  if ( getBuffStat(mask, 844) )
  {
    v1130 = CInPacket::Decode2(iPacket, v1129);
    sub_141197500(a1, v1130);
    v1132 = CInPacket::Decode4(iPacket, v1131);
    sub_1411A0D40(a1, v1132);
  }
  if ( getBuffStat(mask, 864) )
  {
    v1134 = CInPacket::Decode2(iPacket, v1133);
    sub_14119BDF0(a1, v1134);
    v1136 = CInPacket::Decode4(iPacket, v1135);
    sub_1411A53C0(a1, v1136);
  }
  if ( getBuffStat(mask, 868) )
  {
    v1138 = CInPacket::Decode4(iPacket, v1137);
    sub_1411964B0(a1, v1138);
    v1140 = CInPacket::Decode4(iPacket, v1139);
    sub_1411A0080(a1, v1140);
  }
  if ( getBuffStat(mask, 869) )
  {
    v1142 = CInPacket::Decode4(iPacket, v1141);
    sub_14119BCA0(a1, v1142);
  }
  if ( getBuffStat(mask, 870) )
  {
    v1144 = CInPacket::Decode4(iPacket, v1143);
    sub_14119BC40(a1, v1144);
  }
  if ( getBuffStat(mask, 872) )
  {
    v1146 = CInPacket::Decode2(iPacket, v1145);
    sub_14119BC10(a1, v1146);
    v1148 = CInPacket::Decode4(iPacket, v1147);
    sub_1411A51E0(a1, v1148);
  }
  if ( getBuffStat(mask, 873) )
  {
    v1150 = CInPacket::Decode4(iPacket, v1149);
    sub_14119AD10(a1, v1150);
  }
  if ( getBuffStat(mask, 874) )
  {
    v1152 = CInPacket::Decode4(iPacket, v1151);
    sub_1411997E0(a1, v1152);
  }
  if ( getBuffStat(mask, 540) )
  {
    v1154 = CInPacket::Decode2(iPacket, v1153);
    sub_14119AF50(a1, v1154);
    v1156 = CInPacket::Decode4(iPacket, v1155);
    sub_1411A4580(a1, v1156);
  }
  if ( getBuffStat(mask, 538) )
  {
    v1158 = CInPacket::Decode2(iPacket, v1157);
    sub_141194630(a1, v1158);
    v1160 = CInPacket::Decode4(iPacket, v1159);
    sub_14119E340(a1, v1160);
  }
  if ( getBuffStat(mask, 886) )
  {
    v1162 = CInPacket::Decode2(iPacket, v1161);
    sub_141198520(a1, v1162);
    v1164 = CInPacket::Decode4(iPacket, v1163);
    sub_1411A1CD0(a1, v1164);
  }
  if ( getBuffStat(mask, 887) )
  {
    v1166 = CInPacket::Decode2(iPacket, v1165);
    sub_141198580(a1, v1166);
    v1168 = CInPacket::Decode4(iPacket, v1167);
    sub_1411A1D30(a1, v1168);
  }
  if ( getBuffStat(mask, 889) )
  {
    v1170 = CInPacket::Decode2(iPacket, v1169);
    sub_14119A410(a1, v1170);
    v1172 = CInPacket::Decode4(iPacket, v1171);
    sub_1411A3A70(a1, v1172);
  }
  if ( getBuffStat(mask, 893) )
  {
    v1174 = CInPacket::Decode2(iPacket, v1173);
    sub_141196AE0(a1, v1174);
    v1176 = CInPacket::Decode4(iPacket, v1175);
    sub_1411A0620(a1, v1176);
  }
  if ( getBuffStat(mask, 895) )
  {
    v1178 = CInPacket::Decode2(iPacket, v1177);
    sub_141198910(a1, v1178);
    v1180 = CInPacket::Decode4(iPacket, v1179);
    sub_1411A20C0(a1, v1180);
  }
  if ( getBuffStat(mask, 896) )
  {
    v1182 = CInPacket::Decode2(iPacket, v1181);
    sub_141198880(a1, v1182);
    v1184 = CInPacket::Decode4(iPacket, v1183);
    sub_1411A2030(a1, v1184);
  }
  if ( getBuffStat(mask, 897) )
  {
    v1186 = CInPacket::Decode2(iPacket, v1185);
    sub_1411988B0(a1, v1186);
    v1188 = CInPacket::Decode4(iPacket, v1187);
    sub_1411A2060(a1, v1188);
  }
  if ( getBuffStat(mask, 898) )
  {
    v1190 = CInPacket::Decode2(iPacket, v1189);
    sub_1411988E0(a1, v1190);
    v1192 = CInPacket::Decode4(iPacket, v1191);
    sub_1411A2090(a1, v1192);
  }
  if ( getBuffStat(mask, 899) )
  {
    v1194 = CInPacket::Decode2(iPacket, v1193);
    sub_14119A920(a1, v1194);
    v1196 = CInPacket::Decode4(iPacket, v1195);
    sub_1411A3F80(a1, v1196);
  }
  if ( getBuffStat(mask, 900) )
  {
    v1198 = CInPacket::Decode2(iPacket, v1197);
    sub_14119A9E0(a1, v1198);
    v1200 = CInPacket::Decode4(iPacket, v1199);
    sub_1411A4040(a1, v1200);
  }
  if ( getBuffStat(mask, 906) )
  {
    v1202 = CInPacket::Decode2(iPacket, v1201);
    sub_141194570(a1, v1202);
    v1204 = CInPacket::Decode4(iPacket, v1203);
    sub_14119E280(a1, v1204);
  }
  if ( getBuffStat(mask, 945) )
  {
    v1206 = CInPacket::Decode2(iPacket, v1205);
    sub_14142FDE0(a1, v1206);
    v1208 = CInPacket::Decode4(iPacket, v1207);
    sub_1414306E0(a1, v1208);
  }
  if ( getBuffStat(mask, 917) )
  {
    v1210 = CInPacket::Decode2(iPacket, v1209);
    sub_141199D50(a1, v1210);
    v1212 = CInPacket::Decode4(iPacket, v1211);
    sub_1411A33E0(a1, v1212);
  }
}
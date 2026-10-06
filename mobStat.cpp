_QWORD *__fastcall MobStat::DecodeTemporary(__int64 a1, _QWORD *a2, __int64 mask, __int64 iPacket, int a5)
{
  int i; // ebx
  __int64 v10; // r15
  unsigned int v11; // r12d
  int v12; // eax
  __int64 v13; // rdx
  int v14; // r15d
  __int64 v15; // rdx
  __int64 v16; // rdx
  char *v17; // rdx
  __int64 v18; // rdx
  __int64 v19; // rdx
  __int64 v20; // rdx
  char *v21; // rdx
  __int64 v22; // rdx
  __int64 v23; // rdx
  __int64 v24; // rdx
  char *v25; // rdx
  __int64 v26; // rdx
  __int64 v27; // rdx
  __int64 v28; // rdx
  char *v29; // rdx
  __int64 v30; // rdx
  __int64 v31; // rdx
  __int64 v32; // rdx
  char *v33; // rdx
  __int64 v34; // rdx
  __int64 v35; // rdx
  __int64 v36; // rdx
  char *v37; // rdx
  __int64 v38; // rdx
  __int64 v39; // rdx
  __int64 v40; // rdx
  char *v41; // rdx
  __int64 v42; // rdx
  __int64 v43; // rdx
  __int64 v44; // rdx
  char *v45; // rdx
  __int64 v46; // rdx
  __int64 v47; // rdx
  __int64 v48; // rdx
  char *v49; // rdx
  __int64 v50; // rdx
  __int64 v51; // rdx
  __int64 v52; // rdx
  char *v53; // rdx
  __int64 v54; // rdx
  __int64 v55; // rdx
  __int64 v56; // rdx
  char *v57; // rdx
  __int64 v58; // rdx
  __int64 v59; // rdx
  __int64 v60; // rdx
  char *v61; // rdx
  __int64 v62; // rdx
  __int64 v63; // rdx
  __int64 v64; // rdx
  char *v65; // rdx
  __int64 v66; // rdx
  __int64 v67; // rdx
  __int64 v68; // rdx
  char *v69; // rdx
  __int64 v70; // rdx
  __int64 v71; // rdx
  __int64 v72; // rdx
  char *v73; // rdx
  __int64 v74; // rdx
  __int64 v75; // rdx
  __int64 v76; // rdx
  char *v77; // rdx
  __int64 v78; // rdx
  __int64 v79; // rdx
  __int64 v80; // rdx
  char *v81; // rdx
  __int64 v82; // rdx
  __int64 v83; // rdx
  __int64 v84; // rdx
  char *v85; // rdx
  __int64 v86; // rdx
  __int64 v87; // rdx
  __int64 v88; // rdx
  char *v89; // rdx
  __int64 v90; // rdx
  __int64 v91; // rdx
  __int64 v92; // rdx
  char *v93; // rdx
  __int64 v94; // rdx
  __int64 v95; // rdx
  __int64 v96; // rdx
  char *v97; // rdx
  __int64 v98; // rdx
  __int64 v99; // rdx
  __int64 v100; // rdx
  char *v101; // rdx
  __int64 v102; // rdx
  __int64 v103; // rdx
  __int64 v104; // rdx
  char *v105; // rdx
  __int64 v106; // rdx
  __int64 v107; // rdx
  __int64 v108; // rdx
  char *v109; // rdx
  __int64 v110; // rdx
  __int64 v111; // rdx
  __int64 v112; // rdx
  char *v113; // rdx
  __int64 v114; // rdx
  __int64 v115; // rdx
  __int64 v116; // rdx
  char *v117; // rdx
  __int64 v118; // rdx
  __int64 v119; // rdx
  __int64 v120; // rdx
  char *v121; // rdx
  __int64 v122; // rdx
  __int64 v123; // rdx
  __int64 v124; // rdx
  char *v125; // rdx
  __int64 v126; // rdx
  __int64 v127; // rdx
  __int64 v128; // rdx
  char *v129; // rdx
  __int64 v130; // rdx
  __int64 v131; // rdx
  __int64 v132; // rdx
  char *v133; // rdx
  __int64 v134; // rdx
  __int64 v135; // rdx
  __int64 v136; // rdx
  char *v137; // rdx
  __int64 v138; // rdx
  __int64 v139; // rdx
  __int64 v140; // rdx
  char *v141; // rdx
  __int64 v142; // rdx
  __int64 v143; // rdx
  __int64 v144; // rdx
  char *v145; // rdx
  __int64 v146; // rdx
  __int64 v147; // rdx
  __int64 v148; // rdx
  char *v149; // rdx
  __int64 v150; // rdx
  __int64 v151; // rdx
  __int64 v152; // rdx
  char *v153; // rdx
  __int64 v154; // rdx
  __int64 v155; // rdx
  __int64 v156; // rdx
  char *v157; // rdx
  __int64 v158; // rdx
  __int64 v159; // rdx
  __int64 v160; // rdx
  char *v161; // rdx
  __int64 v162; // rdx
  __int64 v163; // rdx
  __int64 v164; // rdx
  char *v165; // rdx
  __int64 v166; // rdx
  __int64 v167; // rdx
  __int64 v168; // rdx
  char *v169; // rdx
  __int64 v170; // rdx
  __int64 v171; // rdx
  __int64 v172; // rdx
  char *v173; // rdx
  __int64 v174; // rdx
  __int64 v175; // rdx
  __int64 v176; // rdx
  char *v177; // rdx
  __int64 v178; // rdx
  __int64 v179; // rdx
  __int64 v180; // rdx
  char *v181; // rdx
  __int64 v182; // rdx
  __int64 v183; // rdx
  __int64 v184; // rdx
  char *v185; // rdx
  __int64 v186; // rdx
  __int64 v187; // rdx
  __int64 v188; // rdx
  char *v189; // rdx
  __int64 v190; // rdx
  __int64 v191; // rdx
  __int64 v192; // rdx
  char *v193; // rdx
  __int64 v194; // rdx
  __int64 v195; // rdx
  __int64 v196; // rdx
  char *v197; // rdx
  __int64 v198; // rdx
  __int64 v199; // rdx
  __int64 v200; // rdx
  char *v201; // rdx
  __int64 v202; // rdx
  __int64 v203; // rdx
  __int64 v204; // rdx
  char *v205; // rdx
  __int64 v206; // rdx
  __int64 v207; // rdx
  __int64 v208; // rdx
  char *v209; // rdx
  __int64 v210; // rdx
  __int64 v211; // rdx
  __int64 v212; // rdx
  char *v213; // rdx
  __int64 v214; // rdx
  __int64 v215; // rdx
  __int64 v216; // rdx
  char *v217; // rdx
  __int64 v218; // rdx
  __int64 v219; // rdx
  __int64 v220; // rdx
  char *v221; // rdx
  __int64 v222; // rdx
  __int64 v223; // rdx
  __int64 v224; // rdx
  char *v225; // rdx
  __int64 v226; // rdx
  __int64 v227; // rdx
  __int64 v228; // rdx
  char *v229; // rdx
  __int64 v230; // rdx
  __int64 v231; // rdx
  __int64 v232; // rdx
  char *v233; // rdx
  __int64 v234; // rdx
  __int64 v235; // rdx
  __int64 v236; // rdx
  char *v237; // rdx
  __int64 v238; // rdx
  __int64 v239; // rdx
  __int64 v240; // rdx
  char *v241; // rdx
  __int64 v242; // rdx
  __int64 v243; // rdx
  __int64 v244; // rdx
  char *v245; // rdx
  __int64 v246; // rdx
  __int64 v247; // rdx
  __int64 v248; // rdx
  char *v249; // rdx
  __int64 v250; // rdx
  __int64 v251; // rdx
  __int64 v252; // rdx
  char *v253; // rdx
  __int64 v254; // rdx
  __int64 v255; // rdx
  __int64 v256; // rdx
  char *v257; // rdx
  __int64 v258; // rdx
  __int64 v259; // rdx
  __int64 v260; // rdx
  char *v261; // rdx
  __int64 v262; // rdx
  __int64 v263; // rdx
  __int64 v264; // rdx
  char *v265; // rdx
  __int64 v266; // rdx
  __int64 v267; // rdx
  __int64 v268; // rdx
  char *v269; // rdx
  __int64 v270; // rdx
  __int64 v271; // rdx
  __int64 v272; // rdx
  char *v273; // rdx
  __int64 v274; // rdx
  __int64 v275; // rdx
  __int64 v276; // rdx
  char *v277; // rdx
  __int64 v278; // rdx
  __int64 v279; // rdx
  __int64 v280; // rdx
  char *v281; // rdx
  __int64 v282; // rdx
  __int64 v283; // rdx
  __int64 v284; // rdx
  char *v285; // rdx
  __int64 v286; // rdx
  __int64 v287; // rdx
  __int64 v288; // rdx
  char *v289; // rdx
  __int64 v290; // rdx
  __int64 v291; // rdx
  __int64 v292; // rdx
  char *v293; // rdx
  __int64 v294; // rdx
  __int64 v295; // rdx
  __int64 v296; // rdx
  char *v297; // rdx
  __int64 v298; // rdx
  __int64 v299; // rdx
  __int64 v300; // rdx
  char *v301; // rdx
  __int64 v302; // rdx
  __int64 v303; // rdx
  __int64 v304; // rdx
  char *v305; // rdx
  __int64 v306; // rdx
  __int64 v307; // rdx
  __int64 v308; // rdx
  char *v309; // rdx
  __int64 v310; // rdx
  __int64 v311; // rdx
  __int64 v312; // rdx
  char *v313; // rdx
  __int64 v314; // rdx
  __int64 v315; // rdx
  __int64 v316; // rdx
  char *v317; // rdx
  __int64 v318; // rdx
  __int64 v319; // rdx
  __int64 v320; // rdx
  char *v321; // rdx
  __int64 v322; // rdx
  __int64 v323; // rdx
  __int64 v324; // rdx
  char *v325; // rdx
  __int64 v326; // rdx
  __int64 v327; // rdx
  __int64 v328; // rdx
  char *v329; // rdx
  __int64 v330; // rdx
  __int64 v331; // rdx
  __int64 v332; // rdx
  char *v333; // rdx
  __int64 v334; // rdx
  __int64 v335; // rdx
  __int64 v336; // rdx
  char *v337; // rdx
  __int64 v338; // rdx
  __int64 v339; // rdx
  __int64 v340; // rdx
  char *v341; // rdx
  __int64 v342; // rdx
  __int64 v343; // rdx
  __int64 v344; // rdx
  char *v345; // rdx
  __int64 v346; // rdx
  __int64 v347; // rdx
  __int64 v348; // rdx
  char *v349; // rdx
  __int64 v350; // rdx
  __int64 v351; // rdx
  __int64 v352; // rdx
  char *v353; // rdx
  __int64 v354; // rdx
  __int64 v355; // rdx
  __int64 v356; // rdx
  char *v357; // rdx
  __int64 v358; // rdx
  __int64 v359; // rdx
  __int64 v360; // rdx
  char *v361; // rdx
  __int64 v362; // rdx
  __int64 v363; // rdx
  __int64 v364; // rdx
  char *v365; // rdx
  __int64 v366; // rdx
  __int64 v367; // rdx
  __int64 v368; // rdx
  char *v369; // rdx
  __int64 v370; // rdx
  __int64 v371; // rdx
  __int64 v372; // rdx
  char *v373; // rdx
  __int64 v374; // rdx
  __int64 v375; // rdx
  __int64 v376; // rdx
  char *v377; // rdx
  __int64 v378; // rdx
  __int64 v379; // rdx
  __int64 v380; // rdx
  char *v381; // rdx
  __int64 v382; // rdx
  __int64 v383; // rdx
  __int64 v384; // rdx
  char *v385; // rdx
  __int64 v386; // rdx
  __int64 v387; // rdx
  __int64 v388; // rdx
  char *v389; // rdx
  __int64 v390; // rdx
  __int64 v391; // rdx
  __int64 v392; // rdx
  char *v393; // rdx
  __int64 v394; // rdx
  __int64 v395; // rdx
  __int64 v396; // rdx
  char *v397; // rdx
  __int64 v398; // rdx
  __int64 v399; // rdx
  __int64 v400; // rdx
  char *v401; // rdx
  __int64 v402; // rdx
  __int64 v403; // rdx
  __int64 v404; // rdx
  char *v405; // rdx
  __int64 v406; // rdx
  __int64 v407; // rdx
  __int64 v408; // rdx
  char *v409; // rdx
  __int64 v410; // rdx
  __int64 v411; // rdx
  __int64 v412; // rdx
  char *v413; // rdx
  __int64 v414; // rdx
  __int64 v415; // rdx
  __int64 v416; // rdx
  char *v417; // rdx
  __int64 v418; // rdx
  __int64 v419; // rdx
  __int64 v420; // rdx
  char *v421; // rdx
  __int64 v422; // rdx
  __int64 v423; // rdx
  __int64 v424; // rdx
  char *v425; // rdx
  __int64 v426; // rdx
  __int64 v427; // rdx
  __int64 v428; // rdx
  char *v429; // rdx
  __int64 v430; // rdx
  __int64 v431; // rdx
  __int64 v432; // rdx
  char *v433; // rdx
  __int64 v434; // rdx
  __int64 v435; // rdx
  __int64 v436; // rdx
  char *v437; // rdx
  __int64 v438; // rdx
  __int64 v439; // rdx
  __int64 v440; // rdx
  char *v441; // rdx
  __int64 v442; // rdx
  __int64 v443; // rdx
  __int64 v444; // rdx
  char *v445; // rdx
  __int64 v446; // rdx
  __int64 v447; // rdx
  __int64 v448; // rdx
  __int64 v449; // rdx
  __int64 v450; // rdx
  __int64 v451; // rdx
  __int64 v452; // rdx
  __int64 v453; // rdx
  __int64 v454; // rdx
  __int64 v455; // rdx
  __int64 v456; // rdx
  __int64 v457; // rdx
  __int64 v458; // rdx
  __int64 v459; // rdx
  __int64 v460; // rdx
  __int64 v461; // rdx
  __int64 v462; // rdx
  __int64 v463; // rdx
  __int64 v464; // rdx
  __int64 v465; // rdx
  __int64 v466; // rdx
  __int64 v467; // rdx
  __int64 v468; // rdx
  __int64 v469; // rdx
  __int64 v470; // rdx
  __int64 v471; // rdx
  __int64 v472; // rdx
  __int64 v473; // rdx
  __int64 v474; // rdx
  __int64 v475; // rdx
  __int64 v476; // rdx
  __int64 v477; // rdx
  __int64 v478; // rdx
  __int64 v479; // rdx
  __int64 v480; // rdx
  __int64 v481; // rdx
  __int64 v482; // rdx
  int v483; // ebx
  __int64 v484; // rcx
  __int64 v485; // rdx
  __int64 v486; // rdx
  __int64 v487; // rdx
  __int64 v488; // rdx
  __int64 v489; // rdx
  __int64 v490; // rdx
  __int64 v491; // rdx
  __int64 v492; // rdx
  __int64 v493; // rdx
  __int64 v494; // rdx
  __int64 v495; // rdx
  __int64 v496; // rdx
  int v497; // r13d
  int j; // r12d
  __int64 v499; // rdx
  __int64 v500; // rdx
  __int64 v501; // rdx
  _QWORD *v502; // rbx
  __int64 v503; // rcx
  __int64 v504; // rdx
  __int64 v505; // rdx
  __int64 v506; // rdx
  __int64 v507; // rdx
  __int64 v508; // rdx
  __int64 v509; // rdx
  __int64 v510; // rdx
  __int64 v511; // rdx
  __int64 v512; // rdx
  __int64 v513; // rdx
  __int64 v514; // rdx
  __int64 v515; // rdx
  __int64 v516; // rdx
  __int64 v517; // rdx
  __int64 v518; // rdx
  __int64 v519; // rdx
  __int64 v520; // rdx
  __int64 v521; // rdx
  __int64 v522; // rdx
  __int64 v523; // rdx
  __int64 v524; // rdx
  __int64 v525; // rdx
  __int64 v526; // rdx
  __int64 v527; // rdx
  __int64 v528; // rdx
  __int64 v529; // rdx
  __int64 v530; // rdx
  __int64 v531; // rdx
  __int64 v532; // rdx
  __int64 v533; // rdx
  __int64 v534; // rdx
  __int64 v535; // rdx
  __int64 v536; // rdx
  __int64 v537; // rdx
  __int64 v538; // rdx
  char *v539; // rdx
  __int64 v540; // rdx
  __int64 v541; // rdx
  __int64 v542; // rdx
  __int64 v543; // rdx
  __int64 v544; // rdx
  _BYTE v546[36]; // [rsp+30h] [rbp-A8h] BYREF
  int v547; // [rsp+54h] [rbp-84h]
  int v548; // [rsp+64h] [rbp-74h]
  int v549; // [rsp+68h] [rbp-70h]
  __int64 k; // [rsp+E0h] [rbp+8h] BYREF
  _QWORD *v551; // [rsp+E8h] [rbp+10h]

  v551 = a2;
  *a2 = 0;
  a2[1] = 0;
  a2[2] = 0;
  for ( i = 0; ; ++i )
  {
    v10 = *(a1 + 1968);
    if ( !v10 )
      break;
    v11 = *(v10 - 8);
    if ( i >= v11 )
      break;
    if ( CMobFlag_Getter(mask, i) )
    {
      if ( i < 0 )
      {
        sub_1455C18F0(177, i, v11);
        v10 = *(a1 + 1968);
      }
      sub_140761C30(v10 + 48LL * i, iPacket);
    }
  }
  v12 = CMobFlag_Getter(mask, 11u);
  v14 = a5;
  if ( v12 )
  {
    *(a1 + 44) = CInPacket::Decode4(iPacket, v13);
    *(a1 + 48) = CInPacket::Decode4(iPacket, v15);
    *(a1 + 52) = v14 + 500 * CInPacket::Decode2(iPacket, v16);
    v17 = a2[1];
    if ( v17 == a2[2] )
    {
      sub_140299650(a2, v17, (a1 + 48));
    }
    else
    {
      *v17 = *(a1 + 48);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 12u) )
  {
    *(a1 + 60) = CInPacket::Decode4(iPacket, v18);
    *(a1 + 64) = CInPacket::Decode4(iPacket, v19);
    *(a1 + 68) = v14 + 500 * CInPacket::Decode2(iPacket, v20);
    v21 = a2[1];
    if ( v21 == a2[2] )
    {
      sub_140299650(a2, v21, (a1 + 64));
    }
    else
    {
      *v21 = *(a1 + 64);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 13u) )
  {
    *(a1 + 84) = CInPacket::Decode4(iPacket, v22);
    *(a1 + 88) = CInPacket::Decode4(iPacket, v23);
    *(a1 + 92) = v14 + 500 * CInPacket::Decode2(iPacket, v24);
    v25 = a2[1];
    if ( v25 == a2[2] )
    {
      sub_140299650(a2, v25, (a1 + 88));
    }
    else
    {
      *v25 = *(a1 + 88);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0xEu) )
  {
    *(a1 + 100) = CInPacket::Decode4(iPacket, v26);
    *(a1 + 104) = CInPacket::Decode4(iPacket, v27);
    *(a1 + 108) = v14 + 500 * CInPacket::Decode2(iPacket, v28);
    v29 = a2[1];
    if ( v29 == a2[2] )
    {
      sub_140299650(a2, v29, (a1 + 104));
    }
    else
    {
      *v29 = *(a1 + 104);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0xFu) )
  {
    *(a1 + 124) = CInPacket::Decode4(iPacket, v30);
    *(a1 + 128) = CInPacket::Decode4(iPacket, v31);
    *(a1 + 132) = v14 + 500 * CInPacket::Decode2(iPacket, v32);
    v33 = a2[1];
    if ( v33 == a2[2] )
    {
      sub_140299650(a2, v33, (a1 + 128));
    }
    else
    {
      *v33 = *(a1 + 128);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x10u) )
  {
    *(a1 + 140) = CInPacket::Decode4(iPacket, v34);
    *(a1 + 144) = CInPacket::Decode4(iPacket, v35);
    *(a1 + 148) = v14 + 500 * CInPacket::Decode2(iPacket, v36);
    v37 = a2[1];
    if ( v37 == a2[2] )
    {
      sub_140299650(a2, v37, (a1 + 144));
    }
    else
    {
      *v37 = *(a1 + 144);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x11u) )
  {
    *(a1 + 156) = CInPacket::Decode4(iPacket, v38);
    *(a1 + 160) = CInPacket::Decode4(iPacket, v39);
    *(a1 + 164) = v14 + 500 * CInPacket::Decode2(iPacket, v40);
    v41 = a2[1];
    if ( v41 == a2[2] )
    {
      sub_140299650(a2, v41, (a1 + 160));
    }
    else
    {
      *v41 = *(a1 + 160);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x12u) )
  {
    *(a1 + 172) = CInPacket::Decode4(iPacket, v42);
    *(a1 + 176) = CInPacket::Decode4(iPacket, v43);
    *(a1 + 180) = v14 + 500 * CInPacket::Decode2(iPacket, v44);
    v45 = a2[1];
    if ( v45 == a2[2] )
    {
      sub_140299650(a2, v45, (a1 + 176));
    }
    else
    {
      *v45 = *(a1 + 176);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x13u) )
  {
    *(a1 + 184) = CInPacket::Decode4(iPacket, v46);
    *(a1 + 188) = CInPacket::Decode4(iPacket, v47);
    *(a1 + 192) = v14 + 500 * CInPacket::Decode2(iPacket, v48);
    v49 = a2[1];
    if ( v49 == a2[2] )
    {
      sub_140299650(a2, v49, (a1 + 188));
    }
    else
    {
      *v49 = *(a1 + 188);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x14u) )
  {
    *(a1 + 196) = CInPacket::Decode4(iPacket, v50);
    *(a1 + 200) = CInPacket::Decode4(iPacket, v51);
    *(a1 + 204) = v14 + 500 * CInPacket::Decode2(iPacket, v52);
    v53 = a2[1];
    if ( v53 == a2[2] )
    {
      sub_140299650(a2, v53, (a1 + 200));
    }
    else
    {
      *v53 = *(a1 + 200);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x15u) )
  {
    *(a1 + 212) = CInPacket::Decode4(iPacket, v54);
    *(a1 + 216) = CInPacket::Decode4(iPacket, v55);
    *(a1 + 220) = v14 + 500 * CInPacket::Decode2(iPacket, v56);
    v57 = a2[1];
    if ( v57 == a2[2] )
    {
      sub_140299650(a2, v57, (a1 + 216));
    }
    else
    {
      *v57 = *(a1 + 216);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x16u) )
  {
    *(a1 + 228) = CInPacket::Decode4(iPacket, v58);
    *(a1 + 232) = CInPacket::Decode4(iPacket, v59);
    *(a1 + 236) = v14 + 500 * CInPacket::Decode2(iPacket, v60);
    v61 = a2[1];
    if ( v61 == a2[2] )
    {
      sub_140299650(a2, v61, (a1 + 232));
    }
    else
    {
      *v61 = *(a1 + 232);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x17u) )
  {
    *(a1 + 248) = CInPacket::Decode4(iPacket, v62);
    *(a1 + 252) = CInPacket::Decode4(iPacket, v63);
    *(a1 + 256) = v14 + 500 * CInPacket::Decode2(iPacket, v64);
    v65 = a2[1];
    if ( v65 == a2[2] )
    {
      sub_140299650(a2, v65, (a1 + 252));
    }
    else
    {
      *v65 = *(a1 + 252);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x18u) )
  {
    *(a1 + 260) = CInPacket::Decode4(iPacket, v66);
    *(a1 + 264) = CInPacket::Decode4(iPacket, v67);
    *(a1 + 268) = v14 + 500 * CInPacket::Decode2(iPacket, v68);
    v69 = a2[1];
    if ( v69 == a2[2] )
    {
      sub_140299650(a2, v69, (a1 + 264));
    }
    else
    {
      *v69 = *(a1 + 264);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x19u) )
  {
    *(a1 + 272) = CInPacket::Decode4(iPacket, v70);
    *(a1 + 276) = CInPacket::Decode4(iPacket, v71);
    *(a1 + 280) = v14 + 500 * CInPacket::Decode2(iPacket, v72);
    v73 = a2[1];
    if ( v73 == a2[2] )
    {
      sub_140299650(a2, v73, (a1 + 276));
    }
    else
    {
      *v73 = *(a1 + 276);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x1Au) )
  {
    *(a1 + 288) = CInPacket::Decode4(iPacket, v74);
    *(a1 + 292) = CInPacket::Decode4(iPacket, v75);
    *(a1 + 296) = v14 + 500 * CInPacket::Decode2(iPacket, v76);
    v77 = a2[1];
    if ( v77 == a2[2] )
    {
      sub_140299650(a2, v77, (a1 + 292));
    }
    else
    {
      *v77 = *(a1 + 292);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x1Bu) )
  {
    *(a1 + 300) = CInPacket::Decode4(iPacket, v78);
    *(a1 + 304) = CInPacket::Decode4(iPacket, v79);
    *(a1 + 308) = v14 + 500 * CInPacket::Decode2(iPacket, v80);
    v81 = a2[1];
    if ( v81 == a2[2] )
    {
      sub_140299650(a2, v81, (a1 + 304));
    }
    else
    {
      *v81 = *(a1 + 304);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x1Cu) )
  {
    *(a1 + 312) = CInPacket::Decode4(iPacket, v82);
    *(a1 + 316) = CInPacket::Decode4(iPacket, v83);
    *(a1 + 320) = v14 + 500 * CInPacket::Decode2(iPacket, v84);
    v85 = a2[1];
    if ( v85 == a2[2] )
    {
      sub_140299650(a2, v85, (a1 + 316));
    }
    else
    {
      *v85 = *(a1 + 316);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x1Du) )
  {
    *(a1 + 336) = CInPacket::Decode4(iPacket, v86);
    *(a1 + 340) = CInPacket::Decode4(iPacket, v87);
    *(a1 + 344) = v14 + 500 * CInPacket::Decode2(iPacket, v88);
    v89 = a2[1];
    if ( v89 == a2[2] )
    {
      sub_140299650(a2, v89, (a1 + 340));
    }
    else
    {
      *v89 = *(a1 + 340);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x1Eu) )
  {
    *(a1 + 348) = CInPacket::Decode4(iPacket, v90);
    *(a1 + 352) = CInPacket::Decode4(iPacket, v91);
    *(a1 + 356) = v14 + 500 * CInPacket::Decode2(iPacket, v92);
    v93 = a2[1];
    if ( v93 == a2[2] )
    {
      sub_140299650(a2, v93, (a1 + 352));
    }
    else
    {
      *v93 = *(a1 + 352);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x1Fu) )
  {
    *(a1 + 324) = CInPacket::Decode4(iPacket, v94);
    *(a1 + 328) = CInPacket::Decode4(iPacket, v95);
    *(a1 + 332) = v14 + 500 * CInPacket::Decode2(iPacket, v96);
    v97 = a2[1];
    if ( v97 == a2[2] )
    {
      sub_140299650(a2, v97, (a1 + 328));
    }
    else
    {
      *v97 = *(a1 + 328);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x20u) )
  {
    *(a1 + 400) = CInPacket::Decode4(iPacket, v98);
    *(a1 + 404) = CInPacket::Decode4(iPacket, v99);
    *(a1 + 408) = v14 + 500 * CInPacket::Decode2(iPacket, v100);
    v101 = a2[1];
    if ( v101 == a2[2] )
    {
      sub_140299650(a2, v101, (a1 + 404));
    }
    else
    {
      *v101 = *(a1 + 404);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x21u) )
  {
    *(a1 + 412) = CInPacket::Decode4(iPacket, v102);
    *(a1 + 416) = CInPacket::Decode4(iPacket, v103);
    *(a1 + 420) = v14 + 500 * CInPacket::Decode2(iPacket, v104);
    v105 = a2[1];
    if ( v105 == a2[2] )
    {
      sub_140299650(a2, v105, (a1 + 416));
    }
    else
    {
      *v105 = *(a1 + 416);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x22u) )
  {
    *(a1 + 428) = CInPacket::Decode4(iPacket, v106);
    *(a1 + 432) = CInPacket::Decode4(iPacket, v107);
    *(a1 + 436) = v14 + 500 * CInPacket::Decode2(iPacket, v108);
    v109 = a2[1];
    if ( v109 == a2[2] )
    {
      sub_140299650(a2, v109, (a1 + 432));
    }
    else
    {
      *v109 = *(a1 + 432);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x23u) )
  {
    *(a1 + 444) = CInPacket::Decode4(iPacket, v110);
    *(a1 + 448) = CInPacket::Decode4(iPacket, v111);
    *(a1 + 452) = v14 + 500 * CInPacket::Decode2(iPacket, v112);
    v113 = a2[1];
    if ( v113 == a2[2] )
    {
      sub_140299650(a2, v113, (a1 + 448));
    }
    else
    {
      *v113 = *(a1 + 448);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x24u) )
  {
    *(a1 + 456) = CInPacket::Decode4(iPacket, v114);
    *(a1 + 460) = CInPacket::Decode4(iPacket, v115);
    *(a1 + 464) = v14 + 500 * CInPacket::Decode2(iPacket, v116);
    v117 = a2[1];
    if ( v117 == a2[2] )
    {
      sub_140299650(a2, v117, (a1 + 460));
    }
    else
    {
      *v117 = *(a1 + 460);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x25u) )
  {
    *(a1 + 468) = CInPacket::Decode4(iPacket, v118);
    *(a1 + 472) = CInPacket::Decode4(iPacket, v119);
    *(a1 + 476) = v14 + 500 * CInPacket::Decode2(iPacket, v120);
    v121 = a2[1];
    if ( v121 == a2[2] )
    {
      sub_140299650(a2, v121, (a1 + 472));
    }
    else
    {
      *v121 = *(a1 + 472);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x26u) )
  {
    *(a1 + 492) = CInPacket::Decode4(iPacket, v122);
    *(a1 + 496) = CInPacket::Decode4(iPacket, v123);
    *(a1 + 500) = v14 + 500 * CInPacket::Decode2(iPacket, v124);
    v125 = a2[1];
    if ( v125 == a2[2] )
    {
      sub_140299650(a2, v125, (a1 + 496));
    }
    else
    {
      *v125 = *(a1 + 496);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x27u) )
  {
    *(a1 + 508) = CInPacket::Decode4(iPacket, v126);
    *(a1 + 512) = CInPacket::Decode4(iPacket, v127);
    *(a1 + 516) = v14 + 500 * CInPacket::Decode2(iPacket, v128);
    v129 = a2[1];
    if ( v129 == a2[2] )
    {
      sub_140299650(a2, v129, (a1 + 512));
    }
    else
    {
      *v129 = *(a1 + 512);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x28u) )
  {
    *(a1 + 480) = CInPacket::Decode4(iPacket, v130);
    *(a1 + 484) = CInPacket::Decode4(iPacket, v131);
    *(a1 + 488) = v14 + 500 * CInPacket::Decode2(iPacket, v132);
    v133 = a2[1];
    if ( v133 == a2[2] )
    {
      sub_140299650(a2, v133, (a1 + 484));
    }
    else
    {
      *v133 = *(a1 + 484);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x29u) )
  {
    *(a1 + 540) = CInPacket::Decode4(iPacket, v134);
    *(a1 + 544) = CInPacket::Decode4(iPacket, v135);
    *(a1 + 548) = v14 + 500 * CInPacket::Decode2(iPacket, v136);
    v137 = a2[1];
    if ( v137 == a2[2] )
    {
      sub_140299650(a2, v137, (a1 + 544));
    }
    else
    {
      *v137 = *(a1 + 544);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x2Au) )
  {
    *(a1 + 372) = CInPacket::Decode4(iPacket, v138);
    *(a1 + 376) = CInPacket::Decode4(iPacket, v139);
    *(a1 + 380) = v14 + 500 * CInPacket::Decode2(iPacket, v140);
    v141 = a2[1];
    if ( v141 == a2[2] )
    {
      sub_140299650(a2, v141, (a1 + 376));
    }
    else
    {
      *v141 = *(a1 + 376);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x2Bu) )
  {
    *(a1 + 384) = CInPacket::Decode4(iPacket, v142);
    *(a1 + 388) = CInPacket::Decode4(iPacket, v143);
    *(a1 + 392) = v14 + 500 * CInPacket::Decode2(iPacket, v144);
    v145 = a2[1];
    if ( v145 == a2[2] )
    {
      sub_140299650(a2, v145, (a1 + 388));
    }
    else
    {
      *v145 = *(a1 + 388);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x2Cu) )
  {
    *(a1 + 572) = CInPacket::Decode4(iPacket, v146);
    *(a1 + 576) = CInPacket::Decode4(iPacket, v147);
    *(a1 + 580) = v14 + 500 * CInPacket::Decode2(iPacket, v148);
    v149 = a2[1];
    if ( v149 == a2[2] )
    {
      sub_140299650(a2, v149, (a1 + 576));
    }
    else
    {
      *v149 = *(a1 + 576);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x2Du) )
  {
    *(a1 + 584) = CInPacket::Decode4(iPacket, v150);
    *(a1 + 588) = CInPacket::Decode4(iPacket, v151);
    *(a1 + 592) = v14 + 500 * CInPacket::Decode2(iPacket, v152);
    v153 = a2[1];
    if ( v153 == a2[2] )
    {
      sub_140299650(a2, v153, (a1 + 588));
    }
    else
    {
      *v153 = *(a1 + 588);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x2Eu) )
  {
    *(a1 + 620) = CInPacket::Decode4(iPacket, v154);
    *(a1 + 624) = CInPacket::Decode4(iPacket, v155);
    *(a1 + 628) = v14 + 500 * CInPacket::Decode2(iPacket, v156);
    v157 = a2[1];
    if ( v157 == a2[2] )
    {
      sub_140299650(a2, v157, (a1 + 624));
    }
    else
    {
      *v157 = *(a1 + 624);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x2Fu) )
  {
    *(a1 + 644) = CInPacket::Decode4(iPacket, v158);
    *(a1 + 648) = CInPacket::Decode4(iPacket, v159);
    *(a1 + 652) = v14 + 500 * CInPacket::Decode2(iPacket, v160);
    v161 = a2[1];
    if ( v161 == a2[2] )
    {
      sub_140299650(a2, v161, (a1 + 648));
    }
    else
    {
      *v161 = *(a1 + 648);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x30u) )
  {
    *(a1 + 668) = CInPacket::Decode4(iPacket, v162);
    *(a1 + 672) = CInPacket::Decode4(iPacket, v163);
    *(a1 + 676) = v14 + 500 * CInPacket::Decode2(iPacket, v164);
    v165 = a2[1];
    if ( v165 == a2[2] )
    {
      sub_140299650(a2, v165, (a1 + 672));
    }
    else
    {
      *v165 = *(a1 + 672);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x31u) )
  {
    *(a1 + 732) = CInPacket::Decode4(iPacket, v166);
    *(a1 + 736) = CInPacket::Decode4(iPacket, v167);
    *(a1 + 740) = v14 + 500 * CInPacket::Decode2(iPacket, v168);
    v169 = a2[1];
    if ( v169 == a2[2] )
    {
      sub_140299650(a2, v169, (a1 + 736));
    }
    else
    {
      *v169 = *(a1 + 736);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x32u) )
  {
    *(a1 + 748) = CInPacket::Decode4(iPacket, v170);
    *(a1 + 752) = CInPacket::Decode4(iPacket, v171);
    *(a1 + 756) = v14 + 500 * CInPacket::Decode2(iPacket, v172);
    v173 = a2[1];
    if ( v173 == a2[2] )
    {
      sub_140299650(a2, v173, (a1 + 752));
    }
    else
    {
      *v173 = *(a1 + 752);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x33u) )
  {
    *(a1 + 768) = CInPacket::Decode4(iPacket, v174);
    *(a1 + 772) = CInPacket::Decode4(iPacket, v175);
    *(a1 + 776) = v14 + 500 * CInPacket::Decode2(iPacket, v176);
    v177 = a2[1];
    if ( v177 == a2[2] )
    {
      sub_140299650(a2, v177, (a1 + 772));
    }
    else
    {
      *v177 = *(a1 + 772);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x34u) )
  {
    *(a1 + 832) = CInPacket::Decode4(iPacket, v178);
    *(a1 + 836) = CInPacket::Decode4(iPacket, v179);
    *(a1 + 840) = v14 + 500 * CInPacket::Decode2(iPacket, v180);
    v181 = a2[1];
    if ( v181 == a2[2] )
    {
      sub_140299650(a2, v181, (a1 + 836));
    }
    else
    {
      *v181 = *(a1 + 836);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x35u) )
  {
    *(a1 + 844) = CInPacket::Decode4(iPacket, v182);
    *(a1 + 848) = CInPacket::Decode4(iPacket, v183);
    *(a1 + 852) = v14 + 500 * CInPacket::Decode2(iPacket, v184);
    v185 = a2[1];
    if ( v185 == a2[2] )
    {
      sub_140299650(a2, v185, (a1 + 848));
    }
    else
    {
      *v185 = *(a1 + 848);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x36u) )
  {
    *(a1 + 912) = CInPacket::Decode4(iPacket, v186);
    *(a1 + 916) = CInPacket::Decode4(iPacket, v187);
    *(a1 + 920) = v14 + 500 * CInPacket::Decode2(iPacket, v188);
    v189 = a2[1];
    if ( v189 == a2[2] )
    {
      sub_140299650(a2, v189, (a1 + 916));
    }
    else
    {
      *v189 = *(a1 + 916);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x37u) )
  {
    *(a1 + 936) = CInPacket::Decode4(iPacket, v190);
    *(a1 + 940) = CInPacket::Decode4(iPacket, v191);
    *(a1 + 944) = v14 + 500 * CInPacket::Decode2(iPacket, v192);
    v193 = a2[1];
    if ( v193 == a2[2] )
    {
      sub_140299650(a2, v193, (a1 + 940));
    }
    else
    {
      *v193 = *(a1 + 940);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x38u) )
  {
    *(a1 + 948) = CInPacket::Decode4(iPacket, v194);
    *(a1 + 952) = CInPacket::Decode4(iPacket, v195);
    *(a1 + 956) = v14 + 500 * CInPacket::Decode2(iPacket, v196);
    v197 = a2[1];
    if ( v197 == a2[2] )
    {
      sub_140299650(a2, v197, (a1 + 952));
    }
    else
    {
      *v197 = *(a1 + 952);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x39u) )
  {
    *(a1 + 960) = CInPacket::Decode4(iPacket, v198);
    *(a1 + 964) = CInPacket::Decode4(iPacket, v199);
    *(a1 + 968) = v14 + 500 * CInPacket::Decode2(iPacket, v200);
    v201 = a2[1];
    if ( v201 == a2[2] )
    {
      sub_140299650(a2, v201, (a1 + 964));
    }
    else
    {
      *v201 = *(a1 + 964);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x3Au) )
  {
    *(a1 + 972) = CInPacket::Decode4(iPacket, v202);
    *(a1 + 976) = CInPacket::Decode4(iPacket, v203);
    *(a1 + 980) = v14 + 500 * CInPacket::Decode2(iPacket, v204);
    v205 = a2[1];
    if ( v205 == a2[2] )
    {
      sub_140299650(a2, v205, (a1 + 976));
    }
    else
    {
      *v205 = *(a1 + 976);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x3Bu) )
  {
    *(a1 + 984) = CInPacket::Decode4(iPacket, v206);
    *(a1 + 988) = CInPacket::Decode4(iPacket, v207);
    *(a1 + 992) = v14 + 500 * CInPacket::Decode2(iPacket, v208);
    v209 = a2[1];
    if ( v209 == a2[2] )
    {
      sub_140299650(a2, v209, (a1 + 988));
    }
    else
    {
      *v209 = *(a1 + 988);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x3Cu) )
  {
    *(a1 + 996) = CInPacket::Decode4(iPacket, v210);
    *(a1 + 1000) = CInPacket::Decode4(iPacket, v211);
    *(a1 + 1004) = v14 + 500 * CInPacket::Decode2(iPacket, v212);
    v213 = a2[1];
    if ( v213 == a2[2] )
    {
      sub_140299650(a2, v213, (a1 + 1000));
    }
    else
    {
      *v213 = *(a1 + 1000);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x3Du) )
  {
    *(a1 + 1008) = CInPacket::Decode4(iPacket, v214);
    *(a1 + 1012) = CInPacket::Decode4(iPacket, v215);
    *(a1 + 1016) = v14 + 500 * CInPacket::Decode2(iPacket, v216);
    v217 = a2[1];
    if ( v217 == a2[2] )
    {
      sub_140299650(a2, v217, (a1 + 1012));
    }
    else
    {
      *v217 = *(a1 + 1012);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x3Eu) )
  {
    *(a1 + 1024) = CInPacket::Decode4(iPacket, v218);
    *(a1 + 1028) = CInPacket::Decode4(iPacket, v219);
    *(a1 + 1032) = v14 + 500 * CInPacket::Decode2(iPacket, v220);
    v221 = a2[1];
    if ( v221 == a2[2] )
    {
      sub_140299650(a2, v221, (a1 + 1028));
    }
    else
    {
      *v221 = *(a1 + 1028);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x3Fu) )
  {
    *(a1 + 1040) = CInPacket::Decode4(iPacket, v222);
    *(a1 + 1044) = CInPacket::Decode4(iPacket, v223);
    *(a1 + 1048) = v14 + 500 * CInPacket::Decode2(iPacket, v224);
    v225 = a2[1];
    if ( v225 == a2[2] )
    {
      sub_140299650(a2, v225, (a1 + 1044));
    }
    else
    {
      *v225 = *(a1 + 1044);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x40u) )
  {
    *(a1 + 1096) = CInPacket::Decode4(iPacket, v226);
    *(a1 + 1100) = CInPacket::Decode4(iPacket, v227);
    *(a1 + 1104) = v14 + 500 * CInPacket::Decode2(iPacket, v228);
    v229 = a2[1];
    if ( v229 == a2[2] )
    {
      sub_140299650(a2, v229, (a1 + 1100));
    }
    else
    {
      *v229 = *(a1 + 1100);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x41u) )
  {
    *(a1 + 1072) = CInPacket::Decode4(iPacket, v230);
    *(a1 + 1076) = CInPacket::Decode4(iPacket, v231);
    *(a1 + 1080) = v14 + 500 * CInPacket::Decode2(iPacket, v232);
    v233 = a2[1];
    if ( v233 == a2[2] )
    {
      sub_140299650(a2, v233, (a1 + 1076));
    }
    else
    {
      *v233 = *(a1 + 1076);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x42u) )
  {
    *(a1 + 1084) = CInPacket::Decode4(iPacket, v234);
    *(a1 + 1088) = CInPacket::Decode4(iPacket, v235);
    *(a1 + 1092) = v14 + 500 * CInPacket::Decode2(iPacket, v236);
    v237 = a2[1];
    if ( v237 == a2[2] )
    {
      sub_140299650(a2, v237, (a1 + 1088));
    }
    else
    {
      *v237 = *(a1 + 1088);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x43u) )
  {
    *(a1 + 1112) = CInPacket::Decode4(iPacket, v238);
    *(a1 + 1116) = CInPacket::Decode4(iPacket, v239);
    *(a1 + 1120) = v14 + 500 * CInPacket::Decode2(iPacket, v240);
    v241 = a2[1];
    if ( v241 == a2[2] )
    {
      sub_140299650(a2, v241, (a1 + 1116));
    }
    else
    {
      *v241 = *(a1 + 1116);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x44u) )
  {
    *(a1 + 1124) = CInPacket::Decode4(iPacket, v242);
    *(a1 + 1128) = CInPacket::Decode4(iPacket, v243);
    *(a1 + 1132) = v14 + 500 * CInPacket::Decode2(iPacket, v244);
    v245 = a2[1];
    if ( v245 == a2[2] )
    {
      sub_140299650(a2, v245, (a1 + 1128));
    }
    else
    {
      *v245 = *(a1 + 1128);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x45u) )
  {
    *(a1 + 1140) = CInPacket::Decode4(iPacket, v246);
    *(a1 + 1144) = CInPacket::Decode4(iPacket, v247);
    *(a1 + 1148) = v14 + 500 * CInPacket::Decode2(iPacket, v248);
    v249 = a2[1];
    if ( v249 == a2[2] )
    {
      sub_140299650(a2, v249, (a1 + 1144));
    }
    else
    {
      *v249 = *(a1 + 1144);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x46u) )
  {
    *(a1 + 1172) = CInPacket::Decode4(iPacket, v250);
    *(a1 + 1176) = CInPacket::Decode4(iPacket, v251);
    *(a1 + 1180) = v14 + 500 * CInPacket::Decode2(iPacket, v252);
    v253 = a2[1];
    if ( v253 == a2[2] )
    {
      sub_140299650(a2, v253, (a1 + 1176));
    }
    else
    {
      *v253 = *(a1 + 1176);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x47u) )
  {
    *(a1 + 1184) = CInPacket::Decode4(iPacket, v254);
    *(a1 + 1188) = CInPacket::Decode4(iPacket, v255);
    *(a1 + 1192) = v14 + 500 * CInPacket::Decode2(iPacket, v256);
    v257 = a2[1];
    if ( v257 == a2[2] )
    {
      sub_140299650(a2, v257, (a1 + 1188));
    }
    else
    {
      *v257 = *(a1 + 1188);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x48u) )
  {
    *(a1 + 1196) = CInPacket::Decode4(iPacket, v258);
    *(a1 + 1200) = CInPacket::Decode4(iPacket, v259);
    *(a1 + 1204) = v14 + 500 * CInPacket::Decode2(iPacket, v260);
    v261 = a2[1];
    if ( v261 == a2[2] )
    {
      sub_140299650(a2, v261, (a1 + 1200));
    }
    else
    {
      *v261 = *(a1 + 1200);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x49u) )
  {
    *(a1 + 360) = CInPacket::Decode4(iPacket, v262);
    *(a1 + 364) = CInPacket::Decode4(iPacket, v263);
    *(a1 + 368) = v14 + 500 * CInPacket::Decode2(iPacket, v264);
    v265 = a2[1];
    if ( v265 == a2[2] )
    {
      sub_140299650(a2, v265, (a1 + 364));
    }
    else
    {
      *v265 = *(a1 + 364);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x4Au) )
  {
    *(a1 + 1220) = CInPacket::Decode4(iPacket, v266);
    *(a1 + 1224) = CInPacket::Decode4(iPacket, v267);
    *(a1 + 1228) = v14 + 500 * CInPacket::Decode2(iPacket, v268);
    v269 = a2[1];
    if ( v269 == a2[2] )
    {
      sub_140299650(a2, v269, (a1 + 1224));
    }
    else
    {
      *v269 = *(a1 + 1224);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x4Bu) )
  {
    *(a1 + 1236) = CInPacket::Decode4(iPacket, v270);
    *(a1 + 1240) = CInPacket::Decode4(iPacket, v271);
    *(a1 + 1244) = v14 + 500 * CInPacket::Decode2(iPacket, v272);
    v273 = a2[1];
    if ( v273 == a2[2] )
    {
      sub_140299650(a2, v273, (a1 + 1240));
    }
    else
    {
      *v273 = *(a1 + 1240);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x4Cu) )
  {
    *(a1 + 1344) = CInPacket::Decode4(iPacket, v274);
    *(a1 + 1348) = CInPacket::Decode4(iPacket, v275);
    *(a1 + 1352) = v14 + 500 * CInPacket::Decode2(iPacket, v276);
    v277 = a2[1];
    if ( v277 == a2[2] )
    {
      sub_140299650(a2, v277, (a1 + 1348));
    }
    else
    {
      *v277 = *(a1 + 1348);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x4Du) )
  {
    *(a1 + 1208) = CInPacket::Decode4(iPacket, v278);
    *(a1 + 1212) = CInPacket::Decode4(iPacket, v279);
    *(a1 + 1216) = v14 + 500 * CInPacket::Decode2(iPacket, v280);
    v281 = a2[1];
    if ( v281 == a2[2] )
    {
      sub_140299650(a2, v281, (a1 + 1212));
    }
    else
    {
      *v281 = *(a1 + 1212);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x4Eu) )
  {
    *(a1 + 856) = CInPacket::Decode4(iPacket, v282);
    *(a1 + 860) = CInPacket::Decode4(iPacket, v283);
    *(a1 + 864) = v14 + 500 * CInPacket::Decode2(iPacket, v284);
    v285 = a2[1];
    if ( v285 == a2[2] )
    {
      sub_140299650(a2, v285, (a1 + 860));
    }
    else
    {
      *v285 = *(a1 + 860);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x4Fu) )
  {
    *(a1 + 1268) = CInPacket::Decode4(iPacket, v286);
    *(a1 + 1272) = CInPacket::Decode4(iPacket, v287);
    *(a1 + 1276) = v14 + 500 * CInPacket::Decode2(iPacket, v288);
    v289 = a2[1];
    if ( v289 == a2[2] )
    {
      sub_140299650(a2, v289, (a1 + 1272));
    }
    else
    {
      *v289 = *(a1 + 1272);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x50u) )
  {
    *(a1 + 1280) = CInPacket::Decode4(iPacket, v290);
    *(a1 + 1284) = CInPacket::Decode4(iPacket, v291);
    *(a1 + 1288) = v14 + 500 * CInPacket::Decode2(iPacket, v292);
    v293 = a2[1];
    if ( v293 == a2[2] )
    {
      sub_140299650(a2, v293, (a1 + 1284));
    }
    else
    {
      *v293 = *(a1 + 1284);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x51u) )
  {
    *(a1 + 1292) = CInPacket::Decode4(iPacket, v294);
    *(a1 + 1296) = CInPacket::Decode4(iPacket, v295);
    *(a1 + 1300) = v14 + 500 * CInPacket::Decode2(iPacket, v296);
    v297 = a2[1];
    if ( v297 == a2[2] )
    {
      sub_140299650(a2, v297, (a1 + 1296));
    }
    else
    {
      *v297 = *(a1 + 1296);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x52u) )
  {
    *(a1 + 1328) = CInPacket::Decode4(iPacket, v298);
    *(a1 + 1332) = CInPacket::Decode4(iPacket, v299);
    *(a1 + 1336) = v14 + 500 * CInPacket::Decode2(iPacket, v300);
    v301 = a2[1];
    if ( v301 == a2[2] )
    {
      sub_140299650(a2, v301, (a1 + 1332));
    }
    else
    {
      *v301 = *(a1 + 1332);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x53u) )
  {
    *(a1 + 1368) = CInPacket::Decode4(iPacket, v302);
    *(a1 + 1372) = CInPacket::Decode4(iPacket, v303);
    *(a1 + 1376) = v14 + 500 * CInPacket::Decode2(iPacket, v304);
    v305 = a2[1];
    if ( v305 == a2[2] )
    {
      sub_140299650(a2, v305, (a1 + 1372));
    }
    else
    {
      *v305 = *(a1 + 1372);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x54u) )
  {
    *(a1 + 1380) = CInPacket::Decode4(iPacket, v306);
    *(a1 + 1384) = CInPacket::Decode4(iPacket, v307);
    *(a1 + 1388) = v14 + 500 * CInPacket::Decode2(iPacket, v308);
    v309 = a2[1];
    if ( v309 == a2[2] )
    {
      sub_140299650(a2, v309, (a1 + 1384));
    }
    else
    {
      *v309 = *(a1 + 1384);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x55u) )
  {
    *(a1 + 1156) = CInPacket::Decode4(iPacket, v310);
    *(a1 + 1160) = CInPacket::Decode4(iPacket, v311);
    *(a1 + 1164) = v14 + 500 * CInPacket::Decode2(iPacket, v312);
    v313 = a2[1];
    if ( v313 == a2[2] )
    {
      sub_140299650(a2, v313, (a1 + 1160));
    }
    else
    {
      *v313 = *(a1 + 1160);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x56u) )
  {
    *(a1 + 1408) = CInPacket::Decode4(iPacket, v314);
    *(a1 + 1412) = CInPacket::Decode4(iPacket, v315);
    *(a1 + 1416) = v14 + 500 * CInPacket::Decode2(iPacket, v316);
    v317 = a2[1];
    if ( v317 == a2[2] )
    {
      sub_140299650(a2, v317, (a1 + 1412));
    }
    else
    {
      *v317 = *(a1 + 1412);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x57u) )
  {
    *(a1 + 1420) = CInPacket::Decode4(iPacket, v318);
    *(a1 + 1424) = CInPacket::Decode4(iPacket, v319);
    *(a1 + 1428) = v14 + 500 * CInPacket::Decode2(iPacket, v320);
    v321 = a2[1];
    if ( v321 == a2[2] )
    {
      sub_140299650(a2, v321, (a1 + 1424));
    }
    else
    {
      *v321 = *(a1 + 1424);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x58u) )
  {
    *(a1 + 1440) = CInPacket::Decode4(iPacket, v322);
    *(a1 + 1444) = CInPacket::Decode4(iPacket, v323);
    *(a1 + 1448) = v14 + 500 * CInPacket::Decode2(iPacket, v324);
    v325 = a2[1];
    if ( v325 == a2[2] )
    {
      sub_140299650(a2, v325, (a1 + 1444));
    }
    else
    {
      *v325 = *(a1 + 1444);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x59u) )
  {
    *(a1 + 1452) = CInPacket::Decode4(iPacket, v326);
    *(a1 + 1456) = CInPacket::Decode4(iPacket, v327);
    *(a1 + 1460) = v14 + 500 * CInPacket::Decode2(iPacket, v328);
    v329 = a2[1];
    if ( v329 == a2[2] )
    {
      sub_140299650(a2, v329, (a1 + 1456));
    }
    else
    {
      *v329 = *(a1 + 1456);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x5Au) )
  {
    *(a1 + 1504) = CInPacket::Decode4(iPacket, v330);
    *(a1 + 1508) = CInPacket::Decode4(iPacket, v331);
    *(a1 + 1512) = v14 + 500 * CInPacket::Decode2(iPacket, v332);
    v333 = a2[1];
    if ( v333 == a2[2] )
    {
      sub_140299650(a2, v333, (a1 + 1508));
    }
    else
    {
      *v333 = *(a1 + 1508);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x5Bu) )
  {
    *(a1 + 1520) = CInPacket::Decode4(iPacket, v334);
    *(a1 + 1524) = CInPacket::Decode4(iPacket, v335);
    *(a1 + 1528) = v14 + 500 * CInPacket::Decode2(iPacket, v336);
    v337 = a2[1];
    if ( v337 == a2[2] )
    {
      sub_140299650(a2, v337, (a1 + 1524));
    }
    else
    {
      *v337 = *(a1 + 1524);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x5Cu) )
  {
    *(a1 + 1532) = CInPacket::Decode4(iPacket, v338);
    *(a1 + 1536) = CInPacket::Decode4(iPacket, v339);
    *(a1 + 1540) = v14 + 500 * CInPacket::Decode2(iPacket, v340);
    v341 = a2[1];
    if ( v341 == a2[2] )
    {
      sub_140299650(a2, v341, (a1 + 1536));
    }
    else
    {
      *v341 = *(a1 + 1536);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x5Du) )
  {
    *(a1 + 1548) = CInPacket::Decode4(iPacket, v342);
    *(a1 + 1552) = CInPacket::Decode4(iPacket, v343);
    *(a1 + 1556) = v14 + 500 * CInPacket::Decode2(iPacket, v344);
    v345 = a2[1];
    if ( v345 == a2[2] )
    {
      sub_140299650(a2, v345, (a1 + 1552));
    }
    else
    {
      *v345 = *(a1 + 1552);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x5Eu) )
  {
    *(a1 + 1564) = CInPacket::Decode4(iPacket, v346);
    *(a1 + 1568) = CInPacket::Decode4(iPacket, v347);
    *(a1 + 1572) = v14 + 500 * CInPacket::Decode2(iPacket, v348);
    v349 = a2[1];
    if ( v349 == a2[2] )
    {
      sub_140299650(a2, v349, (a1 + 1568));
    }
    else
    {
      *v349 = *(a1 + 1568);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x5Fu) )
  {
    *(a1 + 1576) = CInPacket::Decode4(iPacket, v350);
    *(a1 + 1580) = CInPacket::Decode4(iPacket, v351);
    *(a1 + 1584) = v14 + 500 * CInPacket::Decode2(iPacket, v352);
    v353 = a2[1];
    if ( v353 == a2[2] )
    {
      sub_140299650(a2, v353, (a1 + 1580));
    }
    else
    {
      *v353 = *(a1 + 1580);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x60u) )
  {
    *(a1 + 1588) = CInPacket::Decode4(iPacket, v354);
    *(a1 + 1592) = CInPacket::Decode4(iPacket, v355);
    *(a1 + 1596) = v14 + 500 * CInPacket::Decode2(iPacket, v356);
    v357 = a2[1];
    if ( v357 == a2[2] )
    {
      sub_140299650(a2, v357, (a1 + 1592));
    }
    else
    {
      *v357 = *(a1 + 1592);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x61u) )
  {
    *(a1 + 1600) = CInPacket::Decode4(iPacket, v358);
    *(a1 + 1604) = CInPacket::Decode4(iPacket, v359);
    *(a1 + 1608) = v14 + 500 * CInPacket::Decode2(iPacket, v360);
    v361 = a2[1];
    if ( v361 == a2[2] )
    {
      sub_140299650(a2, v361, (a1 + 1604));
    }
    else
    {
      *v361 = *(a1 + 1604);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x62u) )
  {
    *(a1 + 1612) = CInPacket::Decode4(iPacket, v362);
    *(a1 + 1616) = CInPacket::Decode4(iPacket, v363);
    *(a1 + 1620) = v14 + 500 * CInPacket::Decode2(iPacket, v364);
    v365 = a2[1];
    if ( v365 == a2[2] )
    {
      sub_140299650(a2, v365, (a1 + 1616));
    }
    else
    {
      *v365 = *(a1 + 1616);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x63u) )
  {
    *(a1 + 1624) = CInPacket::Decode4(iPacket, v366);
    *(a1 + 1628) = CInPacket::Decode4(iPacket, v367);
    *(a1 + 1632) = v14 + 500 * CInPacket::Decode2(iPacket, v368);
    v369 = a2[1];
    if ( v369 == a2[2] )
    {
      sub_140299650(a2, v369, (a1 + 1628));
    }
    else
    {
      *v369 = *(a1 + 1628);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x64u) )
  {
    *(a1 + 1636) = CInPacket::Decode4(iPacket, v370);
    *(a1 + 1640) = CInPacket::Decode4(iPacket, v371);
    *(a1 + 1644) = v14 + 500 * CInPacket::Decode2(iPacket, v372);
    v373 = a2[1];
    if ( v373 == a2[2] )
    {
      sub_140299650(a2, v373, (a1 + 1640));
    }
    else
    {
      *v373 = *(a1 + 1640);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x65u) )
  {
    *(a1 + 1656) = CInPacket::Decode4(iPacket, v374);
    *(a1 + 1660) = CInPacket::Decode4(iPacket, v375);
    *(a1 + 1664) = v14 + 500 * CInPacket::Decode2(iPacket, v376);
    v377 = a2[1];
    if ( v377 == a2[2] )
    {
      sub_140299650(a2, v377, (a1 + 1660));
    }
    else
    {
      *v377 = *(a1 + 1660);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x66u) )
  {
    *(a1 + 1688) = CInPacket::Decode4(iPacket, v378);
    *(a1 + 1692) = CInPacket::Decode4(iPacket, v379);
    *(a1 + 1696) = v14 + 500 * CInPacket::Decode2(iPacket, v380);
    v381 = a2[1];
    if ( v381 == a2[2] )
    {
      sub_140299650(a2, v381, (a1 + 1692));
    }
    else
    {
      *v381 = *(a1 + 1692);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x67u) )
  {
    *(a1 + 1716) = CInPacket::Decode4(iPacket, v382);
    *(a1 + 1720) = CInPacket::Decode4(iPacket, v383);
    *(a1 + 1724) = v14 + 500 * CInPacket::Decode2(iPacket, v384);
    v385 = a2[1];
    if ( v385 == a2[2] )
    {
      sub_140299650(a2, v385, (a1 + 1720));
    }
    else
    {
      *v385 = *(a1 + 1720);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x68u) )
  {
    *(a1 + 1748) = CInPacket::Decode4(iPacket, v386);
    *(a1 + 1752) = CInPacket::Decode4(iPacket, v387);
    *(a1 + 1756) = v14 + 500 * CInPacket::Decode2(iPacket, v388);
    v389 = a2[1];
    if ( v389 == a2[2] )
    {
      sub_140299650(a2, v389, (a1 + 1752));
    }
    else
    {
      *v389 = *(a1 + 1752);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x69u) )
  {
    *(a1 + 1780) = CInPacket::Decode4(iPacket, v390);
    *(a1 + 1784) = CInPacket::Decode4(iPacket, v391);
    *(a1 + 1788) = v14 + 500 * CInPacket::Decode2(iPacket, v392);
    v393 = a2[1];
    if ( v393 == a2[2] )
    {
      sub_140299650(a2, v393, (a1 + 1784));
    }
    else
    {
      *v393 = *(a1 + 1784);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x6Au) )
  {
    *(a1 + 1764) = CInPacket::Decode4(iPacket, v394);
    *(a1 + 1768) = CInPacket::Decode4(iPacket, v395);
    *(a1 + 1772) = v14 + 500 * CInPacket::Decode2(iPacket, v396);
    v397 = a2[1];
    if ( v397 == a2[2] )
    {
      sub_140299650(a2, v397, (a1 + 1768));
    }
    else
    {
      *v397 = *(a1 + 1768);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x6Bu) )
  {
    *(a1 + 1792) = CInPacket::Decode4(iPacket, v398);
    *(a1 + 1796) = CInPacket::Decode4(iPacket, v399);
    *(a1 + 1800) = v14 + 500 * CInPacket::Decode2(iPacket, v400);
    v401 = a2[1];
    if ( v401 == a2[2] )
    {
      sub_140299650(a2, v401, (a1 + 1796));
    }
    else
    {
      *v401 = *(a1 + 1796);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x6Cu) )
  {
    *(a1 + 1804) = CInPacket::Decode4(iPacket, v402);
    *(a1 + 1808) = CInPacket::Decode4(iPacket, v403);
    *(a1 + 1812) = v14 + 500 * CInPacket::Decode2(iPacket, v404);
    v405 = a2[1];
    if ( v405 == a2[2] )
    {
      sub_140299650(a2, v405, (a1 + 1808));
    }
    else
    {
      *v405 = *(a1 + 1808);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x6Du) )
  {
    *(a1 + 1816) = CInPacket::Decode4(iPacket, v406);
    *(a1 + 1820) = CInPacket::Decode4(iPacket, v407);
    *(a1 + 1824) = v14 + 500 * CInPacket::Decode2(iPacket, v408);
    v409 = a2[1];
    if ( v409 == a2[2] )
    {
      sub_140299650(a2, v409, (a1 + 1820));
    }
    else
    {
      *v409 = *(a1 + 1820);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x6Eu) )
  {
    *(a1 + 1836) = CInPacket::Decode4(iPacket, v410);
    *(a1 + 1840) = CInPacket::Decode4(iPacket, v411);
    *(a1 + 1844) = v14 + 500 * CInPacket::Decode2(iPacket, v412);
    v413 = a2[1];
    if ( v413 == a2[2] )
    {
      sub_140299650(a2, v413, (a1 + 1840));
    }
    else
    {
      *v413 = *(a1 + 1840);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x6Fu) )
  {
    *(a1 + 556) = CInPacket::Decode4(iPacket, v414);
    *(a1 + 560) = CInPacket::Decode4(iPacket, v415);
    *(a1 + 564) = v14 + 500 * CInPacket::Decode2(iPacket, v416);
    v417 = a2[1];
    if ( v417 == a2[2] )
    {
      sub_140299650(a2, v417, (a1 + 560));
    }
    else
    {
      *v417 = *(a1 + 560);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x70u) )
  {
    *(a1 + 656) = CInPacket::Decode4(iPacket, v418);
    *(a1 + 660) = CInPacket::Decode4(iPacket, v419);
    *(a1 + 664) = v14 + 500 * CInPacket::Decode2(iPacket, v420);
    v421 = a2[1];
    if ( v421 == a2[2] )
    {
      sub_140299650(a2, v421, (a1 + 660));
    }
    else
    {
      *v421 = *(a1 + 660);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x71u) )
  {
    *(a1 + 608) = CInPacket::Decode4(iPacket, v422);
    *(a1 + 612) = CInPacket::Decode4(iPacket, v423);
    *(a1 + 616) = v14 + 500 * CInPacket::Decode2(iPacket, v424);
    v425 = a2[1];
    if ( v425 == a2[2] )
    {
      sub_140299650(a2, v425, (a1 + 612));
    }
    else
    {
      *v425 = *(a1 + 612);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x72u) )
  {
    *(a1 + 692) = CInPacket::Decode4(iPacket, v426);
    *(a1 + 696) = CInPacket::Decode4(iPacket, v427);
    *(a1 + 700) = v14 + 500 * CInPacket::Decode2(iPacket, v428);
    v429 = a2[1];
    if ( v429 == a2[2] )
    {
      sub_140299650(a2, v429, (a1 + 696));
    }
    else
    {
      *v429 = *(a1 + 696);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x73u) )
  {
    *(a1 + 1256) = CInPacket::Decode4(iPacket, v430);
    *(a1 + 1260) = CInPacket::Decode4(iPacket, v431);
    *(a1 + 1264) = v14 + 500 * CInPacket::Decode2(iPacket, v432);
    v433 = a2[1];
    if ( v433 == a2[2] )
    {
      sub_140299650(a2, v433, (a1 + 1260));
    }
    else
    {
      *v433 = *(a1 + 1260);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x74u) )
  {
    *(a1 + 1492) = CInPacket::Decode4(iPacket, v434);
    *(a1 + 1496) = CInPacket::Decode4(iPacket, v435);
    *(a1 + 1500) = v14 + 500 * CInPacket::Decode2(iPacket, v436);
    v437 = a2[1];
    if ( v437 == a2[2] )
    {
      sub_140299650(a2, v437, (a1 + 1496));
    }
    else
    {
      *v437 = *(a1 + 1496);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 0x75u) )
  {
    *(a1 + 1668) = CInPacket::Decode4(iPacket, v438);
    *(a1 + 1672) = CInPacket::Decode4(iPacket, v439);
    *(a1 + 1676) = v14 + 500 * CInPacket::Decode2(iPacket, v440);
    v441 = a2[1];
    if ( v441 == a2[2] )
    {
      sub_140299650(a2, v441, (a1 + 1672));
    }
    else
    {
      *v441 = *(a1 + 1672);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 118u) )
  {
    *(a1 + 1392) = CInPacket::Decode4(iPacket, v442);
    *(a1 + 1396) = CInPacket::Decode4(iPacket, v443);
    *(a1 + 1400) = v14 + 500 * CInPacket::Decode2(iPacket, v444);
    v445 = a2[1];
    if ( v445 == a2[2] )
    {
      sub_140299650(a2, v445, (a1 + 1396));
    }
    else
    {
      *v445 = *(a1 + 1396);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 12u) )
    *(a1 + 72) = CInPacket::Decode4(iPacket, v446);
  if ( CMobFlag_Getter(mask, 14u) )
    *(a1 + 112) = CInPacket::Decode4(iPacket, v447);
  if ( CMobFlag_Getter(mask, 17u) )
    *(a1 + 168) = CInPacket::Decode4(iPacket, v448);
  if ( CMobFlag_Getter(mask, 20u) )
    *(a1 + 208) = CInPacket::Decode4(iPacket, v449);
  if ( CMobFlag_Getter(mask, 21u) )
    *(a1 + 224) = CInPacket::Decode4(iPacket, v450);
  if ( CMobFlag_Getter(mask, 38u) )
    *(a1 + 504) = CInPacket::Decode4(iPacket, v451);
  if ( CMobFlag_Getter(mask, 39u) )
    *(a1 + 520) = CInPacket::Decode4(iPacket, v452);
  if ( CMobFlag_Getter(mask, 38u) || CMobFlag_Getter(mask, 39u) )
  {
    *(a1 + 524) = CInPacket::Decode4(iPacket, v453);
    *(a1 + 532) = CInPacket::Decode1(iPacket, v454) != 0;
    *(a1 + 536) = CInPacket::Decode4(iPacket, v455);
  }
  if ( CMobFlag_Getter(mask, 101u) )
  {
    *(a1 + 1680) = CInPacket::Decode1(iPacket, v456) != 0;
    *(a1 + 1684) = j_CInPacket::Decode4(iPacket, v457);
  }
  if ( CMobFlag_Getter(mask, 46u) )
  {
    *(a1 + 640) = CInPacket::Decode4(iPacket, v458);
    *(a1 + 632) = CInPacket::Decode4(iPacket, v459);
    *(a1 + 636) = CInPacket::Decode4(iPacket, v460);
  }
  if ( CMobFlag_Getter(mask, 48u) )
  {
    *(a1 + 688) = CInPacket::Decode4(iPacket, v461);
    *(a1 + 684) = CInPacket::Decode4(iPacket, v462);
    *(a1 + 680) = CInPacket::Decode4(iPacket, v463);
  }
  if ( CMobFlag_Getter(mask, 61u) )
    *(a1 + 1020) = CInPacket::Decode4(iPacket, v464);
  if ( CMobFlag_Getter(mask, 89u) )
    *(a1 + 1464) = CInPacket::Decode4(iPacket, v465);
  if ( CMobFlag_Getter(mask, 62u) )
    *(a1 + 1036) = CInPacket::Decode4(iPacket, v466);
  if ( CMobFlag_Getter(mask, 50u) )
  {
    *(a1 + 760) = CInPacket::Decode4(iPacket, v467);
    *(a1 + 764) = CInPacket::Decode4(iPacket, v468);
  }
  if ( CMobFlag_Getter(mask, 54u) )
  {
    *(a1 + 932) = CInPacket::Decode4(iPacket, v469);
    *(a1 + 924) = CInPacket::Decode4(iPacket, v470);
    *(a1 + 928) = CInPacket::Decode4(iPacket, v471);
  }
  if ( CMobFlag_Getter(mask, 64u) )
    *(a1 + 1108) = CInPacket::Decode4(iPacket, v472);
  if ( CMobFlag_Getter(mask, 68u) )
    *(a1 + 1136) = CInPacket::Decode4(iPacket, v473);
  if ( CMobFlag_Getter(mask, 69u) )
    *(a1 + 1152) = CInPacket::Decode4(iPacket, v474);
  if ( CMobFlag_Getter(mask, 74u) )
    *(a1 + 1232) = CInPacket::Decode4(iPacket, v475);
  if ( CMobFlag_Getter(mask, 75u) )
  {
    *(a1 + 1248) = CInPacket::Decode4(iPacket, v476);
    *(a1 + 1252) = CInPacket::Decode4(iPacket, v477);
  }
  if ( CMobFlag_Getter(mask, 78u) )
    *(a1 + 868) = CInPacket::Decode4(iPacket, v478);
  if ( CMobFlag_Getter(mask, 76u) )
  {
    *(a1 + 1356) = CInPacket::Decode4(iPacket, v479);
    *(a1 + 1360) = CInPacket::Decode4(iPacket, v480);
    *(a1 + 1364) = CInPacket::Decode4(iPacket, v481);
  }
  if ( CMobFlag_Getter(mask, 83u) )
  {
    v483 = CInPacket::Decode4(iPacket, v482);
    *(a1 + 1376) = MEMORY[0x7FF952B74220](v484) + v483;
  }
  if ( CMobFlag_Getter(mask, 85u) )
    *(a1 + 1168) = CInPacket::Decode4(iPacket, v485);
  if ( CMobFlag_Getter(mask, 22u) )
    *(a1 + 240) = CInPacket::Decode4(iPacket, v486);
  if ( CMobFlag_Getter(mask, 33u) )
    *(a1 + 424) = CInPacket::Decode4(iPacket, v487);
  if ( CMobFlag_Getter(mask, 90u) )
    *(a1 + 1516) = CInPacket::Decode4(iPacket, v488);
  if ( CMobFlag_Getter(mask, 92u) )
    *(a1 + 1544) = CInPacket::Decode4(iPacket, v489);
  if ( CMobFlag_Getter(mask, 93u) )
    *(a1 + 1560) = CInPacket::Decode4(iPacket, v490);
  if ( CMobFlag_Getter(mask, 100u) )
  {
    *(a1 + 1652) = CInPacket::Decode4(iPacket, v491);
    *(a1 + 1648) = CInPacket::Decode4(iPacket, v492);
  }
  if ( CMobFlag_Getter(mask, 118u) )
    *(a1 + 1404) = CInPacket::Decode4(iPacket, v493);
  if ( CMobFlag_Getter(mask, 41u) )
    *(a1 + 552) = CInPacket::Decode4(iPacket, v494);
  if ( CMobFlag_Getter(mask, 114u) )
    *(a1 + 704) = CInPacket::Decode4(iPacket, v495);
  if ( CMobFlag_Getter(mask, 119u) )
  {
    *(a1 + 716) = CInPacket::Decode1(iPacket, v496);
    v497 = v14;
    if ( sub_140B709A0(a1 + 1904) )
      v497 = *(sub_140B70990(a1 + 1904) + 36);
    sub_140B70B00(a1 + 1904);
    for ( j = 0; j < *(a1 + 716); ++j )
    {
      sub_140B70420(v546);
      sub_140B70540(v546, iPacket);
      v547 = v14;
      v549 = v14 + v548;
      sub_140B709C0(a1 + 1904, v546);
    }
    for ( k = sub_140B709A0(a1 + 1904); k; *(sub_140B70980(a1 + 1904, &k) + 36) = v497 )
      ;
  }
  if ( CMobFlag_Getter(mask, 141u) )
    sub_140B88C30(a1, iPacket);
  if ( CMobFlag_Getter(mask, 120u) )
  {
    *(a1 + 608) = CInPacket::Decode1(iPacket, v499);
    *(a1 + 708) = CInPacket::Decode1(iPacket, v500);
  }
  if ( CMobFlag_Getter(mask, 121u) )
    *(a1 + 712) = CInPacket::Decode1(iPacket, v501);
  if ( CMobFlag_Getter(mask, 122u) )
    sub_140B70870((a1 + 1848), iPacket);
  if ( CMobFlag_Getter(mask, 123u) )
  {
    v502 = CInPacket::DecodeStr(iPacket, &k);
    v503 = *(a1 + 784);
    if ( v503 )
    {
      sub_14029BD40((v503 - 16));
      *(a1 + 784) = 0;
      v503 = 0;
    }
    *(a1 + 784) = *v502;
    *v502 = v503;
    if ( k )
      sub_14029BD40((k - 16));
  }
  if ( CMobFlag_Getter(mask, 129u) )
    *(a1 + 792) = CInPacket::Decode4(iPacket, v504);
  if ( CMobFlag_Getter(mask, 130u) )
    *(a1 + 816) = CInPacket::Decode8(iPacket, v505);
  if ( CMobFlag_Getter(mask, 131u) )
    *(a1 + 796) = CInPacket::Decode4(iPacket, v506);
  if ( CMobFlag_Getter(mask, 132u) )
    *(a1 + 800) = CInPacket::Decode4(iPacket, v507);
  if ( CMobFlag_Getter(mask, 134u) )
    *(a1 + 804) = CInPacket::Decode4(iPacket, v508);
  if ( CMobFlag_Getter(mask, 135u) )
    *(a1 + 808) = CInPacket::Decode4(iPacket, v509);
  if ( CMobFlag_Getter(mask, 133u) )
    *(a1 + 812) = v14 + 500 * CInPacket::Decode2(iPacket, v510);
  if ( CMobFlag_Getter(mask, 124u) )
  {
    *(a1 + 900) = CInPacket::Decode4(iPacket, v511);
    *(a1 + 904) = CInPacket::Decode4(iPacket, v512);
    *(a1 + 908) = CInPacket::Decode4(iPacket, v513);
  }
  if ( CMobFlag_Getter(mask, 125u) )
  {
    *(a1 + 872) = CInPacket::Decode4(iPacket, v514);
    *(a1 + 876) = CInPacket::Decode4(iPacket, v515);
    *(a1 + 880) = CInPacket::Decode4(iPacket, v516);
    *(a1 + 884) = CInPacket::Decode4(iPacket, v517);
    *(a1 + 888) = CInPacket::Decode4(iPacket, v518);
    *(a1 + 892) = CInPacket::Decode4(iPacket, v519);
    *(a1 + 896) = CInPacket::Decode4(iPacket, v520);
  }
  if ( CMobFlag_Getter(mask, 126u) )
  {
    *(a1 + 1052) = CInPacket::Decode4(iPacket, v521);
    *(a1 + 1056) = CInPacket::Decode4(iPacket, v522);
    *(a1 + 1060) = CInPacket::Decode4(iPacket, v523);
    *(a1 + 1064) = CInPacket::Decode4(iPacket, v524);
    *(a1 + 1068) = CInPacket::Decode4(iPacket, v525);
  }
  if ( CMobFlag_Getter(mask, 128u) )
  {
    *(a1 + 1304) = CInPacket::Decode4(iPacket, v526);
    *(a1 + 1308) = CInPacket::Decode4(iPacket, v527);
    *(a1 + 1312) = CInPacket::Decode4(iPacket, v528);
  }
  if ( CMobFlag_Getter(mask, 136u) )
  {
    *(a1 + 824) = CInPacket::Decode4(iPacket, v529);
    *(a1 + 828) = CInPacket::Decode4(iPacket, v530);
  }
  if ( CMobFlag_Getter(mask, 137u) )
  {
    *(a1 + 1316) = CInPacket::Decode4(iPacket, v531);
    *(a1 + 1320) = CInPacket::Decode4(iPacket, v532);
    *(a1 + 1324) = CInPacket::Decode4(iPacket, v533);
  }
  if ( CMobFlag_Getter(mask, 139u) )
    *(a1 + 1736) = CInPacket::Decode8(iPacket, v534);
  if ( CMobFlag_Getter(mask, 103u) )
    *(a1 + 1728) = CInPacket::Decode4(iPacket, v535);
  if ( CMobFlag_Getter(mask, 138u) )
  {
    *(a1 + 1704) = CInPacket::Decode4(iPacket, v536);
    *(a1 + 1708) = CInPacket::Decode4(iPacket, v537);
    *(a1 + 1712) = CInPacket::Decode2(iPacket, v538);
    v539 = a2[1];
    if ( v539 == a2[2] )
    {
      sub_140299650(a2, v539, (a1 + 1708));
    }
    else
    {
      *v539 = *(a1 + 1708);
      a2[1] += 4LL;
    }
  }
  if ( CMobFlag_Getter(mask, 2u) )
  {
    *(a1 + 1480) = CInPacket::Decode4(iPacket, v540);
    *(a1 + 1484) = CInPacket::Decode4(iPacket, v541);
    *(a1 + 1488) = CInPacket::Decode4(iPacket, v542);
  }
  if ( CMobFlag_Getter(mask, 109u) )
  {
    *(a1 + 1828) = CInPacket::Decode4(iPacket, v543);
    *(a1 + 1832) = CInPacket::Decode4(iPacket, v544);
  }
  return a2;
}
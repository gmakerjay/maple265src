_DWORD *__fastcall CSecondaryStat::DecodeForRemote(__int64 a1, _DWORD *a2, __int64 iPacket)
{
  __int64 v3; // rdx
  char v4; // al
  __int64 v5; // rdx
  unsigned __int8 v6; // al
  __int64 v7; // rdx
  unsigned __int16 v8; // ax
  __int64 v9; // rdx
  unsigned int v10; // eax
  __int64 v11; // rdx
  unsigned __int16 v12; // ax
  __int64 v13; // rdx
  unsigned int v14; // eax
  __int64 v15; // rdx
  unsigned __int16 v16; // ax
  __int64 v17; // rdx
  unsigned __int16 v18; // ax
  __int64 v19; // rdx
  unsigned int v20; // eax
  __int64 v21; // rdx
  unsigned __int16 v22; // ax
  __int64 v23; // rdx
  unsigned int v24; // eax
  __int64 v25; // rdx
  char v26; // al
  __int64 v27; // rdx
  unsigned __int16 v28; // ax
  __int64 v29; // rdx
  unsigned int v30; // eax
  __int64 v31; // rdx
  unsigned __int16 v32; // ax
  __int64 v33; // rdx
  unsigned int v34; // eax
  __int64 v35; // rdx
  unsigned __int16 v36; // ax
  __int64 v37; // rdx
  unsigned int v38; // eax
  __int64 v39; // rdx
  unsigned __int16 v40; // ax
  __int64 v41; // rdx
  unsigned int v42; // eax
  __int64 v43; // rdx
  unsigned __int16 v44; // ax
  __int64 v45; // rdx
  unsigned int v46; // eax
  __int64 v47; // rdx
  __int16 v48; // ax
  __int64 v49; // rdx
  unsigned int v50; // eax
  __int64 v51; // rdx
  unsigned __int16 v52; // ax
  __int64 v53; // rdx
  unsigned int v54; // eax
  __int64 v55; // rdx
  unsigned __int16 v56; // ax
  __int64 v57; // rdx
  unsigned int v58; // eax
  __int64 v59; // rdx
  unsigned __int8 v60; // al
  __int64 v61; // rdx
  unsigned __int16 v62; // ax
  __int64 v63; // rdx
  unsigned int v64; // eax
  __int64 v65; // rdx
  unsigned __int16 v66; // ax
  __int64 v67; // rdx
  unsigned int v68; // eax
  __int64 v69; // rdx
  unsigned __int16 v70; // ax
  __int64 v71; // rdx
  unsigned __int16 v72; // ax
  __int64 v73; // rdx
  unsigned int v74; // eax
  __int64 v75; // rdx
  unsigned __int16 v76; // ax
  __int64 v77; // rdx
  unsigned int v78; // eax
  __int64 v79; // rdx
  unsigned __int16 v80; // ax
  __int64 v81; // rdx
  unsigned int v82; // eax
  __int64 v83; // rdx
  unsigned __int16 v84; // ax
  __int64 v85; // rdx
  unsigned __int16 v86; // ax
  __int64 v87; // rdx
  unsigned int v88; // eax
  __int64 v89; // rdx
  unsigned __int16 v90; // ax
  __int64 v91; // rdx
  unsigned int v92; // eax
  __int64 v93; // rdx
  unsigned __int16 v94; // ax
  __int64 v95; // rdx
  unsigned int v96; // eax
  __int64 v97; // rdx
  unsigned int v98; // eax
  __int64 v99; // rdx
  unsigned __int16 v100; // ax
  __int64 v101; // rdx
  unsigned int v102; // eax
  __int64 v103; // rdx
  unsigned __int16 v104; // ax
  __int64 v105; // rdx
  unsigned int v106; // eax
  __int64 v107; // rdx
  unsigned __int16 v108; // ax
  __int64 v109; // rdx
  unsigned int v110; // eax
  __int64 v111; // rdx
  unsigned __int16 v112; // ax
  __int64 v113; // rdx
  unsigned int v114; // eax
  __int64 v115; // rdx
  unsigned int v116; // eax
  __int64 v117; // rdx
  unsigned int v118; // eax
  __int64 v119; // rdx
  unsigned int v120; // eax
  __int64 v121; // rdx
  unsigned int v122; // eax
  __int64 v123; // rdx
  unsigned __int16 v124; // ax
  __int64 v125; // rdx
  unsigned int v126; // eax
  __int64 v127; // rdx
  unsigned __int16 v128; // ax
  __int64 v129; // rdx
  unsigned int v130; // eax
  __int64 v131; // rdx
  unsigned __int16 v132; // ax
  __int64 v133; // rdx
  unsigned int v134; // eax
  __int64 v135; // rdx
  unsigned __int16 v136; // ax
  __int64 v137; // rdx
  unsigned int v138; // eax
  __int64 v139; // rdx
  unsigned __int16 v140; // ax
  __int64 v141; // rdx
  unsigned int v142; // eax
  __int64 v143; // rdx
  unsigned __int16 v144; // ax
  __int64 v145; // rdx
  unsigned int v146; // eax
  __int64 v147; // rdx
  unsigned int v148; // eax
  __int64 v149; // rdx
  unsigned __int16 v150; // ax
  __int64 v151; // rdx
  unsigned int v152; // eax
  __int64 v153; // rdx
  unsigned __int16 v154; // ax
  __int64 v155; // rdx
  unsigned int v156; // eax
  __int64 v157; // rdx
  unsigned __int16 v158; // ax
  __int64 v159; // rdx
  unsigned int v160; // eax
  __int64 v161; // rdx
  unsigned __int16 v162; // ax
  __int64 v163; // rdx
  unsigned int v164; // eax
  __int64 v165; // rdx
  unsigned __int16 v166; // ax
  __int64 v167; // rdx
  unsigned int v168; // eax
  __int64 v169; // rdx
  unsigned __int16 v170; // ax
  __int64 v171; // rdx
  unsigned int v172; // eax
  __int64 v173; // rdx
  unsigned __int16 v174; // ax
  __int64 v175; // rdx
  unsigned int v176; // eax
  __int64 v177; // rdx
  unsigned __int16 v178; // ax
  __int64 v179; // rdx
  unsigned int v180; // eax
  __int64 v181; // rdx
  unsigned __int16 v182; // ax
  __int64 v183; // rdx
  unsigned int v184; // eax
  __int64 v185; // rdx
  unsigned __int16 v186; // ax
  __int64 v187; // rdx
  unsigned int v188; // eax
  __int64 v189; // rdx
  unsigned __int16 v190; // ax
  __int64 v191; // rdx
  unsigned int v192; // eax
  __int64 v193; // rdx
  unsigned __int16 v194; // ax
  __int64 v195; // rdx
  unsigned int v196; // eax
  __int64 v197; // rdx
  unsigned int v198; // eax
  __int64 v199; // rdx
  unsigned int v200; // eax
  __int64 v201; // rdx
  unsigned __int16 v202; // ax
  __int64 v203; // rdx
  unsigned int v204; // eax
  __int64 v205; // rdx
  unsigned __int16 v206; // ax
  __int64 v207; // rdx
  unsigned int v208; // eax
  __int64 v209; // rdx
  unsigned __int16 v210; // ax
  __int64 v211; // rdx
  unsigned int v212; // eax
  __int64 v213; // rdx
  unsigned __int16 v214; // ax
  __int64 v215; // rdx
  unsigned int v216; // eax
  __int64 v217; // rdx
  unsigned __int16 v218; // ax
  __int64 v219; // rdx
  unsigned int v220; // eax
  __int64 v221; // rdx
  unsigned __int16 v222; // ax
  __int64 v223; // rdx
  unsigned int v224; // eax
  __int64 v225; // rdx
  unsigned __int16 v226; // ax
  __int64 v227; // rdx
  unsigned int v228; // eax
  __int64 v229; // rdx
  unsigned __int16 v230; // ax
  __int64 v231; // rdx
  unsigned int v232; // eax
  __int64 v233; // rdx
  unsigned int v234; // eax
  __int64 v235; // rdx
  unsigned __int8 v236; // al
  __int64 v237; // rdx
  unsigned __int16 v238; // ax
  __int64 v239; // rdx
  unsigned int v240; // eax
  __int64 v241; // rdx
  unsigned __int16 v242; // ax
  __int64 v243; // rdx
  unsigned int v244; // eax
  __int64 v245; // rdx
  unsigned __int16 v246; // ax
  __int64 v247; // rdx
  unsigned int v248; // eax
  __int64 v249; // rdx
  unsigned __int16 v250; // ax
  __int64 v251; // rdx
  unsigned int v252; // eax
  __int64 v253; // rdx
  unsigned __int16 v254; // ax
  __int64 v255; // rdx
  unsigned int v256; // eax
  __int64 v257; // rdx
  __int16 v258; // ax
  __int64 v259; // rdx
  unsigned __int16 v260; // ax
  __int64 v261; // rdx
  unsigned int v262; // eax
  __int64 v263; // rdx
  unsigned __int16 v264; // ax
  __int64 v265; // rdx
  unsigned int v266; // eax
  __int64 v267; // rdx
  unsigned __int16 v268; // ax
  __int64 v269; // rdx
  unsigned int v270; // eax
  __int64 v271; // rdx
  unsigned __int16 v272; // ax
  __int64 v273; // rdx
  unsigned int v274; // eax
  __int64 v275; // rdx
  unsigned __int16 v276; // ax
  __int64 v277; // rdx
  unsigned int v278; // eax
  __int64 v279; // rdx
  unsigned __int16 v280; // ax
  __int64 v281; // rdx
  unsigned int v282; // eax
  __int64 v283; // rdx
  unsigned __int16 v284; // ax
  __int64 v285; // rdx
  unsigned int v286; // eax
  __int64 v287; // rdx
  unsigned __int16 v288; // ax
  __int64 v289; // rdx
  unsigned int v290; // eax
  __int64 v291; // rdx
  unsigned __int16 v292; // ax
  __int64 v293; // rdx
  unsigned int v294; // eax
  __int64 v295; // rdx
  unsigned __int16 v296; // ax
  __int64 v297; // rdx
  unsigned int v298; // eax
  __int64 v299; // rdx
  unsigned __int16 v300; // ax
  __int64 v301; // rdx
  unsigned int v302; // eax
  __int64 v303; // rdx
  unsigned __int16 v304; // ax
  __int64 v305; // rdx
  unsigned int v306; // eax
  __int64 v307; // rdx
  unsigned __int16 v308; // ax
  __int64 v309; // rdx
  unsigned int v310; // eax
  __int64 v311; // rdx
  unsigned __int16 v312; // ax
  __int64 v313; // rdx
  unsigned int v314; // eax
  __int64 v315; // rdx
  unsigned __int16 v316; // ax
  __int64 v317; // rdx
  unsigned int v318; // eax
  __int64 v319; // rdx
  int v320; // eax
  __int64 v321; // rdx
  unsigned __int16 v322; // ax
  __int64 v323; // rdx
  unsigned int v324; // eax
  __int64 v325; // rdx
  unsigned __int16 v326; // ax
  __int64 v327; // rdx
  unsigned int v328; // eax
  __int64 v329; // rdx
  unsigned __int16 v330; // ax
  __int64 v331; // rdx
  unsigned int v332; // eax
  __int64 v333; // rdx
  unsigned __int16 v334; // ax
  __int64 v335; // rdx
  unsigned int v336; // eax
  __int64 v337; // rdx
  unsigned __int16 v338; // ax
  __int64 v339; // rdx
  unsigned int v340; // eax
  __int64 v341; // rdx
  unsigned __int16 v342; // ax
  __int64 v343; // rdx
  unsigned int v344; // eax
  __int64 v345; // rdx
  unsigned __int16 v346; // ax
  __int64 v347; // rdx
  unsigned int v348; // eax
  __int64 v349; // rdx
  unsigned __int16 v350; // ax
  __int64 v351; // rdx
  unsigned int v352; // eax
  __int64 v353; // rdx
  unsigned __int16 v354; // ax
  __int64 v355; // rdx
  unsigned int v356; // eax
  __int64 v357; // rdx
  unsigned __int16 v358; // ax
  __int64 v359; // rdx
  unsigned int v360; // eax
  __int64 v361; // rdx
  unsigned __int16 v362; // ax
  __int64 v363; // rdx
  unsigned int v364; // eax
  __int64 v365; // rdx
  unsigned __int16 v366; // ax
  __int64 v367; // rdx
  unsigned int v368; // eax
  __int64 v369; // rdx
  unsigned __int16 v370; // ax
  __int64 v371; // rdx
  unsigned int v372; // eax
  __int64 v373; // rdx
  unsigned __int16 v374; // ax
  __int64 v375; // rdx
  unsigned int v376; // eax
  __int64 v377; // rdx
  unsigned __int16 v378; // ax
  __int64 v379; // rdx
  unsigned int v380; // eax
  __int64 v381; // rdx
  unsigned int v382; // eax
  __int64 v383; // rdx
  unsigned int v384; // eax
  __int64 v385; // rdx
  int v386; // eax
  __int64 v387; // rdx
  unsigned __int16 v388; // ax
  __int64 v389; // rdx
  unsigned int v390; // eax
  __int64 v391; // rdx
  unsigned __int16 v392; // ax
  __int64 v393; // rdx
  unsigned int v394; // eax
  __int64 v395; // rdx
  unsigned __int8 v396; // al
  __int64 v397; // rdx
  unsigned int v398; // eax
  __int64 v399; // rdx
  unsigned __int16 v400; // ax
  __int64 v401; // rdx
  unsigned int v402; // eax
  __int64 v403; // rdx
  unsigned __int16 v404; // ax
  __int64 v405; // rdx
  unsigned int v406; // eax
  __int64 v407; // rdx
  unsigned __int8 v408; // al
  __int64 v409; // rdx
  unsigned int v410; // eax
  __int64 v411; // rdx
  unsigned __int8 v412; // al
  __int64 v413; // rdx
  unsigned __int16 v414; // ax
  __int64 v415; // rdx
  unsigned int v416; // eax
  __int64 v417; // rdx
  unsigned __int16 v418; // ax
  __int64 v419; // rdx
  unsigned int v420; // eax
  __int64 v421; // rdx
  unsigned __int16 v422; // ax
  __int64 v423; // rdx
  unsigned int v424; // eax
  __int64 v425; // rdx
  unsigned __int16 v426; // ax
  __int64 v427; // rdx
  unsigned int v428; // eax
  __int64 v429; // rdx
  unsigned __int16 v430; // ax
  __int64 v431; // rdx
  unsigned int v432; // eax
  __int64 v433; // rdx
  unsigned __int16 v434; // ax
  __int64 v435; // rdx
  unsigned int v436; // eax
  __int64 v437; // rdx
  unsigned __int16 v438; // ax
  __int64 v439; // rdx
  unsigned int v440; // eax
  __int64 v441; // rdx
  unsigned __int16 v442; // ax
  __int64 v443; // rdx
  unsigned int v444; // eax
  __int64 v445; // rdx
  unsigned __int16 v446; // ax
  __int64 v447; // rdx
  unsigned int v448; // eax
  __int64 v449; // rdx
  unsigned __int16 v450; // ax
  __int64 v451; // rdx
  unsigned int v452; // eax
  __int64 v453; // rdx
  unsigned __int16 v454; // ax
  __int64 v455; // rdx
  unsigned int v456; // eax
  __int64 v457; // rdx
  unsigned __int16 v458; // ax
  __int64 v459; // rdx
  unsigned int v460; // eax
  __int64 v461; // rdx
  unsigned __int16 v462; // ax
  __int64 v463; // rdx
  unsigned int v464; // eax
  __int64 v465; // rdx
  unsigned __int16 v466; // ax
  __int64 v467; // rdx
  unsigned int v468; // eax
  __int64 v469; // rdx
  unsigned __int16 v470; // ax
  __int64 v471; // rdx
  unsigned int v472; // eax
  __int64 v473; // rdx
  unsigned int v474; // eax
  __int64 v475; // rdx
  unsigned int v476; // eax
  __int64 v477; // rdx
  unsigned int v478; // eax
  __int64 v479; // rdx
  int v480; // eax
  __int64 v481; // rdx
  __int64 v482; // rdx
  unsigned int v483; // eax
  int v484; // eax
  __int64 v485; // rdx
  unsigned int v486; // eax
  __int64 v487; // rdx
  unsigned int v488; // eax
  __int64 v489; // rdx
  unsigned int v490; // eax
  __int64 v491; // rdx
  unsigned int v492; // eax
  __int64 v493; // rdx
  unsigned int v494; // eax
  __int64 v495; // rdx
  unsigned __int16 v496; // ax
  __int64 v497; // rdx
  unsigned int v498; // eax
  __int64 v499; // rdx
  unsigned int v500; // eax
  __int64 v501; // rdx
  unsigned int v502; // eax
  __int64 v503; // rdx
  unsigned __int16 v504; // ax
  __int64 v505; // rdx
  unsigned int v506; // eax
  __int64 v507; // rdx
  unsigned __int16 v508; // ax
  __int64 v509; // rdx
  unsigned int v510; // eax
  __int64 v511; // rdx
  unsigned __int16 v512; // ax
  __int64 v513; // rdx
  unsigned int v514; // eax
  __int64 v515; // rdx
  unsigned __int16 v516; // ax
  __int64 v517; // rdx
  unsigned int v518; // eax
  __int64 v519; // rdx
  unsigned __int16 v520; // ax
  __int64 v521; // rdx
  unsigned int v522; // eax
  __int64 v523; // rdx
  unsigned __int16 v524; // ax
  __int64 v525; // rdx
  unsigned int v526; // eax
  __int64 v527; // rdx
  unsigned __int16 v528; // ax
  __int64 v529; // rdx
  unsigned int v530; // eax
  __int64 v531; // rdx
  unsigned __int16 v532; // ax
  __int64 v533; // rdx
  unsigned int v534; // eax
  __int64 v535; // rdx
  unsigned __int16 v536; // ax
  __int64 v537; // rdx
  unsigned int v538; // eax
  __int64 v539; // rdx
  unsigned __int16 v540; // ax
  __int64 v541; // rdx
  unsigned int v542; // eax
  __int64 v543; // rdx
  unsigned __int16 v544; // ax
  __int64 v545; // rdx
  unsigned int v546; // eax
  __int64 v547; // rdx
  unsigned __int16 v548; // ax
  __int64 v549; // rdx
  unsigned int v550; // eax
  __int64 v551; // rdx
  unsigned __int16 v552; // ax
  __int64 v553; // rdx
  unsigned int v554; // eax
  __int64 v555; // rdx
  unsigned __int16 v556; // ax
  __int64 v557; // rdx
  unsigned int v558; // eax
  __int64 v559; // rdx
  unsigned __int16 v560; // ax
  __int64 v561; // rdx
  unsigned int v562; // eax
  __int64 v563; // rdx
  unsigned __int16 v564; // ax
  __int64 v565; // rdx
  unsigned int v566; // eax
  __int64 v567; // rdx
  unsigned int v568; // eax
  __int64 v569; // rdx
  unsigned int v570; // eax
  __int64 v571; // rdx
  unsigned __int16 v572; // ax
  __int64 v573; // rdx
  unsigned int v574; // eax
  __int64 v575; // rdx
  unsigned int v576; // eax
  __int64 v577; // rdx
  unsigned __int16 v578; // ax
  __int64 v579; // rdx
  unsigned int v580; // eax
  __int64 v581; // rdx
  unsigned int v582; // eax
  __int64 v583; // rdx
  unsigned int v584; // eax
  __int64 v585; // rdx
  unsigned int v586; // eax
  __int64 v587; // rdx
  unsigned int v588; // eax
  __int64 v589; // rdx
  unsigned int v590; // eax
  __int64 v591; // rdx
  unsigned __int16 v592; // ax
  __int64 v593; // rdx
  unsigned int v594; // eax
  __int64 v595; // rdx
  unsigned int v596; // eax
  __int64 v597; // rdx
  unsigned __int16 v598; // ax
  __int64 v599; // rdx
  unsigned int v600; // eax
  __int64 v601; // rdx
  unsigned __int16 v602; // ax
  __int64 v603; // rdx
  unsigned int v604; // eax
  __int64 v605; // rdx
  unsigned __int16 v606; // ax
  __int64 v607; // rdx
  unsigned int v608; // eax
  __int64 v609; // rdx
  unsigned __int16 v610; // ax
  __int64 v611; // rdx
  unsigned int v612; // eax
  __int64 v613; // rdx
  unsigned __int16 v614; // ax
  __int64 v615; // rdx
  unsigned int v616; // eax
  __int64 v617; // rdx
  unsigned __int16 v618; // ax
  __int64 v619; // rdx
  unsigned int v620; // eax
  __int64 v621; // rdx
  unsigned int v622; // eax
  __int64 v623; // rdx
  unsigned int v624; // eax
  __int64 v625; // rdx
  unsigned int v626; // eax
  __int64 v627; // rdx
  unsigned __int16 v628; // ax
  __int64 v629; // rdx
  unsigned int v630; // eax
  __int64 v631; // rdx
  unsigned __int16 v632; // ax
  __int64 v633; // rdx
  unsigned int v634; // eax
  __int64 v635; // rdx
  unsigned int v636; // eax
  __int64 v637; // rdx
  unsigned int v638; // eax
  __int64 v639; // rdx
  unsigned int v640; // eax
  __int64 v641; // rdx
  unsigned int v642; // eax
  __int64 v643; // rdx
  unsigned __int16 v644; // ax
  __int64 v645; // rdx
  unsigned int v646; // eax
  __int64 v647; // rdx
  unsigned __int16 v648; // ax
  __int64 v649; // rdx
  unsigned int v650; // eax
  __int64 v651; // rdx
  unsigned __int16 v652; // ax
  __int64 v653; // rdx
  unsigned int v654; // eax
  __int64 v655; // rdx
  unsigned __int16 v656; // ax
  __int64 v657; // rdx
  unsigned int v658; // eax
  __int64 v659; // rdx
  unsigned __int16 v660; // ax
  __int64 v661; // rdx
  unsigned int v662; // eax
  __int64 v663; // rdx
  unsigned __int16 v664; // ax
  __int64 v665; // rdx
  unsigned int v666; // eax
  __int64 v667; // rdx
  unsigned __int16 v668; // ax
  __int64 v669; // rdx
  unsigned int v670; // eax
  __int64 v671; // rdx
  unsigned __int16 v672; // ax
  __int64 v673; // rdx
  unsigned int v674; // eax
  __int64 v675; // rdx
  unsigned __int16 v676; // ax
  __int64 v677; // rdx
  unsigned int v678; // eax
  __int64 v679; // rdx
  unsigned __int16 v680; // ax
  __int64 v681; // rdx
  unsigned int v682; // eax
  __int64 v683; // rdx
  unsigned __int16 v684; // ax
  __int64 v685; // rdx
  unsigned int v686; // eax
  __int64 v687; // rdx
  unsigned __int16 v688; // ax
  __int64 v689; // rdx
  unsigned int v690; // eax
  __int64 v691; // rdx
  unsigned __int16 v692; // ax
  __int64 v693; // rdx
  unsigned int v694; // eax
  __int64 v695; // rdx
  unsigned __int16 v696; // ax
  __int64 v697; // rdx
  unsigned int v698; // eax
  __int64 v699; // rdx
  unsigned __int16 v700; // ax
  __int64 v701; // rdx
  unsigned int v702; // eax
  __int64 v703; // rdx
  unsigned __int16 v704; // ax
  __int64 v705; // rdx
  unsigned int v706; // eax
  __int64 v707; // rdx
  unsigned __int16 v708; // ax
  __int64 v709; // rdx
  unsigned int v710; // eax
  __int64 v711; // rdx
  int v712; // eax
  __int64 v713; // rdx
  unsigned int v714; // eax
  __int64 v715; // rdx
  unsigned int v716; // eax
  __int64 v717; // rdx
  unsigned __int16 v718; // ax
  __int64 v719; // rdx
  unsigned int v720; // eax
  __int64 v721; // rdx
  unsigned __int16 v722; // ax
  __int64 v723; // rdx
  unsigned int v724; // eax
  __int64 v725; // rdx
  unsigned __int16 v726; // ax
  __int64 v727; // rdx
  unsigned int v728; // eax
  __int64 v729; // rdx
  unsigned __int16 v730; // ax
  __int64 v731; // rdx
  unsigned int v732; // eax
  __int64 v733; // rdx
  unsigned __int16 v734; // ax
  __int64 v735; // rdx
  unsigned int v736; // eax
  __int64 v737; // rdx
  unsigned __int16 v738; // ax
  __int64 v739; // rdx
  unsigned int v740; // eax
  __int64 v741; // rdx
  unsigned __int16 v742; // ax
  __int64 v743; // rdx
  unsigned int v744; // eax
  __int64 v745; // rdx
  int v746; // eax
  __int64 v747; // rdx
  unsigned __int16 v748; // ax
  __int64 v749; // rdx
  unsigned int v750; // eax
  __int64 v751; // rdx
  unsigned __int16 v752; // ax
  __int64 v753; // rdx
  unsigned int v754; // eax
  __int64 v755; // rdx
  unsigned __int16 v756; // ax
  __int64 v757; // rdx
  unsigned int v758; // eax
  __int64 v759; // rdx
  unsigned __int16 v760; // ax
  __int64 v761; // rdx
  unsigned int v762; // eax
  __int64 v763; // rdx
  unsigned __int16 v764; // ax
  __int64 v765; // rdx
  unsigned int v766; // eax
  __int64 v767; // rdx
  unsigned __int16 v768; // ax
  __int64 v769; // rdx
  unsigned int v770; // eax
  __int64 v771; // rdx
  unsigned __int16 v772; // ax
  __int64 v773; // rdx
  unsigned int v774; // eax
  __int64 v775; // rdx
  unsigned __int16 v776; // ax
  __int64 v777; // rdx
  unsigned int v778; // eax
  __int64 v779; // rdx
  unsigned __int16 v780; // ax
  __int64 v781; // rdx
  unsigned int v782; // eax
  __int64 v783; // rdx
  unsigned __int16 v784; // ax
  __int64 v785; // rdx
  unsigned int v786; // eax
  __int64 v787; // rdx
  unsigned __int16 v788; // ax
  __int64 v789; // rdx
  unsigned int v790; // eax
  __int64 v791; // rdx
  unsigned __int16 v792; // ax
  __int64 v793; // rdx
  unsigned int v794; // eax
  __int64 v795; // rdx
  unsigned __int16 v796; // ax
  __int64 v797; // rdx
  unsigned int v798; // eax
  __int64 v799; // rdx
  unsigned __int16 v800; // ax
  __int64 v801; // rdx
  unsigned int v802; // eax
  __int64 v803; // rdx
  unsigned __int16 v804; // ax
  __int64 v805; // rdx
  unsigned int v806; // eax
  __int64 v807; // rdx
  unsigned __int16 v808; // ax
  __int64 v809; // rdx
  unsigned int v810; // eax
  __int64 v811; // rdx
  unsigned __int16 v812; // ax
  __int64 v813; // rdx
  unsigned int v814; // eax
  __int64 v815; // rdx
  unsigned __int16 v816; // ax
  __int64 v817; // rdx
  unsigned int v818; // eax
  __int64 v819; // rdx
  unsigned __int16 v820; // ax
  __int64 v821; // rdx
  unsigned int v822; // eax
  __int64 v823; // rdx
  unsigned __int16 v824; // ax
  __int64 v825; // rdx
  unsigned int v826; // eax
  __int64 v827; // rdx
  unsigned __int16 v828; // ax
  __int64 v829; // rdx
  unsigned int v830; // eax
  __int64 v831; // rdx
  unsigned __int16 v832; // ax
  __int64 v833; // rdx
  unsigned int v834; // eax
  __int64 v835; // rdx
  unsigned __int16 v836; // ax
  __int64 v837; // rdx
  unsigned int v838; // eax
  __int64 v839; // rdx
  unsigned __int16 v840; // ax
  __int64 v841; // rdx
  unsigned int v842; // eax
  __int64 v843; // rdx
  unsigned __int16 v844; // ax
  __int64 v845; // rdx
  unsigned int v846; // eax
  __int64 v847; // rdx
  unsigned __int16 v848; // ax
  __int64 v849; // rdx
  unsigned int v850; // eax
  __int64 v851; // rdx
  unsigned __int16 v852; // ax
  __int64 v853; // rdx
  unsigned int v854; // eax
  __int64 v855; // rdx
  unsigned __int16 v856; // ax
  __int64 v857; // rdx
  unsigned int v858; // eax
  __int64 v859; // rdx
  unsigned __int16 v860; // ax
  __int64 v861; // rdx
  unsigned int v862; // eax
  __int64 v863; // rdx
  unsigned __int16 v864; // ax
  __int64 v865; // rdx
  unsigned int v866; // eax
  __int64 v867; // rdx
  unsigned __int16 v868; // ax
  __int64 v869; // rdx
  unsigned int v870; // eax
  __int64 v871; // rdx
  unsigned __int16 v872; // ax
  __int64 v873; // rdx
  unsigned int v874; // eax
  __int64 v875; // rdx
  unsigned __int16 v876; // ax
  __int64 v877; // rdx
  unsigned int v878; // eax
  __int64 v879; // rdx
  unsigned __int16 v880; // ax
  __int64 v881; // rdx
  unsigned int v882; // eax
  __int64 v883; // rdx
  unsigned __int16 v884; // ax
  __int64 v885; // rdx
  unsigned int v886; // eax
  __int64 v887; // rdx
  unsigned __int16 v888; // ax
  __int64 v889; // rdx
  unsigned int v890; // eax
  __int64 v891; // rdx
  unsigned __int16 v892; // ax
  __int64 v893; // rdx
  unsigned int v894; // eax
  __int64 v895; // rdx
  unsigned __int16 v896; // ax
  __int64 v897; // rdx
  unsigned int v898; // eax
  __int64 v899; // rdx
  unsigned __int16 v900; // ax
  __int64 v901; // rdx
  unsigned int v902; // eax
  __int64 v903; // rdx
  unsigned __int16 v904; // ax
  __int64 v905; // rdx
  unsigned int v906; // eax
  __int64 v907; // rdx
  unsigned __int16 v908; // ax
  __int64 v909; // rdx
  unsigned int v910; // eax
  __int64 v911; // rdx
  unsigned __int16 v912; // ax
  __int64 v913; // rdx
  unsigned int v914; // eax
  __int64 v915; // rdx
  unsigned __int16 v916; // ax
  __int64 v917; // rdx
  unsigned int v918; // eax
  __int64 v919; // rdx
  unsigned __int16 v920; // ax
  __int64 v921; // rdx
  unsigned int v922; // eax
  __int64 v923; // rdx
  unsigned __int16 v924; // ax
  __int64 v925; // rdx
  unsigned int v926; // eax
  __int64 v927; // rdx
  unsigned __int16 v928; // ax
  __int64 v929; // rdx
  unsigned int v930; // eax
  __int64 v931; // rdx
  unsigned __int16 v932; // ax
  __int64 v933; // rdx
  unsigned int v934; // eax
  __int64 v935; // rdx
  unsigned __int16 v936; // ax
  __int64 v937; // rdx
  unsigned int v938; // eax
  __int64 v939; // rdx
  unsigned __int16 v940; // ax
  __int64 v941; // rdx
  unsigned int v942; // eax
  __int64 v943; // rdx
  unsigned __int16 v944; // ax
  __int64 v945; // rdx
  unsigned int v946; // eax
  __int64 v947; // rdx
  unsigned __int16 v948; // ax
  __int64 v949; // rdx
  unsigned int v950; // eax
  __int64 v951; // rdx
  unsigned __int16 v952; // ax
  __int64 v953; // rdx
  unsigned int v954; // eax
  __int64 v955; // rdx
  unsigned __int16 v956; // ax
  __int64 v957; // rdx
  unsigned int v958; // eax
  __int64 v959; // rdx
  unsigned int v960; // eax
  __int64 v961; // rdx
  unsigned __int16 v962; // ax
  __int64 v963; // rdx
  unsigned int v964; // eax
  __int64 v965; // rdx
  unsigned __int16 v966; // ax
  __int64 v967; // rdx
  unsigned int v968; // eax
  __int64 v969; // rdx
  unsigned __int16 v970; // ax
  __int64 v971; // rdx
  unsigned int v972; // eax
  __int64 v973; // rdx
  unsigned int v974; // eax
  __int64 v975; // rdx
  unsigned int v976; // eax
  __int64 v977; // rdx
  unsigned int v978; // eax
  __int64 v979; // rdx
  unsigned int v980; // eax
  __int64 v981; // rdx
  unsigned int v982; // eax
  __int64 v983; // rdx
  unsigned int v984; // eax
  __int64 v985; // rdx
  unsigned __int16 v986; // ax
  __int64 v987; // rdx
  unsigned int v988; // eax
  __int64 v989; // rdx
  unsigned __int16 v990; // ax
  __int64 v991; // rdx
  unsigned int v992; // eax
  __int64 v993; // rdx
  unsigned __int16 v994; // ax
  __int64 v995; // rdx
  unsigned int v996; // eax
  __int64 v997; // rdx
  unsigned __int16 v998; // ax
  __int64 v999; // rdx
  unsigned int v1000; // eax
  __int64 v1001; // rdx
  unsigned __int16 v1002; // ax
  __int64 v1003; // rdx
  unsigned int v1004; // eax
  __int64 v1005; // rdx
  unsigned __int16 v1006; // ax
  __int64 v1007; // rdx
  unsigned int v1008; // eax
  __int64 v1009; // rdx
  unsigned __int16 v1010; // ax
  __int64 v1011; // rdx
  unsigned int v1012; // eax
  __int64 v1013; // rdx
  unsigned __int16 v1014; // ax
  __int64 v1015; // rdx
  unsigned int v1016; // eax
  __int64 v1017; // rdx
  unsigned __int16 v1018; // ax
  __int64 v1019; // rdx
  unsigned int v1020; // eax
  __int64 v1021; // rdx
  unsigned __int16 v1022; // ax
  __int64 v1023; // rdx
  unsigned int v1024; // eax
  __int64 v1025; // rdx
  unsigned __int16 v1026; // ax
  __int64 v1027; // rdx
  unsigned int v1028; // eax
  __int64 v1029; // rdx
  unsigned int v1030; // eax
  __int64 v1031; // rdx
  unsigned int v1032; // eax
  __int64 v1033; // rdx
  unsigned int v1034; // eax
  __int64 v1035; // rdx
  unsigned __int16 v1036; // ax
  __int64 v1037; // rdx
  unsigned int v1038; // eax
  __int64 v1039; // rdx
  unsigned __int16 v1040; // ax
  __int64 v1041; // rdx
  unsigned int v1042; // eax
  __int64 v1043; // rdx
  unsigned __int16 v1044; // ax
  __int64 v1045; // rdx
  unsigned int v1046; // eax
  __int64 v1047; // rdx
  unsigned __int16 v1048; // ax
  __int64 v1049; // rdx
  unsigned int v1050; // eax
  __int64 v1051; // rdx
  unsigned __int16 v1052; // ax
  __int64 v1053; // rdx
  unsigned int v1054; // eax
  __int64 v1055; // rdx
  unsigned __int16 v1056; // ax
  __int64 v1057; // rdx
  unsigned int v1058; // eax
  __int64 v1059; // rdx
  unsigned __int16 v1060; // ax
  __int64 v1061; // rdx
  unsigned int v1062; // eax
  __int64 v1063; // rdx
  unsigned __int16 v1064; // ax
  __int64 v1065; // rdx
  unsigned int v1066; // eax
  __int64 v1067; // rdx
  unsigned __int16 v1068; // ax
  __int64 v1069; // rdx
  unsigned int v1070; // eax
  __int64 v1071; // rdx
  unsigned __int16 v1072; // ax
  __int64 v1073; // rdx
  unsigned int v1074; // eax
  __int64 v1075; // rdx
  unsigned int v1076; // eax
  __int64 v1077; // rdx
  unsigned __int16 v1078; // ax
  __int64 v1079; // rdx
  unsigned int v1080; // eax
  __int64 v1081; // rdx
  unsigned __int16 v1082; // ax
  __int64 v1083; // rdx
  unsigned int v1084; // eax
  __int64 v1085; // rdx
  unsigned __int16 v1086; // ax
  __int64 v1087; // rdx
  unsigned int v1088; // eax
  __int64 v1089; // rdx
  unsigned __int16 v1090; // ax
  __int64 v1091; // rdx
  unsigned int v1092; // eax
  __int64 v1093; // rdx
  unsigned __int16 v1094; // ax
  __int64 v1095; // rdx
  unsigned int v1096; // eax
  __int64 v1097; // rdx
  unsigned __int16 v1098; // ax
  __int64 v1099; // rdx
  unsigned int v1100; // eax
  __int64 v1101; // rdx
  unsigned __int16 v1102; // ax
  __int64 v1103; // rdx
  unsigned int v1104; // eax
  __int64 v1105; // rdx
  unsigned __int16 v1106; // ax
  __int64 v1107; // rdx
  unsigned int v1108; // eax
  __int64 v1109; // rdx
  unsigned __int16 v1110; // ax
  __int64 v1111; // rdx
  unsigned int v1112; // eax
  __int64 v1113; // rdx
  unsigned __int16 v1114; // ax
  __int64 v1115; // rdx
  unsigned int v1116; // eax
  __int64 v1117; // rdx
  unsigned __int16 v1118; // ax
  __int64 v1119; // rdx
  unsigned int v1120; // eax
  __int64 v1121; // rdx
  unsigned __int16 v1122; // ax
  __int64 v1123; // rdx
  unsigned int v1124; // eax
  __int64 v1125; // rdx
  unsigned __int16 v1126; // ax
  __int64 v1127; // rdx
  unsigned int v1128; // eax
  __int64 v1129; // rdx
  unsigned int v1130; // eax
  __int64 v1131; // rdx
  unsigned int v1132; // eax
  __int64 v1133; // rdx
  unsigned int v1134; // eax
  __int64 v1135; // rdx
  unsigned int v1136; // eax
  __int64 v1137; // rdx
  unsigned __int16 v1138; // ax
  __int64 v1139; // rdx
  unsigned int v1140; // eax
  __int64 v1141; // rdx
  unsigned int v1142; // eax
  __int64 v1143; // rdx
  unsigned int v1144; // eax
  __int64 v1145; // rdx
  unsigned __int16 v1146; // ax
  __int64 v1147; // rdx
  unsigned int v1148; // eax
  __int64 v1149; // rdx
  unsigned __int16 v1150; // ax
  __int64 v1151; // rdx
  unsigned int v1152; // eax
  __int64 v1153; // rdx
  unsigned __int16 v1154; // ax
  __int64 v1155; // rdx
  unsigned int v1156; // eax
  __int64 v1157; // rdx
  unsigned __int16 v1158; // ax
  __int64 v1159; // rdx
  unsigned int v1160; // eax
  __int64 v1161; // rdx
  unsigned __int16 v1162; // ax
  __int64 v1163; // rdx
  unsigned int v1164; // eax
  __int64 v1165; // rdx
  unsigned __int16 v1166; // ax
  __int64 v1167; // rdx
  unsigned int v1168; // eax
  __int64 v1169; // rdx
  unsigned __int16 v1170; // ax
  __int64 v1171; // rdx
  unsigned int v1172; // eax
  __int64 v1173; // rdx
  unsigned __int16 v1174; // ax
  __int64 v1175; // rdx
  unsigned int v1176; // eax
  __int64 v1177; // rdx
  unsigned __int16 v1178; // ax
  __int64 v1179; // rdx
  unsigned int v1180; // eax
  __int64 v1181; // rdx
  unsigned __int16 v1182; // ax
  __int64 v1183; // rdx
  unsigned int v1184; // eax
  __int64 v1185; // rdx
  unsigned __int16 v1186; // ax
  __int64 v1187; // rdx
  unsigned int v1188; // eax
  __int64 v1189; // rdx
  unsigned __int16 v1190; // ax
  __int64 v1191; // rdx
  unsigned int v1192; // eax
  __int64 v1193; // rdx
  unsigned __int16 v1194; // ax
  __int64 v1195; // rdx
  unsigned int v1196; // eax
  __int64 v1197; // rdx
  unsigned __int16 v1198; // ax
  __int64 v1199; // rdx
  unsigned int v1200; // eax
  unsigned __int8 v1201; // al
  __int64 v1202; // rdx
  unsigned __int8 v1203; // al
  __int64 v1204; // rdx
  unsigned __int8 v1205; // al
  __int64 v1206; // rdx
  unsigned int v1207; // eax
  __int64 v1208; // rdx
  unsigned int v1209; // eax
  __int64 v1210; // rdx
  unsigned int v1211; // eax
  __int64 v1212; // rdx
  unsigned __int8 v1213; // al
  __int64 v1214; // rdx
  unsigned __int8 v1215; // al
  __int64 v1216; // rdx
  unsigned int v1217; // eax
  __int64 v1218; // rdx
  unsigned int v1219; // eax
  __int64 v1220; // rdx
  unsigned int v1221; // eax
  __int64 v1222; // rdx
  unsigned int v1223; // eax
  __int64 v1224; // rdx
  unsigned int v1225; // eax
  __int64 v1226; // rdx
  unsigned int v1227; // eax
  __int64 v1228; // rdx
  unsigned int v1229; // eax
  __int64 v1230; // rdx
  unsigned int v1231; // eax
  __int64 v1232; // rdx
  unsigned int v1233; // eax
  __int64 v1234; // rdx
  unsigned __int8 v1235; // al
  __int64 v1236; // rdx
  unsigned int v1237; // eax
  __int64 v1238; // rdx
  unsigned int v1239; // eax
  __int64 v1240; // rdx
  unsigned int v1241; // eax
  __int64 v1242; // rdx
  unsigned __int16 v1243; // ax
  __int64 v1244; // rdx
  unsigned __int16 v1245; // ax
  __int64 v1246; // rdx
  unsigned __int16 v1247; // ax
  __int64 v1248; // rdx
  unsigned __int16 v1249; // ax
  __int64 v1250; // rdx
  unsigned __int16 v1251; // ax
  __int64 v1252; // rdx
  unsigned int v1253; // eax
  __int64 v1254; // rdx
  unsigned int v1255; // eax
  __int64 v1256; // rdx
  unsigned int v1257; // eax
  __int64 v1258; // rdx
  unsigned int v1259; // eax
  __int64 v1260; // rdx
  unsigned int v1261; // eax
  __int64 v1262; // rdx
  unsigned int v1263; // eax
  __int64 v1264; // rdx
  unsigned int v1265; // eax
  __int64 v1266; // rdx
  unsigned int v1267; // eax
  __int64 v1268; // rdx
  unsigned int v1269; // eax
  __int64 v1270; // rdx
  unsigned int v1271; // eax
  __int64 v1272; // rdx
  unsigned int v1273; // eax
  __int64 v1274; // rdx
  unsigned int v1275; // eax
  __int64 v1276; // rdx
  unsigned int v1277; // eax
  __int64 v1278; // rdx
  unsigned int v1279; // eax
  __int64 v1280; // rdx
  unsigned int v1281; // eax
  __int64 v1282; // rdx
  unsigned int v1283; // eax
  __int64 v1284; // rdx
  unsigned int v1285; // eax
  __int64 v1286; // rdx
  unsigned int v1287; // eax
  __int64 v1288; // rdx
  unsigned int v1289; // eax
  __int64 v1290; // r9
  char *v1291; // rax
  __int64 v1292; // rax
  __int64 v1293; // rdx
  unsigned int v1294; // eax
  __int64 v1295; // rdx
  unsigned int v1296; // eax
  __int64 v1297; // rdx
  unsigned int v1298; // eax
  __int64 v1299; // rdx
  unsigned int v1300; // eax
  __int64 v1301; // rdx
  unsigned int v1302; // eax
  __int64 v1303; // rdx
  unsigned int v1304; // eax
  __int64 v1305; // rdx
  unsigned int v1306; // eax
  __int64 v1307; // rdx
  unsigned int v1308; // eax
  __int64 v1309; // rdx
  unsigned int v1310; // eax
  unsigned __int8 v1311; // al
  __int64 v1312; // rdx
  unsigned int v1313; // eax
  __int64 v1314; // rdx
  unsigned int v1315; // eax
  __int64 v1316; // rdx
  unsigned int v1317; // eax
  __int64 v1318; // rdx
  unsigned int v1319; // eax
  __int64 v1320; // rdx
  unsigned int v1321; // eax
  __int64 v1322; // rdx
  unsigned int v1323; // eax
  __int64 v1324; // rdx
  unsigned int v1325; // eax
  __int64 v1326; // rdx
  unsigned int v1327; // eax
  __int64 v1328; // rdx
  unsigned int v1329; // eax
  __int64 v1330; // rdx
  unsigned int v1331; // eax
  __int64 v1332; // rdx
  unsigned int v1333; // eax
  __int64 v1334; // rdx
  unsigned int v1335; // eax
  __int64 v1336; // rdx
  unsigned int v1337; // eax
  __int64 v1338; // rdx
  unsigned int v1339; // eax
  __int64 v1340; // rdx
  unsigned int v1341; // eax
  __int64 v1342; // rdx
  unsigned int v1343; // eax
  __int64 v1344; // rdx
  unsigned int v1345; // eax
  __int64 v1346; // rdx
  unsigned int v1347; // eax
  __int64 v1348; // rdx
  unsigned int v1349; // eax
  __int64 v1350; // rdx
  unsigned int v1351; // eax
  __int64 v1352; // rdx
  unsigned int v1353; // eax
  __int64 v1354; // rdx
  unsigned int v1355; // eax
  __int64 v1356; // rdx
  unsigned int v1357; // eax
  __int64 v1358; // rdx
  unsigned int v1359; // eax
  __int64 v1360; // rdx
  unsigned int v1361; // eax
  __int64 v1362; // rdx
  int v1363; // eax
  __int64 v1364; // rdx
  unsigned int v1365; // eax
  __int64 v1366; // rdx
  unsigned int v1367; // eax
  __int64 v1368; // rdx
  unsigned int v1369; // eax
  __int64 v1370; // rdx
  unsigned int v1371; // eax
  __int64 v1372; // rdx
  unsigned int v1373; // eax
  __int64 v1374; // rdx
  unsigned int v1375; // eax
  __int64 v1376; // rdx
  unsigned int v1377; // eax
  __int64 v1378; // rdx
  unsigned int v1379; // eax
  __int64 v1380; // rdx
  unsigned int v1381; // eax
  __int64 v1382; // rdx
  unsigned int v1383; // eax
  __int64 v1384; // rdx
  unsigned int v1385; // eax
  __int64 v1386; // rdx
  unsigned int v1387; // eax
  __int64 v1388; // rdx
  unsigned int v1389; // eax
  __int64 v1390; // rdx
  unsigned int v1391; // eax
  __int64 v1392; // rdx
  unsigned int v1393; // eax
  __int64 v1394; // rdx
  unsigned int v1395; // eax
  __int64 v1396; // rdx
  unsigned int v1397; // eax
  __int64 v1398; // rdx
  unsigned int v1399; // eax
  __int64 v1400; // rdx
  unsigned int v1401; // eax
  __int64 v1402; // rdx
  unsigned int v1403; // eax
  __int64 v1404; // rdx
  unsigned int v1405; // eax
  __int64 v1406; // rdx
  unsigned int v1407; // eax
  __int64 v1408; // rdx
  unsigned int v1409; // eax
  __int64 v1410; // rdx
  unsigned int v1411; // eax
  __int64 v1412; // rdx
  unsigned int v1413; // eax
  __int64 v1414; // rdx
  unsigned int v1415; // eax
  __int64 v1416; // rdx
  unsigned int v1417; // eax
  __int64 v1418; // rdx
  unsigned int v1419; // eax
  __int64 v1420; // rdx
  unsigned int v1421; // eax
  __int64 v1422; // rdx
  unsigned int v1423; // eax
  __int64 v1424; // rdx
  unsigned int v1425; // eax
  bool v1427; // [rsp+20h] [rbp-178h]
  int i; // [rsp+24h] [rbp-174h]
  int v1429; // [rsp+28h] [rbp-170h]
  int v1430; // [rsp+2Ch] [rbp-16Ch]
  int v1431; // [rsp+30h] [rbp-168h]
  int v1432; // [rsp+34h] [rbp-164h]
  int v1433; // [rsp+38h] [rbp-160h]
  int v1434; // [rsp+3Ch] [rbp-15Ch]
  int v1435; // [rsp+40h] [rbp-158h]
  __int64 v1436; // [rsp+48h] [rbp-150h]
  _DWORD mask[36]; // [rsp+60h] [rbp-138h] BYREF
  _BYTE v1438[144]; // [rsp+F0h] [rbp-A8h] BYREF

  sub_140639AA0(mask);
  CInPacket::DecodeBuffer(iPacket, mask, 0x84u);
  if ( getBuffStat(mask, 93) )
  {
    v4 = CInPacket::Decode1(iPacket, v3);
    sub_1413DBDA0(a1, v4);
  }
  if ( getBuffStat(mask, 107) )
  {
    v6 = CInPacket::Decode1(iPacket, v5);
    sub_1411A4DB0(a1, v6);
  }
  if ( getBuffStat(mask, 108) )
  {
    v8 = CInPacket::Decode2(iPacket, v7);
    sub_1411A45D0(a1, v8);
    v10 = CInPacket::Decode4(iPacket, v9);
    sub_1411AE0A0(a1, v10);
  }
  if ( getBuffStat(mask, 110) )
  {
    v12 = CInPacket::Decode2(iPacket, v11);
    sub_1411AC4B0(a1, v12);
    v14 = CInPacket::Decode4(iPacket, v13);
    sub_1411B5840(a1, v14);
  }
  if ( getBuffStat(mask, 371) )
  {
    v16 = CInPacket::Decode2(iPacket, v15);
    sub_1411A5EE0(a1, v16);
  }
  if ( getBuffStat(mask, 103) )
  {
    v18 = CInPacket::Decode2(iPacket, v17);
    sub_1411ABA30(a1, v18);
    v20 = CInPacket::Decode4(iPacket, v19);
    sub_1411B4E20(a1, v20);
  }
  if ( getBuffStat(mask, 186) )
  {
    v22 = CInPacket::Decode2(iPacket, v21);
    sub_1411A6EA0(a1, v22);
    v24 = CInPacket::Decode4(iPacket, v23);
    sub_1411B0830(a1, v24);
  }
  if ( getBuffStat(mask, 222) )
  {
    v26 = CInPacket::Decode1(iPacket, v25);
    sub_1411AAE90(a1, v26);
  }
  if ( getBuffStat(mask, 106) )
  {
    v28 = CInPacket::Decode2(iPacket, v27);
    sub_1411A55C0(a1, v28);
    v30 = CInPacket::Decode4(iPacket, v29);
    sub_1411AF000(a1, v30);
  }
  if ( getBuffStat(mask, 105) )
  {
    v32 = CInPacket::Decode2(iPacket, v31);
    sub_1411AA860(a1, v32);
    v34 = CInPacket::Decode4(iPacket, v33);
    sub_1411B3CB0(a1, v34);
  }
  if ( getBuffStat(mask, 118) )
  {
    v36 = CInPacket::Decode2(iPacket, v35);
    sub_1411AC480(a1, v36);
    v38 = CInPacket::Decode4(iPacket, v37);
    sub_1411B5810(a1, v38);
  }
  if ( getBuffStat(mask, 218) )
  {
    v40 = CInPacket::Decode2(iPacket, v39);
    sub_1411AC450(a1, v40);
    v42 = CInPacket::Decode4(iPacket, v41);
    sub_1411B57E0(a1, v42);
  }
  if ( getBuffStat(mask, 119) )
  {
    v44 = CInPacket::Decode2(iPacket, v43);
    sub_1411A52C0(a1, v44);
    v46 = CInPacket::Decode4(iPacket, v45);
    sub_1411AED30(a1, v46);
  }
  if ( getBuffStat(mask, 120) )
  {
    v48 = CInPacket::Decode2(iPacket, v47);
    sub_1411AB2B0(a1, v48);
    v50 = CInPacket::Decode4(iPacket, v49);
    sub_1411B46D0(a1, v50);
  }
  if ( getBuffStat(mask, 217) )
  {
    v52 = CInPacket::Decode2(iPacket, v51);
    sub_1411A9CF0(a1, v52);
    v54 = CInPacket::Decode4(iPacket, v53);
    sub_1411B31D0(a1, v54);
  }
  if ( getBuffStat(mask, 202) )
  {
    v56 = CInPacket::Decode2(iPacket, v55);
    sub_1411ABDF0(a1, v56);
    v58 = CInPacket::Decode4(iPacket, v57);
    sub_1411B51B0(a1, v58);
  }
  if ( getBuffStat(mask, 205) )
  {
    v60 = CInPacket::Decode1(iPacket, v59);
    sub_1411ABC10(a1, v60);
  }
  if ( getBuffStat(mask, 203) )
  {
    v62 = CInPacket::Decode2(iPacket, v61);
    sub_1411A5970(a1, v62);
    v64 = CInPacket::Decode4(iPacket, v63);
    sub_1411AF330(a1, v64);
  }
  if ( getBuffStat(mask, 204) )
  {
    v66 = CInPacket::Decode2(iPacket, v65);
    sub_1411ABD90(a1, v66);
    v68 = CInPacket::Decode4(iPacket, v67);
    sub_1411B5150(a1, v68);
  }
  if ( getBuffStat(mask, 104) )
  {
    v70 = CInPacket::Decode2(iPacket, v69);
    sub_1411A9B40(a1, v70);
  }
  if ( getBuffStat(mask, 104) )
  {
    v72 = CInPacket::Decode2(iPacket, v71);
    sub_1411A9B40(a1, v72);
    v74 = CInPacket::Decode4(iPacket, v73);
    sub_1411B3020(a1, v74);
  }
  if ( getBuffStat(mask, 113) )
  {
    v76 = CInPacket::Decode2(iPacket, v75);
    sub_1411AAB00(a1, v76);
    v78 = CInPacket::Decode4(iPacket, v77);
    sub_1411B3F20(a1, v78);
  }
  if ( getBuffStat(mask, 96) )
    sub_1411A54D0(a1, 1LL);
  if ( getBuffStat(mask, 102) )
    sub_1411AB340(a1, 1LL);
  if ( getBuffStat(mask, 121) )
  {
    v80 = CInPacket::Decode2(iPacket, v79);
    sub_1411A8F70(a1, v80);
    v82 = CInPacket::Decode4(iPacket, v81);
    sub_1411B24E0(a1, v82);
  }
  if ( getBuffStat(mask, 139) )
  {
    v84 = CInPacket::Decode2(iPacket, v83);
    sub_1411A6D20(a1, v84);
  }
  if ( getBuffStat(mask, 127) )
  {
    v86 = CInPacket::Decode2(iPacket, v85);
    sub_1411A3A00(a1, v86);
    v88 = CInPacket::Decode4(iPacket, v87);
    sub_1411AD4D0(a1, v88);
  }
  if ( getBuffStat(mask, 273) )
  {
    v90 = CInPacket::Decode2(iPacket, v89);
    sub_1411A8A00(a1, v90);
    v92 = CInPacket::Decode4(iPacket, v91);
    sub_1411B1FA0(a1, v92);
  }
  if ( getBuffStat(mask, 274) )
  {
    v94 = CInPacket::Decode2(iPacket, v93);
    sub_1411A89D0(a1, v94);
    v96 = CInPacket::Decode4(iPacket, v95);
    sub_1411B1F70(a1, v96);
  }
  if ( getBuffStat(mask, 128) )
  {
    v98 = CInPacket::Decode4(iPacket, v97);
    sub_1411A9480(a1, v98);
  }
  if ( getBuffStat(mask, 134) )
  {
    v100 = CInPacket::Decode2(iPacket, v99);
    sub_1411A3E20(a1, v100);
    v102 = CInPacket::Decode4(iPacket, v101);
    sub_1411AD8F0(a1, v102);
  }
  if ( getBuffStat(mask, 140) )
  {
    v104 = CInPacket::Decode2(iPacket, v103);
    sub_1411A3E50(a1, v104);
    v106 = CInPacket::Decode4(iPacket, v105);
    sub_1411AD920(a1, v106);
  }
  if ( getBuffStat(mask, 149) )
  {
    v108 = CInPacket::Decode2(iPacket, v107);
    sub_1411A5AF0(a1, v108);
    v110 = CInPacket::Decode4(iPacket, v109);
    sub_1411AF4B0(a1, v110);
  }
  if ( getBuffStat(mask, 141) )
  {
    v112 = CInPacket::Decode2(iPacket, v111);
    sub_1411AA530(a1, v112);
    v114 = CInPacket::Decode4(iPacket, v113);
    sub_1411B3980(a1, v114);
  }
  if ( getBuffStat(mask, 143) )
  {
    v116 = CInPacket::Decode4(iPacket, v115);
    sub_1411AA470(a1, v116);
  }
  if ( getBuffStat(mask, 144) )
  {
    v118 = CInPacket::Decode4(iPacket, v117);
    sub_1411AA410(a1, v118);
  }
  if ( getBuffStat(mask, 145) )
  {
    v120 = CInPacket::Decode4(iPacket, v119);
    sub_1411A57B0(a1, v120);
  }
  if ( getBuffStat(mask, 146) )
  {
    v122 = CInPacket::Decode4(iPacket, v121);
    sub_1411A5820(a1, v122);
  }
  if ( getBuffStat(mask, 147) )
  {
    v124 = CInPacket::Decode2(iPacket, v123);
    sub_1411A5A60(a1, v124);
    v126 = CInPacket::Decode4(iPacket, v125);
    sub_1411AF420(a1, v126);
  }
  if ( getBuffStat(mask, 148) )
    sub_1411A5A90(a1, 1LL);
  if ( getBuffStat(mask, 159) )
  {
    v128 = CInPacket::Decode2(iPacket, v127);
    sub_1411AA2F0(a1, v128);
    v130 = CInPacket::Decode4(iPacket, v129);
    sub_1411B37A0(a1, v130);
  }
  if ( getBuffStat(mask, 848) )
  {
    v132 = CInPacket::Decode2(iPacket, v131);
    sub_1411AA2C0(a1, v132);
    v134 = CInPacket::Decode4(iPacket, v133);
    sub_1411B3770(a1, v134);
  }
  if ( getBuffStat(mask, 161) )
  {
    v136 = CInPacket::Decode2(iPacket, v135);
    sub_1411AB850(a1, v136);
    v138 = CInPacket::Decode4(iPacket, v137);
    sub_1411B4C40(a1, v138);
  }
  if ( getBuffStat(mask, 162) )
  {
    v140 = CInPacket::Decode2(iPacket, v139);
    sub_1411AB820(a1, v140);
    v142 = CInPacket::Decode4(iPacket, v141);
    sub_1411B4C10(a1, v142);
  }
  if ( getBuffStat(mask, 163) )
  {
    v144 = CInPacket::Decode2(iPacket, v143);
    sub_1411A66C0(a1, v144);
    v146 = CInPacket::Decode4(iPacket, v145);
    sub_1411B0080(a1, v146);
  }
  if ( getBuffStat(mask, 165) )
  {
    v148 = CInPacket::Decode4(iPacket, v147);
    sub_1411A89A0(a1, v148);
  }
  if ( getBuffStat(mask, 168) )
    sub_1411A6B40(a1, 1LL);
  if ( getBuffStat(mask, 169) )
  {
    v150 = CInPacket::Decode2(iPacket, v149);
    sub_1411A6C90(a1, v150);
    v152 = CInPacket::Decode4(iPacket, v151);
    sub_1411B0620(a1, v152);
  }
  if ( getBuffStat(mask, 219) )
  {
    v154 = CInPacket::Decode2(iPacket, v153);
    sub_1411A6C60(a1, v154);
    v156 = CInPacket::Decode4(iPacket, v155);
    sub_1411B05F0(a1, v156);
  }
  if ( getBuffStat(mask, 200) )
  {
    v158 = CInPacket::Decode2(iPacket, v157);
    sub_1411AC540(a1, v158);
    v160 = CInPacket::Decode4(iPacket, v159);
    sub_1411B58D0(a1, v160);
  }
  if ( getBuffStat(mask, 172) )
  {
    v162 = CInPacket::Decode2(iPacket, v161);
    sub_1411A5C40(a1, v162);
    v164 = CInPacket::Decode4(iPacket, v163);
    sub_1411AF600(a1, v164);
  }
  if ( getBuffStat(mask, 174) )
  {
    v166 = CInPacket::Decode2(iPacket, v165);
    sub_1411A6810(a1, v166);
    v168 = CInPacket::Decode4(iPacket, v167);
    sub_1411B01D0(a1, v168);
  }
  if ( getBuffStat(mask, 188) )
    sub_1411AB310(a1, 1LL);
  if ( getBuffStat(mask, 176) )
    sub_1411A42D0(a1, 1LL);
  if ( getBuffStat(mask, 189) )
  {
    v170 = CInPacket::Decode2(iPacket, v169);
    sub_1411A8AF0(a1, v170);
    v172 = CInPacket::Decode4(iPacket, v171);
    sub_1411B2090(a1, v172);
  }
  if ( getBuffStat(mask, 290) )
    sub_1411A4600(a1, 1LL);
  if ( getBuffStat(mask, 198) )
  {
    v174 = CInPacket::Decode2(iPacket, v173);
    sub_1413DB860(a1, v174);
    v176 = CInPacket::Decode4(iPacket, v175);
    sub_1413DC160(a1, v176);
  }
  if ( getBuffStat(mask, 206) )
  {
    v178 = CInPacket::Decode2(iPacket, v177);
    sub_1411A65D0(a1, v178);
    v180 = CInPacket::Decode4(iPacket, v179);
    sub_1411AFF90(a1, v180);
  }
  if ( getBuffStat(mask, 213) )
  {
    v182 = CInPacket::Decode2(iPacket, v181);
    sub_1411A5500(a1, v182);
    v184 = CInPacket::Decode4(iPacket, v183);
    sub_1411AEF40(a1, v184);
  }
  if ( getBuffStat(mask, 221) )
  {
    v186 = CInPacket::Decode2(iPacket, v185);
    sub_1411A34F0(a1, v186);
    v188 = CInPacket::Decode4(iPacket, v187);
    sub_1411ACFC0(a1, v188);
  }
  if ( getBuffStat(mask, 155) )
  {
    v190 = CInPacket::Decode2(iPacket, v189);
    sub_1411A7170(a1, v190);
    v192 = CInPacket::Decode4(iPacket, v191);
    sub_1411B0AA0(a1, v192);
  }
  if ( getBuffStat(mask, 226) )
    sub_1411A72F0(a1, 1LL);
  if ( getBuffStat(mask, 233) )
  {
    v194 = CInPacket::Decode2(iPacket, v193);
    sub_1411A58E0(a1, v194);
    v196 = CInPacket::Decode4(iPacket, v195);
    sub_1411AF2A0(a1, v196);
  }
  if ( getBuffStat(mask, 237) )
  {
    v198 = CInPacket::Decode4(iPacket, v197);
    sub_1411AB6D0(a1, v198);
    v200 = CInPacket::Decode4(iPacket, v199);
    sub_1411B4AC0(a1, v200);
  }
  if ( getBuffStat(mask, 239) )
  {
    v202 = CInPacket::Decode2(iPacket, v201);
    sub_1411A6510(a1, v202);
    v204 = CInPacket::Decode4(iPacket, v203);
    sub_1411AFED0(a1, v204);
  }
  if ( getBuffStat(mask, 247) )
  {
    v206 = CInPacket::Decode2(iPacket, v205);
    sub_1411A6390(a1, v206);
    v208 = CInPacket::Decode4(iPacket, v207);
    sub_1411AFD50(a1, v208);
  }
  if ( getBuffStat(mask, 252) )
  {
    v210 = CInPacket::Decode2(iPacket, v209);
    sub_1411A5620(a1, v210);
    v212 = CInPacket::Decode4(iPacket, v211);
    sub_1411AF060(a1, v212);
  }
  if ( getBuffStat(mask, 272) )
  {
    v214 = CInPacket::Decode2(iPacket, v213);
    sub_1411A97B0(a1, v214);
    v216 = CInPacket::Decode4(iPacket, v215);
    sub_1411B2CC0(a1, v216);
  }
  if ( getBuffStat(mask, 254) )
  {
    v218 = CInPacket::Decode2(iPacket, v217);
    sub_1411A83A0(a1, v218);
    v220 = CInPacket::Decode4(iPacket, v219);
    sub_1411B19A0(a1, v220);
  }
  if ( getBuffStat(mask, 289) )
  {
    v222 = CInPacket::Decode2(iPacket, v221);
    sub_1411AC210(a1, v222);
    v224 = CInPacket::Decode4(iPacket, v223);
    sub_1411B55A0(a1, v224);
  }
  if ( getBuffStat(mask, 301) )
  {
    v226 = CInPacket::Decode2(iPacket, v225);
    sub_1411AC1E0(a1, v226);
    v228 = CInPacket::Decode4(iPacket, v227);
    sub_1411B5570(a1, v228);
  }
  if ( getBuffStat(mask, 255) )
  {
    v230 = CInPacket::Decode2(iPacket, v229);
    sub_1411AC2A0(a1, v230);
    v232 = CInPacket::Decode4(iPacket, v231);
    sub_1411B5630(a1, v232);
  }
  if ( getBuffStat(mask, 260) )
  {
    v234 = CInPacket::Decode4(iPacket, v233);
    sub_1411A9D50(a1, v234);
  }
  if ( getBuffStat(mask, 468) )
  {
    v236 = CInPacket::Decode1(iPacket, v235);
    sub_1411A9A50(a1, v236);
  }
  if ( getBuffStat(mask, 263) )
  {
    v238 = CInPacket::Decode2(iPacket, v237);
    sub_1411A7650(a1, v238);
    v240 = CInPacket::Decode4(iPacket, v239);
    sub_1411B0F50(a1, v240);
  }
  if ( getBuffStat(mask, 264) )
  {
    v242 = CInPacket::Decode2(iPacket, v241);
    sub_1411AB9A0(a1, v242);
    v244 = CInPacket::Decode4(iPacket, v243);
    sub_1411B4D90(a1, v244);
  }
  if ( getBuffStat(mask, 267) )
  {
    v246 = CInPacket::Decode2(iPacket, v245);
    sub_1411A7AA0(a1, v246);
    v248 = CInPacket::Decode4(iPacket, v247);
    sub_1411B1220(a1, v248);
  }
  if ( getBuffStat(mask, 270) )
  {
    v250 = CInPacket::Decode2(iPacket, v249);
    sub_1411A7CE0(a1, v250);
    v252 = CInPacket::Decode4(iPacket, v251);
    sub_1411B1310(a1, v252);
  }
  if ( getBuffStat(mask, 291) )
  {
    v254 = CInPacket::Decode2(iPacket, v253);
    sub_1411A7EC0(a1, v254);
    v256 = CInPacket::Decode4(iPacket, v255);
    sub_1411B14C0(a1, v256);
  }
  if ( getBuffStat(mask, 293) )
  {
    v258 = CInPacket::Decode2(iPacket, v257);
    sub_1411AB730(a1, v258);
  }
  if ( getBuffStat(mask, 292) )
  {
    v260 = CInPacket::Decode2(iPacket, v259);
    sub_1411A8400(a1, v260);
    v262 = CInPacket::Decode4(iPacket, v261);
    sub_1411B1A00(a1, v262);
  }
  if ( getBuffStat(mask, 299) )
  {
    v264 = CInPacket::Decode2(iPacket, v263);
    sub_1411AA3B0(a1, v264);
    v266 = CInPacket::Decode4(iPacket, v265);
    sub_1411B3860(a1, v266);
  }
  if ( getBuffStat(mask, 300) )
  {
    v268 = CInPacket::Decode2(iPacket, v267);
    sub_1411AB4F0(a1, v268);
    v270 = CInPacket::Decode4(iPacket, v269);
    sub_1411B4910(a1, v270);
  }
  if ( getBuffStat(mask, 302) )
  {
    v272 = CInPacket::Decode2(iPacket, v271);
    sub_1411AB7F0(a1, v272);
    v274 = CInPacket::Decode4(iPacket, v273);
    sub_1411B4BE0(a1, v274);
  }
  if ( getBuffStat(mask, 303) )
  {
    v276 = CInPacket::Decode2(iPacket, v275);
    sub_1411AB3D0(a1, v276);
    v278 = CInPacket::Decode4(iPacket, v277);
    sub_1411B47F0(a1, v278);
  }
  if ( getBuffStat(mask, 305) )
  {
    v280 = CInPacket::Decode2(iPacket, v279);
    sub_1411A9BD0(a1, v280);
    v282 = CInPacket::Decode4(iPacket, v281);
    sub_1411B30B0(a1, v282);
  }
  if ( getBuffStat(mask, 538) )
  {
    v284 = CInPacket::Decode2(iPacket, v283);
    sub_1411A6750(a1, v284);
    v286 = CInPacket::Decode4(iPacket, v285);
    sub_1411B0110(a1, v286);
  }
  if ( getBuffStat(mask, 306) )
  {
    v288 = CInPacket::Decode2(iPacket, v287);
    sub_1411A3490(a1, v288);
    v290 = CInPacket::Decode4(iPacket, v289);
    sub_1411ACF60(a1, v290);
  }
  if ( getBuffStat(mask, 314) )
  {
    v292 = CInPacket::Decode2(iPacket, v291);
    sub_1411AB370(a1, v292);
    v294 = CInPacket::Decode4(iPacket, v293);
    sub_1411B4790(a1, v294);
  }
  if ( getBuffStat(mask, 164) )
  {
    v296 = CInPacket::Decode2(iPacket, v295);
    sub_1411A7140(a1, v296);
    v298 = CInPacket::Decode4(iPacket, v297);
    sub_1411B0A70(a1, v298);
  }
  if ( getBuffStat(mask, 297) )
  {
    v300 = CInPacket::Decode2(iPacket, v299);
    sub_1411AB2E0(a1, v300);
    v302 = CInPacket::Decode4(iPacket, v301);
    sub_1411B4700(a1, v302);
  }
  if ( getBuffStat(mask, 310) )
  {
    v304 = CInPacket::Decode2(iPacket, v303);
    sub_1411A8F40(a1, v304);
    v306 = CInPacket::Decode4(iPacket, v305);
    sub_1411B24B0(a1, v306);
  }
  if ( getBuffStat(mask, 311) )
  {
    v308 = CInPacket::Decode2(iPacket, v307);
    sub_1411A6D80(a1, v308);
    v310 = CInPacket::Decode4(iPacket, v309);
    sub_1411B0710(a1, v310);
  }
  if ( getBuffStat(mask, 312) )
  {
    v312 = CInPacket::Decode2(iPacket, v311);
    sub_1411ABEB0(a1, v312);
    v314 = CInPacket::Decode4(iPacket, v313);
    sub_1411B5270(a1, v314);
  }
  if ( getBuffStat(mask, 313) )
  {
    v316 = CInPacket::Decode2(iPacket, v315);
    sub_1411A4F60(a1, v316);
    v318 = CInPacket::Decode4(iPacket, v317);
    sub_1411AEA30(a1, v318);
  }
  if ( getBuffStat(mask, 313) )
  {
    v1429 = MEMORY[0x7FF9E8EF4220]();
    v320 = CInPacket::Decode4(iPacket, v319);
    sub_1411B7DC0(a1, (v320 + v1429));
  }
  if ( getBuffStat(mask, 315) )
  {
    v322 = CInPacket::Decode2(iPacket, v321);
    sub_1411A7500(a1, v322);
    v324 = CInPacket::Decode4(iPacket, v323);
    sub_1411B0E00(a1, v324);
  }
  if ( getBuffStat(mask, 316) )
  {
    v326 = CInPacket::Decode2(iPacket, v325);
    sub_1411A75F0(a1, v326);
    v328 = CInPacket::Decode4(iPacket, v327);
    sub_1411B0EF0(a1, v328);
  }
  if ( getBuffStat(mask, 317) )
  {
    v330 = CInPacket::Decode2(iPacket, v329);
    sub_1411A7530(a1, v330);
    v332 = CInPacket::Decode4(iPacket, v331);
    sub_1411B0E30(a1, v332);
  }
  if ( getBuffStat(mask, 318) )
  {
    v334 = CInPacket::Decode2(iPacket, v333);
    sub_1411A74D0(a1, v334);
    v336 = CInPacket::Decode4(iPacket, v335);
    sub_1411B0DD0(a1, v336);
  }
  if ( getBuffStat(mask, 319) )
  {
    v338 = CInPacket::Decode2(iPacket, v337);
    sub_1411A6840(a1, v338);
    v340 = CInPacket::Decode4(iPacket, v339);
    sub_1411B0200(a1, v340);
  }
  if ( getBuffStat(mask, 320) )
  {
    v342 = CInPacket::Decode2(iPacket, v341);
    sub_1411A6870(a1, v342);
    v344 = CInPacket::Decode4(iPacket, v343);
    sub_1411B0230(a1, v344);
  }
  if ( getBuffStat(mask, 321) )
    sub_1411AC270(a1, 1LL);
  if ( getBuffStat(mask, 322) )
  {
    v346 = CInPacket::Decode2(iPacket, v345);
    sub_1411A7050(a1, v346);
    v348 = CInPacket::Decode4(iPacket, v347);
    sub_1411B0980(a1, v348);
  }
  if ( getBuffStat(mask, 232) )
  {
    v350 = CInPacket::Decode2(iPacket, v349);
    sub_1411A53B0(a1, v350);
    v352 = CInPacket::Decode4(iPacket, v351);
    sub_1411AEDF0(a1, v352);
  }
  if ( getBuffStat(mask, 294) )
  {
    v354 = CInPacket::Decode2(iPacket, v353);
    sub_1411A3820(a1, v354);
    v356 = CInPacket::Decode4(iPacket, v355);
    sub_1411AD2F0(a1, v356);
  }
  if ( getBuffStat(mask, 173) )
  {
    v358 = CInPacket::Decode2(iPacket, v357);
    sub_1411A94E0(a1, v358);
    v360 = CInPacket::Decode4(iPacket, v359);
    sub_1411B2A50(a1, v360);
  }
  if ( getBuffStat(mask, 327) )
  {
    v362 = CInPacket::Decode2(iPacket, v361);
    sub_1411A4510(a1, v362);
    v364 = CInPacket::Decode4(iPacket, v363);
    sub_1411ADFE0(a1, v364);
  }
  if ( getBuffStat(mask, 151) )
  {
    v366 = CInPacket::Decode2(iPacket, v365);
    sub_1411AC690(a1, v366);
    v368 = CInPacket::Decode4(iPacket, v367);
    sub_1411B5A20(a1, v368);
  }
  if ( getBuffStat(mask, 153) )
  {
    v370 = CInPacket::Decode2(iPacket, v369);
    sub_1411A7E30(a1, v370);
    v372 = CInPacket::Decode4(iPacket, v371);
    sub_1411B1430(a1, v372);
  }
  if ( getBuffStat(mask, 328) )
  {
    v374 = CInPacket::Decode2(iPacket, v373);
    sub_1411A7590(a1, v374);
    v376 = CInPacket::Decode4(iPacket, v375);
    sub_1411B0E90(a1, v376);
  }
  if ( getBuffStat(mask, 329) )
  {
    v378 = CInPacket::Decode2(iPacket, v377);
    sub_1411A39A0(a1, v378);
    v380 = CInPacket::Decode4(iPacket, v379);
    sub_1411AD470(a1, v380);
  }
  if ( getBuffStat(mask, 330) )
  {
    v382 = CInPacket::Decode4(iPacket, v381);
    sub_1411A8B20(a1, v382);
    v384 = CInPacket::Decode4(iPacket, v383);
    sub_1411B20C0(a1, v384);
  }
  if ( getBuffStat(mask, 330) )
  {
    v1430 = MEMORY[0x7FF9E8EF4220]();
    v386 = CInPacket::Decode4(iPacket, v385);
    sub_1411BB4B0(a1, (v386 + v1430));
  }
  if ( getBuffStat(mask, 332) )
  {
    v388 = CInPacket::Decode2(iPacket, v387);
    sub_1411AC090(a1, v388);
    v390 = CInPacket::Decode4(iPacket, v389);
    sub_1411B5450(a1, v390);
  }
  if ( getBuffStat(mask, 333) )
  {
    v392 = CInPacket::Decode2(iPacket, v391);
    sub_1411AB7C0(a1, v392);
    v394 = CInPacket::Decode4(iPacket, v393);
    sub_1411B4BB0(a1, v394);
  }
  if ( getBuffStat(mask, 334) )
  {
    v396 = CInPacket::Decode1(iPacket, v395);
    sub_1411AA4D0(a1, v396);
    v398 = CInPacket::Decode4(iPacket, v397);
    sub_1411B3920(a1, v398);
  }
  if ( getBuffStat(mask, 338) )
  {
    v400 = CInPacket::Decode2(iPacket, v399);
    sub_1411A4A50(a1, v400);
    v402 = CInPacket::Decode4(iPacket, v401);
    sub_1411AE520(a1, v402);
  }
  if ( getBuffStat(mask, 344) )
  {
    v404 = CInPacket::Decode2(iPacket, v403);
    sub_1411A9630(a1, v404);
    v406 = CInPacket::Decode4(iPacket, v405);
    sub_1411B2BA0(a1, v406);
  }
  if ( getBuffStat(mask, 346) )
  {
    v408 = CInPacket::Decode1(iPacket, v407);
    sub_1411A6930(a1, v408);
    v410 = CInPacket::Decode4(iPacket, v409);
    sub_1411B02F0(a1, v410);
  }
  if ( getBuffStat(mask, 348) )
  {
    v412 = CInPacket::Decode1(iPacket, v411);
    sub_1411ABB80(a1, v412);
  }
  if ( getBuffStat(mask, 351) )
  {
    v414 = CInPacket::Decode2(iPacket, v413);
    sub_1411A92D0(a1, v414);
    v416 = CInPacket::Decode4(iPacket, v415);
    sub_1411B2840(a1, v416);
  }
  if ( getBuffStat(mask, 382) )
  {
    v418 = CInPacket::Decode2(iPacket, v417);
    sub_1411A91B0(a1, v418);
    v420 = CInPacket::Decode4(iPacket, v419);
    sub_1411B2720(a1, v420);
  }
  if ( getBuffStat(mask, 352) )
  {
    v422 = CInPacket::Decode2(iPacket, v421);
    sub_1411A34C0(a1, v422);
    v424 = CInPacket::Decode4(iPacket, v423);
    sub_1411ACF90(a1, v424);
  }
  if ( getBuffStat(mask, 353) )
  {
    v426 = CInPacket::Decode2(iPacket, v425);
    sub_1411A52F0(a1, v426);
    v428 = CInPacket::Decode4(iPacket, v427);
    sub_1411AED60(a1, v428);
  }
  if ( getBuffStat(mask, 354) )
  {
    v430 = CInPacket::Decode2(iPacket, v429);
    sub_1411AB9D0(a1, v430);
    v432 = CInPacket::Decode4(iPacket, v431);
    sub_1411B4DC0(a1, v432);
  }
  if ( getBuffStat(mask, 355) )
  {
    v434 = CInPacket::Decode2(iPacket, v433);
    sub_1411A63F0(a1, v434);
    v436 = CInPacket::Decode4(iPacket, v435);
    sub_1411AFDB0(a1, v436);
  }
  if ( getBuffStat(mask, 356) )
  {
    v438 = CInPacket::Decode2(iPacket, v437);
    sub_1411A63C0(a1, v438);
    v440 = CInPacket::Decode4(iPacket, v439);
    sub_1411AFD80(a1, v440);
  }
  if ( getBuffStat(mask, 360) )
  {
    v442 = CInPacket::Decode2(iPacket, v441);
    sub_1411ABF40(a1, v442);
    v444 = CInPacket::Decode4(iPacket, v443);
    sub_1411B5300(a1, v444);
  }
  if ( getBuffStat(mask, 361) )
  {
    v446 = CInPacket::Decode2(iPacket, v445);
    sub_1411A9B70(a1, v446);
    v448 = CInPacket::Decode4(iPacket, v447);
    sub_1411B3050(a1, v448);
  }
  if ( getBuffStat(mask, 362) )
  {
    v450 = CInPacket::Decode2(iPacket, v449);
    sub_1411A4FF0(a1, v450);
    v452 = CInPacket::Decode4(iPacket, v451);
    sub_1411AEAC0(a1, v452);
  }
  if ( getBuffStat(mask, 363) )
  {
    v454 = CInPacket::Decode2(iPacket, v453);
    sub_1411A5EB0(a1, v454);
    v456 = CInPacket::Decode4(iPacket, v455);
    sub_1411AF870(a1, v456);
  }
  if ( getBuffStat(mask, 365) )
  {
    v458 = CInPacket::Decode2(iPacket, v457);
    sub_1411A6DB0(a1, v458);
    v460 = CInPacket::Decode4(iPacket, v459);
    sub_1411B0740(a1, v460);
  }
  if ( getBuffStat(mask, 374) )
  {
    v462 = CInPacket::Decode2(iPacket, v461);
    sub_1411AA230(a1, v462);
    v464 = CInPacket::Decode4(iPacket, v463);
    sub_1411B36E0(a1, v464);
  }
  if ( getBuffStat(mask, 196) )
  {
    v466 = CInPacket::Decode2(iPacket, v465);
    sub_1411A4300(a1, v466);
    v468 = CInPacket::Decode4(iPacket, v467);
    sub_1411ADDD0(a1, v468);
  }
  if ( getBuffStat(mask, 384) )
  {
    v470 = CInPacket::Decode2(iPacket, v469);
    sub_1411A9DB0(a1, v470);
    v472 = CInPacket::Decode4(iPacket, v471);
    sub_1411B3290(a1, v472);
  }
  if ( getBuffStat(mask, 388) )
    sub_1411AC150(a1, 1LL);
  if ( getBuffStat(mask, 389) )
  {
    v474 = CInPacket::Decode4(iPacket, v473);
    sub_1411A76B0(a1, v474);
  }
  if ( getBuffStat(mask, 389) )
  {
    v476 = CInPacket::Decode4(iPacket, v475);
    sub_1411BFF80(a1, v476);
  }
  if ( getBuffStat(mask, 369) )
  {
    v478 = CInPacket::Decode4(iPacket, v477);
    sub_1411B0650(a1, v478);
    v1431 = MEMORY[0x7FF9E8EF4220]();
    v480 = CInPacket::Decode4(iPacket, v479);
    sub_1411BFE00(a1, (v480 + v1431));
  }
  if ( getBuffStat(mask, 294) )
  {
    v1427 = CInPacket::Decode1(iPacket, v481) != 0;
    sub_1411A1C40(a1, v1427);
    v483 = CInPacket::Decode4(iPacket, v482);
    sub_1411B6680(a1, v483);
    if ( sub_1413D47E0(a1) )
    {
      v1432 = sub_1413D47E0(a1);
      v484 = MEMORY[0x7FF9E8EF4220]();
      sub_1411B6680(a1, (v484 + v1432));
    }
  }
  if ( getBuffStat(mask, 177) )
  {
    v486 = CInPacket::Decode4(iPacket, v485);
    sub_1411A5440(a1, v486);
    v488 = CInPacket::Decode4(iPacket, v487);
    sub_1411AEE80(a1, v488);
  }
  if ( getBuffStat(mask, 405) )
  {
    v490 = CInPacket::Decode4(iPacket, v489);
    sub_1411AB6A0(a1, v490);
    v492 = CInPacket::Decode4(iPacket, v491);
    sub_1411B4A90(a1, v492);
  }
  if ( getBuffStat(mask, 405) )
  {
    v494 = CInPacket::Decode4(iPacket, v493);
    sub_1411C0C40(a1, v494);
  }
  if ( getBuffStat(mask, 406) )
  {
    v496 = CInPacket::Decode2(iPacket, v495);
    sub_1411A6300(a1, v496);
    v498 = CInPacket::Decode4(iPacket, v497);
    sub_1411AFCC0(a1, v498);
  }
  if ( getBuffStat(mask, 451) )
  {
    v500 = CInPacket::Decode4(iPacket, v499);
    sub_1411A8A90(a1, v500);
    v502 = CInPacket::Decode4(iPacket, v501);
    sub_1411B2030(a1, v502);
  }
  if ( getBuffStat(mask, 411) )
  {
    v504 = CInPacket::Decode2(iPacket, v503);
    sub_1411A4E10(a1, v504);
    v506 = CInPacket::Decode4(iPacket, v505);
    sub_1411AE8E0(a1, v506);
  }
  if ( getBuffStat(mask, 347) )
  {
    v508 = CInPacket::Decode2(iPacket, v507);
    sub_1411A6FC0(a1, v508);
    v510 = CInPacket::Decode4(iPacket, v509);
    sub_1411B08F0(a1, v510);
  }
  if ( getBuffStat(mask, 427) )
  {
    v512 = CInPacket::Decode2(iPacket, v511);
    sub_1411A4E70(a1, v512);
    v514 = CInPacket::Decode4(iPacket, v513);
    sub_1411AE940(a1, v514);
  }
  if ( getBuffStat(mask, 428) )
  {
    v516 = CInPacket::Decode2(iPacket, v515);
    sub_1411A7C50(a1, v516);
    v518 = CInPacket::Decode4(iPacket, v517);
    sub_1411B12B0(a1, v518);
  }
  if ( getBuffStat(mask, 436) )
  {
    v520 = CInPacket::Decode2(iPacket, v519);
    sub_1411A46F0(a1, v520);
    v522 = CInPacket::Decode4(iPacket, v521);
    sub_1411AE1C0(a1, v522);
  }
  if ( getBuffStat(mask, 515) )
  {
    v524 = CInPacket::Decode2(iPacket, v523);
    sub_1411ABF10(a1, v524);
    v526 = CInPacket::Decode4(iPacket, v525);
    sub_1411B52D0(a1, v526);
  }
  if ( getBuffStat(mask, 516) )
  {
    v528 = CInPacket::Decode2(iPacket, v527);
    sub_1411A5FD0(a1, v528);
    v530 = CInPacket::Decode4(iPacket, v529);
    sub_1411AF990(a1, v530);
  }
  if ( getBuffStat(mask, 517) )
  {
    v532 = CInPacket::Decode2(iPacket, v531);
    sub_1411A8670(a1, v532);
    v534 = CInPacket::Decode4(iPacket, v533);
    sub_1411B1C70(a1, v534);
  }
  if ( getBuffStat(mask, 518) )
  {
    v536 = CInPacket::Decode2(iPacket, v535);
    sub_1411A4960(a1, v536);
    v538 = CInPacket::Decode4(iPacket, v537);
    sub_1411AE430(a1, v538);
  }
  if ( getBuffStat(mask, 519) )
  {
    v540 = CInPacket::Decode2(iPacket, v539);
    sub_1411A87F0(a1, v540);
    v542 = CInPacket::Decode4(iPacket, v541);
    sub_1411B1DF0(a1, v542);
  }
  if ( getBuffStat(mask, 520) )
  {
    v544 = CInPacket::Decode2(iPacket, v543);
    sub_1411A4330(a1, v544);
    v546 = CInPacket::Decode4(iPacket, v545);
    sub_1411ADE00(a1, v546);
  }
  if ( getBuffStat(mask, 433) )
  {
    v548 = CInPacket::Decode2(iPacket, v547);
    sub_1411A54A0(a1, v548);
    v550 = CInPacket::Decode4(iPacket, v549);
    sub_1411AEEE0(a1, v550);
  }
  if ( getBuffStat(mask, 434) )
  {
    v552 = CInPacket::Decode2(iPacket, v551);
    sub_1411A39D0(a1, v552);
    v554 = CInPacket::Decode4(iPacket, v553);
    sub_1411AD4A0(a1, v554);
  }
  if ( getBuffStat(mask, 446) )
  {
    v556 = CInPacket::Decode2(iPacket, v555);
    sub_1411A68A0(a1, v556);
    v558 = CInPacket::Decode4(iPacket, v557);
    sub_1411B0260(a1, v558);
  }
  if ( getBuffStat(mask, 262) )
  {
    v560 = CInPacket::Decode2(iPacket, v559);
    sub_1411A7F20(a1, v560);
    v562 = CInPacket::Decode4(iPacket, v561);
    sub_1411B1520(a1, v562);
  }
  if ( getBuffStat(mask, 479) )
  {
    v564 = CInPacket::Decode2(iPacket, v563);
    sub_1411A8D00(a1, v564);
    v566 = CInPacket::Decode4(iPacket, v565);
    sub_1411B2270(a1, v566);
  }
  if ( getBuffStat(mask, 486) )
  {
    v568 = CInPacket::Decode4(iPacket, v567);
    sub_1411A8010(a1, v568);
    v570 = CInPacket::Decode4(iPacket, v569);
    sub_1411B1610(a1, v570);
  }
  if ( getBuffStat(mask, 487) )
  {
    v572 = CInPacket::Decode2(iPacket, v571);
    sub_1411A44E0(a1, v572);
    v574 = CInPacket::Decode4(iPacket, v573);
    sub_1411ADFB0(a1, v574);
  }
  if ( getBuffStat(mask, 487) )
  {
    v576 = CInPacket::Decode4(iPacket, v575);
    sub_1411BF890(a1, v576);
  }
  if ( getBuffStat(mask, 492) )
  {
    v578 = CInPacket::Decode2(iPacket, v577);
    sub_1411A66F0(a1, v578);
    v580 = CInPacket::Decode4(iPacket, v579);
    sub_1411B00B0(a1, v580);
  }
  if ( getBuffStat(mask, 497) )
  {
    v582 = CInPacket::Decode4(iPacket, v581);
    sub_1411A3400(a1, v582);
  }
  if ( getBuffStat(mask, 504) )
  {
    v584 = CInPacket::Decode4(iPacket, v583);
    sub_1411A9EA0(a1, v584);
  }
  if ( getBuffStat(mask, 502) )
  {
    v586 = CInPacket::Decode4(iPacket, v585);
    sub_1411A9FF0(a1, v586);
  }
  if ( getBuffStat(mask, 503) )
  {
    v588 = CInPacket::Decode4(iPacket, v587);
    sub_1411A9F30(a1, v588);
  }
  if ( getBuffStat(mask, 740) )
  {
    v590 = CInPacket::Decode4(iPacket, v589);
    sub_1411AA950(a1, v590);
  }
  if ( getBuffStat(mask, 790) )
  {
    v592 = CInPacket::Decode2(iPacket, v591);
    sub_1411A4750(a1, v592);
    v594 = CInPacket::Decode4(iPacket, v593);
    sub_1411AE220(a1, v594);
  }
  if ( getBuffStat(mask, 743) )
  {
    v596 = CInPacket::Decode4(iPacket, v595);
    sub_1411A5050(a1, v596);
  }
  if ( getBuffStat(mask, 275) )
  {
    v598 = CInPacket::Decode2(iPacket, v597);
    sub_1411A6F30(a1, v598);
    v600 = CInPacket::Decode4(iPacket, v599);
    sub_1411B08C0(a1, v600);
  }
  if ( getBuffStat(mask, 276) )
  {
    v602 = CInPacket::Decode2(iPacket, v601);
    sub_1411AB8E0(a1, v602);
    v604 = CInPacket::Decode4(iPacket, v603);
    sub_1411B4CD0(a1, v604);
  }
  if ( getBuffStat(mask, 277) )
  {
    v606 = CInPacket::Decode2(iPacket, v605);
    sub_1411A8460(a1, v606);
    v608 = CInPacket::Decode4(iPacket, v607);
    sub_1411B1A60(a1, v608);
  }
  if ( getBuffStat(mask, 278) )
  {
    v610 = CInPacket::Decode2(iPacket, v609);
    sub_1411ABCD0(a1, v610);
    v612 = CInPacket::Decode4(iPacket, v611);
    sub_1411B5090(a1, v612);
  }
  if ( getBuffStat(mask, 279) )
  {
    v614 = CInPacket::Decode2(iPacket, v613);
    sub_1411A4C90(a1, v614);
    v616 = CInPacket::Decode4(iPacket, v615);
    sub_1411AE760(a1, v616);
  }
  if ( getBuffStat(mask, 510) )
  {
    v618 = CInPacket::Decode2(iPacket, v617);
    sub_1411AB790(a1, v618);
    v620 = CInPacket::Decode4(iPacket, v619);
    sub_1411B4B80(a1, v620);
  }
  if ( getBuffStat(mask, 448) )
  {
    v622 = CInPacket::Decode4(iPacket, v621);
    sub_1411A97E0(a1, v622);
    v624 = CInPacket::Decode4(iPacket, v623);
    sub_1411B2CF0(a1, v624);
  }
  if ( getBuffStat(mask, 896) )
  {
    v626 = CInPacket::Decode4(iPacket, v625);
    sub_1411A4F00(a1, v626);
  }
  if ( getBuffStat(mask, 898) )
  {
    v628 = CInPacket::Decode2(iPacket, v627);
    sub_1411A4F30(a1, v628);
    v630 = CInPacket::Decode4(iPacket, v629);
    sub_1411AEA00(a1, v630);
  }
  if ( getBuffStat(mask, 895) )
  {
    v632 = CInPacket::Decode2(iPacket, v631);
    sub_1411AAD40(a1, v632);
    v634 = CInPacket::Decode4(iPacket, v633);
    sub_1411B4160(a1, v634);
  }
  if ( getBuffStat(mask, 527) )
  {
    v636 = CInPacket::Decode4(iPacket, v635);
    sub_1411A8D90(a1, v636);
    v638 = CInPacket::Decode4(iPacket, v637);
    sub_1411B2300(a1, v638);
  }
  if ( getBuffStat(mask, 528) )
  {
    v640 = CInPacket::Decode4(iPacket, v639);
    sub_1411A80D0(a1, v640);
  }
  if ( getBuffStat(mask, 526) )
  {
    v642 = CInPacket::Decode4(iPacket, v641);
    sub_1411AC720(a1, v642);
  }
  if ( getBuffStat(mask, 400) )
  {
    v644 = CInPacket::Decode2(iPacket, v643);
    sub_1413DB5C0(a1, v644);
    v646 = CInPacket::Decode4(iPacket, v645);
    sub_1413DBEF0(a1, v646);
  }
  if ( getBuffStat(mask, 543) )
  {
    v648 = CInPacket::Decode2(iPacket, v647);
    sub_1411A9600(a1, v648);
    v650 = CInPacket::Decode4(iPacket, v649);
    sub_1411B2B70(a1, v650);
  }
  if ( getBuffStat(mask, 542) )
  {
    v652 = CInPacket::Decode2(iPacket, v651);
    sub_1411A67B0(a1, v652);
    v654 = CInPacket::Decode4(iPacket, v653);
    sub_1411B0170(a1, v654);
  }
  if ( getBuffStat(mask, 541) )
  {
    v656 = CInPacket::Decode2(iPacket, v655);
    sub_1411A9660(a1, v656);
    v658 = CInPacket::Decode4(iPacket, v657);
    sub_1411B2BD0(a1, v658);
  }
  if ( getBuffStat(mask, 540) )
  {
    v660 = CInPacket::Decode2(iPacket, v659);
    sub_1411A6C30(a1, v660);
    v662 = CInPacket::Decode4(iPacket, v661);
    sub_1411B05C0(a1, v662);
  }
  if ( getBuffStat(mask, 109) )
  {
    v664 = CInPacket::Decode2(iPacket, v663);
    sub_1411A45A0(a1, v664);
    v666 = CInPacket::Decode4(iPacket, v665);
    sub_1411AE070(a1, v666);
  }
  if ( getBuffStat(mask, 547) )
  {
    v668 = CInPacket::Decode2(iPacket, v667);
    sub_1411A4F90(a1, v668);
    v670 = CInPacket::Decode4(iPacket, v669);
    sub_1411AEA60(a1, v670);
  }
  if ( getBuffStat(mask, 548) )
  {
    v672 = CInPacket::Decode2(iPacket, v671);
    sub_1411A6270(a1, v672);
    v674 = CInPacket::Decode4(iPacket, v673);
    sub_1411AFC30(a1, v674);
  }
  if ( getBuffStat(mask, 549) )
  {
    v676 = CInPacket::Decode2(iPacket, v675);
    sub_1411AA0E0(a1, v676);
    v678 = CInPacket::Decode4(iPacket, v677);
    sub_1411B35C0(a1, v678);
  }
  if ( getBuffStat(mask, 550) )
  {
    v680 = CInPacket::Decode2(iPacket, v679);
    sub_1411A9570(a1, v680);
    v682 = CInPacket::Decode4(iPacket, v681);
    sub_1411B2AE0(a1, v682);
  }
  if ( getBuffStat(mask, 551) )
  {
    v684 = CInPacket::Decode2(iPacket, v683);
    sub_1411A5080(a1, v684);
    v686 = CInPacket::Decode4(iPacket, v685);
    sub_1411AEB50(a1, v686);
  }
  if ( getBuffStat(mask, 552) )
  {
    v688 = CInPacket::Decode2(iPacket, v687);
    sub_1411A4360(a1, v688);
    v690 = CInPacket::Decode4(iPacket, v689);
    sub_1411ADE30(a1, v690);
  }
  if ( getBuffStat(mask, 553) )
  {
    v692 = CInPacket::Decode2(iPacket, v691);
    sub_1411A4390(a1, v692);
    v694 = CInPacket::Decode4(iPacket, v693);
    sub_1411ADE60(a1, v694);
  }
  if ( getBuffStat(mask, 554) )
  {
    v696 = CInPacket::Decode2(iPacket, v695);
    sub_1411A43C0(a1, v696);
    v698 = CInPacket::Decode4(iPacket, v697);
    sub_1411ADE90(a1, v698);
  }
  if ( getBuffStat(mask, 555) )
  {
    v700 = CInPacket::Decode2(iPacket, v699);
    sub_1411A71D0(a1, v700);
    v702 = CInPacket::Decode4(iPacket, v701);
    sub_1411B0B00(a1, v702);
  }
  if ( getBuffStat(mask, 545) )
  {
    v704 = CInPacket::Decode2(iPacket, v703);
    sub_1411A84C0(a1, v704);
    v706 = CInPacket::Decode4(iPacket, v705);
    sub_1411B1AC0(a1, v706);
  }
  if ( getBuffStat(mask, 556) )
  {
    v708 = CInPacket::Decode2(iPacket, v707);
    sub_1411A48D0(a1, v708);
    v710 = CInPacket::Decode4(iPacket, v709);
    sub_1411AE3A0(a1, v710);
  }
  if ( getBuffStat(mask, 556) )
  {
    v1433 = MEMORY[0x7FF9E8EF4220]();
    v712 = CInPacket::Decode4(iPacket, v711);
    sub_1411B7730(a1, (v712 + v1433));
  }
  if ( getBuffStat(mask, 557) )
  {
    v714 = CInPacket::Decode4(iPacket, v713);
    sub_1411A5A30(a1, v714);
    v716 = CInPacket::Decode4(iPacket, v715);
    sub_1411AF3F0(a1, v716);
  }
  if ( getBuffStat(mask, 558) )
  {
    v718 = CInPacket::Decode2(iPacket, v717);
    sub_1411A6FF0(a1, v718);
    v720 = CInPacket::Decode4(iPacket, v719);
    sub_1411B0920(a1, v720);
  }
  if ( getBuffStat(mask, 559) )
  {
    v722 = CInPacket::Decode2(iPacket, v721);
    sub_1411A8490(a1, v722);
    v724 = CInPacket::Decode4(iPacket, v723);
    sub_1411B1A90(a1, v724);
  }
  if ( getBuffStat(mask, 569) )
  {
    v726 = CInPacket::Decode2(iPacket, v725);
    sub_1411AB580(a1, v726);
    v728 = CInPacket::Decode4(iPacket, v727);
    sub_1411B49A0(a1, v728);
  }
  if ( getBuffStat(mask, 574) )
  {
    v730 = CInPacket::Decode2(iPacket, v729);
    sub_1411A4E40(a1, v730);
    v732 = CInPacket::Decode4(iPacket, v731);
    sub_1411AE910(a1, v732);
  }
  if ( getBuffStat(mask, 575) )
  {
    v734 = CInPacket::Decode2(iPacket, v733);
    sub_1411A6ED0(a1, v734);
    v736 = CInPacket::Decode4(iPacket, v735);
    sub_1411B0860(a1, v736);
  }
  if ( getBuffStat(mask, 576) )
  {
    v738 = CInPacket::Decode2(iPacket, v737);
    sub_1411AB190(a1, v738);
    v740 = CInPacket::Decode4(iPacket, v739);
    sub_1411B45B0(a1, v740);
  }
  if ( getBuffStat(mask, 586) )
  {
    v742 = CInPacket::Decode2(iPacket, v741);
    sub_1411A4810(a1, v742);
    v744 = CInPacket::Decode4(iPacket, v743);
    sub_1411AE2E0(a1, v744);
  }
  if ( getBuffStat(mask, 557) )
  {
    v1434 = MEMORY[0x7FF9E8EF4220]();
    v746 = CInPacket::Decode4(iPacket, v745);
    sub_1411B8780(a1, (v746 + v1434));
  }
  if ( getBuffStat(mask, 598) )
    sub_1411A8D60(a1, 1LL);
  if ( getBuffStat(mask, 285) )
  {
    v748 = CInPacket::Decode2(iPacket, v747);
    sub_1411A6E40(a1, v748);
    v750 = CInPacket::Decode4(iPacket, v749);
    sub_1411B07D0(a1, v750);
  }
  if ( getBuffStat(mask, 616) )
  {
    v752 = CInPacket::Decode2(iPacket, v751);
    sub_1411AAF50(a1, v752);
    v754 = CInPacket::Decode4(iPacket, v753);
    sub_1411B4370(a1, v754);
  }
  if ( getBuffStat(mask, 619) )
  {
    v756 = CInPacket::Decode2(iPacket, v755);
    sub_1411A41B0(a1, v756);
    v758 = CInPacket::Decode4(iPacket, v757);
    sub_1411ADC80(a1, v758);
  }
  if ( getBuffStat(mask, 620) )
  {
    v760 = CInPacket::Decode2(iPacket, v759);
    sub_1411A4180(a1, v760);
    v762 = CInPacket::Decode4(iPacket, v761);
    sub_1411ADC50(a1, v762);
  }
  if ( getBuffStat(mask, 621) )
  {
    v764 = CInPacket::Decode2(iPacket, v763);
    sub_1411A40C0(a1, v764);
    v766 = CInPacket::Decode4(iPacket, v765);
    sub_1411ADB90(a1, v766);
  }
  if ( getBuffStat(mask, 622) )
  {
    v768 = CInPacket::Decode2(iPacket, v767);
    sub_1411A41E0(a1, v768);
    v770 = CInPacket::Decode4(iPacket, v769);
    sub_1411ADCB0(a1, v770);
  }
  if ( getBuffStat(mask, 623) )
    sub_1411A4210(a1, 1LL);
  if ( getBuffStat(mask, 624) )
  {
    v772 = CInPacket::Decode2(iPacket, v771);
    sub_1411A6420(a1, v772);
    v774 = CInPacket::Decode4(iPacket, v773);
    sub_1411AFDE0(a1, v774);
  }
  if ( getBuffStat(mask, 625) )
  {
    v776 = CInPacket::Decode2(iPacket, v775);
    sub_1411A6450(a1, v776);
    v778 = CInPacket::Decode4(iPacket, v777);
    sub_1411AFE10(a1, v778);
  }
  if ( getBuffStat(mask, 626) )
  {
    v780 = CInPacket::Decode2(iPacket, v779);
    sub_1411A64B0(a1, v780);
    v782 = CInPacket::Decode4(iPacket, v781);
    sub_1411AFE70(a1, v782);
  }
  if ( getBuffStat(mask, 627) )
  {
    v784 = CInPacket::Decode2(iPacket, v783);
    sub_1411A64E0(a1, v784);
    v786 = CInPacket::Decode4(iPacket, v785);
    sub_1411AFEA0(a1, v786);
  }
  if ( getBuffStat(mask, 631) )
  {
    v788 = CInPacket::Decode2(iPacket, v787);
    sub_1411A99C0(a1, v788);
    v790 = CInPacket::Decode4(iPacket, v789);
    sub_1411B2ED0(a1, v790);
  }
  if ( getBuffStat(mask, 636) )
  {
    v792 = CInPacket::Decode2(iPacket, v791);
    sub_1411A8DC0(a1, v792);
    v794 = CInPacket::Decode4(iPacket, v793);
    sub_1411B2330(a1, v794);
  }
  if ( getBuffStat(mask, 641) )
  {
    v796 = CInPacket::Decode2(iPacket, v795);
    sub_1411A3640(a1, v796);
    v798 = CInPacket::Decode4(iPacket, v797);
    sub_1411AD110(a1, v798);
  }
  if ( getBuffStat(mask, 610) )
  {
    v800 = CInPacket::Decode2(iPacket, v799);
    sub_1411A4420(a1, v800);
    v802 = CInPacket::Decode4(iPacket, v801);
    sub_1411ADEF0(a1, v802);
  }
  if ( getBuffStat(mask, 611) )
  {
    v804 = CInPacket::Decode2(iPacket, v803);
    sub_1411A43F0(a1, v804);
    v806 = CInPacket::Decode4(iPacket, v805);
    sub_1411ADEC0(a1, v806);
  }
  if ( getBuffStat(mask, 612) )
  {
    v808 = CInPacket::Decode2(iPacket, v807);
    sub_1411A5880(a1, v808);
    v810 = CInPacket::Decode4(iPacket, v809);
    sub_1411AF240(a1, v810);
  }
  if ( getBuffStat(mask, 613) )
  {
    v812 = CInPacket::Decode2(iPacket, v811);
    sub_1411A5850(a1, v812);
    v814 = CInPacket::Decode4(iPacket, v813);
    sub_1411AF210(a1, v814);
  }
  if ( getBuffStat(mask, 649) )
  {
    v816 = CInPacket::Decode2(iPacket, v815);
    sub_1411A85E0(a1, v816);
    v818 = CInPacket::Decode4(iPacket, v817);
    sub_1411B1BE0(a1, v818);
  }
  if ( getBuffStat(mask, 650) )
  {
    v820 = CInPacket::Decode2(iPacket, v819);
    sub_1411AC810(a1, v820);
    v822 = CInPacket::Decode4(iPacket, v821);
    sub_1411B5BA0(a1, v822);
  }
  if ( getBuffStat(mask, 453) )
  {
    v824 = CInPacket::Decode2(iPacket, v823);
    sub_1411A9DE0(a1, v824);
    v826 = CInPacket::Decode4(iPacket, v825);
    sub_1411B32C0(a1, v826);
  }
  if ( getBuffStat(mask, 659) )
  {
    v828 = CInPacket::Decode2(iPacket, v827);
    sub_1411A8580(a1, v828);
    v830 = CInPacket::Decode4(iPacket, v829);
    sub_1411B1B80(a1, v830);
  }
  if ( getBuffStat(mask, 661) )
  {
    v832 = CInPacket::Decode2(iPacket, v831);
    sub_1411AA770(a1, v832);
    v834 = CInPacket::Decode4(iPacket, v833);
    sub_1411B3BC0(a1, v834);
  }
  if ( getBuffStat(mask, 662) )
  {
    v836 = CInPacket::Decode2(iPacket, v835);
    sub_1411AA740(a1, v836);
    v838 = CInPacket::Decode4(iPacket, v837);
    sub_1411B3B90(a1, v838);
  }
  if ( getBuffStat(mask, 663) )
  {
    v840 = CInPacket::Decode2(iPacket, v839);
    sub_1411A5680(a1, v840);
    v842 = CInPacket::Decode4(iPacket, v841);
    sub_1411AF0C0(a1, v842);
  }
  if ( getBuffStat(mask, 664) )
  {
    v844 = CInPacket::Decode2(iPacket, v843);
    sub_1411A3CD0(a1, v844);
    v846 = CInPacket::Decode4(iPacket, v845);
    sub_1411AD7A0(a1, v846);
  }
  if ( getBuffStat(mask, 665) )
  {
    v848 = CInPacket::Decode2(iPacket, v847);
    sub_1411A3C70(a1, v848);
    v850 = CInPacket::Decode4(iPacket, v849);
    sub_1411AD740(a1, v850);
  }
  if ( getBuffStat(mask, 666) )
  {
    v852 = CInPacket::Decode2(iPacket, v851);
    sub_1411A3BE0(a1, v852);
    v854 = CInPacket::Decode4(iPacket, v853);
    sub_1411AD6B0(a1, v854);
  }
  if ( getBuffStat(mask, 667) )
  {
    v856 = CInPacket::Decode2(iPacket, v855);
    sub_1411A3C10(a1, v856);
    v858 = CInPacket::Decode4(iPacket, v857);
    sub_1411AD6E0(a1, v858);
  }
  if ( getBuffStat(mask, 668) )
  {
    v860 = CInPacket::Decode2(iPacket, v859);
    sub_1411A3C40(a1, v860);
    v862 = CInPacket::Decode4(iPacket, v861);
    sub_1411AD710(a1, v862);
  }
  if ( getBuffStat(mask, 669) )
  {
    v864 = CInPacket::Decode2(iPacket, v863);
    sub_1411A3CA0(a1, v864);
    v866 = CInPacket::Decode4(iPacket, v865);
    sub_1411AD770(a1, v866);
  }
  if ( getBuffStat(mask, 670) )
  {
    v868 = CInPacket::Decode2(iPacket, v867);
    sub_1411A74A0(a1, v868);
    v870 = CInPacket::Decode4(iPacket, v869);
    sub_1411B0DA0(a1, v870);
  }
  if ( getBuffStat(mask, 671) )
  {
    v872 = CInPacket::Decode2(iPacket, v871);
    sub_1411A8100(a1, v872);
    v874 = CInPacket::Decode4(iPacket, v873);
    sub_1411B1700(a1, v874);
  }
  if ( getBuffStat(mask, 672) )
  {
    v876 = CInPacket::Decode2(iPacket, v875);
    sub_1411AC960(a1, v876);
    v878 = CInPacket::Decode4(iPacket, v877);
    sub_1411B5CF0(a1, v878);
  }
  if ( getBuffStat(mask, 673) )
  {
    v880 = CInPacket::Decode2(iPacket, v879);
    sub_1411A9510(a1, v880);
    v882 = CInPacket::Decode4(iPacket, v881);
    sub_1411B2A80(a1, v882);
  }
  if ( getBuffStat(mask, 678) )
  {
    v884 = CInPacket::Decode2(iPacket, v883);
    sub_1411A3880(a1, v884);
    v886 = CInPacket::Decode4(iPacket, v885);
    sub_1411AD350(a1, v886);
  }
  if ( getBuffStat(mask, 679) )
  {
    v888 = CInPacket::Decode2(iPacket, v887);
    sub_1411AC7E0(a1, v888);
    v890 = CInPacket::Decode4(iPacket, v889);
    sub_1411B5B70(a1, v890);
  }
  if ( getBuffStat(mask, 690) )
  {
    v892 = CInPacket::Decode2(iPacket, v891);
    sub_1411A5560(a1, v892);
    v894 = CInPacket::Decode4(iPacket, v893);
    sub_1411AEFA0(a1, v894);
  }
  if ( getBuffStat(mask, 677) )
  {
    v896 = CInPacket::Decode2(iPacket, v895);
    sub_1411AAB60(a1, v896);
    v898 = CInPacket::Decode4(iPacket, v897);
    sub_1411B3F80(a1, v898);
  }
  if ( getBuffStat(mask, 693) )
  {
    v900 = CInPacket::Decode2(iPacket, v899);
    sub_1411A6210(a1, v900);
    v902 = CInPacket::Decode4(iPacket, v901);
    sub_1411AFBD0(a1, v902);
  }
  if ( getBuffStat(mask, 700) )
  {
    v904 = CInPacket::Decode2(iPacket, v903);
    sub_1411A9150(a1, v904);
    v906 = CInPacket::Decode4(iPacket, v905);
    sub_1411B26C0(a1, v906);
  }
  if ( getBuffStat(mask, 701) )
  {
    v908 = CInPacket::Decode2(iPacket, v907);
    sub_1411A8FD0(a1, v908);
    v910 = CInPacket::Decode4(iPacket, v909);
    sub_1411B2540(a1, v910);
  }
  if ( getBuffStat(mask, 718) )
  {
    v912 = CInPacket::Decode2(iPacket, v911);
    sub_1411A31C0(a1, v912);
    v914 = CInPacket::Decode4(iPacket, v913);
    sub_1411ACCC0(a1, v914);
  }
  if ( getBuffStat(mask, 720) )
  {
    v916 = CInPacket::Decode2(iPacket, v915);
    sub_1411AC8D0(a1, v916);
    v918 = CInPacket::Decode4(iPacket, v917);
    sub_1411B5C60(a1, v918);
  }
  if ( getBuffStat(mask, 728) )
  {
    v920 = CInPacket::Decode2(iPacket, v919);
    sub_1411A3010(a1, v920);
    v922 = CInPacket::Decode4(iPacket, v921);
    sub_1411ACB10(a1, v922);
  }
  if ( getBuffStat(mask, 729) )
  {
    v924 = CInPacket::Decode2(iPacket, v923);
    sub_1411A3070(a1, v924);
    v926 = CInPacket::Decode4(iPacket, v925);
    sub_1411ACB70(a1, v926);
  }
  if ( getBuffStat(mask, 730) )
  {
    v928 = CInPacket::Decode2(iPacket, v927);
    sub_1411A3040(a1, v928);
    v930 = CInPacket::Decode4(iPacket, v929);
    sub_1411ACB40(a1, v930);
  }
  if ( getBuffStat(mask, 750) )
  {
    v932 = CInPacket::Decode2(iPacket, v931);
    sub_1411AC0C0(a1, v932);
    v934 = CInPacket::Decode4(iPacket, v933);
    sub_1411B5480(a1, v934);
  }
  if ( getBuffStat(mask, 752) )
  {
    v936 = CInPacket::Decode2(iPacket, v935);
    sub_1411A7470(a1, v936);
    v938 = CInPacket::Decode4(iPacket, v937);
    sub_1411B0D70(a1, v938);
  }
  if ( getBuffStat(mask, 760) )
  {
    v940 = CInPacket::Decode2(iPacket, v939);
    sub_1411A6AB0(a1, v940);
    v942 = CInPacket::Decode4(iPacket, v941);
    sub_1411B0470(a1, v942);
  }
  if ( getBuffStat(mask, 761) )
  {
    v944 = CInPacket::Decode2(iPacket, v943);
    sub_1411A7290(a1, v944);
    v946 = CInPacket::Decode4(iPacket, v945);
    sub_1411B0BC0(a1, v946);
  }
  if ( getBuffStat(mask, 129) )
  {
    v948 = CInPacket::Decode2(iPacket, v947);
    sub_1411A7A40(a1, v948);
    v950 = CInPacket::Decode4(iPacket, v949);
    sub_1411B11C0(a1, v950);
  }
  if ( getBuffStat(mask, 194) )
  {
    v952 = CInPacket::Decode2(iPacket, v951);
    sub_1411ABC70(a1, v952);
    v954 = CInPacket::Decode4(iPacket, v953);
    sub_1411B5030(a1, v954);
  }
  if ( getBuffStat(mask, 377) )
  {
    v956 = CInPacket::Decode2(iPacket, v955);
    sub_1411A4C60(a1, v956);
    v958 = CInPacket::Decode4(iPacket, v957);
    sub_1411AE730(a1, v958);
  }
  if ( getBuffStat(mask, 192) )
  {
    v960 = CInPacket::Decode4(iPacket, v959);
    sub_1411A4630(a1, v960);
  }
  if ( getBuffStat(mask, 764) )
  {
    v962 = CInPacket::Decode2(iPacket, v961);
    sub_1411A86A0(a1, v962);
    v964 = CInPacket::Decode4(iPacket, v963);
    sub_1411B1CA0(a1, v964);
  }
  if ( getBuffStat(mask, 765) )
  {
    v966 = CInPacket::Decode2(iPacket, v965);
    sub_1411ABEE0(a1, v966);
    v968 = CInPacket::Decode4(iPacket, v967);
    sub_1411B52A0(a1, v968);
  }
  if ( getBuffStat(mask, 769) )
  {
    v970 = CInPacket::Decode2(iPacket, v969);
    sub_1411A3940(a1, v970);
    v972 = CInPacket::Decode4(iPacket, v971);
    sub_1411AD410(a1, v972);
  }
  if ( getBuffStat(mask, 449) )
  {
    v974 = CInPacket::Decode4(iPacket, v973);
    sub_1411A6C00(a1, v974);
    v976 = CInPacket::Decode4(iPacket, v975);
    sub_1411B0590(a1, v976);
  }
  if ( getBuffStat(mask, 687) )
  {
    v978 = CInPacket::Decode4(iPacket, v977);
    sub_1411A84F0(a1, v978);
    v980 = CInPacket::Decode4(iPacket, v979);
    sub_1411B1AF0(a1, v980);
  }
  if ( getBuffStat(mask, 483) )
  {
    v982 = CInPacket::Decode4(iPacket, v981);
    sub_1411A8070(a1, v982);
    v984 = CInPacket::Decode4(iPacket, v983);
    sub_1411B1670(a1, v984);
  }
  if ( getBuffStat(mask, 791) )
  {
    v986 = CInPacket::Decode2(iPacket, v985);
    sub_1411A4ED0(a1, v986);
    v988 = CInPacket::Decode4(iPacket, v987);
    sub_1411AE9A0(a1, v988);
  }
  if ( getBuffStat(mask, 794) )
  {
    v990 = CInPacket::Decode2(iPacket, v989);
    sub_1411A6990(a1, v990);
    v992 = CInPacket::Decode4(iPacket, v991);
    sub_1411B0350(a1, v992);
  }
  if ( getBuffStat(mask, 792) )
  {
    v994 = CInPacket::Decode2(iPacket, v993);
    sub_1411A6DE0(a1, v994);
    v996 = CInPacket::Decode4(iPacket, v995);
    sub_1411B0770(a1, v996);
  }
  if ( getBuffStat(mask, 793) )
  {
    v998 = CInPacket::Decode2(iPacket, v997);
    sub_1411A5470(a1, v998);
    v1000 = CInPacket::Decode4(iPacket, v999);
    sub_1411AEEB0(a1, v1000);
  }
  if ( getBuffStat(mask, 758) )
  {
    v1002 = CInPacket::Decode2(iPacket, v1001);
    sub_1411A6E70(a1, v1002);
    v1004 = CInPacket::Decode4(iPacket, v1003);
    sub_1411B0800(a1, v1004);
  }
  if ( getBuffStat(mask, 795) )
  {
    v1006 = CInPacket::Decode2(iPacket, v1005);
    sub_1411AC120(a1, v1006);
    v1008 = CInPacket::Decode4(iPacket, v1007);
    sub_1411B54E0(a1, v1008);
  }
  if ( getBuffStat(mask, 796) )
  {
    v1010 = CInPacket::Decode2(iPacket, v1009);
    sub_1411AC180(a1, v1010);
    v1012 = CInPacket::Decode4(iPacket, v1011);
    sub_1411B5540(a1, v1012);
  }
  if ( getBuffStat(mask, 786) )
  {
    v1014 = CInPacket::Decode2(iPacket, v1013);
    sub_1411A7DD0(a1, v1014);
    v1016 = CInPacket::Decode4(iPacket, v1015);
    sub_1411B13D0(a1, v1016);
  }
  if ( getBuffStat(mask, 797) )
  {
    v1018 = CInPacket::Decode2(iPacket, v1017);
    sub_1411A9E10(a1, v1018);
    v1020 = CInPacket::Decode4(iPacket, v1019);
    sub_1411B32F0(a1, v1020);
  }
  if ( getBuffStat(mask, 808) )
  {
    v1022 = CInPacket::Decode2(iPacket, v1021);
    sub_1411A9180(a1, v1022);
    v1024 = CInPacket::Decode4(iPacket, v1023);
    sub_1411B26F0(a1, v1024);
  }
  if ( getBuffStat(mask, 811) )
  {
    v1026 = CInPacket::Decode2(iPacket, v1025);
    sub_1411A3430(a1, v1026);
    v1028 = CInPacket::Decode4(iPacket, v1027);
    sub_1411ACF00(a1, v1028);
  }
  if ( getBuffStat(mask, 909) )
  {
    v1030 = CInPacket::Decode4(iPacket, v1029);
    sub_1411A3670(a1, v1030);
    v1032 = CInPacket::Decode4(iPacket, v1031);
    sub_1411AD140(a1, v1032);
  }
  if ( getBuffStat(mask, 442) )
  {
    v1034 = CInPacket::Decode4(iPacket, v1033);
    sub_1411A62A0(a1, v1034);
  }
  if ( getBuffStat(mask, 825) )
  {
    v1036 = CInPacket::Decode2(iPacket, v1035);
    sub_1411A5CA0(a1, v1036);
    v1038 = CInPacket::Decode4(iPacket, v1037);
    sub_1411AF690(a1, v1038);
  }
  if ( getBuffStat(mask, 234) )
  {
    v1040 = CInPacket::Decode2(iPacket, v1039);
    sub_1411A3520(a1, v1040);
    v1042 = CInPacket::Decode4(iPacket, v1041);
    sub_1411ACFF0(a1, v1042);
  }
  if ( getBuffStat(mask, 339) )
  {
    v1044 = CInPacket::Decode2(iPacket, v1043);
    sub_1411A6570(a1, v1044);
    v1046 = CInPacket::Decode4(iPacket, v1045);
    sub_1411AFF30(a1, v1046);
  }
  if ( getBuffStat(mask, 805) )
  {
    v1048 = CInPacket::Decode2(iPacket, v1047);
    sub_1411AA620(a1, v1048);
    v1050 = CInPacket::Decode4(iPacket, v1049);
    sub_1411B3A70(a1, v1050);
  }
  if ( getBuffStat(mask, 806) )
  {
    v1052 = CInPacket::Decode2(iPacket, v1051);
    sub_1411AA5C0(a1, v1052);
    v1054 = CInPacket::Decode4(iPacket, v1053);
    sub_1411B3A10(a1, v1054);
  }
  if ( getBuffStat(mask, 807) )
  {
    v1056 = CInPacket::Decode2(iPacket, v1055);
    sub_1411AA5F0(a1, v1056);
    v1058 = CInPacket::Decode4(iPacket, v1057);
    sub_1411B3A40(a1, v1058);
  }
  if ( getBuffStat(mask, 828) )
  {
    v1060 = CInPacket::Decode2(iPacket, v1059);
    sub_1411A6D50(a1, v1060);
    v1062 = CInPacket::Decode4(iPacket, v1061);
    sub_1411B06E0(a1, v1062);
  }
  if ( getBuffStat(mask, 851) )
  {
    v1064 = CInPacket::Decode2(iPacket, v1063);
    sub_1411AACB0(a1, v1064);
    v1066 = CInPacket::Decode4(iPacket, v1065);
    sub_1411B40D0(a1, v1066);
  }
  if ( getBuffStat(mask, 852) )
  {
    v1068 = CInPacket::Decode2(iPacket, v1067);
    sub_1411A4B10(a1, v1068);
    v1070 = CInPacket::Decode4(iPacket, v1069);
    sub_1411AE5E0(a1, v1070);
  }
  if ( getBuffStat(mask, 832) )
  {
    v1072 = CInPacket::Decode2(iPacket, v1071);
    sub_1411A4480(a1, v1072);
    v1074 = CInPacket::Decode4(iPacket, v1073);
    sub_1411ADF50(a1, v1074);
  }
  if ( getBuffStat(mask, 832) )
  {
    v1076 = CInPacket::Decode4(iPacket, v1075);
    sub_1411BF860(a1, v1076);
  }
  if ( getBuffStat(mask, 840) )
  {
    v1078 = CInPacket::Decode2(iPacket, v1077);
    sub_1411A4450(a1, v1078);
    v1080 = CInPacket::Decode4(iPacket, v1079);
    sub_1411ADF20(a1, v1080);
  }
  if ( getBuffStat(mask, 833) )
  {
    v1082 = CInPacket::Decode2(iPacket, v1081);
    sub_1411A44B0(a1, v1082);
    v1084 = CInPacket::Decode4(iPacket, v1083);
    sub_1411ADF80(a1, v1084);
  }
  if ( getBuffStat(mask, 837) )
  {
    v1086 = CInPacket::Decode2(iPacket, v1085);
    sub_1411AA890(a1, v1086);
    v1088 = CInPacket::Decode4(iPacket, v1087);
    sub_1411B3CE0(a1, v1088);
  }
  if ( getBuffStat(mask, 838) )
  {
    v1090 = CInPacket::Decode2(iPacket, v1089);
    sub_1411AA8C0(a1, v1090);
    v1092 = CInPacket::Decode4(iPacket, v1091);
    sub_1411B3D10(a1, v1092);
  }
  if ( getBuffStat(mask, 839) )
  {
    v1094 = CInPacket::Decode2(iPacket, v1093);
    sub_1411AA8F0(a1, v1094);
    v1096 = CInPacket::Decode4(iPacket, v1095);
    sub_1411B3D40(a1, v1096);
  }
  if ( getBuffStat(mask, 844) )
  {
    v1098 = CInPacket::Decode2(iPacket, v1097);
    sub_1411A5140(a1, v1098);
    v1100 = CInPacket::Decode4(iPacket, v1099);
    sub_1411AEBE0(a1, v1100);
  }
  if ( getBuffStat(mask, 846) )
  {
    v1102 = CInPacket::Decode2(iPacket, v1101);
    sub_1411A4780(a1, v1102);
    v1104 = CInPacket::Decode4(iPacket, v1103);
    sub_1411AE250(a1, v1104);
  }
  if ( getBuffStat(mask, 124) )
  {
    v1106 = CInPacket::Decode2(iPacket, v1105);
    sub_1411AB760(a1, v1106);
    v1108 = CInPacket::Decode4(iPacket, v1107);
    sub_1411B4B50(a1, v1108);
  }
  if ( getBuffStat(mask, 847) )
  {
    v1110 = CInPacket::Decode2(iPacket, v1109);
    sub_1411AB250(a1, v1110);
    v1112 = CInPacket::Decode4(iPacket, v1111);
    sub_1411B4670(a1, v1112);
  }
  if ( getBuffStat(mask, 849) )
  {
    v1114 = CInPacket::Decode2(iPacket, v1113);
    sub_1411A9300(a1, v1114);
    v1116 = CInPacket::Decode4(iPacket, v1115);
    sub_1411B2870(a1, v1116);
  }
  if ( getBuffStat(mask, 850) )
  {
    v1118 = CInPacket::Decode2(iPacket, v1117);
    sub_1411A37C0(a1, v1118);
    v1120 = CInPacket::Decode4(iPacket, v1119);
    sub_1411AD290(a1, v1120);
  }
  if ( getBuffStat(mask, 834) )
  {
    v1122 = CInPacket::Decode2(iPacket, v1121);
    sub_1411A7E60(a1, v1122);
    v1124 = CInPacket::Decode4(iPacket, v1123);
    sub_1411B1460(a1, v1124);
  }
  if ( getBuffStat(mask, 854) )
  {
    v1126 = CInPacket::Decode2(iPacket, v1125);
    sub_1411AC570(a1, v1126);
    v1128 = CInPacket::Decode4(iPacket, v1127);
    sub_1411B5900(a1, v1128);
  }
  if ( getBuffStat(mask, 858) )
  {
    v1130 = CInPacket::Decode4(iPacket, v1129);
    sub_1411A6E10(a1, v1130);
    v1132 = CInPacket::Decode4(iPacket, v1131);
    sub_1411B07A0(a1, v1132);
  }
  if ( getBuffStat(mask, 859) )
  {
    v1134 = CInPacket::Decode4(iPacket, v1133);
    sub_1411AC420(a1, v1134);
  }
  if ( getBuffStat(mask, 860) )
  {
    v1136 = CInPacket::Decode4(iPacket, v1135);
    sub_1411AC3C0(a1, v1136);
  }
  if ( getBuffStat(mask, 862) )
  {
    v1138 = CInPacket::Decode2(iPacket, v1137);
    sub_1411AC390(a1, v1138);
    v1140 = CInPacket::Decode4(iPacket, v1139);
    sub_1411B5720(a1, v1140);
  }
  if ( getBuffStat(mask, 863) )
  {
    v1142 = CInPacket::Decode4(iPacket, v1141);
    sub_1411AB520(a1, v1142);
  }
  if ( getBuffStat(mask, 864) )
  {
    v1144 = CInPacket::Decode4(iPacket, v1143);
    sub_1411AA140(a1, v1144);
  }
  if ( getBuffStat(mask, 539) )
  {
    v1146 = CInPacket::Decode2(iPacket, v1145);
    sub_1411AB700(a1, v1146);
    v1148 = CInPacket::Decode4(iPacket, v1147);
    sub_1411B4AF0(a1, v1148);
  }
  if ( getBuffStat(mask, 537) )
  {
    v1150 = CInPacket::Decode2(iPacket, v1149);
    sub_1411A4FC0(a1, v1150);
    v1152 = CInPacket::Decode4(iPacket, v1151);
    sub_1411AEA90(a1, v1152);
  }
  if ( getBuffStat(mask, 876) )
  {
    v1154 = CInPacket::Decode2(iPacket, v1153);
    sub_1411A8E80(a1, v1154);
    v1156 = CInPacket::Decode4(iPacket, v1155);
    sub_1411B23F0(a1, v1156);
  }
  if ( getBuffStat(mask, 877) )
  {
    v1158 = CInPacket::Decode2(iPacket, v1157);
    sub_1411A8EE0(a1, v1158);
    v1160 = CInPacket::Decode4(iPacket, v1159);
    sub_1411B2450(a1, v1160);
  }
  if ( getBuffStat(mask, 879) )
  {
    v1162 = CInPacket::Decode2(iPacket, v1161);
    sub_1411AAC20(a1, v1162);
    v1164 = CInPacket::Decode4(iPacket, v1163);
    sub_1411B4040(a1, v1164);
  }
  if ( getBuffStat(mask, 883) )
  {
    v1166 = CInPacket::Decode2(iPacket, v1165);
    sub_1411A7440(a1, v1166);
    v1168 = CInPacket::Decode4(iPacket, v1167);
    sub_1411B0D40(a1, v1168);
  }
  if ( getBuffStat(mask, 885) )
  {
    v1170 = CInPacket::Decode2(iPacket, v1169);
    sub_1411A9270(a1, v1170);
    v1172 = CInPacket::Decode4(iPacket, v1171);
    sub_1411B27E0(a1, v1172);
  }
  if ( getBuffStat(mask, 886) )
  {
    v1174 = CInPacket::Decode2(iPacket, v1173);
    sub_1411A91E0(a1, v1174);
    v1176 = CInPacket::Decode4(iPacket, v1175);
    sub_1411B2750(a1, v1176);
  }
  if ( getBuffStat(mask, 887) )
  {
    v1178 = CInPacket::Decode2(iPacket, v1177);
    sub_1411A9210(a1, v1178);
    v1180 = CInPacket::Decode4(iPacket, v1179);
    sub_1411B2780(a1, v1180);
  }
  if ( getBuffStat(mask, 888) )
  {
    v1182 = CInPacket::Decode2(iPacket, v1181);
    sub_1411A9240(a1, v1182);
    v1184 = CInPacket::Decode4(iPacket, v1183);
    sub_1411B27B0(a1, v1184);
  }
  if ( getBuffStat(mask, 889) )
  {
    v1186 = CInPacket::Decode2(iPacket, v1185);
    sub_1411AB130(a1, v1186);
    v1188 = CInPacket::Decode4(iPacket, v1187);
    sub_1411B4550(a1, v1188);
  }
  if ( getBuffStat(mask, 890) )
  {
    v1190 = CInPacket::Decode2(iPacket, v1189);
    sub_1411AB1F0(a1, v1190);
    v1192 = CInPacket::Decode4(iPacket, v1191);
    sub_1411B4610(a1, v1192);
  }
  if ( getBuffStat(mask, 896) )
  {
    v1194 = CInPacket::Decode2(iPacket, v1193);
    sub_1411A4F00(a1, v1194);
    v1196 = CInPacket::Decode4(iPacket, v1195);
    sub_1411AE9D0(a1, v1196);
  }
  if ( getBuffStat(mask, 932) )
  {
    v1198 = CInPacket::Decode2(iPacket, v1197);
    sub_1413DBB00(a1, v1198);
    v1200 = CInPacket::Decode4(iPacket, v1199);
    sub_1413DC400(a1, v1200);
  }
  v1201 = CInPacket::Decode1(iPacket, v1197);
  sub_1411A5770(a1, v1201);
  v1203 = CInPacket::Decode1(iPacket, v1202);
  sub_1411A57E0(a1, v1203);
  v1205 = CInPacket::Decode1(iPacket, v1204);
  sub_1413DBBF0(a1, v1205);
  v1207 = CInPacket::Decode4(iPacket, v1206);
  sub_1411BFC20(a1, v1207);
  if ( getBuffStat(mask, 552) )
  {
    v1209 = CInPacket::Decode4(iPacket, v1208);
    sub_1411BF800(a1, v1209);
  }
  if ( getBuffStat(mask, 553) )
  {
    v1211 = CInPacket::Decode4(iPacket, v1210);
    sub_1411BF830(a1, v1211);
  }
  if ( getBuffStat(mask, 361) )
  {
    v1213 = CInPacket::Decode1(iPacket, v1212);
    sub_1411C0700(a1, v1213);
    v1215 = CInPacket::Decode1(iPacket, v1214);
    sub_1411A2370(a1, v1215);
  }
  if ( getBuffStat(mask, 460) )
  {
    v1217 = CInPacket::Decode4(iPacket, v1216);
    sub_1411A3F10(a1, v1217);
    v1219 = CInPacket::Decode4(iPacket, v1218);
    sub_1411AD9E0(a1, v1219);
    v1221 = CInPacket::Decode4(iPacket, v1220);
    sub_1411A2680(a1, v1221);
  }
  if ( getBuffStat(mask, 461) )
  {
    v1223 = CInPacket::Decode4(iPacket, v1222);
    sub_1411A3EE0(a1, v1223);
    v1225 = CInPacket::Decode4(iPacket, v1224);
    sub_1411AD9B0(a1, v1225);
    v1227 = CInPacket::Decode4(iPacket, v1226);
    sub_1411A2650(a1, v1227);
  }
  if ( getBuffStat(mask, 463) )
  {
    v1229 = CInPacket::Decode4(iPacket, v1228);
    sub_1411A3FD0(a1, v1229);
    v1231 = CInPacket::Decode4(iPacket, v1230);
    sub_1411ADAA0(a1, v1231);
  }
  if ( getBuffStat(mask, 479) )
  {
    v1233 = CInPacket::Decode4(iPacket, v1232);
    sub_1411C02E0(a1, v1233);
    v1235 = CInPacket::Decode1(iPacket, v1234);
    sub_1411A21C0(a1, v1235);
    v1237 = CInPacket::Decode4(iPacket, v1236);
    sub_1411A2800(a1, v1237);
    v1239 = CInPacket::Decode4(iPacket, v1238);
    sub_1411C0E80(a1, v1239);
  }
  if ( getBuffStat(mask, 510) )
  {
    v1241 = CInPacket::Decode4(iPacket, v1240);
    sub_1411A25C0(a1, v1241);
  }
  if ( getBuffStat(mask, 448) )
  {
    v1243 = CInPacket::Decode2(iPacket, v1242);
    sub_1411C0610(a1, v1243);
  }
  if ( getBuffStat(mask, 449) )
  {
    v1245 = CInPacket::Decode2(iPacket, v1244);
    sub_1411BFDD0(a1, v1245);
  }
  if ( getBuffStat(mask, 740) )
  {
    v1247 = CInPacket::Decode2(iPacket, v1246);
    sub_1411AA950(a1, v1247);
  }
  if ( getBuffStat(mask, 116) )
  {
    v1249 = CInPacket::Decode2(iPacket, v1248);
    sub_1411A4690(a1, v1249);
  }
  if ( getBuffStat(mask, 450) )
  {
    v1251 = CInPacket::Decode2(iPacket, v1250);
    sub_1411C09A0(a1, v1251);
  }
  if ( getBuffStat(mask, 527) )
  {
    v1253 = CInPacket::Decode4(iPacket, v1252);
    sub_1411A2830(a1, v1253);
    v1255 = CInPacket::Decode4(iPacket, v1254);
    sub_1411A21F0(a1, v1255);
    v1257 = CInPacket::Decode4(iPacket, v1256);
    sub_1411C0310(a1, v1257);
    v1259 = CInPacket::Decode4(iPacket, v1258);
    sub_1411C0EB0(a1, v1259);
  }
  if ( getBuffStat(mask, 289) )
  {
    v1261 = CInPacket::Decode4(iPacket, v1260);
    sub_1411A25F0(a1, v1261);
  }
  if ( getBuffStat(mask, 545) )
  {
    v1263 = CInPacket::Decode4(iPacket, v1262);
    sub_1411C0160(a1, v1263);
    v1265 = CInPacket::Decode4(iPacket, v1264);
    sub_1411A20A0(a1, v1265);
  }
  if ( getBuffStat(mask, 277) )
  {
    v1267 = CInPacket::Decode4(iPacket, v1266);
    sub_1411C0130(a1, v1267);
    v1269 = CInPacket::Decode4(iPacket, v1268);
    sub_1411A2070(a1, v1269);
  }
  if ( getBuffStat(mask, 564) )
  {
    v1271 = CInPacket::Decode4(iPacket, v1270);
    sub_1411A4150(a1, v1271);
    v1273 = CInPacket::Decode4(iPacket, v1272);
    sub_1411ADC20(a1, v1273);
    v1275 = CInPacket::Decode4(iPacket, v1274);
    sub_1411A26E0(a1, v1275);
  }
  if ( getBuffStat(mask, 614) )
  {
    v1277 = CInPacket::Decode4(iPacket, v1276);
    sub_1411A3FA0(a1, v1277);
    v1279 = CInPacket::Decode4(iPacket, v1278);
    sub_1411ADA70(a1, v1279);
    v1281 = CInPacket::Decode4(iPacket, v1280);
    sub_1411A26B0(a1, v1281);
  }
  if ( getBuffStat(mask, 618) )
  {
    v1283 = CInPacket::Decode4(iPacket, v1282);
    sub_1411A3F70(a1, v1283);
    v1285 = CInPacket::Decode4(iPacket, v1284);
    sub_1411ADA40(a1, v1285);
    v1287 = CInPacket::Decode4(iPacket, v1286);
    sub_1411BF740(a1, v1287);
  }
  if ( getBuffStat(mask, 620) )
  {
    v1289 = CInPacket::Decode4(iPacket, v1288);
    sub_1411BF770(a1, v1289);
  }
  sub_14113A350(a1 + 11840, iPacket);
  sub_1405D8390(a1 + 11952);
  for ( i = 0; i < 9; ++i )
  {
    v1291 = sub_140636980(i);
    v1292 = sub_1410C2C20(mask, v1438, v1291);
    if ( CSecondaryStat::IsTwoStats(v1292) )
    {
      v1436 = sub_141163AA0(a1, i);
      (*(*v1436 + 48LL))(v1436, iPacket);
    }
  }
  LOBYTE(v1290) = 1;
  CSecondaryStat::DecodeIndieTempStat(a1, mask, iPacket, v1290);
  if ( getBuffStat(mask, 543) )
  {
    v1294 = CInPacket::Decode4(iPacket, v1293);
    sub_1411C05B0(a1, v1294);
  }
  if ( getBuffStat(mask, 262) )
  {
    v1296 = CInPacket::Decode4(iPacket, v1295);
    sub_1411C0040(a1, v1296);
  }
  if ( getBuffStat(mask, 586) )
  {
    v1298 = CInPacket::Decode4(iPacket, v1297);
    sub_1413DCFD0(a1, v1298);
  }
  if ( getBuffStat(mask, 107) )
  {
    v1300 = CInPacket::Decode4(iPacket, v1299);
    sub_1413DD000(a1, v1300);
    v1302 = CInPacket::Decode4(iPacket, v1301);
    sub_1411A2C20(a1, v1302);
  }
  if ( getBuffStat(mask, 636) )
  {
    v1304 = CInPacket::Decode4(iPacket, v1303);
    sub_1411C0340(a1, v1304);
    v1306 = CInPacket::Decode4(iPacket, v1305);
    sub_1411A2220(a1, v1306);
    v1308 = CInPacket::Decode4(iPacket, v1307);
    sub_1411A2860(a1, v1308);
  }
  if ( getBuffStat(mask, 650) )
  {
    v1310 = CInPacket::Decode4(iPacket, v1309);
    sub_1411A2F50(a1, v1310);
  }
  v1311 = CInPacket::Decode1(iPacket, v1309);
  sub_1411AB5B0(a1, v1311);
  if ( getBuffStat(mask, 659) )
  {
    v1313 = CInPacket::Decode4(iPacket, v1312);
    sub_1411A27D0(a1, v1313);
    v1315 = CInPacket::Decode4(iPacket, v1314);
    sub_1411A20D0(a1, v1315);
  }
  if ( getBuffStat(mask, 664) )
  {
    v1317 = CInPacket::Decode4(iPacket, v1316);
    sub_1411BF6E0(a1, v1317);
    v1319 = CInPacket::Decode4(iPacket, v1318);
    sub_1411A1D70(a1, v1319);
  }
  if ( getBuffStat(mask, 665) )
  {
    v1321 = CInPacket::Decode4(iPacket, v1320);
    sub_1411BF680(a1, v1321);
    v1323 = CInPacket::Decode4(iPacket, v1322);
    sub_1411A1D10(a1, v1323);
  }
  if ( getBuffStat(mask, 666) )
  {
    v1325 = CInPacket::Decode4(iPacket, v1324);
    sub_1411BF5F0(a1, v1325);
    v1327 = CInPacket::Decode4(iPacket, v1326);
    sub_1411A1C80(a1, v1327);
    v1329 = CInPacket::Decode4(iPacket, v1328);
    sub_1413DD360(a1, v1329);
  }
  if ( getBuffStat(mask, 667) )
  {
    v1331 = CInPacket::Decode4(iPacket, v1330);
    sub_1411BF620(a1, v1331);
    v1333 = CInPacket::Decode4(iPacket, v1332);
    sub_1411A1CB0(a1, v1333);
  }
  if ( getBuffStat(mask, 668) )
  {
    v1335 = CInPacket::Decode4(iPacket, v1334);
    sub_1411BF650(a1, v1335);
    v1337 = CInPacket::Decode4(iPacket, v1336);
    sub_1411A1CE0(a1, v1337);
  }
  if ( getBuffStat(mask, 669) )
  {
    v1339 = CInPacket::Decode4(iPacket, v1338);
    sub_1411BF6B0(a1, v1339);
    v1341 = CInPacket::Decode4(iPacket, v1340);
    sub_1411A1D40(a1, v1341);
  }
  if ( getBuffStat(mask, 670) )
  {
    v1343 = CInPacket::Decode4(iPacket, v1342);
    sub_1411BFF50(a1, v1343);
    v1345 = CInPacket::Decode4(iPacket, v1344);
    sub_1411A1F50(a1, v1345);
  }
  if ( getBuffStat(mask, 671) )
  {
    v1347 = CInPacket::Decode4(iPacket, v1346);
    sub_1411C00A0(a1, v1347);
    v1349 = CInPacket::Decode4(iPacket, v1348);
    sub_1411A2010(a1, v1349);
  }
  if ( getBuffStat(mask, 672) )
  {
    v1351 = CInPacket::Decode4(iPacket, v1350);
    sub_1411C0DC0(a1, v1351);
    v1353 = CInPacket::Decode4(iPacket, v1352);
    sub_1411A2620(a1, v1353);
  }
  if ( getBuffStat(mask, 673) )
  {
    v1355 = CInPacket::Decode4(iPacket, v1354);
    sub_1411C0520(a1, v1355);
    v1357 = CInPacket::Decode4(iPacket, v1356);
    sub_1411A22E0(a1, v1357);
  }
  if ( getBuffStat(mask, 679) )
  {
    v1359 = CInPacket::Decode4(iPacket, v1358);
    sub_1411C0D30(a1, v1359);
  }
  if ( getBuffStat(mask, 677) )
  {
    v1361 = CInPacket::Decode4(iPacket, v1360);
    sub_1411C0970(a1, v1361);
  }
  if ( getBuffStat(mask, 129) )
  {
    v1435 = MEMORY[0x7FF9E8EF4220]();
    v1363 = CInPacket::Decode4(iPacket, v1362);
    sub_1411BA550(a1, (v1363 + v1435));
    v1365 = CInPacket::Decode4(iPacket, v1364);
    sub_1411A1FB0(a1, v1365);
  }
  if ( getBuffStat(mask, 720) )
  {
    v1367 = CInPacket::Decode4(iPacket, v1366);
    sub_1411C0D90(a1, v1367);
  }
  if ( getBuffStat(mask, 640) )
  {
    v1369 = CInPacket::Decode4(iPacket, v1368);
    sub_1413DB350(a1, v1369);
  }
  if ( getBuffStat(mask, 792) )
  {
    v1371 = CInPacket::Decode4(iPacket, v1370);
    sub_1413DD0C0(a1, v1371);
    v1373 = CInPacket::Decode4(iPacket, v1372);
    sub_1413DB440(a1, v1373);
    v1375 = CInPacket::Decode4(iPacket, v1374);
    sub_1413DD390(a1, v1375);
    v1377 = CInPacket::Decode4(iPacket, v1376);
    sub_1413DD270(a1, v1377);
    v1379 = CInPacket::Decode4(iPacket, v1378);
    sub_1413DD330(a1, v1379);
  }
  if ( getBuffStat(mask, 103) )
  {
    v1381 = CInPacket::Decode4(iPacket, v1380);
    sub_1413DD210(a1, v1381);
    v1383 = CInPacket::Decode4(iPacket, v1382);
    sub_1413DBDD0(a1, v1383);
  }
  if ( getBuffStat(mask, 797) )
  {
    v1385 = CInPacket::Decode4(iPacket, v1384);
    sub_1411A2B30(a1, v1385);
    v1387 = CInPacket::Decode4(iPacket, v1386);
    sub_1411A2AA0(a1, v1387);
    v1389 = CInPacket::Decode4(iPacket, v1388);
    sub_1411A28F0(a1, v1389);
    v1391 = CInPacket::Decode4(iPacket, v1390);
    sub_1411A23A0(a1, v1391);
    v1393 = CInPacket::Decode4(iPacket, v1392);
    sub_1411C0760(a1, v1393);
    v1395 = CInPacket::Decode4(iPacket, v1394);
    sub_1411A2E00(a1, v1395);
    v1397 = CInPacket::Decode4(iPacket, v1396);
    sub_1411C0FD0(a1, v1397);
    v1399 = CInPacket::Decode4(iPacket, v1398);
    sub_1411BF320(a1, v1399);
    v1401 = CInPacket::Decode4(iPacket, v1400);
    sub_1411A2A10(a1, v1401);
    v1403 = CInPacket::Decode4(iPacket, v1402);
    sub_1411C0EE0(a1, v1403);
    v1405 = CInPacket::Decode4(iPacket, v1404);
    sub_1411A2AD0(a1, v1405);
    v1407 = CInPacket::Decode4(iPacket, v1406);
    sub_1411ACA50(a1, v1407);
    v1409 = CInPacket::Decode4(iPacket, v1408);
    sub_1411A2B00(a1, v1409);
    v1411 = CInPacket::Decode4(iPacket, v1410);
    sub_1411B5E10(a1, v1411);
    v1413 = CInPacket::Decode4(iPacket, v1412);
    sub_1411BF380(a1, v1413);
  }
  if ( getBuffStat(mask, 627) )
  {
    v1415 = CInPacket::Decode4(iPacket, v1414);
    sub_1413DD090(a1, v1415);
  }
  if ( getBuffStat(mask, 351) )
  {
    v1417 = CInPacket::Decode4(iPacket, v1416);
    sub_1411C0460(a1, v1417);
  }
  if ( getBuffStat(mask, 876) )
  {
    v1419 = CInPacket::Decode4(iPacket, v1418);
    sub_1411C0370(a1, v1419);
  }
  if ( getBuffStat(mask, 877) )
  {
    v1421 = CInPacket::Decode4(iPacket, v1420);
    sub_1413DD120(a1, v1421);
  }
  if ( getBuffStat(mask, 887) )
  {
    v1423 = CInPacket::Decode4(iPacket, v1422);
    sub_1411BBB70(a1, v1423);
  }
  if ( getBuffStat(mask, 888) )
  {
    v1425 = CInPacket::Decode4(iPacket, v1424);
    sub_1411C0430(a1, v1425);
  }
  sub_1406399D0(a2, mask, 0x420);
  return a2;
}
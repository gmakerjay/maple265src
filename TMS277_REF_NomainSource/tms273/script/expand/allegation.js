/*
 * Copyright (c) 2023. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * marin 腳本訂製 技術顧問 50009219
 */
let remote = require('marin_blood');
let log = require('check_log');
let measure = {
    boss_magnus_easy: {
        evname: "簡單·梅格耐斯",
        proportion: 10,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2049323, [1, 5]]
        ],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 100,
        notice: false,
        reday: false
    },
    boss_magnus_normal: {
        evname: "普通·梅格耐斯",
        proportion: 10,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2049323, [6, 10]]
        ],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 100,
        notice: false,
        reday: false
    },
    boss_magnus_hard: {
        evname: "困難·梅格耐斯",
        proportion: 10,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2049323, [11, 15]]
        ],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 100,
        notice: false,
        reday: false
    },
    boss_swoo_normal: {
        evname: "普通·史烏",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [],
        scale: [
            [4001843, [1, 1]]
        ],
        casual: [
            {ID: 1212115, weight: 0.1},
            {ID: 1213017, weight: 0.1},
            {ID: 1214017, weight: 0.1},
            {ID: 1222109, weight: 0.1},
            {ID: 1232109, weight: 0.1},
            {ID: 1242116, weight: 0.1},
            {ID: 1252093, weight: 0.1},
            {ID: 1262017, weight: 0.1},
            {ID: 1272016, weight: 0.1},
            {ID: 1292017, weight: 0.1},
            {ID: 1302333, weight: 0.1},
            {ID: 1312199, weight: 0.1},
            {ID: 1332274, weight: 0.1},
            {ID: 1362135, weight: 0.1},
            {ID: 1372222, weight: 0.1},
            {ID: 1382259, weight: 0.1},
            {ID: 1402251, weight: 0.1},
            {ID: 1403017, weight: 0.1},
            {ID: 1412177, weight: 0.1},
            {ID: 1422184, weight: 0.1},
            {ID: 1432214, weight: 0.1},
            {ID: 1442268, weight: 0.1},
            {ID: 1452252, weight: 0.1},
            {ID: 1462239, weight: 0.1},
            {ID: 1472261, weight: 0.1},
            {ID: 1482216, weight: 0.1},
            {ID: 1492231, weight: 0.1},
            {ID: 1522138, weight: 0.1},
            {ID: 1532144, weight: 0.1},
            {ID: 1542108, weight: 0.1},
            {ID: 1552110, weight: 0.1},
            {ID: 1582017, weight: 0.1},
            {ID: 1592019, weight: 0.1},
            {ID: 1404028, weight: 0.1},
            {ID: 1004422, weight: 0.2},
            {ID: 1004423, weight: 0.2},
            {ID: 1004424, weight: 0.2},
            {ID: 1004425, weight: 0.2},
            {ID: 1004426, weight: 0.2},
            {ID: 1052882, weight: 0.2},
            {ID: 1052887, weight: 0.2},
            {ID: 1052888, weight: 0.2},
            {ID: 1052889, weight: 0.2},
            {ID: 1052890, weight: 0.2},
            {ID: 1073030, weight: 0.2},
            {ID: 1073032, weight: 0.2},
            {ID: 1073033, weight: 0.2},
            {ID: 1073034, weight: 0.2},
            {ID: 1073035, weight: 0.2},
            {ID: 1082636, weight: 0.2},
            {ID: 1082637, weight: 0.2},
            {ID: 1082638, weight: 0.2},
            {ID: 1082639, weight: 0.2},
            {ID: 1082640, weight: 0.2},
            {ID: 1102775, weight: 0.2},
            {ID: 1102794, weight: 0.2},
            {ID: 1102795, weight: 0.2},
            {ID: 1102796, weight: 0.2},
            {ID: 1102797, weight: 0.2},
            {ID: 1152174, weight: 0.2},
            {ID: 1152176, weight: 0.2},
            {ID: 1152177, weight: 0.2},
            {ID: 1152178, weight: 0.2},
            {ID: 1152179, weight: 0.2}
        ],
        scale_random: 20,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_swoo_hard: {
        evname: "困難·史烏",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [4001843, [1, 1]],
            [2636420, [5, 5]]
        ],
        scale: [
            [4001843, [1, 1]]
        ],
        casual: [
            {ID: 1212115, weight: 0.5},
            {ID: 1213017, weight: 0.5},
            {ID: 1214017, weight: 0.5},
            {ID: 1222109, weight: 0.5},
            {ID: 1232109, weight: 0.5},
            {ID: 1242116, weight: 0.5},
            {ID: 1252093, weight: 0.5},
            {ID: 1262017, weight: 0.5},
            {ID: 1272016, weight: 0.5},
            {ID: 1292017, weight: 0.5},
            {ID: 1302333, weight: 0.5},
            {ID: 1312199, weight: 0.5},
            {ID: 1332274, weight: 0.5},
            {ID: 1362135, weight: 0.5},
            {ID: 1372222, weight: 0.5},
            {ID: 1382259, weight: 0.5},
            {ID: 1402251, weight: 0.5},
            {ID: 1403017, weight: 0.5},
            {ID: 1412177, weight: 0.5},
            {ID: 1422184, weight: 0.5},
            {ID: 1432214, weight: 0.5},
            {ID: 1442268, weight: 0.5},
            {ID: 1452252, weight: 0.5},
            {ID: 1462239, weight: 0.5},
            {ID: 1472261, weight: 0.5},
            {ID: 1482216, weight: 0.5},
            {ID: 1492231, weight: 0.5},
            {ID: 1522138, weight: 0.5},
            {ID: 1532144, weight: 0.5},
            {ID: 1542108, weight: 0.5},
            {ID: 1552110, weight: 0.5},
            {ID: 1582017, weight: 0.5},
            {ID: 1592019, weight: 0.5},
            {ID: 1404028, weight: 0.5},
            {ID: 1004422, weight: 0.9},
            {ID: 1004423, weight: 0.9},
            {ID: 1004424, weight: 0.9},
            {ID: 1004425, weight: 0.9},
            {ID: 1004426, weight: 0.9},
            {ID: 1052882, weight: 0.9},
            {ID: 1052887, weight: 0.9},
            {ID: 1052888, weight: 0.9},
            {ID: 1052889, weight: 0.9},
            {ID: 1052890, weight: 0.9},
            {ID: 1073030, weight: 0.9},
            {ID: 1073032, weight: 0.9},
            {ID: 1073033, weight: 0.9},
            {ID: 1073034, weight: 0.9},
            {ID: 1073035, weight: 0.9},
            {ID: 1082636, weight: 0.9},
            {ID: 1082637, weight: 0.9},
            {ID: 1082638, weight: 0.9},
            {ID: 1082639, weight: 0.9},
            {ID: 1082640, weight: 0.9},
            {ID: 1102775, weight: 0.9},
            {ID: 1102794, weight: 0.9},
            {ID: 1102795, weight: 0.9},
            {ID: 1102796, weight: 0.9},
            {ID: 1102797, weight: 0.9},
            {ID: 1152174, weight: 0.9},
            {ID: 1152176, weight: 0.9},
            {ID: 1152177, weight: 0.9},
            {ID: 1152178, weight: 0.9},
            {ID: 1152179, weight: 0.9}
        ],
        scale_random: 20,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_demian_normal: {
        evname: "普通·戴米安",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [],
        scale: [
            [4001869, [1, 1]]
        ],
        casual: [
            {ID: 1212115, weight: 0.1},
            {ID: 1213017, weight: 0.1},
            {ID: 1214017, weight: 0.1},
            {ID: 1222109, weight: 0.1},
            {ID: 1232109, weight: 0.1},
            {ID: 1242116, weight: 0.1},
            {ID: 1252093, weight: 0.1},
            {ID: 1262017, weight: 0.1},
            {ID: 1272016, weight: 0.1},
            {ID: 1292017, weight: 0.1},
            {ID: 1302333, weight: 0.1},
            {ID: 1312199, weight: 0.1},
            {ID: 1332274, weight: 0.1},
            {ID: 1362135, weight: 0.1},
            {ID: 1372222, weight: 0.1},
            {ID: 1382259, weight: 0.1},
            {ID: 1402251, weight: 0.1},
            {ID: 1403017, weight: 0.1},
            {ID: 1412177, weight: 0.1},
            {ID: 1422184, weight: 0.1},
            {ID: 1432214, weight: 0.1},
            {ID: 1442268, weight: 0.1},
            {ID: 1452252, weight: 0.1},
            {ID: 1462239, weight: 0.1},
            {ID: 1472261, weight: 0.1},
            {ID: 1482216, weight: 0.1},
            {ID: 1492231, weight: 0.1},
            {ID: 1522138, weight: 0.1},
            {ID: 1532144, weight: 0.1},
            {ID: 1542108, weight: 0.1},
            {ID: 1552110, weight: 0.1},
            {ID: 1582017, weight: 0.1},
            {ID: 1592019, weight: 0.1},
            {ID: 1404028, weight: 0.1},
            {ID: 1004422, weight: 0.2},
            {ID: 1004423, weight: 0.2},
            {ID: 1004424, weight: 0.2},
            {ID: 1004425, weight: 0.2},
            {ID: 1004426, weight: 0.2},
            {ID: 1052882, weight: 0.2},
            {ID: 1052887, weight: 0.2},
            {ID: 1052888, weight: 0.2},
            {ID: 1052889, weight: 0.2},
            {ID: 1052890, weight: 0.2},
            {ID: 1073030, weight: 0.2},
            {ID: 1073032, weight: 0.2},
            {ID: 1073033, weight: 0.2},
            {ID: 1073034, weight: 0.2},
            {ID: 1073035, weight: 0.2},
            {ID: 1082636, weight: 0.2},
            {ID: 1082637, weight: 0.2},
            {ID: 1082638, weight: 0.2},
            {ID: 1082639, weight: 0.2},
            {ID: 1082640, weight: 0.2},
            {ID: 1102775, weight: 0.2},
            {ID: 1102794, weight: 0.2},
            {ID: 1102795, weight: 0.2},
            {ID: 1102796, weight: 0.2},
            {ID: 1102797, weight: 0.2},
            {ID: 1152174, weight: 0.2},
            {ID: 1152176, weight: 0.2},
            {ID: 1152177, weight: 0.2},
            {ID: 1152178, weight: 0.2},
            {ID: 1152179, weight: 0.2}
        ],
        scale_random: 20,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_demian_hard: {
        evname: "困難·戴米安",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [4001869, [1, 1]],
            [2636420, [5, 5]]
        ],
        scale: [
            [4001869, [1, 1]]
        ],
        casual: [
            {ID: 1212115, weight: 0.5},
            {ID: 1213017, weight: 0.5},
            {ID: 1214017, weight: 0.5},
            {ID: 1222109, weight: 0.5},
            {ID: 1232109, weight: 0.5},
            {ID: 1242116, weight: 0.5},
            {ID: 1252093, weight: 0.5},
            {ID: 1262017, weight: 0.5},
            {ID: 1272016, weight: 0.5},
            {ID: 1292017, weight: 0.5},
            {ID: 1302333, weight: 0.5},
            {ID: 1312199, weight: 0.5},
            {ID: 1332274, weight: 0.5},
            {ID: 1362135, weight: 0.5},
            {ID: 1372222, weight: 0.5},
            {ID: 1382259, weight: 0.5},
            {ID: 1402251, weight: 0.5},
            {ID: 1403017, weight: 0.5},
            {ID: 1412177, weight: 0.5},
            {ID: 1422184, weight: 0.5},
            {ID: 1432214, weight: 0.5},
            {ID: 1442268, weight: 0.5},
            {ID: 1452252, weight: 0.5},
            {ID: 1462239, weight: 0.5},
            {ID: 1472261, weight: 0.5},
            {ID: 1482216, weight: 0.5},
            {ID: 1492231, weight: 0.5},
            {ID: 1522138, weight: 0.5},
            {ID: 1532144, weight: 0.5},
            {ID: 1542108, weight: 0.5},
            {ID: 1552110, weight: 0.5},
            {ID: 1582017, weight: 0.5},
            {ID: 1592019, weight: 0.5},
            {ID: 1404028, weight: 0.5},
            {ID: 1004422, weight: 0.9},
            {ID: 1004423, weight: 0.9},
            {ID: 1004424, weight: 0.9},
            {ID: 1004425, weight: 0.9},
            {ID: 1004426, weight: 0.9},
            {ID: 1052882, weight: 0.9},
            {ID: 1052887, weight: 0.9},
            {ID: 1052888, weight: 0.9},
            {ID: 1052889, weight: 0.9},
            {ID: 1052890, weight: 0.9},
            {ID: 1073030, weight: 0.9},
            {ID: 1073032, weight: 0.9},
            {ID: 1073033, weight: 0.9},
            {ID: 1073034, weight: 0.9},
            {ID: 1073035, weight: 0.9},
            {ID: 1082636, weight: 0.9},
            {ID: 1082637, weight: 0.9},
            {ID: 1082638, weight: 0.9},
            {ID: 1082639, weight: 0.9},
            {ID: 1082640, weight: 0.9},
            {ID: 1102775, weight: 0.9},
            {ID: 1102794, weight: 0.9},
            {ID: 1102795, weight: 0.9},
            {ID: 1102796, weight: 0.9},
            {ID: 1102797, weight: 0.9},
            {ID: 1152174, weight: 0.9},
            {ID: 1152176, weight: 0.9},
            {ID: 1152177, weight: 0.9},
            {ID: 1152178, weight: 0.9},
            {ID: 1152179, weight: 0.9}
        ],
        scale_random: 20,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_lucid_normal: {
        evname: "普通·路西德",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 10
        },
        inherent: [],
        scale: [
            [4001879, [1, 1]]
        ],
        casual: [
            {ID: 1212120, weight: 0.01},
            {ID: 1213018, weight: 0.01},
            {ID: 1214018, weight: 0.01},
            {ID: 1222113, weight: 0.01},
            {ID: 1232113, weight: 0.01},
            {ID: 1242121, weight: 0.01},
            {ID: 1242122, weight: 0.01},
            {ID: 1252098, weight: 0.01},
            {ID: 1262039, weight: 0.01},
            {ID: 1272017, weight: 0.01},
            {ID: 1282017, weight: 0.01},
            {ID: 1292018, weight: 0.01},
            {ID: 1302343, weight: 0.01},
            {ID: 1312203, weight: 0.01},
            {ID: 1322255, weight: 0.01},
            {ID: 1332279, weight: 0.01},
            {ID: 1342104, weight: 0.01},
            {ID: 1362140, weight: 0.01},
            {ID: 1372228, weight: 0.01},
            {ID: 1382265, weight: 0.01},
            {ID: 1402259, weight: 0.01},
            {ID: 1403018, weight: 0.01},
            {ID: 1412181, weight: 0.01},
            {ID: 1422189, weight: 0.01},
            {ID: 1432218, weight: 0.01},
            {ID: 1442274, weight: 0.01},
            {ID: 1452257, weight: 0.01},
            {ID: 1462243, weight: 0.01},
            {ID: 1472265, weight: 0.01},
            {ID: 1482221, weight: 0.01},
            {ID: 1492235, weight: 0.01},
            {ID: 1522143, weight: 0.01},
            {ID: 1532150, weight: 0.01},
            {ID: 1542117, weight: 0.01},
            {ID: 1552119, weight: 0.01},
            {ID: 1582023, weight: 0.01},
            {ID: 1592020, weight: 0.01},
            {ID: 1404030, weight: 0.01},
            {ID: 1004808, weight: 0.02},
            {ID: 1004809, weight: 0.02},
            {ID: 1004810, weight: 0.02},
            {ID: 1004811, weight: 0.02},
            {ID: 1004812, weight: 0.02},
            {ID: 1053063, weight: 0.02},
            {ID: 1053064, weight: 0.02},
            {ID: 1053065, weight: 0.02},
            {ID: 1053066, weight: 0.02},
            {ID: 1053067, weight: 0.02},
            {ID: 1073158, weight: 0.02},
            {ID: 1073159, weight: 0.02},
            {ID: 1073160, weight: 0.02},
            {ID: 1073161, weight: 0.02},
            {ID: 1073162, weight: 0.02},
            {ID: 1082695, weight: 0.02},
            {ID: 1082696, weight: 0.02},
            {ID: 1082697, weight: 0.02},
            {ID: 1082698, weight: 0.02},
            {ID: 1082699, weight: 0.02},
            {ID: 1102940, weight: 0.02},
            {ID: 1102941, weight: 0.02},
            {ID: 1102942, weight: 0.02},
            {ID: 1102943, weight: 0.02},
            {ID: 1102944, weight: 0.02},
            {ID: 1152196, weight: 0.02},
            {ID: 1152197, weight: 0.02},
            {ID: 1152198, weight: 0.02},
            {ID: 1152199, weight: 0.02},
            {ID: 1152200, weight: 0.02}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_lucid_hard: {
        evname: "困難·路西德",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 20
        },
        inherent: [
            [4001879, [1, 1]],
            [2636420, [5, 5]]
        ],
        scale: [
            [4001879, [1, 1]]
        ],
        casual: [
            {ID: 1212120, weight: 0.05},
            {ID: 1213018, weight: 0.05},
            {ID: 1214018, weight: 0.05},
            {ID: 1222113, weight: 0.05},
            {ID: 1232113, weight: 0.05},
            {ID: 1242121, weight: 0.05},
            {ID: 1242122, weight: 0.05},
            {ID: 1252098, weight: 0.05},
            {ID: 1262039, weight: 0.05},
            {ID: 1272017, weight: 0.05},
            {ID: 1282017, weight: 0.05},
            {ID: 1292018, weight: 0.05},
            {ID: 1302343, weight: 0.05},
            {ID: 1312203, weight: 0.05},
            {ID: 1322255, weight: 0.05},
            {ID: 1332279, weight: 0.05},
            {ID: 1342104, weight: 0.05},
            {ID: 1362140, weight: 0.05},
            {ID: 1372228, weight: 0.05},
            {ID: 1382265, weight: 0.05},
            {ID: 1402259, weight: 0.05},
            {ID: 1403018, weight: 0.05},
            {ID: 1412181, weight: 0.05},
            {ID: 1422189, weight: 0.05},
            {ID: 1432218, weight: 0.05},
            {ID: 1442274, weight: 0.05},
            {ID: 1452257, weight: 0.05},
            {ID: 1462243, weight: 0.05},
            {ID: 1472265, weight: 0.05},
            {ID: 1482221, weight: 0.05},
            {ID: 1492235, weight: 0.05},
            {ID: 1522143, weight: 0.05},
            {ID: 1532150, weight: 0.05},
            {ID: 1542117, weight: 0.05},
            {ID: 1552119, weight: 0.05},
            {ID: 1582023, weight: 0.05},
            {ID: 1592020, weight: 0.05},
            {ID: 1404030, weight: 0.09},
            {ID: 1004808, weight: 0.09},
            {ID: 1004809, weight: 0.09},
            {ID: 1004810, weight: 0.09},
            {ID: 1004811, weight: 0.09},
            {ID: 1004812, weight: 0.09},
            {ID: 1053063, weight: 0.09},
            {ID: 1053064, weight: 0.09},
            {ID: 1053065, weight: 0.09},
            {ID: 1053066, weight: 0.09},
            {ID: 1053067, weight: 0.09},
            {ID: 1073158, weight: 0.09},
            {ID: 1073159, weight: 0.09},
            {ID: 1073160, weight: 0.09},
            {ID: 1073161, weight: 0.09},
            {ID: 1073162, weight: 0.09},
            {ID: 1082695, weight: 0.09},
            {ID: 1082696, weight: 0.09},
            {ID: 1082697, weight: 0.09},
            {ID: 1082698, weight: 0.09},
            {ID: 1082699, weight: 0.09},
            {ID: 1102940, weight: 0.09},
            {ID: 1102941, weight: 0.09},
            {ID: 1102942, weight: 0.09},
            {ID: 1102943, weight: 0.09},
            {ID: 1102944, weight: 0.09},
            {ID: 1152196, weight: 0.09},
            {ID: 1152197, weight: 0.09},
            {ID: 1152198, weight: 0.09},
            {ID: 1152199, weight: 0.09},
            {ID: 1152200, weight: 0.09}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_will_normal: {
        evname: "普通·威爾",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 10
        },
        inherent: [],
        scale: [
            [4001890, [1, 1]]
        ],
        casual: [
            {ID: 1212120, weight: 0.01},
            {ID: 1213018, weight: 0.01},
            {ID: 1214018, weight: 0.01},
            {ID: 1222113, weight: 0.01},
            {ID: 1232113, weight: 0.01},
            {ID: 1242121, weight: 0.01},
            {ID: 1242122, weight: 0.01},
            {ID: 1252098, weight: 0.01},
            {ID: 1262039, weight: 0.01},
            {ID: 1272017, weight: 0.01},
            {ID: 1282017, weight: 0.01},
            {ID: 1292018, weight: 0.01},
            {ID: 1302343, weight: 0.01},
            {ID: 1312203, weight: 0.01},
            {ID: 1322255, weight: 0.01},
            {ID: 1332279, weight: 0.01},
            {ID: 1342104, weight: 0.01},
            {ID: 1362140, weight: 0.01},
            {ID: 1372228, weight: 0.01},
            {ID: 1382265, weight: 0.01},
            {ID: 1402259, weight: 0.01},
            {ID: 1403018, weight: 0.01},
            {ID: 1412181, weight: 0.01},
            {ID: 1422189, weight: 0.01},
            {ID: 1432218, weight: 0.01},
            {ID: 1442274, weight: 0.01},
            {ID: 1452257, weight: 0.01},
            {ID: 1462243, weight: 0.01},
            {ID: 1472265, weight: 0.01},
            {ID: 1482221, weight: 0.01},
            {ID: 1492235, weight: 0.01},
            {ID: 1522143, weight: 0.01},
            {ID: 1532150, weight: 0.01},
            {ID: 1542117, weight: 0.01},
            {ID: 1552119, weight: 0.01},
            {ID: 1582023, weight: 0.01},
            {ID: 1592020, weight: 0.01},
            {ID: 1404030, weight: 0.01},
            {ID: 1004808, weight: 0.02},
            {ID: 1004809, weight: 0.02},
            {ID: 1004810, weight: 0.02},
            {ID: 1004811, weight: 0.02},
            {ID: 1004812, weight: 0.02},
            {ID: 1053063, weight: 0.02},
            {ID: 1053064, weight: 0.02},
            {ID: 1053065, weight: 0.02},
            {ID: 1053066, weight: 0.02},
            {ID: 1053067, weight: 0.02},
            {ID: 1073158, weight: 0.02},
            {ID: 1073159, weight: 0.02},
            {ID: 1073160, weight: 0.02},
            {ID: 1073161, weight: 0.02},
            {ID: 1073162, weight: 0.02},
            {ID: 1082695, weight: 0.02},
            {ID: 1082696, weight: 0.02},
            {ID: 1082697, weight: 0.02},
            {ID: 1082698, weight: 0.02},
            {ID: 1082699, weight: 0.02},
            {ID: 1102940, weight: 0.02},
            {ID: 1102941, weight: 0.02},
            {ID: 1102942, weight: 0.02},
            {ID: 1102943, weight: 0.02},
            {ID: 1102944, weight: 0.02},
            {ID: 1152196, weight: 0.02},
            {ID: 1152197, weight: 0.02},
            {ID: 1152198, weight: 0.02},
            {ID: 1152199, weight: 0.02},
            {ID: 1152200, weight: 0.02}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_will_hard: {
        evname: "困難·威爾",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 20
        },
        inherent: [
            [4001890, [1, 1]],
            [2636420, [5, 5]]
        ],
        scale: [
            [4001890, [1, 1]]
        ],
        casual: [
            {ID: 1212120, weight: 0.05},
            {ID: 1213018, weight: 0.05},
            {ID: 1214018, weight: 0.05},
            {ID: 1222113, weight: 0.05},
            {ID: 1232113, weight: 0.05},
            {ID: 1242121, weight: 0.05},
            {ID: 1242122, weight: 0.05},
            {ID: 1252098, weight: 0.05},
            {ID: 1262039, weight: 0.05},
            {ID: 1272017, weight: 0.05},
            {ID: 1282017, weight: 0.05},
            {ID: 1292018, weight: 0.05},
            {ID: 1302343, weight: 0.05},
            {ID: 1312203, weight: 0.05},
            {ID: 1322255, weight: 0.05},
            {ID: 1332279, weight: 0.05},
            {ID: 1342104, weight: 0.05},
            {ID: 1362140, weight: 0.05},
            {ID: 1372228, weight: 0.05},
            {ID: 1382265, weight: 0.05},
            {ID: 1402259, weight: 0.05},
            {ID: 1403018, weight: 0.05},
            {ID: 1412181, weight: 0.05},
            {ID: 1422189, weight: 0.05},
            {ID: 1432218, weight: 0.05},
            {ID: 1442274, weight: 0.05},
            {ID: 1452257, weight: 0.05},
            {ID: 1462243, weight: 0.05},
            {ID: 1472265, weight: 0.05},
            {ID: 1482221, weight: 0.05},
            {ID: 1492235, weight: 0.05},
            {ID: 1522143, weight: 0.05},
            {ID: 1532150, weight: 0.05},
            {ID: 1542117, weight: 0.05},
            {ID: 1552119, weight: 0.05},
            {ID: 1582023, weight: 0.05},
            {ID: 1592020, weight: 0.05},
            {ID: 1404030, weight: 0.09},
            {ID: 1004808, weight: 0.09},
            {ID: 1004809, weight: 0.09},
            {ID: 1004810, weight: 0.09},
            {ID: 1004811, weight: 0.09},
            {ID: 1004812, weight: 0.09},
            {ID: 1053063, weight: 0.09},
            {ID: 1053064, weight: 0.09},
            {ID: 1053065, weight: 0.09},
            {ID: 1053066, weight: 0.09},
            {ID: 1053067, weight: 0.09},
            {ID: 1073158, weight: 0.09},
            {ID: 1073159, weight: 0.09},
            {ID: 1073160, weight: 0.09},
            {ID: 1073161, weight: 0.09},
            {ID: 1073162, weight: 0.09},
            {ID: 1082695, weight: 0.09},
            {ID: 1082696, weight: 0.09},
            {ID: 1082697, weight: 0.09},
            {ID: 1082698, weight: 0.09},
            {ID: 1082699, weight: 0.09},
            {ID: 1102940, weight: 0.09},
            {ID: 1102941, weight: 0.09},
            {ID: 1102942, weight: 0.09},
            {ID: 1102943, weight: 0.09},
            {ID: 1102944, weight: 0.09},
            {ID: 1152196, weight: 0.09},
            {ID: 1152197, weight: 0.09},
            {ID: 1152198, weight: 0.09},
            {ID: 1152199, weight: 0.09},
            {ID: 1152200, weight: 0.09}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_dusk_normal: {
        evname: "普通·戴斯克",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 10
        },
        inherent: [
            [4001893, [2, 2]]
        ],
        scale: [],
        casual: [
            {ID: 1212120, weight: 0.01},
            {ID: 1213018, weight: 0.01},
            {ID: 1214018, weight: 0.01},
            {ID: 1222113, weight: 0.01},
            {ID: 1232113, weight: 0.01},
            {ID: 1242121, weight: 0.01},
            {ID: 1242122, weight: 0.01},
            {ID: 1252098, weight: 0.01},
            {ID: 1262039, weight: 0.01},
            {ID: 1272017, weight: 0.01},
            {ID: 1282017, weight: 0.01},
            {ID: 1292018, weight: 0.01},
            {ID: 1302343, weight: 0.01},
            {ID: 1312203, weight: 0.01},
            {ID: 1322255, weight: 0.01},
            {ID: 1332279, weight: 0.01},
            {ID: 1342104, weight: 0.01},
            {ID: 1362140, weight: 0.01},
            {ID: 1372228, weight: 0.01},
            {ID: 1382265, weight: 0.01},
            {ID: 1402259, weight: 0.01},
            {ID: 1403018, weight: 0.01},
            {ID: 1412181, weight: 0.01},
            {ID: 1422189, weight: 0.01},
            {ID: 1432218, weight: 0.01},
            {ID: 1442274, weight: 0.01},
            {ID: 1452257, weight: 0.01},
            {ID: 1462243, weight: 0.01},
            {ID: 1472265, weight: 0.01},
            {ID: 1482221, weight: 0.01},
            {ID: 1492235, weight: 0.01},
            {ID: 1522143, weight: 0.01},
            {ID: 1532150, weight: 0.01},
            {ID: 1542117, weight: 0.01},
            {ID: 1552119, weight: 0.01},
            {ID: 1582023, weight: 0.01},
            {ID: 1592020, weight: 0.01},
            {ID: 1404030, weight: 0.01},
            {ID: 1004808, weight: 0.02},
            {ID: 1004809, weight: 0.02},
            {ID: 1004810, weight: 0.02},
            {ID: 1004811, weight: 0.02},
            {ID: 1004812, weight: 0.02},
            {ID: 1053063, weight: 0.02},
            {ID: 1053064, weight: 0.02},
            {ID: 1053065, weight: 0.02},
            {ID: 1053066, weight: 0.02},
            {ID: 1053067, weight: 0.02},
            {ID: 1073158, weight: 0.02},
            {ID: 1073159, weight: 0.02},
            {ID: 1073160, weight: 0.02},
            {ID: 1073161, weight: 0.02},
            {ID: 1073162, weight: 0.02},
            {ID: 1082695, weight: 0.02},
            {ID: 1082696, weight: 0.02},
            {ID: 1082697, weight: 0.02},
            {ID: 1082698, weight: 0.02},
            {ID: 1082699, weight: 0.02},
            {ID: 1102940, weight: 0.02},
            {ID: 1102941, weight: 0.02},
            {ID: 1102942, weight: 0.02},
            {ID: 1102943, weight: 0.02},
            {ID: 1102944, weight: 0.02},
            {ID: 1152196, weight: 0.02},
            {ID: 1152197, weight: 0.02},
            {ID: 1152198, weight: 0.02},
            {ID: 1152199, weight: 0.02},
            {ID: 1152200, weight: 0.02}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_dusk_chaos: {
        evname: "困難·戴斯克",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 20
        },
        inherent: [
            [4001893, [3, 3]],
            [2636420, [5, 5]]
        ],
        scale: [],
        casual: [
            {ID: 1212120, weight: 0.05},
            {ID: 1213018, weight: 0.05},
            {ID: 1214018, weight: 0.05},
            {ID: 1222113, weight: 0.05},
            {ID: 1232113, weight: 0.05},
            {ID: 1242121, weight: 0.05},
            {ID: 1242122, weight: 0.05},
            {ID: 1252098, weight: 0.05},
            {ID: 1262039, weight: 0.05},
            {ID: 1272017, weight: 0.05},
            {ID: 1282017, weight: 0.05},
            {ID: 1292018, weight: 0.05},
            {ID: 1302343, weight: 0.05},
            {ID: 1312203, weight: 0.05},
            {ID: 1322255, weight: 0.05},
            {ID: 1332279, weight: 0.05},
            {ID: 1342104, weight: 0.05},
            {ID: 1362140, weight: 0.05},
            {ID: 1372228, weight: 0.05},
            {ID: 1382265, weight: 0.05},
            {ID: 1402259, weight: 0.05},
            {ID: 1403018, weight: 0.05},
            {ID: 1412181, weight: 0.05},
            {ID: 1422189, weight: 0.05},
            {ID: 1432218, weight: 0.05},
            {ID: 1442274, weight: 0.05},
            {ID: 1452257, weight: 0.05},
            {ID: 1462243, weight: 0.05},
            {ID: 1472265, weight: 0.05},
            {ID: 1482221, weight: 0.05},
            {ID: 1492235, weight: 0.05},
            {ID: 1522143, weight: 0.05},
            {ID: 1532150, weight: 0.05},
            {ID: 1542117, weight: 0.05},
            {ID: 1552119, weight: 0.05},
            {ID: 1582023, weight: 0.05},
            {ID: 1592020, weight: 0.05},
            {ID: 1404030, weight: 0.09},
            {ID: 1004808, weight: 0.09},
            {ID: 1004809, weight: 0.09},
            {ID: 1004810, weight: 0.09},
            {ID: 1004811, weight: 0.09},
            {ID: 1004812, weight: 0.09},
            {ID: 1053063, weight: 0.09},
            {ID: 1053064, weight: 0.09},
            {ID: 1053065, weight: 0.09},
            {ID: 1053066, weight: 0.09},
            {ID: 1053067, weight: 0.09},
            {ID: 1073158, weight: 0.09},
            {ID: 1073159, weight: 0.09},
            {ID: 1073160, weight: 0.09},
            {ID: 1073161, weight: 0.09},
            {ID: 1073162, weight: 0.09},
            {ID: 1082695, weight: 0.09},
            {ID: 1082696, weight: 0.09},
            {ID: 1082697, weight: 0.09},
            {ID: 1082698, weight: 0.09},
            {ID: 1082699, weight: 0.09},
            {ID: 1102940, weight: 0.09},
            {ID: 1102941, weight: 0.09},
            {ID: 1102942, weight: 0.09},
            {ID: 1102943, weight: 0.09},
            {ID: 1102944, weight: 0.09},
            {ID: 1152196, weight: 0.09},
            {ID: 1152197, weight: 0.09},
            {ID: 1152198, weight: 0.09},
            {ID: 1152199, weight: 0.09},
            {ID: 1152200, weight: 0.09}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_jinhilla_normal: {
        evname: "普通·真希拉",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 10
        },
        inherent: [
            [4001894, [2, 2]]
        ],
        scale: [],
        casual: [
            {ID: 1212120, weight: 0.01},
            {ID: 1213018, weight: 0.01},
            {ID: 1214018, weight: 0.01},
            {ID: 1222113, weight: 0.01},
            {ID: 1232113, weight: 0.01},
            {ID: 1242121, weight: 0.01},
            {ID: 1242122, weight: 0.01},
            {ID: 1252098, weight: 0.01},
            {ID: 1262039, weight: 0.01},
            {ID: 1272017, weight: 0.01},
            {ID: 1282017, weight: 0.01},
            {ID: 1292018, weight: 0.01},
            {ID: 1302343, weight: 0.01},
            {ID: 1312203, weight: 0.01},
            {ID: 1322255, weight: 0.01},
            {ID: 1332279, weight: 0.01},
            {ID: 1342104, weight: 0.01},
            {ID: 1362140, weight: 0.01},
            {ID: 1372228, weight: 0.01},
            {ID: 1382265, weight: 0.01},
            {ID: 1402259, weight: 0.01},
            {ID: 1403018, weight: 0.01},
            {ID: 1412181, weight: 0.01},
            {ID: 1422189, weight: 0.01},
            {ID: 1432218, weight: 0.01},
            {ID: 1442274, weight: 0.01},
            {ID: 1452257, weight: 0.01},
            {ID: 1462243, weight: 0.01},
            {ID: 1472265, weight: 0.01},
            {ID: 1482221, weight: 0.01},
            {ID: 1492235, weight: 0.01},
            {ID: 1522143, weight: 0.01},
            {ID: 1532150, weight: 0.01},
            {ID: 1542117, weight: 0.01},
            {ID: 1552119, weight: 0.01},
            {ID: 1582023, weight: 0.01},
            {ID: 1592020, weight: 0.01},
            {ID: 1404030, weight: 0.01},
            {ID: 1004808, weight: 0.02},
            {ID: 1004809, weight: 0.02},
            {ID: 1004810, weight: 0.02},
            {ID: 1004811, weight: 0.02},
            {ID: 1004812, weight: 0.02},
            {ID: 1053063, weight: 0.02},
            {ID: 1053064, weight: 0.02},
            {ID: 1053065, weight: 0.02},
            {ID: 1053066, weight: 0.02},
            {ID: 1053067, weight: 0.02},
            {ID: 1073158, weight: 0.02},
            {ID: 1073159, weight: 0.02},
            {ID: 1073160, weight: 0.02},
            {ID: 1073161, weight: 0.02},
            {ID: 1073162, weight: 0.02},
            {ID: 1082695, weight: 0.02},
            {ID: 1082696, weight: 0.02},
            {ID: 1082697, weight: 0.02},
            {ID: 1082698, weight: 0.02},
            {ID: 1082699, weight: 0.02},
            {ID: 1102940, weight: 0.02},
            {ID: 1102941, weight: 0.02},
            {ID: 1102942, weight: 0.02},
            {ID: 1102943, weight: 0.02},
            {ID: 1102944, weight: 0.02},
            {ID: 1152196, weight: 0.02},
            {ID: 1152197, weight: 0.02},
            {ID: 1152198, weight: 0.02},
            {ID: 1152199, weight: 0.02},
            {ID: 1152200, weight: 0.02}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_jinhilla_hard: {
        evname: "困難·真希拉",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 20
        },
        inherent: [
            [4001894, [3, 3]],
            [2636420, [5, 5]]
        ],
        scale: [],
        casual: [
            {ID: 1212120, weight: 0.01},
            {ID: 1213018, weight: 0.01},
            {ID: 1214018, weight: 0.01},
            {ID: 1222113, weight: 0.01},
            {ID: 1232113, weight: 0.01},
            {ID: 1242121, weight: 0.01},
            {ID: 1242122, weight: 0.01},
            {ID: 1252098, weight: 0.01},
            {ID: 1262039, weight: 0.01},
            {ID: 1272017, weight: 0.01},
            {ID: 1282017, weight: 0.01},
            {ID: 1292018, weight: 0.01},
            {ID: 1302343, weight: 0.01},
            {ID: 1312203, weight: 0.01},
            {ID: 1322255, weight: 0.01},
            {ID: 1332279, weight: 0.01},
            {ID: 1342104, weight: 0.01},
            {ID: 1362140, weight: 0.01},
            {ID: 1372228, weight: 0.01},
            {ID: 1382265, weight: 0.01},
            {ID: 1402259, weight: 0.01},
            {ID: 1403018, weight: 0.01},
            {ID: 1412181, weight: 0.01},
            {ID: 1422189, weight: 0.01},
            {ID: 1432218, weight: 0.01},
            {ID: 1442274, weight: 0.01},
            {ID: 1452257, weight: 0.01},
            {ID: 1462243, weight: 0.01},
            {ID: 1472265, weight: 0.01},
            {ID: 1482221, weight: 0.01},
            {ID: 1492235, weight: 0.01},
            {ID: 1522143, weight: 0.01},
            {ID: 1532150, weight: 0.01},
            {ID: 1542117, weight: 0.01},
            {ID: 1552119, weight: 0.01},
            {ID: 1582023, weight: 0.01},
            {ID: 1592020, weight: 0.01},
            {ID: 1404030, weight: 0.01},
            {ID: 1004808, weight: 0.02},
            {ID: 1004809, weight: 0.02},
            {ID: 1004810, weight: 0.02},
            {ID: 1004811, weight: 0.02},
            {ID: 1004812, weight: 0.02},
            {ID: 1053063, weight: 0.02},
            {ID: 1053064, weight: 0.02},
            {ID: 1053065, weight: 0.02},
            {ID: 1053066, weight: 0.02},
            {ID: 1053067, weight: 0.02},
            {ID: 1073158, weight: 0.02},
            {ID: 1073159, weight: 0.02},
            {ID: 1073160, weight: 0.02},
            {ID: 1073161, weight: 0.02},
            {ID: 1073162, weight: 0.02},
            {ID: 1082695, weight: 0.02},
            {ID: 1082696, weight: 0.02},
            {ID: 1082697, weight: 0.02},
            {ID: 1082698, weight: 0.02},
            {ID: 1082699, weight: 0.02},
            {ID: 1102940, weight: 0.02},
            {ID: 1102941, weight: 0.02},
            {ID: 1102942, weight: 0.02},
            {ID: 1102943, weight: 0.02},
            {ID: 1102944, weight: 0.02},
            {ID: 1152196, weight: 0.02},
            {ID: 1152197, weight: 0.02},
            {ID: 1152198, weight: 0.02},
            {ID: 1152199, weight: 0.02},
            {ID: 1152200, weight: 0.02}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_dunkel_normal: {
        evname: "普通·頓凱爾",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 10
        },
        inherent: [
            [4001893, [2, 2]]
        ],
        scale: [],
        casual: [
            {ID: 1212120, weight: 0.01},
            {ID: 1213018, weight: 0.01},
            {ID: 1214018, weight: 0.01},
            {ID: 1222113, weight: 0.01},
            {ID: 1232113, weight: 0.01},
            {ID: 1242121, weight: 0.01},
            {ID: 1242122, weight: 0.01},
            {ID: 1252098, weight: 0.01},
            {ID: 1262039, weight: 0.01},
            {ID: 1272017, weight: 0.01},
            {ID: 1282017, weight: 0.01},
            {ID: 1292018, weight: 0.01},
            {ID: 1302343, weight: 0.01},
            {ID: 1312203, weight: 0.01},
            {ID: 1322255, weight: 0.01},
            {ID: 1332279, weight: 0.01},
            {ID: 1342104, weight: 0.01},
            {ID: 1362140, weight: 0.01},
            {ID: 1372228, weight: 0.01},
            {ID: 1382265, weight: 0.01},
            {ID: 1402259, weight: 0.01},
            {ID: 1403018, weight: 0.01},
            {ID: 1412181, weight: 0.01},
            {ID: 1422189, weight: 0.01},
            {ID: 1432218, weight: 0.01},
            {ID: 1442274, weight: 0.01},
            {ID: 1452257, weight: 0.01},
            {ID: 1462243, weight: 0.01},
            {ID: 1472265, weight: 0.01},
            {ID: 1482221, weight: 0.01},
            {ID: 1492235, weight: 0.01},
            {ID: 1522143, weight: 0.01},
            {ID: 1532150, weight: 0.01},
            {ID: 1542117, weight: 0.01},
            {ID: 1552119, weight: 0.01},
            {ID: 1582023, weight: 0.01},
            {ID: 1592020, weight: 0.01},
            {ID: 1404030, weight: 0.01},
            {ID: 1004808, weight: 0.02},
            {ID: 1004809, weight: 0.02},
            {ID: 1004810, weight: 0.02},
            {ID: 1004811, weight: 0.02},
            {ID: 1004812, weight: 0.02},
            {ID: 1053063, weight: 0.02},
            {ID: 1053064, weight: 0.02},
            {ID: 1053065, weight: 0.02},
            {ID: 1053066, weight: 0.02},
            {ID: 1053067, weight: 0.02},
            {ID: 1073158, weight: 0.02},
            {ID: 1073159, weight: 0.02},
            {ID: 1073160, weight: 0.02},
            {ID: 1073161, weight: 0.02},
            {ID: 1073162, weight: 0.02},
            {ID: 1082695, weight: 0.02},
            {ID: 1082696, weight: 0.02},
            {ID: 1082697, weight: 0.02},
            {ID: 1082698, weight: 0.02},
            {ID: 1082699, weight: 0.02},
            {ID: 1102940, weight: 0.02},
            {ID: 1102941, weight: 0.02},
            {ID: 1102942, weight: 0.02},
            {ID: 1102943, weight: 0.02},
            {ID: 1102944, weight: 0.02},
            {ID: 1152196, weight: 0.02},
            {ID: 1152197, weight: 0.02},
            {ID: 1152198, weight: 0.02},
            {ID: 1152199, weight: 0.02},
            {ID: 1152200, weight: 0.02}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_dunkel_hard: {
        evname: "困難·頓凱爾",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2439137,
            num: 20
        },
        inherent: [
            [4001893, [3, 3]],
            [2636420, [5, 5]]
        ],
        scale: [],
        casual: [
            {ID: 1212120, weight: 0.05},
            {ID: 1213018, weight: 0.05},
            {ID: 1214018, weight: 0.05},
            {ID: 1222113, weight: 0.05},
            {ID: 1232113, weight: 0.05},
            {ID: 1242121, weight: 0.05},
            {ID: 1242122, weight: 0.05},
            {ID: 1252098, weight: 0.05},
            {ID: 1262039, weight: 0.05},
            {ID: 1272017, weight: 0.05},
            {ID: 1282017, weight: 0.05},
            {ID: 1292018, weight: 0.05},
            {ID: 1302343, weight: 0.05},
            {ID: 1312203, weight: 0.05},
            {ID: 1322255, weight: 0.05},
            {ID: 1332279, weight: 0.05},
            {ID: 1342104, weight: 0.05},
            {ID: 1362140, weight: 0.05},
            {ID: 1372228, weight: 0.05},
            {ID: 1382265, weight: 0.05},
            {ID: 1402259, weight: 0.05},
            {ID: 1403018, weight: 0.05},
            {ID: 1412181, weight: 0.05},
            {ID: 1422189, weight: 0.05},
            {ID: 1432218, weight: 0.05},
            {ID: 1442274, weight: 0.05},
            {ID: 1452257, weight: 0.05},
            {ID: 1462243, weight: 0.05},
            {ID: 1472265, weight: 0.05},
            {ID: 1482221, weight: 0.05},
            {ID: 1492235, weight: 0.05},
            {ID: 1522143, weight: 0.05},
            {ID: 1532150, weight: 0.05},
            {ID: 1542117, weight: 0.05},
            {ID: 1552119, weight: 0.05},
            {ID: 1582023, weight: 0.05},
            {ID: 1592020, weight: 0.05},
            {ID: 1404030, weight: 0.09},
            {ID: 1004808, weight: 0.09},
            {ID: 1004809, weight: 0.09},
            {ID: 1004810, weight: 0.09},
            {ID: 1004811, weight: 0.09},
            {ID: 1004812, weight: 0.09},
            {ID: 1053063, weight: 0.09},
            {ID: 1053064, weight: 0.09},
            {ID: 1053065, weight: 0.09},
            {ID: 1053066, weight: 0.09},
            {ID: 1053067, weight: 0.09},
            {ID: 1073158, weight: 0.09},
            {ID: 1073159, weight: 0.09},
            {ID: 1073160, weight: 0.09},
            {ID: 1073161, weight: 0.09},
            {ID: 1073162, weight: 0.09},
            {ID: 1082695, weight: 0.09},
            {ID: 1082696, weight: 0.09},
            {ID: 1082697, weight: 0.09},
            {ID: 1082698, weight: 0.09},
            {ID: 1082699, weight: 0.09},
            {ID: 1102940, weight: 0.09},
            {ID: 1102941, weight: 0.09},
            {ID: 1102942, weight: 0.09},
            {ID: 1102943, weight: 0.09},
            {ID: 1102944, weight: 0.09},
            {ID: 1152196, weight: 0.09},
            {ID: 1152197, weight: 0.09},
            {ID: 1152198, weight: 0.09},
            {ID: 1152199, weight: 0.09},
            {ID: 1152200, weight: 0.09}
        ],
        scale_random: 20,
        casual_pro: 2000,
        notice: true,
        reday: true
    },
    boss_blackmage_hard: {
        evname: "困難·黑魔法師",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: true,
            article: 2633634,
            num: 10
        },
        inherent: [
            [2636421, [3, 3]]
        ],
        scale: [],
        casual: [
            {ID: 1212120, weight: 0.08},
            {ID: 1213018, weight: 0.08},
            {ID: 1214018, weight: 0.08},
            {ID: 1222113, weight: 0.08},
            {ID: 1232113, weight: 0.08},
            {ID: 1242121, weight: 0.08},
            {ID: 1242122, weight: 0.08},
            {ID: 1252098, weight: 0.08},
            {ID: 1262039, weight: 0.08},
            {ID: 1272017, weight: 0.08},
            {ID: 1282017, weight: 0.08},
            {ID: 1292018, weight: 0.08},
            {ID: 1302343, weight: 0.08},
            {ID: 1312203, weight: 0.08},
            {ID: 1322255, weight: 0.08},
            {ID: 1332279, weight: 0.08},
            {ID: 1342104, weight: 0.08},
            {ID: 1362140, weight: 0.08},
            {ID: 1372228, weight: 0.08},
            {ID: 1382265, weight: 0.08},
            {ID: 1402259, weight: 0.08},
            {ID: 1403018, weight: 0.08},
            {ID: 1412181, weight: 0.08},
            {ID: 1422189, weight: 0.08},
            {ID: 1432218, weight: 0.08},
            {ID: 1442274, weight: 0.08},
            {ID: 1452257, weight: 0.08},
            {ID: 1462243, weight: 0.08},
            {ID: 1472265, weight: 0.08},
            {ID: 1482221, weight: 0.08},
            {ID: 1492235, weight: 0.08},
            {ID: 1522143, weight: 0.08},
            {ID: 1532150, weight: 0.08},
            {ID: 1542117, weight: 0.08},
            {ID: 1552119, weight: 0.08},
            {ID: 1582023, weight: 0.08},
            {ID: 1592020, weight: 0.08},
            {ID: 1404030, weight: 0.1},
            {ID: 1004808, weight: 0.1},
            {ID: 1004809, weight: 0.1},
            {ID: 1004810, weight: 0.1},
            {ID: 1004811, weight: 0.1},
            {ID: 1004812, weight: 0.1},
            {ID: 1053063, weight: 0.1},
            {ID: 1053064, weight: 0.1},
            {ID: 1053065, weight: 0.1},
            {ID: 1053066, weight: 0.1},
            {ID: 1053067, weight: 0.1},
            {ID: 1073158, weight: 0.1},
            {ID: 1073159, weight: 0.1},
            {ID: 1073160, weight: 0.1},
            {ID: 1073161, weight: 0.1},
            {ID: 1073162, weight: 0.1},
            {ID: 1082695, weight: 0.1},
            {ID: 1082696, weight: 0.1},
            {ID: 1082697, weight: 0.1},
            {ID: 1082698, weight: 0.1},
            {ID: 1082699, weight: 0.1},
            {ID: 1102940, weight: 0.1},
            {ID: 1102941, weight: 0.1},
            {ID: 1102942, weight: 0.1},
            {ID: 1102943, weight: 0.1},
            {ID: 1102944, weight: 0.1},
            {ID: 1152196, weight: 0.1},
            {ID: 1152197, weight: 0.1},
            {ID: 1152198, weight: 0.1},
            {ID: 1152199, weight: 0.1},
            {ID: 1152200, weight: 0.1}
        ],
        scale_random: 20,
        casual_pro: 3000,
        notice: true,
        reday: true
    },
    boss_blackmage_extreme: {
        evname: "極限·黑魔法師",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2439138, [25, 25]],
            [5064502, [5, 5]],
            [2439139, [50, 50]],
            [5062512, [50, 50]]
        ],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 200,
        notice: true,
        reday: true
    },
    boss_seren_normal: {
        evname: "普通·賽蓮",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2439139, [10, 10]],
            [2636421, [2, 2]]
        ],
        scale: [],
        casual: [
            {ID: 1190555, weight: 0.01},
            {ID: 1190556, weight: 0.01},
            {ID: 1190557, weight: 0.01},
            {ID: 1190558, weight: 0.01},
            {ID: 1190559, weight: 0.01}
        ],
        scale_random: 20,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_seren_hard: {
        evname: "困難·賽蓮",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2636421, [4, 4]],
            [2633927, [5, 5]]
        ],
        scale: [
            [2439139, [20, 20]]
        ],
        casual: [
            {ID: 1190555, weight: 0.02},
            {ID: 1190556, weight: 0.02},
            {ID: 1190557, weight: 0.02},
            {ID: 1190558, weight: 0.02},
            {ID: 1190559, weight: 0.02}
        ],
        scale_random: 100,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_seren_extreme: {
        evname: "極限·賽蓮",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2633927, [20, 20]],
            [5064502, [5, 5]],
            [2439139, [50, 50]],
            [5062512, [50, 50]]
        ],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 100,
        notice: true,
        reday: true
    },
    boss_kalos_normal: {
        evname: "普通·卡洛斯",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2636421, [4, 4]]
        ],
        scale: [
            [2439139, [20, 20]]
        ],
        casual: [
            {ID: 1190555, weight: 0.02},
            {ID: 1190556, weight: 0.02},
            {ID: 1190557, weight: 0.02},
            {ID: 1190558, weight: 0.02},
            {ID: 1190559, weight: 0.02}
        ],
        scale_random: 100,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_kalos_chaos: {
        evname: "困難·卡洛斯",
        proportion: 25,
        sumBlood: null,
        hurt: {
            judge: false,
            article: 2439137,
            num: 10
        },
        inherent: [
            [2439139, [40, 40]],
            [2636421, [8, 8]]
        ],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 1000,
        notice: true,
        reday: true
    },
    boss_beidler_normal: {
        evname: "普通·培羅德",
        proportion: 25,
        sumBlood: null,
        hurt: {},
        inherent: [],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 1000,
        notice: false,
        reday: false
    },
    boss_karing_normal: {
        evname: "普通·咖凌",
        proportion: 25,
        sumBlood: null,
        hurt: {},
        inherent: [
            [2439139, [50, 50]]
        ],
        scale: [],
        casual: [],
        scale_random: 20,
        casual_pro: 1000,
        notice: true,
        reday: true
    }
}
let notices;
execute();

function execute() {
    const event = stage.getEvent();
    if (!event) return;
    const game = measure[removeTrailingUnderscore(event.getInstanceName())];
    if (!game) return;
    const record = String(removeTrailingUnderscore(event.getInstanceName())).substring(5);
    const currentTimeMillis = Date.now();
    const memrs = event.getVariable("games");
    const injury = event.getVariable("injury");
    const game_date = convertMilliseconds(currentTimeMillis - Number(event.getVariable("game_date")));
    memrs.sort((a, b) => b[2] - a[2]);
    const clearance = [];
    clearance[0] = `■ [ ${game.evname} ] 挑戰時間：${game_date[1]} 分鐘 ${game_date[2]} 秒`;
    const notice = memrs.map(memr => {
        const [, playerName, cardamage] = memr;
        const pro = ((cardamage / injury) * 100).toFixed(2);
        memr[3] = pro;
        return `${playerName} 傷害 ${(pro > 100 ? "100.00" : pro)} %`;
    }).join("　");
    clearance.push(`■ 參與玩家: ${notice}`);
    if (stage.getCharacterId() === party.getLeaderId()) {
        if (game.notice) {
            for (let i in clearance) {
                util.broadcastWorldChatMsg(4, clearance[i]);
            }
        }
    }
    notices = "#fc0xFFB8860B#" + game.evname + "　#fc0xFFCD5555#時間 " + game_date[0] + ":" + game_date[1] + ":" + game_date[2] + "　#fc0xFF228B22#< " + memrs[0][1] + " >\r\n\r\n";
    for (let i in memrs) {
        if (memrs[i][0] !== stage.getCharacterId()) continue;
        if (parseFloat(memrs[i][3]) >= game.proportion) {
            if (game.hurt.judge) {
                let d_hurt = parseInt(memrs[i][3] / 10)
                if (d_hurt > 0) {
                    //stage.gainItem(game.hurt.article, d_hurt * game.hurt.num);
                    stage.gainItem(game.hurt.article, game.hurt.num);
                }
            }

            let concession = game.inherent;
            if (concession.length > 0) {
                notices += "#e#fc0xFF104E8B#基　礎　獎　品#n\r\n\r\n";
                generateConcessionLines(concession);
                notices += marinString(" ", 40, "");
            }
            random = marinrandom(0, 100);
            //stage.dropMessage(0x15, "random " + random + "　scale_random " + game.scale_random)
            if (random <= game.scale_random) {
                concession = game.scale;
                if (concession.length > 0) {
                    notices += "\r\n#e#fc0xFF104E8B#傷　害　#fc0xFF228B22#" + game.proportion + " % #fc0xFF104E8B#　固　定　獎　品#n\r\n\r\n";
                    generateConcessionLines(concession);
                    notices += marinString(" ", 40, "");
                }
            }

            /*
             let rare = weightedRandomPicker(game.casual, game.casual_pro);
             if (rare != null) {
                 notices += "\r\n#e#fc0xFF6B8E23#傷　害　#fc0xFF228B22#" + game.proportion + " % #fc0xFF6B8E23#　稀　有　獎　品#n\r\n\r\n";
                 generateConcessionLines(rare);
                 notices += marinString(" ", 40, "");
             }
             */
        }
    }
    if (game.reday) {
        log.addEventValue(stage, db, record, 1, getDaysUntilNextThursday());
    } else {
        log.addEventValue(stage, db, record);
    }
    log.addEventValue(stage, db, record + "_day");
    if (stage.isGm()) {
        stage.showBalloonMsg(notices, 500, 30);
    }
}

function removeTrailingUnderscore(name) {
    const parts = name.split('_');
    parts.pop();
    return parts.join('_');
}

function marinrandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertMilliseconds(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return [hours, minutes, seconds];
}

function generateConcessionLines(concession) {
    for (let n in concession) {
        if (n % 2 === 0 && n > 0) {
            notices += "\r\n";
        }
        num = marinrandom(concession[n][1][0], concession[n][1][1]);
        notices += "#fc0xFFEE6363# 數量　-->　#fc0xFFEE6363#" + marinString(" ", 5, num.toString()) + "#fc0xFF9400D3#" + marinString(" ", 25, util.getItemName(concession[n][0]).toString());
        stage.gainItem(concession[n][0], num);
    }
}

function weightedRandomPicker(arr, maxWeight) {
    let totalWeight = arr.reduce((prev, curr) => prev + curr.weight, 0);
    let remainingWeight = maxWeight - totalWeight;
    if (remainingWeight > 0) {
        arr.push({ID: "None", weight: remainingWeight});
    }
    totalWeight = maxWeight;
    let rng = Math.random() * totalWeight;
    let curWeight = 0;
    for (let item of arr) {
        curWeight += item.weight;
        if (rng < curWeight) {
            return item.ID === "None" ? null : [[item.ID, 1]];
        }
    }
}

function marinString(charToFill, totalLength, originalString) {
    const doubleByteChars = /[\u0391-\uFFE5]/g;
    const lengthOfDoubleByteChars = String(originalString).replace(doubleByteChars, "aa").length;
    const charactersToFill = charToFill.repeat(totalLength - lengthOfDoubleByteChars);
    const finalStringArray = [originalString, charactersToFill];
    return finalStringArray.slice(0, totalLength).join("");
}

function getDaysUntilNextThursday() {
    let today = new Date();
    let currentDayOfWeek = today.getDay();
    let daysUntilNextThursday = 0;
    if (currentDayOfWeek === 4) {
        daysUntilNextThursday = 7;
    } else {
        daysUntilNextThursday = (4 - currentDayOfWeek + 7) % 7;
    }
    return daysUntilNextThursday;
}
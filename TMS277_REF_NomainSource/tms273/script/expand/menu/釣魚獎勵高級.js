/**
 * 釣魚獎勵
 **/ 
let rodid = 5340001;//高級魚竿
let yeid = 2300003;//高級魚餌
let rodid1 = 5340000;//普通釣竿
let yeid1 = 2300000;//普通魚餌
let title = "市場釣魚";
var pdmap = 100000000;//釣魚地圖

//獎品
let laba = 90;//公告喇叭需要的幾率 
let items = Array(
    Array(4036036, 999999, 1),//沙丁魚
    Array(4031627, 999999, 1),//青魚(3cm)大小為3公分的青魚。
    Array(4031633, 999999, 1),//青魚(3.6cm)大小為3.6公分的青魚。
    Array(4031634, 999999, 1),//青魚(5cm)大小為5公分的青魚。
    Array(4031630, 999999, 1),//鯉魚(30cm)大小為30公分的鯉魚。
    Array(4031628, 999999, 1),//劍魚(120cm)大小為120公分的劍魚。
    Array(4031635, 999999, 1),//青魚(6.5cm)大小為6.5公分的青魚。
    Array(4031641, 999999, 1),//劍魚(128cm)大小為128公分的劍魚。
    Array(4031637, 999999, 1),//鯉魚(53cm)大小為53公分的鯉魚。
    Array(4031642, 999999, 1),//劍魚(131cm)大小為131公分的劍魚。
    Array(4031636, 999999, 1),//青魚(10cm)大小為10公分的青魚。
    Array(4031638, 499999, 1),//鯉魚(60cm)大小為60公分的鯉魚。
    Array(4031631, 499999, 1),//鮭魚(150cm)大小為150公分的鮭魚。
    Array(4031643, 499999, 1),//劍魚(140cm)大小為140公分的劍魚。
    Array(4031645, 200000, 1),//鮭魚(166cm)大小為166公分的鮭魚。
    Array(4031646, 200000, 1),//鮭魚(183cm)大小為183公分的鮭魚。
    Array(4031639, 200000, 1),//鯉魚(100cm)大小為100公分的鯉魚。
    Array(4031647, 200000, 1),//鮭魚(227cm)大小為227公分的鮭魚。
    Array(4031644, 200000, 1),//劍魚(148cm)大小為148公分的劍魚。
    Array(4031640, 100000, 1),//鯉魚(113cm)大小為113公分的鯉魚。
    Array(4031648, 50000, 1),//鮭魚(288cm)大小為288公分的鮭魚。
    Array(2434974, 2000, 1)//黃金魚
);

let items2 = Array(
    Array(4031630, 999999, 1),//青魚(5cm)大小為5公分的青魚。
    Array(4031630, 999999, 1),//鯉魚(30cm)大小為30公分的鯉魚。
    Array(4031634, 999999, 1),//鯉魚(30cm)大小為30公分的鯉魚。
    Array(4031634, 999999, 1),//青魚(5cm)大小為5公分的青魚。
    Array(4031630, 999999, 1),//鯉魚(30cm)大小為30公分的鯉魚。
    Array(4031628, 999999, 1),//劍魚(120cm)大小為120公分的劍魚。
    Array(4031635, 999999, 1),//青魚(6.5cm)大小為6.5公分的青魚。
    Array(4031641, 999999, 1),//劍魚(128cm)大小為128公分的劍魚。
    Array(4031637, 999999, 1),//鯉魚(53cm)大小為53公分的鯉魚。
    Array(4031642, 999999, 1),//劍魚(131cm)大小為131公分的劍魚。
    Array(4031636, 999999, 1),//青魚(10cm)大小為10公分的青魚。
    Array(4031638, 499999, 1),//鯉魚(60cm)大小為60公分的鯉魚。
    Array(4031631, 499999, 1),//鮭魚(150cm)大小為150公分的鮭魚。
    Array(4031643, 499999, 1),//劍魚(140cm)大小為140公分的劍魚。
    Array(4031645, 200000, 1),//鮭魚(166cm)大小為166公分的鮭魚。
    Array(4031646, 200000, 1),//鮭魚(183cm)大小為183公分的鮭魚。
    Array(4031639, 200000, 1),//鯉魚(100cm)大小為100公分的鯉魚。
    Array(4031647, 200000, 1),//鮭魚(227cm)大小為227公分的鮭魚。
    Array(4031644, 200000, 1),//劍魚(148cm)大小為148公分的劍魚。
    Array(4031640, 100000, 1),//鯉魚(113cm)大小為113公分的鯉魚。
    Array(4031648, 50000, 1),//鮭魚(288cm)大小為288公分的鮭魚。
    Array(2434974, 25000, 1)//黃金魚
);

let items1 = Array(//雙倍釣魚獎池
    //物品ID 數量 幾率(幾率請寫99以下,只有幾率在laba以下的才會喇叭公告)
 
    Array(4001200, 1, 10),//小魚
    Array(4001200, 1, 10),//小魚
    Array(4001200, 1, 10),//小魚
    Array(4001200, 1, 10),//小魚
    Array(4001200, 1, 10),//小魚
    Array(4001200, 1, 10),//小魚 
    Array(4001200, 1, 10),//小魚
    Array(4031648, 1, 300),//鮭魚(288cm)	
    Array(4031647, 1, 300),//鮭魚(227cm)	
    Array(4031646, 1, 300),//鮭魚(183cm)		
    Array(4031645, 1, 300),//鮭魚(166cm)
    Array(4031644, 1, 300),//劍魚(148cm)
    Array(4031643, 1, 300),//劍魚(140cm)
    Array(4031642, 1, 300),//劍魚(131cm)
    Array(4031641, 1, 300),//劍魚(128cm)
    Array(4031640, 1, 300),//鯉魚(113cm)
    Array(4031639, 1, 500),//鯉魚(100cm)
    Array(4031638, 1, 500),//鯉魚(60cm)
    Array(4031637, 1, 500),//鯉魚(53cm)
    Array(4031648, 1, 500),//鮭魚(288cm)	
    Array(4031647, 1, 500),//鮭魚(227cm)	
    Array(4031646, 1, 300),//鮭魚(183cm)		
    Array(4031645, 1, 500),//鮭魚(166cm)
    Array(4031644, 1, 500),//劍魚(148cm)
    Array(4031643, 1, 500),//劍魚(140cm)
    Array(4031642, 1, 500),//劍魚(131cm)
    Array(4031641, 1, 500),//劍魚(128cm)	
    Array(4031646, 1, 500),//鮭魚(183cm)				
    Array(4031637, 1, 500),//鯉魚(53cm)
    Array(4031641, 1, 500),//劍魚(128cm)	
    Array(4031646, 1, 500),//鮭魚(183cm)				
    Array(4031637, 1, 500),//鯉魚(53cm)

);
// 
function start() {
 
    if (map.getId() == pdmap) {

        let lowYGIndex = 999;
        let highYGIndex = 999;
        for (let j = 1; j <= 128; j++) {
            let item = stage.getItemBySlot(5, j);
            if (item && lowYGIndex == 999 & item.getItemId() == rodid1) {
                lowYGIndex = j;
            }
            if (item && highYGIndex == 999 & item.getItemId() == rodid) {
                highYGIndex = j;
            }
            if (lowYGIndex < 999 && highYGIndex < 999) {
                break;
            }
        }
        if (lowYGIndex < highYGIndex && (stage.hasItem(yeid1, 1) || stage.hasItem(yeid, 1))) {
            return;
        } 
        
        if (stage.hasItem(rodid, 1) && (stage.hasItem(yeid1, 1) || stage.hasItem(yeid, 1))) {
            let lowYEIndex = 0;
            let highYEIndex = 0;
            for (let i = 1; i <= 128; i++) {
                let item = stage.getItemBySlot(2, i);
                if (item && lowYEIndex == 0 & item.getItemId() == yeid1) {
                    lowYEIndex = i;
                }
                if (item && highYEIndex == 0 & item.getItemId() == yeid) {
                    highYEIndex = i;
                }
                if (lowYEIndex > 0 && highYEIndex > 0) {
                    break;
                }
            }

            for (let z = 0; z < 10; z++) {
                if (highYEIndex > 0 && lowYEIndex > 0) {
                    if (highYEIndex < lowYEIndex) {
                        let fishId = gainFishID(items2);
                        if (stage.gainItem(fishId, 1)) {
                            stage.loseItem(yeid, 1);
                            stage.gainExp(66666);
                            stage.showSystemMessage("[快速高級釣魚]:您釣上來了好東西呢！");
                        } else {
                            stage.showSystemMessage("[快速高級釣魚]:您的背包不足 無法裝下物品了哦！");
                        }
                    } else {
                        let fishId = gainFishID(items);
                        if (stage.gainItem(fishId, 1)) {
                            stage.loseItem(yeid1, 1); 
                            stage.showSystemMessage("[快速普通釣魚]:您釣上來了好東西呢！");
                        } else {
                            stage.showSystemMessage("[快速普通釣魚]:您的背包不足 無法裝下物品了哦！");
                        } 
                    }
                } else {
                    if (stage.hasItem(yeid1, 1)) {
                        let fishId = gainFishID(items);

                        if (stage.gainItem(fishId, 1)) {
                            stage.loseItem(yeid1, 1); 
                            stage.showSystemMessage("[快速普通釣魚]:您釣上來了好東西呢！");
                        } else {
                            stage.showSystemMessage("[快速普通釣魚]:您的背包不足 無法裝下物品了哦！");
                        }  
                    }

                    if (stage.hasItem(yeid, 1)) {
                        let fishId = gainFishID(items2);
                        if (stage.gainItem(fishId, 1)) {
                            stage.loseItem(yeid, 1); 
                            stage.showSystemMessage("[快速高級釣魚]:您釣上來了好東西呢！");
                        } else {
                            stage.showSystemMessage("[快速高級釣魚]:您的背包不足 無法裝下物品了哦！");
                        }   
                    }
                }
            }



        } else {
            stage.showSystemMessage("[快速釣魚]:您沒有魚餌！");//或是了
        }

    } else {
        stage.showSystemMessage("[快速釣魚]: 您已退出釣魚");
    }

}

start();

function gainFishID(fishs) {
    var chance = Math.floor(Math.random() * 999999);
    var finalitem = Array();
    for (var i = 0; i < fishs.length; i++) {
        if (fishs[i][1] >= chance) {
            finalitem.push(fishs[i]);
        }
    } 
    var finalchance = Math.floor(Math.random() * finalitem.length);
    var itemId = finalitem[finalchance][0];


    return itemId;
}


function selectItem(items) {
    let totalWeight = 0;
    for (let i = 0; i < items.length; i++) {
        totalWeight += items[i][2];
    }
    let randomNum = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
        if (randomNum < items[i][2]) {
            return items[i];
        }
        randomNum -= items[i][2];
    }

    throw new Error("Invalid weights");
}
// Created by MetaMS

function Lottery(items) {
        // 檢查輸入是否符合要求
        if (!Array.isArray(items) || items.length === 0) {
                throw new Error("Items must be a non-empty array");
        }

        // 將概率轉換為小數形式，並添加種類信息
        this.items = items.map(item => {
                if (!Array.isArray(item) || item.length !== 4) {
                        throw new Error("Each item must be an array with 4 elements: [ID, Quantity, Probability, Type]");
                }
                if (![0, 1, 2].includes(item[3])) {
                        throw new Error("Type must be one of 0, 1, or 2");
                }
                return {
                        id: item[0],
                        quantity: item[1],
                        probability: item[2] / 100, // 转换为小数
                        type: item[3]
                };
        });

        // 確保概率之和為1.0
        let totalProbability = this.items.reduce((sum, item) => sum + item.probability, 0);
        if (Math.abs(totalProbability - 1) > 0.0001) {
                stage.dropAlertNotice("概率總和不為100%!");
                throw new Error("The sum of probabilities must be 1.0 after conversion");
        }

        // 處理概率相同的道具
        this.items.sort((a, b) => b.probability - a.probability);
        let currentProbability = 0;
        for (let i = 0; i < this.items.length; i++) {
                currentProbability += this.items[i].probability;
                this.items[i].cumulativeProbability = currentProbability;
        }
}

/**
 * 執行抽獎
 * @returns {Object|null} - 返回抽中的道具對象或者null（如果沒有抽中）
 */
Lottery.prototype.draw = function () {
        let random = Math.random();
        for (let i = 0; i < this.items.length; i++) {
                if (random < this.items[i].cumulativeProbability) {
                        return {
                                id: this.items[i].id,
                                quantity: this.items[i].quantity,
                                type: this.items[i].type
                        };
                }
        }
        return null; // 如果没有中奖
};


//default
//100 = 100%
//[itemId , quantity, prob,type]
/*let lotteryItems = [
        ['2644302', 1, 0.002, 2],
        ['2644075', 1, 0.004, 2],
        ['2644103', 1, 0.494, 2],
        ['2636222', 10, 1.5, 2],
        ['2048766', 30, 3, 2],
        ['2711021', 30, 5, 2],
        ['2634437', 100, 5, 2],
        ['2048766', 5, 3, 1],
        ['2711021', 20, 3, 1],
        ['2049793', 1, 3, 1],
        ['2711023', 30, 3, 1],
        ['2711023', 20, 3, 1],
        ['2632290', 3, 3.5, 1],
        ['2632290', 2, 4, 1],
        ['2048759', 30, 4, 1],
        ['2048758', 10, 4, 1],
        ['2028333', 30, 5, 1],
        ['2634437', 50, 5, 1],
        ['2439869', 20, 5.5, 1],
        ['2711023', 15, 3.5, 0],
        ['2048759', 10, 4.5, 0],
        ['2028333', 10, 5, 0],
        ['2439869', 10, 7, 0],
        ['2636880', 10, 9, 0],
        ['2634437', 20, 10, 0]
];
*/


//Demo
let lotteryItems = [
        [2000005, 1, 50, 2],
        [2000000, 2, 30, 1],
        [2000001, 3, 20, 0]
];

let lottery = new Lottery(lotteryItems);


/*
//Debug
for (let i = 0; i < 10; i++) {
        let result = lottery.draw();
        if (result) {
                stage.dropMessage(15, `Item Id: ${result.id}, Quantity: ${result.quantity}, Type: ${result.type}`);
        } else {
                stage.dropMessage(15, "Nothing!");
        }
}
 */

if (!"1".equals(stage.getQuestRecordExShare(504631, "tplay"))) {
        //Action
        let result = lottery.draw();
        let expDuration = 0;
        let res = `${result.type}/${result.id}/${result.quantity}/${expDuration}`;
        if (stage.gainItem(result.id, result.quantity)) {
                stage.setEventUIAction("AnnualEvent_LuckyDraw_Result", res);

                let dStr = util.getStringDate("yyMMdd");
                stage.updateQuestRecordExShare(504631, "lastDate", dStr);

                let passbyCount = stage.getIntQuestRecordExShare(504631, "passbyCount") + 1;
                stage.updateQuestRecordExShare(504631, "passbyCount", passbyCount);

                stage.updateQuestRecordExShare(504631, "passcheck", "0");

                let totalPlayCount = stage.getIntQuestRecordExShare(504631, "totalPlayCount") + 1;
                stage.updateQuestRecordExShare(504631, "totalPlayCount", totalPlayCount);

                stage.updateQuestRecordExShare(504631, "tplay", "1");
        } else {
                stage.dropAlertNotice("背包空間不足!");
        }
}
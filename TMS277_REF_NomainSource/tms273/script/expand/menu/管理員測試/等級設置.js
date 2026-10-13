/**
 * 等級設置工具 - 簡潔版
 */

// 設置等級範圍（根據遊戲實際調整）
const MIN_LEVEL = 1;
const MAX_LEVEL = 300;

// 提示用戶輸入等級（限制輸入範圍）
let targetLevel = npc
    .defNum(1)         // 默認值
    .minNum(MIN_LEVEL) // 最小等級
    .maxNum(MAX_LEVEL) // 最大等級
    .askNumber(`請輸入目標等級（${MIN_LEVEL}~${MAX_LEVEL}）：`);

// 驗證輸入有效性
if (targetLevel < MIN_LEVEL || targetLevel > MAX_LEVEL) {
    npc.say(`輸入無效！等級需在${MIN_LEVEL}~${MAX_LEVEL}之間。`);
} else {
    try {
        // 執行等級設置
        let oldLevel = stage.getLevel();
        stage.setLevel(targetLevel);
        let newLevel = stage.getLevel();

        // 反饋設置結果
        if (newLevel === targetLevel) {
            npc.say(`等級設置成功！\r\n原等級：${oldLevel}\r\n新等級：${newLevel}`);
        } else {
            npc.say("設置失敗，可能超出遊戲限制。");
        }
    } catch (e) {
        npc.say("操作失敗：" + e.message);
    }
}
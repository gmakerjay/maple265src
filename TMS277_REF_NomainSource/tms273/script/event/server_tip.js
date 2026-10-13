// Created by MetaMS
// Server Tip

let message = ["歡迎你的到來。遊戲中難免會出現掉線或者其他問題。請及時反饋BUG~",
        "請勿使用任何非法程式，被發現時封號封IP!",
        "遊戲常用指令請輸入/help 獲取！",
        "如果無法和NPC進行對話，請嘗試使用 /er 命令。",
        "如果你有好的意見或建議，歡迎你隨時在群裡向我們反饋。~",
        "在遊戲裡可以向老玩家請求幫助喲。",
        "發現遊戲BUG或遊戲漏洞時.請填寫詳細的BUG報告上傳群檔案",
        "城市地圖可以點選左邊的快捷移動，可以用來快速移動到自由市場，匠人街等等地圖。",
        "玩家可以到專業技術地圖學習各種生活技能。"];

function init(attachment) {
        event.startTimer("notice", Math.random() * 3 * 60000);
}

function timerExpired(key) {
        switch (key) {
                case "notice":
                        util.broadcastChatMsg(7, "[幫助] " + message[Math.floor(Math.random() * message.length)]);
                        event.startTimer("notice", Math.random() * 3 * 60000);
                        break;
        }
}
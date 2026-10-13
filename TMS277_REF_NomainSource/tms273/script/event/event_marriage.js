// Created by MetaMS
// Event:marriage

let mapId;
let readyMFiled;
let mainFiled;
let sayIdx = 0;
let sayInfo = ["我們今天是為了見證兩個年輕人的愛情而聚集在此！",
        "據說上天所牽線的姻緣，是以緞帶肥肥的紅色緞帶所纏聚在一起，",
        "我想這兩個人，就是找到了緞帶的另一端的對方！",
        "在漫長的旅途中，在無數的旅人之間…能夠找到彼此，這說事極大的幸運！",
        "將眼前的幸運升華為幸福…而這還是兩個人眼前的任務。",
        "新郎！你願意愛著新娘直到黑發變成雪吉拉毛發般雪白嗎？",
        "新娘！你願意愛著新郎直到冰原雪域的萬年雪融化殆盡嗎？",
        "請所有參加這場婚禮的各位，作為這場山盟海誓的證人吧！",
        "我在此宣布···在大家的祝福中，兩人結為夫妻。",
        "那現在請新郎親吻新娘吧！"];

function init(attachment) {
        event.setVariable("STATE", "0");//初始化活動開關
        readyMFiled = event.getMap(680000200);//初始化準備地圖
        mainFiled = event.getMap(680000210);//初始化活動地圖
}

function timerExpired(key) {
        switch (key) {
                case "on_marriage":
                        break;
                case "start_ceremony":
                        if (sayIdx < sayInfo.length) {
                                mainFiled.blowWeather(5121062, sayInfo[sayIdx], 10);
                                event.startTimer("start_ceremony", 10 * 1000);
                        }
                        sayIdx++;
                        break;
                case "kick":
                        sayIdx = 0;
                        event.clearVariables();
                        event.setVariable("STATE", "0");//初始化活動開關
                        readyMFiled.transferTo(680000500, 0);
                        mainFiled.transferTo(680000500, 0);
                        break;
        }
}

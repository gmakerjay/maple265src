// Created by MetaMS
// Event
// 剪刀石頭布

let EXIT_MAP = 993030100;
let gameFiled;
let readyMFiled;
let endEnter;
let startTime;
function init(attachment) {
        event.setVariable("Open", "0");//初始化活動開關
        readyMFiled = event.getMap(993030000);//初始化準備地圖
        gameFiled = event.getMap(993030200);//初始化活動地圖
}
function playerChangedMap(stage, destination) {
    if (stage.getMapId() == 993030000) { 
        stage.showTimer((startTime - new Date().getTime()) / 1000);
    }  
}
function timerExpired(key) {
        switch (key) {
                case "Event_Open":
                        event.clearVariables();
                        event.setVariable("Open", "1");//活動開啟
                        let now = new Date().getTime();
                        startTime = now + 90 * 1000;
                        event.startTimer("Close", 90 * 1000);//90秒等待時間
                        break;
                case "Close":
                        if (readyMFiled.getPlayerCount() > 0) {//如果玩家數量大於幾人
                                event.startTimer("Warp_To_Game_Field", 3 * 1000);// 3秒後執行傳送所有玩家到活動開始地圖
                        } else {//否則關閉活動
                                event.setVariable("Open", "0");//活動關閉
                        }
                        break;
                case "Warp_To_Game_Field":
                        gameFiled.endEvent();//停止活動地圖的計時器，防止發生錯誤
                        readyMFiled.transferTo(gameFiled.getId(), 0);//傳送準備地圖的所有玩家到活動地圖
                        event.startTimer("Start_Game", 20 * 1000);//計時器啟動：10秒後開啟 地圖活動執行緒
                        break;
                case "Start_Game":
                        gameFiled.startEvent();//啟動地圖活動執行緒
                        break;
                case "Game_Over":
                        event.setVariable("Open", "0");//活動關閉
                        // gameFiled.transferTo(EXIT_MAP, 0);//傳送所有玩家到退出
                        let mems = gameFiled.getAllStage();
                        for (let i in mems) {
                                let mem = mems[i]; 
                                mem.changeMap(EXIT_MAP, 0)
                                mem.runScript('expand/hrps_result');
                        }
                        break;
                default:
                        break;
        }
}
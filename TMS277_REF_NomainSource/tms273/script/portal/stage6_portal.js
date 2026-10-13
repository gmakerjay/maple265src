// Created by MetaMS
// PQ:party2

let event = stage.getEvent("pq_party2");
if (event != null) {
        let aRate = parseInt(3 / 6 * 100);
        event.setAchieveRate(aRate);
        map.showScreenAutoLetterBox("quest/party/clear");
        map.playSoundEffect("Party1/Clear");
        map.transferTo(922010700, 0);

}
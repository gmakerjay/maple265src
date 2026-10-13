let ticketId = 2639540;
let rewardId = 3700661;
let days = 30;

function start () {
    let item = util.makeItem(rewardId, 1);
    item.setExpireDate(util.calcExpireDay(days));
    if (stage.getItemQuantity(ticketId) > 0 && stage.gainItem(item)) {
        stage.loseItem(ticketId, 1);
         
            npc.id(9063069).say("在背包放入獎勵了~\r\n希望你滿意！");
    } else {
            npc.id(9063069).say("背包空間不足，請清理後再試。");
    }
}

start();

                        
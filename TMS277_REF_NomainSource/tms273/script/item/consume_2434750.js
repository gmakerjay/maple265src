 
const list = [

    [5062009, 1, 10],
    [2472000, 1, 5],
    [5062500, 1, 10],
    [5062020, 1, 10],
    [5062021, 1, 10], 
    [2439305, 5, 20], 
];

  
function start() {
 
        let item = list[Math.floor(Math.random() * list.length)];
        let id = item[0];
        let quantity = rand(item[1], item[2])
        stage.loseItem(2434750, 1);
        stage.gainItem(id, quantity);
        npc.say("獲得了 #v" + id + "##k " + quantity + "個"); 
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
start();
 